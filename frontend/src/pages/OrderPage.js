import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate, Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../Utils';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };

    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '', order: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false };
    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    default:
      return state;
  }
}

function OrderPage() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
    order: {},
    successPay: false,
    loadingPay: false,
  });

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Order is paid');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }

  function onError(err) {
    toast.error(getError(err));
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate('/login');
    }
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'EUR',
          },
        });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      };
      loadPaypalScript();
    }
  }, [
    order,
    userInfo,
    orderId,
    navigate,
    paypalDispatch,
    successPay,
    successDeliver,
  ]);

  async function deliverOrderHandler() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' });
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'DELIVER_SUCCESS', payload: data });
      toast.success('Order is delivered');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'DELIVER_FAIL' });
    }
  }

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <Box
      minH={'60vh'}
      pb="3rem"
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <Heading as="h1" my="3rem">
        Order {userInfo.name}
      </Heading>
      <Flex maxW="1100px" w="100%" justifyContent={'space-between'}>
        <Box w="70%">
          <Box mb="2rem" p="1rem" border={'1px solid #000'}>
            <Heading mb="1rem" as="h2">
              Shipping
            </Heading>
            <Text mb="3">
              <strong>Name:</strong> {order.shippingAddress.fullName} <br />
              <strong>Address: </strong> {order.shippingAddress.address},{' '}
              {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country}
            </Text>
            {order.isDelivered ? (
              <MessageBox status="success">
                Delivered at {order.deliveredAt}
              </MessageBox>
            ) : (
              <MessageBox status="error">Not Delivered</MessageBox>
            )}
          </Box>
          <Box mb="2rem" p="1rem" border={'1px solid #000'}>
            <Heading mb="1rem" as="h2">
              Payment
            </Heading>
            <Text mb="3">
              <strong>Method</strong> {order.paymentMethod}
            </Text>
            {order.isPaid ? (
              <MessageBox status="success">Paid at {order.paidAt}</MessageBox>
            ) : (
              <MessageBox status="error">Not Paid</MessageBox>
            )}
          </Box>
          <Box mb="2rem" p="1rem" border={'1px solid #000'}>
            <Heading mb="1rem" as="h2">
              Items
            </Heading>
            <UnorderedList margin={'0'} listStyleType={'none'} px={'1rem'}>
              {order.orderItems.map((item) => (
                <ListItem key={item._id} mb={'2rem'}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    mb="3"
                  >
                    <Box w="60%" display={'flex'} alignItems={'center'}>
                      <Image
                        boxSize={'80px'}
                        src={item.image}
                        alt={item.name}
                        mr="3"
                      />
                      <Link to={`/product/${item.slug}`}>
                        <Text textDecoration={'underline'}>
                          <LinkIcon /> {item.name}
                        </Text>
                      </Link>
                    </Box>
                    <Box w="20%">
                      <span>{item.quantity}</span>
                    </Box>
                    <Box w="20%">{item.price} &euro;</Box>
                  </Box>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Box>
        <Box>
          <Box mb="2rem" p="1rem" border={'1px solid #000'}>
            <Heading mb="1rem" as="h2">
              Order Summary
            </Heading>
            <UnorderedList
              w={'100%'}
              listStyleType={'none'}
              margin={'0'}
              px={'1rem'}
            >
              <ListItem
                display={'flex'}
                justifyContent={'space-between'}
                mb={'1rem'}
                borderBottom={'1px solid gray'}
              >
                <Text>Items</Text>
                <Text>{order.itemsPrice.toFixed(2)} &euro;</Text>
              </ListItem>
              <ListItem
                display={'flex'}
                justifyContent={'space-between'}
                mb={'1rem'}
                borderBottom={'1px solid gray'}
              >
                <Text>Shipping</Text>
                <Text>{order.shippingPrice.toFixed(2)} &euro;</Text>
              </ListItem>
              <ListItem
                display={'flex'}
                justifyContent={'space-between'}
                mb={'1rem'}
                borderBottom={'1px solid gray'}
              >
                <Text>Tax</Text>
                <Text>{order.taxPrice.toFixed(2)} &euro;</Text>
              </ListItem>
              <ListItem
                display={'flex'}
                justifyContent={'space-between'}
                mb={'1rem'}
                borderBottom={'1px solid gray'}
              >
                <Text>
                  <strong>Order Total</strong>
                </Text>
                <Text>{order.totalPrice.toFixed(2)} &euro;</Text>
              </ListItem>
              {!order.isPaid && (
                <ListItem>
                  {isPending ? (
                    <LoadingBox />
                  ) : (
                    <div>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  )}
                  {loadingPay && <LoadingBox></LoadingBox>}
                </ListItem>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListItem>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  <Box>
                    <Button type="button" onClick={deliverOrderHandler}>
                      Deliver Order
                    </Button>
                  </Box>
                </ListItem>
              )}
            </UnorderedList>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default OrderPage;
