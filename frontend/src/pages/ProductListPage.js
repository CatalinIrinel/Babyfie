import {
  Box,
  Button,
  Heading,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../Utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
function ProductListPage() {
  const [{ loading, error, products, pages, loadingCreate }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [page, userInfo]);

  return (
    <Box
      mx="3rem"
      my="4rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Heading as="h1">Products</Heading>
      <Box>
        <Link to="/admin/product-create">
          <Button type="button">Add Product</Button>
        </Link>
      </Box>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox status="error">{error}</MessageBox>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>NAME</Th>
                <Th>PRICE</Th>
                <Th>CATEGORY</Th>
                <Th>BRAND</Th>
                <Th>ACTIONS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product._id}>
                  <Td>{product._id}</Td>
                  <Td>{product.name}</Td>
                  <Td>{product.price}</Td>
                  <Td>{product.category}</Td>
                  <Td>{product.brand}</Td>
                  <Td>
                    <IconButton icon={<BiEdit />} />{' '}
                    <IconButton icon={<BiTrash />} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Box>
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === Number(page) ? 'btn text-bold' : 'btn'}
                key={x + 1}
                to={`/admin/products?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </Box>
        </TableContainer>
      )}
    </Box>
  );
}

export default ProductListPage;
