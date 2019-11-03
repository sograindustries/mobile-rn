import * as React from 'react';
import {
  Content,
  Text,
  View,
  Button,
  Icon,
  Card,
  CardItem,
  Body,
  H1,
  H3
} from 'native-base';
import { Avatar } from 'react-native-elements';

const DoctorScreen = () => {
  return (
    <View>
      <Content padder>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Avatar
            rounded
            size="xlarge"
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/781206386982031360/sC4SS3V2_400x400.jpg'
            }}
          />
          <H1>Dwight Schrute, M.D.</H1>
        </View>

        <Card style={{ paddingBottom: 10, marginTop: 25 }}>
          <CardItem header>
            <Icon name="calendar" />
            <Text>Next Appointment</Text>
          </CardItem>
          <CardItem button onPress={() => alert('This is Card Body')}>
            <Body>
              <H3>1:30pm - Friday, November 30th</H3>
              <Text>319 N Lafayette St, South Lyon, MI 48178</Text>
            </Body>
          </CardItem>
        </Card>

        <View style={{ marginTop: 10 }}>
          <Button block iconLeft={true} style={{ marginTop: 10 }} danger>
            <Icon name="pulse" />
            <Text>Share ECG</Text>
          </Button>

          <Button block iconLeft={true} style={{ marginTop: 10 }}>
            <Icon name="call" />
            <Text>Call</Text>
          </Button>
        </View>
      </Content>
    </View>
  );
};

export default DoctorScreen;
