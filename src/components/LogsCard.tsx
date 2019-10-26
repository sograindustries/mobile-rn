import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { LogItem } from '../store/logging/types';
import { DeepReadonly } from 'utility-types';

interface Props {
  logs: DeepReadonly<LogItem[]>;
}

function LogsCard(props: Props) {
  return (
    <Container style={styles.btn}>
      <Content>
        {props.logs.map((item, i) => {
          const dateStr = `${item.ts.getHours()}:${item.ts.getMinutes()}:${item.ts.getSeconds()}:${item.ts.getMilliseconds()}`;
          return (
            <Text style={{ color: 'white' }} key={i}>
              [LOG {dateStr}] : {item.value}
            </Text>
          );
        })}
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  btn: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  }
});

export default connect((state: AppState) => ({
  logs: state.logging.logs
}))(LogsCard);
