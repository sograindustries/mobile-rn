import * as React from 'react';
import { BleService, defaultService } from './service';

export interface WithBleProps {
  ble: BleService;
}

export const withBle = <P extends {}>(
  Component: React.ComponentType<P & WithBleProps>
) =>
  class WithApi extends React.Component<P, {}> {
    render() {
      return <Component {...this.props} ble={defaultService} />;
    }
  };
