import * as React from 'react';
import { StyleSheet, SafeAreaView, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import {
  Button,
  View,
  Text,
  Container,
  Icon,
  Input,
  Form,
  Item
} from 'native-base';
import * as Animatable from 'react-native-animatable';
import BleIndicator from '../ble/BleIndicator';

type EmptyCallback = () => void;

interface PartialSwiper {
  scrollBy: (x: number) => void;
}

const scrollBy = (x: number) => (swiper: PartialSwiper | null) => {
  if (swiper) {
    swiper.scrollBy(x);
  }
};
const onNextPress = scrollBy(1);

const Welcome = ({ onNextPress }: { onNextPress: () => void }) => {
  return (
    <>
      <Container
        style={{
          flexGrow: 1
        }}>
        <BleIndicator />
        <Container style={styles.heartIconContainer}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.argosText}>ARGOS</Text>
          <Animatable.Text
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite">
            <Icon name="md-heart" style={styles.heartIcon} />
          </Animatable.Text>
        </Container>
      </Container>

      <Button onPress={onNextPress} rounded={true} block>
        <Text>Next</Text>
      </Button>
    </>
  );
};

const HowItWorks = ({ onNextPress }: { onNextPress: EmptyCallback }) => {
  const [showOrderScreen, setShowOrderScreen] = React.useState(false);

  if (showOrderScreen) {
    return (
      <Container
        style={{
          flexGrow: 1
        }}>
        <Text
          style={{
            fontSize: 50,
            alignSelf: 'stretch',
            textAlign: 'left'
          }}>
          Join our{' '}
        </Text>
        <Text
          style={{
            fontSize: 70,
            fontWeight: '800',
            alignSelf: 'stretch',
            textAlign: 'left'
          }}>
          early access
        </Text>
        <Text style={{ fontSize: 50, alignSelf: 'stretch', textAlign: 'left' }}>
          list.
        </Text>

        <Icon
          name="ios-people"
          style={{ fontSize: 120, textAlign: 'center', marginTop: 30 }}
        />

        <Form style={{ marginTop: 30 }}>
          <Item>
            <Input placeholder="Email" />
          </Item>
        </Form>

        <Button
          onPress={() => {
            setShowOrderScreen(false);
          }}
          rounded={true}
          block
          success>
          <Text>Join</Text>
        </Button>
        <Button
          onPress={() => {
            setShowOrderScreen(false);
          }}
          danger
          transparent
          block
          style={{ marginTop: 12 }}>
          <Text>Not Now</Text>
        </Button>
      </Container>
    );
  }

  return (
    <>
      <Container
        style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.welcomeText}>
          Place the Argos Patch as indicated below
        </Text>
        <Image source={require('../../assets/tutorial_monitor.png')} />
      </Container>
      <Button onPress={onNextPress} rounded={true} block>
        <Text>Next</Text>
      </Button>
      <Button
        onPress={() => {
          setShowOrderScreen(true);
        }}
        bordered
        block
        danger
        style={{ marginTop: 12 }}>
        <Text>I Don't Have One</Text>
      </Button>
    </>
  );
};

const FirstSessionScreen = () => {
  let swiper: PartialSwiper | null = null;

  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        scrollEnabled={false}
        ref={spr => {
          swiper = (spr as unknown) as PartialSwiper;
        }}
        loop={false}>
        <View style={styles.view}>
          <Welcome
            onNextPress={() => {
              onNextPress(swiper);
            }}
          />
        </View>
        <View style={styles.view}>
          <HowItWorks
            onNextPress={() => {
              onNextPress(swiper);
            }}
          />
        </View>
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF'
  },
  view: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 35,
    paddingBottom: 45
  },
  heartIconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },
  heartIcon: {
    fontSize: 280,
    color: '#FF4C49'
  },
  welcomeText: {
    fontSize: 32,
    textAlign: 'center'
  },
  argosText: {
    fontSize: 90,
    fontWeight: '700',
    textAlign: 'center'
  }
});

export default FirstSessionScreen;
