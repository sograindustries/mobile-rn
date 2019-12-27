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

#include "estimate_hr.h"

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
