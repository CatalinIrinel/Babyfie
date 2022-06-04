import { Box, Heading } from '@chakra-ui/react';
import React, { useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Product from '../components/Product';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function ProductsPage() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    products: [],
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <Box
      paddingY="2rem"
      paddingX="4rem"
      display="flex"
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Helmet>
        <title>Produsele - Babyfie</title>
      </Helmet>
      <Heading as="h1" mb="3rem">
        Products Page
      </Heading>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox status="error">{error}</MessageBox>
      ) : (
        <Box
          w={'full'}
          display="flex"
          justifyContent={'space-evenly'}
          flexWrap={'wrap'}
        >
          {products.map((product) => (
            <Product product={product} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ProductsPage;
