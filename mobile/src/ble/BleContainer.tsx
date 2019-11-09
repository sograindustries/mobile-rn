import * as React from 'react';
import { View } from 'native-base';
import {
  defaultService as bleService,
  scanAndConnect,
  setShouldSimulateFob
} from '../ble/service';
import { connect } from 'react-redux';
import { logEvent } from '../logging';
import {
  scanStart,
  scanFailed,
  connectStart,
  connectSuccess,
  connectFailed
} from '../store/ble/actions';
import { AppState, AppDispatch } from '../store';
import { withApi, WithApiProps } from '../api/hoc';
import gql from 'graphql-tag';
import { useCreateReadingMutation } from '../generated/graphql';

const LOG_KEY_BLE_CNOTAINER = 'ble_container';

//let globalBufferSize = 0;
let globalBuffer: number[] = [];
let bleId: string | null = null;

interface BleListenerInnerProps {
  userSub: string | null;
  userJwt: string | null;
  upload: () => Promise<string | null>;
}

function BleListenerInner(props: BleListenerInnerProps) {
  const [createReading] = useCreateReadingMutation();

  React.useEffect(() => {
    bleService.addOnValueListener(async (id, value) => {
      bleId = id;
      globalBuffer = globalBuffer.concat([...value]);
    });

    setInterval(async () => {
      if (props.userSub && props.userJwt) {
        const key = await props.upload();

        console.log('KEY!!!!', key);
        if (key) {
          createReading({
            variables: {
              input: {
                uri: key,
                patchBleId: bleId
              }
            }
          });
        }
      }
    }, 10000);
  }, []);

  return <View />;
}

BleListenerInner.mutations = {
  createReading: gql`
    mutation CreateReading($input: CreateReadingInput!) {
      createReading(input: $input) {
        reading {
          uri
        }
      }
    }
  `
};

const BleListener = withApi(
  connect(
    (state: AppState) => {
      const user = state.session.user;

      return {
        userSub: user ? user.sub : null,
        userJwt: user ? user.jwt : null
      };
    },
    (dispatch: AppDispatch, ownProps: WithApiProps) => {
      return {
        upload: () => {
          return (dispatch(async (_: any, getState: () => AppState) => {
            const state = getState();
            const user = state.session.user;

            let key: string | null = null;
            if (user && user.sub && user.jwt && bleId) {
              logEvent('payload_uploaded', {});
              key = await ownProps.api.ecg.upload(
                globalBuffer,
                user.username,
                user.jwt,
                bleId
              );
            }

            globalBuffer = [];
            // globalBufferSize = 0;

            return key;
          }) as unknown) as Promise<string | null>;
        }
      };
    }
  )(BleListenerInner)
);

interface Props {
  onMount: () => void;
}

function BleContainer(props: Props) {
  React.useEffect(() => {
    props.onMount();
  }, []);

  return <BleListener />;
}

export default connect(
  (state: AppState) => {
    setShouldSimulateFob(state.settings.simulateFob);

    return {};
  },
  dispatch => {
    const onMount = async () => {
      scanAndConnect(bleService, {
        scanWillStart: () => {
          dispatch(scanStart());
        },
        scanCompleted: () => {
          logEvent(LOG_KEY_BLE_CNOTAINER, { message: 'scan completed.' });
        },
        scanFailed: error => {
          dispatch(scanFailed());
          logEvent(LOG_KEY_BLE_CNOTAINER, { message: `${error}` });
        },

        connectWillStart: () => {
          dispatch(connectStart());
        },

        connectCompleted: deviceId => {
          dispatch(connectSuccess(deviceId));
        },

        connectFailed: error => {
          dispatch(connectFailed());
          logEvent(LOG_KEY_BLE_CNOTAINER, { message: `${error}` });
        },

        listenFailed: () => {}
      });
    };
    return {
      onMount
    };
  }
)(BleContainer);
