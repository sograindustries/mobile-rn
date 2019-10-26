"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var native_base_1 = require("native-base");
var react_native_elements_1 = require("react-native-elements");
var DoctorScreen = function () {
    return (<native_base_1.View>
      <native_base_1.Content padder>
        <native_base_1.View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
          <react_native_elements_1.Avatar rounded size="xlarge" source={{
        uri: 'https://pbs.twimg.com/profile_images/781206386982031360/sC4SS3V2_400x400.jpg'
    }}/>
          <native_base_1.H1>Dwight Schrute, M.D.</native_base_1.H1>
        </native_base_1.View>

        <native_base_1.Card style={{ paddingBottom: 10, marginTop: 25 }}>
          <native_base_1.CardItem header>
            <native_base_1.Icon name="calendar"/>
            <native_base_1.Text>Next Appointment</native_base_1.Text>
          </native_base_1.CardItem>
          <native_base_1.CardItem button onPress={function () { return alert('This is Card Body'); }}>
            <native_base_1.Body>
              <native_base_1.H3>1:30pm - Friday, November 30th</native_base_1.H3>
              <native_base_1.Text>319 N Lafayette St, South Lyon, MI 48178</native_base_1.Text>
            </native_base_1.Body>
          </native_base_1.CardItem>
        </native_base_1.Card>

        <native_base_1.View style={{ marginTop: 10 }}>
          <native_base_1.Button block iconLeft={true} style={{ marginTop: 10 }} danger>
            <native_base_1.Icon name="pulse"/>
            <native_base_1.Text>Share ECG</native_base_1.Text>
          </native_base_1.Button>

          <native_base_1.Button block iconLeft={true} style={{ marginTop: 10 }}>
            <native_base_1.Icon name="call"/>
            <native_base_1.Text>Call</native_base_1.Text>
          </native_base_1.Button>
        </native_base_1.View>
      </native_base_1.Content>
    </native_base_1.View>);
};
exports.default = DoctorScreen;
