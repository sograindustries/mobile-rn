"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var native_base_1 = require("native-base");
var Footer = function (props) {
    return (<native_base_1.Footer>
      <native_base_1.FooterTab>
        <native_base_1.Button onPress={props.onProfilePress}>
          <native_base_1.Icon name="md-person"/>
          <native_base_1.Text>Profile</native_base_1.Text>
        </native_base_1.Button>
      </native_base_1.FooterTab>

      <native_base_1.FooterTab>
        <native_base_1.Button onPress={props.onSummaryPress}>
          <native_base_1.Icon name="pulse"/>
          <native_base_1.Text>Live</native_base_1.Text>
        </native_base_1.Button>
      </native_base_1.FooterTab>

      <native_base_1.FooterTab>
        <native_base_1.Button onPress={props.onDoctorPress}>
          <native_base_1.Icon name="medkit"/>
          <native_base_1.Text>Doctor</native_base_1.Text>
        </native_base_1.Button>
      </native_base_1.FooterTab>

      <native_base_1.FooterTab>
        <native_base_1.Button onPress={props.onSettingsPress}>
          <native_base_1.Icon name="settings"/>
          <native_base_1.Text>Settings</native_base_1.Text>
        </native_base_1.Button>
      </native_base_1.FooterTab>
    </native_base_1.Footer>);
};
exports.default = Footer;
