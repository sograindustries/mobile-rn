import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Content, Container, Card } from 'native-base';
import PatchConnectionButton from './PatchConnectionButton';
import ChartCard from './ChartCard';
import BatteryCard from './BatteryCard';
import ProfileCard from './ProfileCard';
import { COLOR_WHITE } from '../colors';
import DeveloperCard from './DeveloperCard';
import ShareWithDoctorCard from './ShareWithDoctorCard';
import LogsCard from './LogsCard';

function MainGrid() {
  return (
    <Content style={styles.content}>
      <Container style={styles.row}>
        <Card style={styles.card}>
          <ChartCard />
        </Card>
      </Container>
      <Container style={styles.row}>
        <Card style={styles.card}>
          <PatchConnectionButton />
        </Card>
        <Card style={styles.card}>
          <BatteryCard />
        </Card>
      </Container>
      <Container style={styles.row}>
        <Card style={styles.card}>
          <LogsCard />
        </Card>
      </Container>
      <Container style={styles.row}>
        <Card style={styles.card}>
          <ProfileCard />
        </Card>
        <Card style={styles.card}>
          <ShareWithDoctorCard />
        </Card>
      </Container>
      <Container style={styles.row}>
        <Card style={styles.card}>
          <DeveloperCard />
        </Card>
        <Card style={{ ...styles.card, opacity: 0 }}></Card>
      </Container>
    </Content>
  );
}

// <Card style={{ ...styles.card, opacity: 0 }}></Card>

const styles = StyleSheet.create({
  content: {
    paddingLeft: 5,
    paddingRight: 5
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    height: 240
  },
  card: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: COLOR_WHITE,
    borderRadius: 10
  }
});

export default MainGrid;
