import * as React from 'react';
import { Input, Form, Item } from 'native-base';
import DeveloperOnly from './DeveloperOnly';
import { setPrefix } from '../ble/service';

function PrefixAnnotationInput() {
  const handleValueChange = (prefix: string) => {
    setPrefix(prefix);
  };

  return (
    <DeveloperOnly>
      <Form>
        <Item>
          <Input placeholder="Prefix" onChangeText={handleValueChange} />
        </Item>
      </Form>
    </DeveloperOnly>
  );
}
export default PrefixAnnotationInput;
