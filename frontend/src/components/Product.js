import { Box, Button, Heading, Image } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCartHandler = async (item) => {
    const existingItem = cartItems.find((x) => x._id === product._id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      toast.error('Ne pare rau produsul nu mai este in stoc');
      return;
    }
    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };
  return (
    <Box key={product.slug}>
      <Box
        borderTopLeftRadius={'50%'}
        borderTopRightRadius={'50%'}
        overflow={'hidden'}
      >
        <Link to={`/product/${product.slug}`}>
          <Image w="300px" src={product.image} alt={product.name} />
        </Link>
      </Box>

      <Box
        display={'flex'}
        justifyContent="space-between"
        alignItems={'center'}
        flexDirection={'column'}
        px="0.8rem"
        mt="0.5rem"
      >
        <Link to={`/product/${product.slug}`}>
          <Heading as="h2" fontSize={'1.2rem'} color={'brand.500'}>
            {product.name}
          </Heading>
        </Link>
        <Heading as="h3" fontSize={'0.8rem'} my={'1rem'}>
          {product.price} RON
        </Heading>

        {product.countInStock === 0 ? (
          <Button variant="outline" bg="brand.400" disabled>
            Lipsa Stoc
          </Button>
        ) : (
          <Button
            variant="solid"
            bg="brand.300"
            onClick={() => addToCartHandler(product)}
          >
            Adauga in cos
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Product;
