import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../Utils';
import {
  Box,
  Button,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function OrderHistory() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await axios.get(`/api/orders/mine`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    };
    fetchData();
  }, [userInfo]);
  return (
    <Box minH={'60vh'} mx="3rem" py="4rem">
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <Heading as="h1" my="2rem">
        Order History
      </Heading>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox status="error">{error}</MessageBox>
      ) : (
        <TableContainer>
          <Table>
            <Thead bg={'brand.300'}>
              <Tr>
                <Th>ID</Th>
                <Th>DATE</Th>
                <Th>TOTAL</Th>
                <Th>PAID</Th>
                <Th>DELIVERED</Th>
                <Th>ACTIONS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr
                  border={'none'}
                  borderBottomWidth={'1px'}
                  borderColor={'#000'}
                  key={order._id}
                >
                  <Td>{order._id}</Td>
                  <Td>{order.createdAt.substring(0, 10)}</Td>
                  <Td>{order.totalPrice.toFixed(2)}</Td>
                  <Td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</Td>
                  <Td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : 'No'}
                  </Td>
                  <Td>
                    <Button
                      type="button"
                      variant="solid"
                      bg="brand.500"
                      onClick={() => {
                        navigate(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default OrderHistory;
