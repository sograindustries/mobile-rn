import * as React from 'react';
import { Text, Button, Footer, FooterTab, Icon, View } from 'native-base';
import { StyleSheet } from 'react-native';
import DeveloperOnly from './DeveloperOnly';
import { COLOR_BLUE } from '../colors';
import { setLeftFingerState, setRightFingerState } from '../ble/service';

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'transparent'
    //  borderTopWidth: 0
  },
  fobTouchContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

interface Props {}

function AppFooter(_: Props) {
  const [isFobVisible, setIsFobVisible] = React.useState(false);

  const handleOnFobPress = () => {
    setIsFobVisible(!isFobVisible);
  };

  return (
    <DeveloperOnly>
      <Footer style={styles.footer}>
        <FooterTab>
          <Button vertical onPress={handleOnFobPress}>
            <Icon name="finger-print" />
            <Text>Fob</Text>
          </Button>
        </FooterTab>
      </Footer>
      {isFobVisible && <FobDebugControl />}
    </DeveloperOnly>
  );
}

function FobDebugControl() {
  const [isLeftFobActive, setIsLeftFobActive] = React.useState(false);
  const [isRightFobActive, setIsRightFobActive] = React.useState(false);

  const leftFobColor = isLeftFobActive ? 'red' : COLOR_BLUE;
  const rightFobColor = isRightFobActive ? 'red' : COLOR_BLUE;

  const handleLeftFobPress = (value: boolean) => () => {
    setLeftFingerState(value);
    setIsLeftFobActive(value);
  };

  const handleRightFobPress = (value: boolean) => () => {
    setRightFingerState(value);
    setIsRightFobActive(value);
  };

  return (
    <View style={styles.fobTouchContainer}>
      <View
        onTouchStart={handleLeftFobPress(true)}
        onTouchEnd={handleLeftFobPress(false)}>
        <Icon
          name="finger-print"
          style={{ fontSize: 72, color: leftFobColor }}
        />
      </View>
      <View
        onTouchStart={handleRightFobPress(true)}
        onTouchEnd={handleRightFobPress(false)}>
        <Icon
          name="finger-print"
          style={{ fontSize: 72, color: rightFobColor }}
        />
      </View>
    </View>
  );
}

export default AppFooter;
