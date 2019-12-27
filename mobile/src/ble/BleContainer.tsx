import * as React from 'react';
import { View } from 'native-base';
import {
  defaultService as bleService,
  scanAndConnect,
  setShouldSimulateFob,
  EcgMessage,
} from '../ble/service';
import { connect } from 'react-redux';
import { logEvent } from '../logging';
import {
  scanStart,
  scanFailed,
  connectStart,
  connectSuccess,
  connectFailed,
} from '../store/ble/actions';
import { AppState, AppDispatch } from '../store';
import { withApi, WithApiProps } from '../api/hoc';
import gql from 'graphql-tag';
import { useCreateReadingMutation } from '../generated/graphql';
import messaging from '@react-native-firebase/messaging';

const LOG_KEY_BLE_CNOTAINER = 'ble_container';

//let globalBufferSize = 0;
let globalBuffer: EcgMessage[] = [];
let bleId: string | null = null;

interface BleListenerInnerProps {
  userSub: string | null;
  userJwt: string | null;
  prefix: string | null;
  upload: (ecgBuffer: EcgMessage[]) => Promise<string | null>;
}

function BleListenerInner(props: BleListenerInnerProps) {
  const [createReading] = useCreateReadingMutation();

  React.useEffect(() => {
    // Reset global buffer everytime this effect occurs.
    globalBuffer = [];

    const removeListener = bleService.addOnValueListener(
      async (id, message) => {
        bleId = id;
        globalBuffer.push(message);

        const prefix = props.prefix;
        const tags = prefix ? [prefix] : [];

        if (globalBuffer.length === 25) {
          const copy = [...globalBuffer];
          globalBuffer = [];
          props.upload(copy).then(key => {
            if (key) {
              createReading({
                variables: {
                  input: {
                    uri: key,
                    patchBleId: bleId,
                    firmwareVersion: 'n/a',
                    tags,
                    sequence: -1,
                    uptimeMs: -1,
                  },
                },
              });
            }
          });
        }
      }
    );

    return removeListener;
  }, [createReading, props, props.prefix]);

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
  `,
};

const BleListener = withApi(
  connect(
    (state: AppState) => {
      const user = state.session.user;

      return {
        userSub: user ? user.sub : null,
        userJwt: user ? user.jwt : null,
        prefix: state.ble.readingPrefix,
      };
    },
    (dispatch: AppDispatch, ownProps: WithApiProps) => {
      return {
        upload: (ecgBuffer: EcgMessage[]) => {
          return (dispatch(async (_: any, getState: () => AppState) => {
            const state = getState();
            const user = state.session.user;

            let key: string | null = null;
            if (user && user.sub && user.jwt && bleId) {
              console.log('JWT', user.jwt);
              logEvent('payload_uploaded', {});
              key = await ownProps.api.ecg.upload(
                ecgBuffer,
                user.username,
                user.jwt,
                bleId
              );
            }

            return key;
          }) as unknown) as Promise<string | null>;
        },
      };
    }
  )(BleListenerInner)
);

interface Props {
  onMount: () => void;
  toggleLight: () => void;
}

function BleContainer(props: Props) {
  React.useEffect(() => {
    props.onMount();
  }, [props]);

  React.useEffect(() => {
    (async () => {
      const enabled = await messaging().hasPermission();
      if (enabled) {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log('TOKEN: ', fcmToken);
        } else {
          console.log('NO TOKEN');
          // user doesn't have a device token yet
        }

        console.log('REGISTERING CALLBACK');
        messaging().onMessage(message => {
          console.log('MESSAGE: ', message);
          props.toggleLight();
        });
      } else {
        console.log('DISABLED');
        try {
          await messaging().requestPermission();
          console.log('GOT PERMISSIONS');
          // User has authorised
        } catch (error) {
          console.log('ERROR GETTING PERMISSIONS.', error);
          // User has rejected permissions
        }
      }
    })();
  }, [props]);

  return <BleListener />;
}

export default connect(
  (state: AppState) => {
    setShouldSimulateFob(state.settings.simulateFob);

    return {};
  },
  (dispatch: AppDispatch) => {
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

        connectCompleted: ({ deviceId, firmwareVersion }) => {
          dispatch(connectSuccess(deviceId, firmwareVersion));
        },

        connectFailed: error => {
          dispatch(connectFailed());
          logEvent(LOG_KEY_BLE_CNOTAINER, { message: `${error}` });
        },

        listenFailed: () => {},
      });
    };
    return {
      onMount,
      toggleLight: () => {
        dispatch((_: AppDispatch, getState: () => AppState) => {
          const deviceId = getState().ble.deviceId;
          if (deviceId) {
            bleService.setLED(deviceId, 1, true);
          }
        });
      },
    };
  }
)(BleContainer);
