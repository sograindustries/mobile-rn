import React from 'react';
import { LineChart } from 'react-native-svg-charts';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { COLOR_RED } from '../colors';
import { defaultService as bleService } from '../ble/service';
import mock from '../mock';

interface Props {
  isConnected: boolean;
}

const Chart = (_: Props) => {
  const [data, setData] = React.useState<number[]>([]);

  /*
  React.useEffect(() => {
    setData(mock.slice(0, 300 * 3));
  }, []);
  */

  React.useEffect(() => {
    const removeListener = bleService.addOnValueListener((_, value) => {
      setData(prevState => {
        return prevState
          .concat(Array.from(value))
          .splice(Math.max(prevState.length - 900, 0));
      });
    });
    return removeListener;
  });

  return (
    <LineChart
      style={{ height: 200 }}
      data={data}
      svg={{ stroke: COLOR_RED, strokeWidth: 2 }}
      contentInset={{ top: 20, bottom: 20 }}></LineChart>
  );
};

export default connect((state: AppState) => ({
  isConnected: state.ble.status === 'connected'
}))(Chart);
