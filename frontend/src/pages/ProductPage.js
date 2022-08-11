import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  ListItem,
  Text,
  UnorderedList,
  useBreakpointValue,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../Utils';
// import Rating from '../components/Rating';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductPage() {
  const params = useParams();
  const { slug } = params;
  const [color, setColor] = useState('Black');
  const [slider, setSlider] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '20%', md: '30px' });

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    product: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const existingItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
  };

  return (
    <Box
      minH={'60vh'}
      paddingY="2rem"
      paddingX="4rem"
      display="flex"
      justifyContent="center"
    >
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox status="error">{error}</MessageBox>
      ) : (
        <Flex
          maxW="1100px"
          w="full"
          h="fit-content"
          flexDirection={['column', 'row', 'row']}
          flexWrap={'wrap'}
        >
          <Box w={['100%', '50%']} p={['0.3rem', '1rem']}>
            <UnorderedList listStyleType={'none'}>
              {/* <ListItem>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
              </ListItem> */}

              <ListItem mb={'2rem'}>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <Heading fontSize={'1.8rem'} as={'h1'}>
                  {product.name}
                </Heading>
              </ListItem>

              <ListItem mb={'2rem'}>
                <Heading fontSize={'1.3rem'} as={'h2'}>
                  <strong>{product.price} RON</strong>
                </Heading>
              </ListItem>

              <ListItem mb={'2rem'}>
                <Text>{product.description}</Text>
              </ListItem>

              {/* <ListItem mb={'2rem'}>
                <Box>
                  <Heading fontSize={'1.3rem'} w="fit-content" as="h2" mb={3}>
                    Color: {color}
                  </Heading>
                  <UnorderedList
                    listStyleType={'none'}
                    display={'flex'}
                    justifyContent={'space-evenly'}
                    w="fit-content"
                    margin={'0'}
                  >
                    <ListItem mr={3}>
                      <Box
                        boxSize={'30px'}
                        border={'1px solid'}
                        borderRadius={'full'}
                        borderColor={'#000'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        onClick={() => setColor('Black')}
                        cursor={'pointer'}
                      >
                        <Box
                          boxSize={'20px'}
                          borderRadius={'full'}
                          bg="#000"
                          p="1px"
                        ></Box>
                      </Box>
                    </ListItem>
                    <ListItem mr={3}>
                      <Box
                        border={'1px solid'}
                        boxSize={'30px'}
                        borderRadius={'full'}
                        borderColor={'#000'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        onClick={() => setColor('Crem')}
                        cursor={'pointer'}
                      >
                        <Box
                          boxSize={'20px'}
                          borderRadius={'full'}
                          bg="brand.100"
                          p="1px"
                        ></Box>
                      </Box>
                    </ListItem>
                    <ListItem mr={3}>
                      <Box
                        border={'1px solid'}
                        boxSize={'30px'}
                        borderRadius={'full'}
                        borderColor={'#000'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        onClick={() => setColor('Purple')}
                        cursor={'pointer'}
                      >
                        <Box
                          boxSize={'20px'}
                          borderRadius={'full'}
                          bg="brand.500"
                          p="1px"
                        ></Box>
                      </Box>
                    </ListItem>
                  </UnorderedList>
                </Box>
              </ListItem> */}

              <ListItem>
                <Box>
                  {product.countInStock > 0 ? (
                    <Button
                      type="button"
                      bg={'brand.500'}
                      transition="all 0.4s ease-in-out"
                      _hover={{ bg: 'brand.600', color: '#fff' }}
                      onClick={addToCartHandler}
                    >
                      {' '}
                      Adauga în coș
                    </Button>
                  ) : (
                    <Button type="button" bg={'brand.500'} disabled>
                      {' '}
                      Nu mai este în stock
                    </Button>
                  )}
                </Box>
              </ListItem>
            </UnorderedList>
          </Box>
          <Box
            w={['100%', '50%']}
            p={['0.3rem', '1rem']}
            minH={['50rem', 'fit-content']}
          >
            <Box
              position={'relative'}
              w={'full'}
              overflow={'hidden'}
              px="0"
              py="0"
              mb="1rem"
            >
              <Box
                h={'400px'}
                position={'relative'}
                backgroundPosition={'center'}
                backgroundRepeat={'no-repeat'}
                backgroundSize={'contain'}
                backgroundImage={`url(${selectedImage || product.image})`}
              />
            </Box>
            <Box minH={'100px'}>
              <UnorderedList
                listStyleType={'none'}
                margin={'0'}
                padding={'0'}
                minH={'100%'}
              >
                <ListItem margin="0" padding={'0'} h={'100%'}>
                  <Box
                    display={'flex'}
                    flexWrap={'wrap'}
                    justifyContent={'center'}
                    h={'100%'}
                  >
                    {[product.image, ...product.images].map((x) => (
                      <Box key={x} h={'100%'} mb={['0.5rem', '0']}>
                        <Button
                          onClick={() => setSelectedImage(x)}
                          variant={'ghost'}
                          _hover={{
                            background: 'transparent',
                          }}
                          _focus={{
                            border: 'none',
                            boxShadow: 'none',
                            outline: 'none',
                          }}
                          h={'100%'}
                        >
                          <Image boxSize={'100px'} src={x} alt={'product'} />
                        </Button>
                      </Box>
                    ))}
                  </Box>
                </ListItem>
              </UnorderedList>
            </Box>
          </Box>
        </Flex>
      )}
    </Box>
  );
}

export default ProductPage;
