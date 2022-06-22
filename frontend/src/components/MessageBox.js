import { Alert, AlertIcon, Box } from '@chakra-ui/react';
import React from 'react';

function MessageBox(props) {
  return (
    <Box w="full" h={'50px'}>
      {' '}
      <Alert status={props.status || 'info'}>
        <AlertIcon />
        {props.children}
      </Alert>
    </Box>
  );
}

export default MessageBox;
