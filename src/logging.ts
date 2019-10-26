import { firebase } from '@react-native-firebase/analytics';
import { __store } from './App';
import { addLogItem } from './store/logging/actions';

export const logEvent: (
  name: string,
  params: Object,
  localOnly?: boolean
) => Promise<void> = async (name, params, localOnly?: boolean) => {
  if (__store) {
    __store.dispatch(
      addLogItem({
        ts: new Date(),
        value: `${name}: ${JSON.stringify(params)}`
      })
    );
  }
  console.log(`${name}: ${JSON.stringify(params)}`);

  if (!localOnly) {
    firebase.analytics().logEvent(name, params);
  }
};
