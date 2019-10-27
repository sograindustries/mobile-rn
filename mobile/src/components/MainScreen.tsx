import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ScrollView } from 'react-navigation';
import ConnectedFooter from '../containers/ConnectedFooter';
import { Tab } from '../store/navigation/types';
import { connect } from 'react-redux';
import { AppState } from '../store';
import StatsScreen from '../stats/components/StatsScreen';
import DoctorScreen from './DoctorScreen';
import SettingsScreen from './SettingsScreen';
import { View, Text } from 'native-base';

function renderScreen(tab: Tab) {
  switch (tab) {
    case 'home':
      return (
        <View>
          <Text>Home</Text>
        </View>
      );
    case 'summary': {
      return <StatsScreen />;
    }
    case 'doctor':
      return <DoctorScreen />;
    case 'settings':
      return <SettingsScreen />;
    default:
      return <></>;
  }
}

interface Props {
  tab: Tab;
}

const MainScreen = ({ tab }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flexGrow: 1, backgroundColor: '#F7F7FF' }}
        contentContainerStyle={{ flexGrow: 1 }}>
        {renderScreen(tab)}
      </ScrollView>
      <ConnectedFooter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#FFFFFF'
  }
});

export default connect((state: AppState) => ({
  tab: state.navigation
}))(MainScreen);
