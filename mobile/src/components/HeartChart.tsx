import * as React from 'react';
import Spinner from 'react-native-spinkit';
import Chart from './Chart';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { COLOR_GREEN2 } from '../colors';
import { View } from 'native-base';

interface HeartChartProps {
  isLoading: boolean;
}
function HeartChart(props: HeartChartProps) {
  if (props.isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Spinner
          size={100}
          isVisible={true}
          type="ChasingDots"
          color={COLOR_GREEN2}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 30,
        paddingBottom: 30,
        justifyContent: 'center'
      }}>
      <Chart />
    </View>
  );
}
export default connect((state: AppState) => ({
  isLoading: state.ble.status !== 'connected'
}))(HeartChart);
