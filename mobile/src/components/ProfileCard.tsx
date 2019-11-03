import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import { COLOR_DARK_GRAY } from '../colors';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { SCREEN_KEY_PROFLIE } from '../App';

interface Props {
  onPress: () => void;
}

function ProfileCard(props: Props) {
  return (
    <Button style={styles.btn} onPress={props.onPress}>
      <Icon
        name="person"
        style={{
          color: COLOR_DARK_GRAY,
          fontSize: 42
        }}
      />
      <Text style={{ color: COLOR_DARK_GRAY }}>Profile</Text>
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

export default withNavigation((props: NavigationInjectedProps) => {
  const onPress = () => props.navigation.navigate(SCREEN_KEY_PROFLIE);

  return <ProfileCard onPress={onPress} />;
});
