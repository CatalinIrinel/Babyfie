import React from 'react';
import { Box } from '@chakra-ui/react';

export default function CheckoutSteps(props) {
  return (
    <Box
      className="checkout-steps"
      display={'flex'}
      w="full"
      justifyContent={'space-evenly'}
    >
      <Box w="25%" className={props.step1 ? 'active' : ''}>
        Logare
      </Box>
      <Box w="25%" className={props.step2 ? 'active' : ''}>
        Livrare
      </Box>
      <Box w="25%" className={props.step3 ? 'active' : ''}>
        Metoda de plată
      </Box>
      <Box w="25%" className={props.step4 ? 'active' : ''}>
        Plasează comanda
      </Box>
    </Box>
  );
}
