import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import { COLOR_DARK_GRAY } from '../colors';

function ShareWithDoctorCard() {
  return (
    <Button style={styles.btn}>
      <Icon
        name="cloud-upload"
        style={{
          color: COLOR_DARK_GRAY,
          fontSize: 42
        }}
      />
      <Text style={{ color: COLOR_DARK_GRAY }}>Share With Doctor</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingLeft: 5,
    paddingRight: 5
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  btn: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
});

export default ShareWithDoctorCard;
