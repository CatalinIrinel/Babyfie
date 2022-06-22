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
      toast.error('We are sorry the product is out of stock ');
      return;
    }
    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };
  return (
    <Box
      key={product.slug}
      display={'flex'}
      justifyContent="space-between"
      alignItems={'center'}
      flexDirection={'column'}
      mb={'4rem'}
    >
      <Box
        borderTopLeftRadius={'50%'}
        borderTopRightRadius={'50%'}
        overflow={'hidden'}
      >
        <Link to={`/product/${product.slug}`}>
          <Image
            boxSize="300px"
            src={product.image}
            alt={product.name}
            objectFit={'cover'}
          />
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
          <Heading as="h2" fontSize={'1.4rem'} color={'brand.600'}>
            {product.name}
          </Heading>
        </Link>
        <Heading as="h3" fontSize={'1rem'} my={'1rem'}>
          {product.price} &euro;
        </Heading>

        {product.countInStock === 0 ? (
          <Button
            variant="outline"
            bg="brand.400"
            _hover={{ background: 'brand.400' }}
            disabled
          >
            Out of Stock
          </Button>
        ) : (
          <Button
            variant="solid"
            bg="brand.300"
            _hover={{ background: 'brand.400' }}
            onClick={() => addToCartHandler(product)}
          >
            Add to cart
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Product;
