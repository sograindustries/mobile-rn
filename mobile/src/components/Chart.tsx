import React from 'react';
import { LineChart } from 'react-native-svg-charts';
import { connect } from 'react-redux';
import { AppState, AppDispatch } from '../store';
import { COLOR_RED } from '../colors';
import { defaultService as bleService } from '../ble/service';
import { View, Button, Text } from 'native-base';
import { WithBleProps, withBle } from '../ble/hoc';
import { setFiltering } from '../store/ble/actions';
import DeveloperOnly from './DeveloperOnly';

interface Props {
  isConnected: boolean;
}

const Chart = (_: Props) => {
  const [data, setData] = React.useState<number[]>([]);

  React.useEffect(() => {
    const removeListener = bleService.addOnValueListener((_, message) => {
      setData(prevState => {
        return prevState
          .concat(Array.from(message.payload))
          .splice(Math.max(prevState.length - 900, 0));
      });
    });
    return removeListener;
  }, []);

  return (
    <View style={{ position: 'relative' }}>
      <LineChart
        style={{ height: 200 }}
        data={data}
        svg={{ stroke: COLOR_RED, strokeWidth: 2 }}
        contentInset={{ top: 20, bottom: 20 }}></LineChart>
      <View style={{ position: 'absolute', right: 0, bottom: 0 }}>
        <FilterButton />
      </View>
    </View>
  );
};

interface FilterButtonProps {
  isFilteringEnabled: boolean;
  onFilteringValueChanged: (isEnabled: boolean) => void;
}

function FilterButtonInner(props: FilterButtonProps) {
  return (
    <DeveloperOnly>
      <Button
        style={{ margin: 5 }}
        onPress={() => {
          props.onFilteringValueChanged(!props.isFilteringEnabled);
        }}>
        <Text>Filter is {props.isFilteringEnabled ? 'ON' : 'OFF'}</Text>
      </Button>
    </DeveloperOnly>
  );
}

const FilterButton = withBle(
  connect(
    (state: AppState) => {
      console.log('FITERRRRR:', state.ble.isFilteringEnabled);
      return {
        isFilteringEnabled: state.ble.isFilteringEnabled
      };
    },
    (dispatch: AppDispatch, ownProps: WithBleProps) => {
      return {
        onFilteringValueChanged: (isEnabled: boolean) => {
          dispatch((innerDispatch: AppDispatch, getState: () => AppState) => {
            const deviceId = getState().ble.deviceId;
            if (deviceId) {
              ownProps.ble.setFiltering(deviceId, isEnabled).then(() => {
                innerDispatch(setFiltering(isEnabled));
              });
            }
          });
        }
      };
    }
  )(FilterButtonInner)
);

export default connect((state: AppState) => ({
  isConnected: state.ble.status === 'connected'
}))(Chart);
