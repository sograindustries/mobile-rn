//
// Created by Guilherme Guedes on 2019-11-11.
//

// #include "native-lib.h"
#include <jni.h>
#include <string>
#include <iostream>
#include <sstream>
#include <math.h>
#include <vector>
#include <android/log.h>

namespace argos {

typedef struct {
  int sample_rate;
  float std_dev_threshold;
  float max_heart_rate;
} hr_params_s;

int EstimateHeartRate(const std::vector<int>& data, const hr_params_s& hr_param);

}

double GetMean(const std::vector<int>& data) {
    double accum = 0;
    for(int ii = 0; ii < data.size(); ++ii) {
      accum += data[ii];
    }
    return accum / static_cast<double>(data.size());
  }

  double GetStdDev(const std::vector<int>& data) {
    double mean = GetMean(data);
    double accum = 0;
    for(int ii = 0; ii < data.size(); ++ii) {
      double mean_diff = (static_cast<double>(data[ii]) - mean);
      accum += mean_diff * mean_diff;
    }
    return sqrt(accum / static_cast<double>(data.size()));
  }

  double GetStdDev(const std::vector<int>& data, const double& mean) {
    double accum = 0;
    for(int ii = 0; ii < data.size(); ++ii) {
      double mean_diff = (static_cast<double>(data[ii]) - mean);
      accum += mean_diff * mean_diff;
    }
    return sqrt(accum / static_cast<double>(data.size()));
  }

  std::vector<int> GetBeats(const std::vector<int>& indices, const int& min_period) {
    std::vector<int> beats;
    long int index_accum = 0;
    int start_index = indices[0];
    int num_indices = 0;
    for (int index = 0; index < indices.size(); ++index) {
      if ((indices[index] - start_index) < min_period) {
	index_accum += indices[index];
	num_indices++;
      } else {
	// Store the average index from the previous beat.
	beats.push_back(index_accum / num_indices);
	num_indices = 1;
	start_index = indices[index];
	index_accum = indices[index];
      }
    }
    // Need to process the final beat.
    beats.push_back(index_accum / num_indices);
    return beats;
  }
  
int argos::EstimateHeartRate(const std::vector<int>& data, const hr_params_s& hr_params) {
    const double kMean = GetMean(data);
    const double kStdDev = GetStdDev(data, kMean);
    const int kThresholdP = kMean + hr_params.std_dev_threshold * kStdDev;
    const int kThresholdN = kMean - hr_params.std_dev_threshold * kStdDev;

    std::ostringstream o;
    o  << "Size: " << data.size();

    __android_log_write(ANDROID_LOG_ERROR, "Tag", o.str().c_str());//Or ANDROID_LOG_INFO, ...


    std::vector<int> exceed_indices;
    for (int index = 0; index < data.size(); ++index) {
        std::ostringstream a;
        a << "Data: " << data[index];
        a << "\nTH: " << kThresholdP;
        __android_log_write(ANDROID_LOG_ERROR, "Tag", a.str().c_str());//Or ANDROID_LOG_INFO, ...

        if (data[index] > kThresholdP) {
            exceed_indices.push_back(index);
        }
        if (data[index] < kThresholdN) {
            exceed_indices.push_back(index);
        }
    }
    if (exceed_indices.size() == 0)
        return -2;

    int min_period = static_cast<int>((hr_params.sample_rate * 60.0) / hr_params.max_heart_rate);
    std::vector<int> beats = GetBeats(exceed_indices, min_period);

    // Need at least 2 beats to estimate the heart rate
    if (beats.size() < 2) {
        return -3;
    }
    double avg_period = 0;
    for (int index = 0; index < beats.size() - 1; ++index) {
        avg_period += static_cast<double>(beats[index + 1] - beats[index]);
    }
    avg_period /= static_cast<double>((beats.size() - 1));

    double heart_rate = static_cast<double>(hr_params.sample_rate) / avg_period * 60;

    return static_cast<int>(round(heart_rate));

}

jint g = 1;

extern "C"
JNIEXPORT jint
JNICALL
Java_com_mobile_HeartBeatModule_helloWorldJNI(JNIEnv* env, jobject thiz, jintArray arr) {
    jsize len = env->GetArrayLength(arr);
    jint *body = env->GetIntArrayElements(arr, 0);


    std::vector<int> data;
    for(int ii = 0; ii < len; ii++){
        data.push_back(body[ii]);
    }

    argos::hr_params_s hr_params;
    hr_params.sample_rate = 250;
    hr_params.std_dev_threshold = 3.0;
    hr_params.max_heart_rate = 275;
    int hr;
    hr = argos::EstimateHeartRate(data, hr_params);

// jint i, sum = 0;
//    for (i = 0; i < len; i++) {
 //       sum += body[i];
 //   }

  //  g += 1;

  //  std::string hello = "Conter: ";

   // std::ostringstream o;
   // o << hello << sum;


    env->ReleaseIntArrayElements(arr, body, 0);

  return hr;
}