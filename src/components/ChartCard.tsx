import * as React from 'react';
import { Icon, Text, Container } from 'native-base';
import { BleStatus } from '../store/ble/types';
import { COLOR_RED } from '../colors';
import { connect } from 'react-redux';
import { AppState } from '../store';

import Chart from './Chart';

interface Props {
  status: BleStatus;
}

function ChartCard(props: Props) {
  if (props.status !== 'connected') {
    return (
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5
        }}>
        <Icon name="md-heart" style={{ fontSize: 64, color: COLOR_RED }} />
        <Text>ARGOS</Text>
      </Container>
    );
  }

  return (
    <Container
      style={{
        margin: 5
      }}>
      <Chart />
    </Container>
  );
}

export default connect((state: AppState) => ({
  status: state.ble.status
}))(ChartCard);
