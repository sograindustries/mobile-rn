#include <iostream>
#include <math.h>
#include <vector>
#include <list>

#include "estimate_hr.h"
#include "fir_filter.h"

namespace {

  // Textual include
  #include "kernels.cpp"
  
  FirFilter<double, kQrsFilterLength, kQrsFilterKernel> qrs_filter;
  FirFilter<double, kMaFilterLength, kMaFilter> ma_filter;

  // Stores samples.
  long unsigned int count = 0;
  double sample_m1 = 0;
  double sample_m2 = 0;  

  // Noise and signal levels
  bool peak_init = true;
  double avg_peak = 0;
  double max_peak = 0;
  double init_peak_count = 0;
  
  double noise_level = 0;
  double signal_level = 0;
  const int kInitThreshold = 1000;

  std::vector<long unsigned int> signal_peak_indices;
  std::vector<double> signal_peak_values;

  const int kHrMaLength = 8;
  std::vector<long unsigned int> hb_index;
  double hr_estimate_bpm = 0;
  
  void AddHBPeak(long unsigned int index) {
    //std::cout << "HB Index: " << index << std::endl;
    hb_index.push_back(index);
    
    if (hb_index.size() > kHrMaLength) {
      hb_index.erase(hb_index.begin(), hb_index.begin());
    }

    if (hb_index.size() < kHrMaLength) {
      return;
    }

    double hb_period = 0;
    for (int ii = 0; ii < hb_index.size()-1; ++ii) {
      hb_period += hb_index[ii+1] - hb_index[ii];
    }
    hb_period /= (hb_index.size() - 1);

    hr_estimate_bpm = (250.0 / hb_period) * 60.0;
  }
  
  void ProcessPeaks() {

    if (signal_peak_indices.size() == 0)
      return;
    
    double max_value = 0;
    int max_value_index = 0;
    for (int ii = 0; ii < signal_peak_values.size() ; ++ii) {
      if (signal_peak_values[ii] > max_value){
	max_value = signal_peak_values[ii];
	max_value_index = ii;
      }
    }

    // Adds peak to signal level.
    signal_level = 0.125 * max_value + 0.875 * signal_level;

    AddHBPeak(signal_peak_indices[max_value_index]);
    signal_peak_indices.clear();
    signal_peak_values.clear();
    
  }
  
  void AddPeak(long unsigned int sample_count, double peak_value) {

    // Records stats while initializing
    if (sample_count < kInitThreshold ) {
      max_peak = max_peak > peak_value ? max_peak : peak_value;
      avg_peak += peak_value;
      init_peak_count++;
      return;
    }

    // If we get to this point and we have no peaks, restart the init process.
    if (init_peak_count == 0) {
      argos::InitEstimator();
      return;
    }

    // Sets the signal and noise level when coming out of reset.
    if (peak_init) {
      peak_init = false;
      avg_peak /= init_peak_count;
      noise_level = 0.875 * avg_peak;
      signal_level = 0.875 * max_peak;
    }

    double threshold = noise_level + 0.25 * (signal_level - noise_level);

    if (peak_value < threshold) {
      ProcessPeaks();
      noise_level = 0.125 * peak_value + 0.875 * noise_level;
      return;
    }

    //    signal_level = 0.125 * peak_value + 0.875 * signal_level;
    signal_peak_indices.push_back(sample_count);
    signal_peak_values.push_back(peak_value);
      
  }
  
}

void argos::InitEstimator() {
  sample_m1 = 0;
  sample_m2 = 0;
  count = 0;
  peak_init = true;
  avg_peak = 0;
  max_peak = 0;
  init_peak_count = 0;
  noise_level = 0;
  signal_level = 0;
  signal_peak_indices.clear();
  signal_peak_values.clear();
  hb_index.clear();
  hr_estimate_bpm = 0;
}

int argos::EstimateHeartRate(const std::vector<int>& data, const hr_params_s& hr_params) {
  
  // Process new data
  for(int ii = 0; ii < data.size(); ++ii) {
    qrs_filter.put(data[ii]);
    const double qrs_sample = qrs_filter.get();
    ma_filter.put(qrs_sample * qrs_sample);
    const double ma_sample = ma_filter.get();

    const bool isPeak = (sample_m2 < sample_m1) && (ma_sample < sample_m1);

    if (isPeak) {
      AddPeak(count-1, sample_m1);
    }
    
    sample_m2 = sample_m1;
    sample_m1 = ma_sample;
    count++;
  }
  
  return static_cast<int>(hr_estimate_bpm);
}