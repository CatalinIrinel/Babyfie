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
  Image,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';

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
    <Box mx="3rem" py="4rem">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Previzualizare Comandă - Babyfie</title>
      </Helmet>
      <Heading as="h1" my="3rem">
        Previzualizare Comandă
      </Heading>
      <Flex
        minH={'60vh'}
        alignItems={'flex-start'}
        justifyContent={'space-between'}
      >
        <Box w="70%" display={'flex'} flexDirection={'column'}>
          <Box mb="1rem" p="1rem" border={'1px solid #000'}>
            <Heading mb="1rem" as="h2">
              Livrare
            </Heading>
            <Text mb="3">
              <strong>Nume: </strong> {cart.shippingAddress.fullName} <br />
              <strong>Adresă: </strong> {cart.shippingAddress.address},{' '}
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
              {cart.shippingAddress.country}
            </Text>
            <Box
              borderRadius={'1rem'}
              mb="3"
              w="fit-content"
              bg="brand.500"
              py="1"
              px="1.5rem"
              fontWeight={'bold'}
            >
              <Link to="/shipping">Modifică</Link>
            </Box>
          </Box>

          <Box mb="1rem" p="1rem" border={'1px solid #000'}>
            <Heading mb="1rem" as="h2">
              Metoda de plată
            </Heading>
            <Text mb="1rem">
              <b>Metoda: </b> {cart.paymentMethod} <br />
            </Text>
            <Box
              borderRadius={'1rem'}
              mb="3"
              w="fit-content"
              bg="brand.500"
              py="1"
              px="1.5rem"
              fontWeight={'bold'}
            >
              <Link to="/payment">Modifică</Link>
            </Box>
          </Box>

          <Box p="1rem" border={'1px solid #000'}>
            <Heading mb="1rem" as="h2">
              Produse
            </Heading>
            <UnorderedList margin={'0'} listStyleType={'none'} px={'1rem'}>
              {cart.cartItems.map((item) => (
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
                        mr="3"
                        src={item.image}
                        alt={item.name}
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
            </UnorderedList>{' '}
            <Box
              borderRadius={'1rem'}
              mb="3"
              w="fit-content"
              bg="brand.500"
              py="1"
              px="1.5rem"
              fontWeight={'bold'}
            >
              <Link to="/cart">Modifică</Link>
            </Box>
          </Box>
        </Box>

        <Box w="25%" p="1rem" border={'1px solid #000'}>
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
              <Text>{cart.itemsPrice.toFixed(2)} RON</Text>
            </ListItem>
            <ListItem
              display={'flex'}
              justifyContent={'space-between'}
              mb={'1rem'}
              borderBottom={'1px solid gray'}
            >
              <Text>Livrare</Text>
              <Text>{cart.shippingPrice.toFixed(2)} RON</Text>
            </ListItem>
            <ListItem
              display={'flex'}
              justifyContent={'space-between'}
              mb={'1rem'}
              borderBottom={'1px solid gray'}
            >
              <Text>Cost Livrare</Text>
              <Text>{cart.taxPrice.toFixed(2)} RON</Text>
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
              <Text>
                <strong>{cart.totalPrice.toFixed(2)} RON</strong>
              </Text>
            </ListItem>
            <ListItem>
              <Button
                type="button"
                bg={'brand.500'}
                transition={'all ease-in-out 0.3s'}
                _hover={{ bg: 'brand.600', color: '#fff' }}
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Plasează Comanda
              </Button>

              {loading && <LoadingBox></LoadingBox>}
            </ListItem>
          </UnorderedList>
        </Box>
      </Flex>
    </Box>
  );
}

export default PlaceOrderScreen;
