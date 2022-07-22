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
    <Box minH={'60vh'} mx="3rem" py="4rem">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <Heading as="h1" my="3rem">
          Metoda de plată
        </Heading>
        <form onSubmit={submitHandler}>
          <Box className="mb-3">
            <Radio
              borderColor={'#000'}
              type="radio"
              id="Cash"
              value="Cash"
              checked={paymentMethodName === 'Cash'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              Numerar la livrare
            </Radio>
          </Box>
          <Box className="mb-3">
            <Radio
              borderColor={'#000'}
              type="radio"
              id="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              Stripe
            </Radio>
          </Box>
          <Box mt="3">
            <Button bg={'brand.500'} type="submit">
              Continuă
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default PaymentMethodPage;
