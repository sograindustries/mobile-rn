import * as React from 'react';
import { Input, Form, Item } from 'native-base';
import DeveloperOnly from './DeveloperOnly';
import { connect } from 'react-redux';
import { setReadingPrefix } from '../store/ble/actions';
import { setPrefix } from '../ble/service';

interface Props {
  onValueChange: (value: string) => void;
}

function PrefixAnnotationInput(props: Props) {
  return (
    <DeveloperOnly>
      <Form>
        <Item>
          <Input placeholder="Prefix" onChangeText={props.onValueChange} />
        </Item>
      </Form>
    </DeveloperOnly>
  );
}
export default connect(undefined, dispatch => {
  return {
    onValueChange: (value: string) => {
      setPrefix(value);
      dispatch(setReadingPrefix(value));
    }
  };
})(PrefixAnnotationInput);
