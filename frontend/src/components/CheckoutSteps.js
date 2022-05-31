import React from 'react';
import { Box } from '@chakra-ui/react';

export default function CheckoutSteps(props) {
  return (
    <Box className="checkout-steps">
      <Box className={props.step1 ? 'active' : ''}>Sign-In</Box>
      <Box className={props.step2 ? 'active' : ''}>Shipping</Box>
      <Box className={props.step3 ? 'active' : ''}>Payment</Box>
      <Box className={props.step4 ? 'active' : ''}>Place Order</Box>
    </Box>
  );
}
