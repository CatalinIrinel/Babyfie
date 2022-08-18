import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate, Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../Utils';
// import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
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
import { BsCreditCardFill } from 'react-icons/bs';

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
      // loadingPay,
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

  // function onError(err) {
  //   toast.error(getError(err));
  // }

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
    }
  }, [order, userInfo, orderId, navigate, successPay, successDeliver]);

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

  const checkoutSession = async (orderItems) => {
    console.log(orderItems);
    dispatch({ type: 'PAY_REQUEST' });
    const { data } = await axios.put(
      `/api/orders/${order._id}/pay`,
      {},
      {
        headers: { authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: 'PAY_SUCCESS', payload: data });
    axios
      .post('/api/stripe/create-checkout-session', { orderItems })
      .then((res) => {
        console.log(res.data.url);

        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

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
        <title>Order - Babyfie</title>
      </Helmet>
      <Heading as="h1" my="3rem" textAlign={'center'}>
        Comanda {userInfo.name} cu id-ul comenzii: <br />
        {orderId}
      </Heading>
      <Flex maxW="1100px" w="100%" justifyContent={'space-between'}>
        <Box w="70%">
          <Box mb="2rem" p="1rem" border={'1px solid #000'}>
            <Heading mb="1rem" as="h2">
              Livrare
            </Heading>
            <Text mb="3">
              <strong>Nume:</strong> {order.shippingAddress.fullName} <br />
              <strong>Adresă: </strong> {order.shippingAddress.address},{' '}
              {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country} <br />
              <strong>Număr de Contact: </strong>{' '}
              {order.shippingAddress.contact}
            </Text>
            {order.isDelivered ? (
              <MessageBox status="success">
                Livrat la data {order.deliveredAt}
              </MessageBox>
            ) : (
              <MessageBox status="error">Ne livrat</MessageBox>
            )}
          </Box>
          <Box mb="2rem" p="1rem" border={'1px solid #000'}>
            <Heading mb="1rem" as="h2">
              Metoda de plată
            </Heading>
            <Text mb="3">
              <strong>Metoda</strong> {order.paymentMethod}
            </Text>
            {order.isPaid ? (
              <MessageBox status="success">
                Plătit la data {order.paidAt}
              </MessageBox>
            ) : (
              <MessageBox status="error">Ne plătit</MessageBox>
            )}
          </Box>
          <Box mb="2rem" p="1rem" border={'1px solid #000'}>
            <Heading mb="1rem" as="h2">
              Produse
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
                    <Box w="20%">{item.price} RON</Box>
                  </Box>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Box>
        <Box>
          <Box mb="2rem" p="1rem" border={'1px solid #000'}>
            <Heading mb="1rem" as="h2">
              Sumar Comandă
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
                <Text>Produse</Text>
                <Text>{order.itemsPrice.toFixed(2)} RON</Text>
              </ListItem>
              <ListItem
                display={'flex'}
                justifyContent={'space-between'}
                mb={'1rem'}
                borderBottom={'1px solid gray'}
              >
                <Text>Livrare</Text>
                <Text>{order.shippingPrice.toFixed(2)} RON</Text>
              </ListItem>

              <ListItem
                display={'flex'}
                justifyContent={'space-between'}
                mb={'1rem'}
                borderBottom={'1px solid gray'}
              >
                <Text>
                  <strong>Total Comandă</strong>
                </Text>
                <Text>{order.totalPrice.toFixed(2)} RON</Text>
              </ListItem>
              {!order.isPaid && order.paymentMethod === 'Stripe' && (
                <ListItem>
                  <Button
                    type="submit"
                    bg={'brand.300'}
                    w={'fit-content'}
                    _hover={'none'}
                    onClick={() => checkoutSession(order.orderItems)}
                  >
                    <BsCreditCardFill />
                    &nbsp; Plata cu cardul
                  </Button>
                </ListItem>
              )}
              {/* {!order.isPaid && (
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
              )} */}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListItem>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  <Box>
                    <Button type="button" onClick={deliverOrderHandler}>
                      Comandă Livrată
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
