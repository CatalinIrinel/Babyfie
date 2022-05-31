import {
  Box,
  Button,
  Container,
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
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import MessageBox from '../components/MessageBox';
import { DeleteIcon } from '@chakra-ui/icons';

function CartPage() {
  const navigate = useNavigate();
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

  const checkOutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };
  return (
    <Flex mx="3rem" my="4rem" flexDirection="column" alignItems="center">
      <Helmet>
        <title>Cos de cumparaturi - Babyfie</title>
      </Helmet>
      <Heading as="h1">Cosul de cumparaturi</Heading>
      <Box w="100%">
        <Flex alignItems="center">
          <Container>
            {cartItems.length === 0 ? (
              <MessageBox>
                Cosul este gol.&nbsp;
                <Link style={{ color: '#8f72b3' }} to="/produse">
                  Spor la cumparaturi!
                </Link>
              </MessageBox>
            ) : (
              <UnorderedList m="0" listStyleType="none">
                {cartItems.map((item) => (
                  <ListItem key={item._id}>
                    <Flex
                      alignItems="center"
                      w="fit-content"
                      bg="gray.100"
                      px="2rem"
                      py="1rem"
                      borderRadius="1rem"
                    >
                      <Box>
                        <Image src={item.image} alt={item.name} />
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
                          <i className="fas fa-minus-circle"></i>
                        </Button>{' '}
                        <span>{item.quantity}</span>{' '}
                        <Button
                          variant="light"
                          onClick={() =>
                            updateCartHandler(item, item.quantity + 1)
                          }
                          disabled={item.quantity === item.countInStock}
                        >
                          <i className="fas fa-plus-circle"></i>
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
          </Container>
          <Spacer />
          <Container>
            <Box
              w="fit-content"
              bg="gray.100"
              px="2rem"
              py="1rem"
              borderRadius="1rem"
            >
              <UnorderedList listStyleType="none" m="0">
                <ListItem mb="1rem">
                  <Heading as="h3" size="md">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items):{' '}
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}{' '}
                    RON
                  </Heading>
                </ListItem>

                <ListItem>
                  <Button
                    type="button"
                    variant="solid"
                    bg="brand.500"
                    disabled={cartItems.length === 0}
                    onClick={() => checkOutHandler}
                  >
                    Proceed Checkout
                  </Button>
                </ListItem>
              </UnorderedList>
            </Box>
          </Container>
        </Flex>
      </Box>
    </Flex>
  );
}

export default CartPage;
