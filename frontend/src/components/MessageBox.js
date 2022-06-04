import { Alert, AlertIcon } from '@chakra-ui/react';
import React from 'react';

function MessageBox(props) {
  return (
    <Alert status={props.status || 'info'}>
      <AlertIcon />
      {props.children}
    </Alert>
  );
}

export default MessageBox;
