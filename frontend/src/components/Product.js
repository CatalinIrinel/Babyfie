import { Box, Button, Image, Spacer } from '@chakra-ui/react';
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
    <Box border="1px" borderColor="brand.400" key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <Image w="300px" src={product.image} alt={product.name} />
      </Link>
      <Spacer />
      <Box>
        <Link to={`/product/${product.slug}`}>
          <h2>{product.name}</h2>
        </Link>
        <h3>{product.price} RON</h3>
        {product.countInStock === 0 ? (
          <Button variant="outline" colorScheme="brand.400" disabled>
            Lipsa Stoc
          </Button>
        ) : (
          <Button
            variant="solid"
            colorScheme="brand.300"
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
