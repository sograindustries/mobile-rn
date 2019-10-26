"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var react_native_swiper_1 = require("react-native-swiper");
var native_base_1 = require("native-base");
var Animatable = require("react-native-animatable");
var BleIndicator_1 = require("../ble/BleIndicator");
var scrollBy = function (x) { return function (swiper) {
    if (swiper) {
        swiper.scrollBy(x);
    }
}; };
var onNextPress = scrollBy(1);
var Welcome = function (_a) {
    var onNextPress = _a.onNextPress;
    return (<>
      <native_base_1.Container style={{
        flexGrow: 1
    }}>
        <BleIndicator_1.default />
        <native_base_1.Container style={styles.heartIconContainer}>
          <native_base_1.Text style={styles.welcomeText}>Welcome to</native_base_1.Text>
          <native_base_1.Text style={styles.argosText}>ARGOS</native_base_1.Text>
          <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite">
            <native_base_1.Icon name="md-heart" style={styles.heartIcon}/>
          </Animatable.Text>
        </native_base_1.Container>
      </native_base_1.Container>

      <native_base_1.Button onPress={onNextPress} rounded={true} block>
        <native_base_1.Text>Next</native_base_1.Text>
      </native_base_1.Button>
    </>);
};
var HowItWorks = function (_a) {
    var onNextPress = _a.onNextPress;
    var _b = React.useState(false), showOrderScreen = _b[0], setShowOrderScreen = _b[1];
    if (showOrderScreen) {
        return (<native_base_1.Container style={{
            flexGrow: 1
        }}>
        <native_base_1.Text style={{
            fontSize: 50,
            alignSelf: 'stretch',
            textAlign: 'left'
        }}>
          Join our{' '}
        </native_base_1.Text>
        <native_base_1.Text style={{
            fontSize: 70,
            fontWeight: '800',
            alignSelf: 'stretch',
            textAlign: 'left'
        }}>
          early access
        </native_base_1.Text>
        <native_base_1.Text style={{ fontSize: 50, alignSelf: 'stretch', textAlign: 'left' }}>
          list.
        </native_base_1.Text>

        <native_base_1.Icon name="ios-people" style={{ fontSize: 120, textAlign: 'center', marginTop: 30 }}/>

        <native_base_1.Form style={{ marginTop: 30 }}>
          <native_base_1.Item>
            <native_base_1.Input placeholder="Email"/>
          </native_base_1.Item>
        </native_base_1.Form>

        <native_base_1.Button onPress={function () {
            setShowOrderScreen(false);
        }} rounded={true} block success>
          <native_base_1.Text>Join</native_base_1.Text>
        </native_base_1.Button>
        <native_base_1.Button onPress={function () {
            setShowOrderScreen(false);
        }} danger transparent block style={{ marginTop: 12 }}>
          <native_base_1.Text>Not Now</native_base_1.Text>
        </native_base_1.Button>
      </native_base_1.Container>);
    }
    return (<>
      <native_base_1.Container style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
        <native_base_1.Text style={styles.welcomeText}>
          Place the Argos Patch as indicated below
        </native_base_1.Text>
        <react_native_1.Image source={require('../../assets/tutorial_monitor.png')}/>
      </native_base_1.Container>
      <native_base_1.Button onPress={onNextPress} rounded={true} block>
        <native_base_1.Text>Next</native_base_1.Text>
      </native_base_1.Button>
      <native_base_1.Button onPress={function () {
        setShowOrderScreen(true);
    }} bordered block danger style={{ marginTop: 12 }}>
        <native_base_1.Text>I Don't Have One</native_base_1.Text>
      </native_base_1.Button>
    </>);
};
var FirstSessionScreen = function () {
    var swiper = null;
    return (<react_native_1.SafeAreaView style={styles.container}>
      <react_native_swiper_1.default scrollEnabled={false} ref={function (spr) {
        swiper = spr;
    }} loop={false}>
        <native_base_1.View style={styles.view}>
          <Welcome onNextPress={function () {
        onNextPress(swiper);
    }}/>
        </native_base_1.View>
        <native_base_1.View style={styles.view}>
          <HowItWorks onNextPress={function () {
        onNextPress(swiper);
    }}/>
        </native_base_1.View>
      </react_native_swiper_1.default>
    </react_native_1.SafeAreaView>);
};
var styles = react_native_1.StyleSheet.create({
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
exports.default = FirstSessionScreen;
