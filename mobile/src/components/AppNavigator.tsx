import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen';
import { createAppContainer } from 'react-navigation';
import ProfileScreen from './ProfileScreen';

export const SCREEN_KEY_HOME = 'HOME';
export const SCREEN_KEY_PROFILE = 'PROFILE';

const AppNavigator = createStackNavigator(
  {
    [SCREEN_KEY_HOME]: {
      screen: HomeScreen
    },
    [SCREEN_KEY_PROFILE]: {
      screen: ProfileScreen
    }
  },
  { headerMode: 'none' }
);

export default createAppContainer(AppNavigator);
