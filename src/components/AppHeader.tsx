import React from 'react';
import { Header, Left, Button, Icon, Right, Body } from 'native-base';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

interface Props {
  onBackPress: () => void;
  children: any;
}

function AppHeader({ children, onBackPress }: Props) {
  return (
    <Header>
      <Left>
        <Button onPress={onBackPress} transparent>
          <Icon name="arrow-back" style={{ fontSize: 24 }} />
        </Button>
      </Left>
      <Body>{children}</Body>
      <Right />
    </Header>
  );
}

export default withNavigation(
  (props: Omit<Props, 'onBackPress'> & NavigationInjectedProps) => {
    const onBackPress = () => {
      props.navigation.goBack();
    };

    return <AppHeader onBackPress={onBackPress}>{props.children}</AppHeader>;
  }
);
