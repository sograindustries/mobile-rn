package com.mobile;

import android.util.Log;

import com.facebook.react.bridge.NativeArray;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;

public class HeartBeatModule extends ReactContextBaseJavaModule {

    static {
        System.loadLibrary("native-lib"); //this loads the library when the class is loaded
    }

    public HeartBeatModule(ReactApplicationContext reactContext) {
        super(reactContext); //required by React Native
    }

    @Override
    public String getName() {
        return "HeartBeat"; //HelloWorld is how this module will be referred to from React Native
    }

    @ReactMethod
    public void helloWorld(ReadableArray readableArray, Promise promise) { //this method will be called from JS by React Native
        int size = readableArray.size();
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = readableArray.getInt(i);
        }
        
        try {
            int hello = helloWorldJNI(arr);
            promise.resolve(hello);
        } catch (Exception e) {
            promise.reject("ERR", e);
        }
    }

    public native int helloWorldJNI(int[] arr);
}


