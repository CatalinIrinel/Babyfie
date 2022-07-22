import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  ListItem,
  Spacer,
  UnorderedList,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import MessageBox from '../components/MessageBox';
import { DeleteIcon } from '@chakra-ui/icons';
import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';

function CartPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  console.log('Cart has ' + cartItems.length + ' items');
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({
      type: 'CART_REMOVE_ITEM',
      payload: item,
    });
  };

  return (
    <Flex
      minH={'60vh'}
      mx="3rem"
      py="4rem"
      flexDirection="column"
      alignItems="center"
    >
      <Helmet>
        <title>Shopping Cart - Babyfie</title>
      </Helmet>
      <Heading as="h1">Coșul de cumpărături</Heading>
      <Box w="100%" mt="3rem">
        <Flex alignItems="flex-start" justifyContent={'space-between'}>
          <Box w="60%">
            {cartItems.length === 0 ? (
              <MessageBox status="info">
                Coșul este gol.&nbsp;
                <Link className="links" to="/products">
                  Spor la cumpărături”
                </Link>
              </MessageBox>
            ) : (
              <UnorderedList w="100%" m="0" listStyleType="none">
                {cartItems.map((item) => (
                  <ListItem mb="1rem" w="100%" key={item._id}>
                    <Flex
                      alignItems="center"
                      w="100%"
                      bg="gray.100"
                      px="2rem"
                      py="1rem"
                      borderRadius="1rem"
                    >
                      <Box display={'flex'} alignItems={'center'}>
                        <Image
                          boxSize="100px"
                          src={item.image}
                          alt={item.name}
                          mr={'1rem'}
                          borderTopLeftRadius={'50%'}
                          borderTopRightRadius={'50%'}
                        />
                        <Link to={`/produs/${item.slug}`}>{item.name}</Link>
                      </Box>
                      <Spacer />
                      <Box>
                        <Button
                          onClick={() =>
                            updateCartHandler(item, item.quantity - 1)
                          }
                          variant="light"
                          disabled={item.quantity === 1}
                        >
                          <BiMinusCircle />
                        </Button>{' '}
                        <span>{item.quantity}</span>{' '}
                        <Button
                          variant="light"
                          onClick={() =>
                            updateCartHandler(item, item.quantity + 1)
                          }
                          disabled={item.quantity === item.countInStock}
                        >
                          <BiPlusCircle />
                        </Button>
                      </Box>
                      <Spacer />
                      <Box>{item.price} RON</Box>
                      <Box>
                        <Button
                          variant="light"
                          onClick={() => removeItemHandler(item)}
                        >
                          <DeleteIcon size="md" />
                        </Button>
                      </Box>
                    </Flex>
                  </ListItem>
                ))}
              </UnorderedList>
            )}
          </Box>
          <Box>
            <Box
              w="fit-content"
              bg="brand.100"
              px="2rem"
              py="1rem"
              borderRadius="1rem"
            >
              <UnorderedList listStyleType="none" m="0">
                <ListItem mb="1rem">
                  <Heading as="h3" size="md">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    produse):{' '}
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}{' '}
                    RON
                  </Heading>
                </ListItem>

                <ListItem>
                  <Link to="/login?redirect=/shipping">
                    <Button
                      type="button"
                      variant="solid"
                      bg="brand.500"
                      disabled={cartItems.length === 0}
                      _hover={{ background: 'brand.500' }}
                    >
                      Finalizează comanda
                    </Button>
                  </Link>
                </ListItem>
              </UnorderedList>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export default CartPage;
