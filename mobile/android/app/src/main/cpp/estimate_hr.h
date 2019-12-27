
#include <vector>

namespace argos {

typedef struct {
  int sample_rate;
  float std_dev_threshold;
  float max_heart_rate;
} hr_params_s;

 int EstimateHeartRate(const std::vector<int>& data, const hr_params_s& hr_param);

 void InitEstimator();
 
}
