import * as React from 'react';
import { View, Card, CardItem, Button, Icon } from 'native-base';
import Header from './Header';
import { StyleSheet, Text } from 'react-native';

const Main = () => {
  return (
    <View style={styles.body}>
      <Card style={styles.card}>
        <Header />
        <View style={{ flexGrow: 1 }}></View>
        <CardItem style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Button light iconLeft rounded style={styles.btn}>
            <Icon name="timer" style={{ color: '#FE5F55', marginRight: 5 }} />
            <Text>76 bpm</Text>
          </Button>

          <Button light iconLeft rounded style={styles.btn}>
            <Icon name="md-pulse" style={{ color: 'green', marginRight: 5 }} />
            <Text>Normal Sinus Rhythm</Text>
          </Button>
          <Button
            light
            iconLeft
            rounded
            style={{
              ...styles.btn,
              marginTop: 10,
              backgroundColor: '#FFBC7A'
            }}>
            <Icon
              name="ios-bicycle"
              style={{ color: 'black', marginRight: 5 }}
            />
            <Text style={{}}>Log Exercise</Text>
          </Button>
        </CardItem>
      </Card>

      <Card style={styles.card}>
        <Header />
        <View style={{ flexGrow: 1 }}></View>
        <CardItem style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Button light iconLeft rounded style={styles.btn}>
            <Icon name="timer" style={{ color: '#FE5F55', marginRight: 5 }} />
            <Text>76 bpm</Text>
          </Button>

          <Button light iconLeft rounded style={styles.btn}>
            <Icon name="md-pulse" style={{ color: 'green', marginRight: 5 }} />
            <Text>Normal Sinus Rhythm</Text>
          </Button>
          <Button
            light
            iconLeft
            rounded
            style={{
              ...styles.btn,
              marginTop: 10,
              backgroundColor: '#FFBC7A'
            }}>
            <Icon
              name="ios-bicycle"
              style={{ color: 'black', marginRight: 5 }}
            />
            <Text style={{}}>Log Exercise</Text>
          </Button>
        </CardItem>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 8,
    flexGrow: 1
  },

  card: {
    padding: 8,
    height: 320
  },
  btn: {
    padding: 8,
    justifyContent: 'center',
    textAlign: 'center'
  }
});

export default Main;
