import * as React from 'react';
import { View, Text } from 'native-base';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Video from 'react-native-video';
import LoginForm from '../LoginForm';

function WelcomeScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        }}>
        <Video
          style={styles.backgroundVideo}
          source={require('../../media/heart_beat.mp4')}
          repeat={true}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 48, fontWeight: '800' }}>LOGIN</Text>
      </View>
      <View
        style={{
          flex: 2
        }}>
        <LoginForm />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: -0,
    left: -100,
    bottom: 0,
    right: -100
  }
});

export default WelcomeScreen;
