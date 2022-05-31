import { Spinner } from '@chakra-ui/react';
import React from 'react';

function LoadingBox() {
  return (
    <>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      Loading...
    </>
  );
}

export default LoadingBox;
