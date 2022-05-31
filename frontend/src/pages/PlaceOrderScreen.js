import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../Utils';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import {
  Box,
  Button,
  Flex,
  Heading,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };

    default:
      return state;
  }
};

function PlaceOrderScreen() {
  const navigate = useNavigate();
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; //123.1234 -> 123.12

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);
  return (
    <Box mx="3rem" my="4rem">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <Heading as="h1" my="3">
        Preview Order
      </Heading>
      <Flex>
        <Box md={8}>
          <Box className="mb-3">
            <Box>
              <Heading as="h3">Shipping</Heading>
              <p>
                <b>Name: </b> {cart.shippingAddress.fullName} <br />
                <b>Address: </b> {cart.shippingAddress.address},{' '}
                {cart.shippingAddress.city},{cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}
              </p>
              <Link to="/shipping">Edit</Link>
            </Box>
          </Box>

          <Box className="mb-3">
            <Box>
              <Heading as="h3">Payment</Heading>
              <p>
                <b>Method: </b> {cart.paymentMethod} <br />
              </p>
              <Link to="/payment">Edit</Link>
            </Box>
          </Box>

          <Box className="mb-3">
            <Box>
              <Heading as="h3">Items</Heading>
              <UnorderedList variant="flush">
                {cart.cartItems.map((item) => (
                  <ListItem key={item._id}>
                    <Box className="align-items-center">
                      <Box md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        />
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Box>
                      <Box md={3}>
                        <span>{item.quantity}</span>
                      </Box>
                      <Box md={3}>{item.price}&euro;</Box>
                    </Box>
                  </ListItem>
                ))}
              </UnorderedList>
              <Link to="/cart">Edit</Link>
            </Box>
          </Box>
        </Box>
        <Box md={4}>
          <Box>
            <Box>
              <Heading as="h3">Order Summary</Heading>
              <UnorderedList variant="flush">
                <ListItem>
                  <Box>
                    <Box>Items</Box>
                    <Box>{cart.itemsPrice.toFixed(2)}&euro;</Box>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box>
                    <Box>Shipping</Box>
                    <Box>{cart.shippingPrice.toFixed(2)}&euro;</Box>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box>
                    <Box>Tax</Box>
                    <Box>{cart.taxPrice.toFixed(2)}&euro;</Box>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box>
                    <Box>
                      <b>Order Total</b>
                    </Box>
                    <Box>
                      <b>{cart.totalPrice.toFixed(2)}&euro;</b>
                    </Box>
                  </Box>
                </ListItem>
                <ListItem>
                  <Box className="d-grid">
                    <Button
                      type="button"
                      disabled={cart.cartItems.length === 0}
                      onClick={placeOrderHandler}
                    >
                      Place Order
                    </Button>
                  </Box>
                  {loading && <LoadingBox></LoadingBox>}
                </ListItem>
              </UnorderedList>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default PlaceOrderScreen;
