import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Heading, Radio } from '@chakra-ui/react';

function PaymentMethodPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'PayPal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });

    localStorage.setItem('paymentMethod', paymentMethodName);

    navigate('/placeorder');
  };

  return (
    <Box mx="3rem" my="4rem">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Box>
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <Heading as="h1" my="3">
          Payment Method
        </Heading>
        <form onSubmit={submitHandler}>
          <Box className="mb-3">
            <Radio
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Box>
          <Box className="mb-3">
            <Radio
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Box>
          <Box className="mb-3">
            <Button type="submit">Continue</Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default PaymentMethodPage;
