import * as React from 'react';
import { Content } from 'native-base';
import { View } from 'react-native';
import BleIndicator from '../../ble/BleIndicator';
import Chart from '../../components/Chart';

const StatsCard = () => {
  return (
    <>
      <Content padder>
        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
          <View style={{ width: 20 }} />
          <BleIndicator />
        </View>
        <Chart />
      </Content>
    </>
  );
};

const StatsScreen = () => {
  return (
    <View>
      <StatsCard />
    </View>
  );
};

export default StatsScreen;
