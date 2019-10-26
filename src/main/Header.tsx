import * as React from 'react';
import { View, Icon, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Header = () => {
  return (
    <View style={styles.body}>
      <Animatable.Text
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        style={{
          textAlign: 'center',
          width: 50
        }}>
        <Icon name="md-heart" style={styles.heartIcon} />
      </Animatable.Text>
      <Text style={styles.headerText}>Now</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  headerText: {
    fontSize: 48
  },
  heartIcon: {
    fontSize: 48,
    color: '#FE5F55'
  }
});

export default Header;
