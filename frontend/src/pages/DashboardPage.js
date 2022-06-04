import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../Utils';
import { Chart } from 'react-google-charts';
import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function DashboardPage() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const { state } = useContext(Store);

  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/orders/summary`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [userInfo]);
  return (
    <Box
      mx="3rem"
      my="4rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox status="error">{error}</MessageBox>
      ) : (
        <Flex w="100%" maxW="1100px" flexDirection="column">
          <Heading as="h1" mb="1rem">
            Dashboard
          </Heading>
          <Flex display="flex">
            <Box
              mr="3"
              w="sm"
              borderRadius="1rem"
              border="2px"
              borderColor="brand.200"
            >
              <Box px="5" py="3">
                <Box>
                  <Box mr="0.5rem">
                    {summary.users && summary.users[0]
                      ? summary.users[0].numUsers
                      : 0}
                  </Box>
                  <Box>Users</Box>
                </Box>
              </Box>
            </Box>
            <Spacer />
            <Box
              mr="3"
              w="sm"
              borderRadius="1rem"
              border="2px"
              borderColor="brand.400"
            >
              <Box px="5" py="3">
                <Box>
                  <Box mr="0.5rem">
                    {summary.orders && summary.orders[0]
                      ? summary.orders[0].numOrders
                      : 0}
                  </Box>
                  <Box>Orders</Box>
                </Box>
              </Box>
            </Box>
            <Spacer />
            <Box
              w="sm"
              borderRadius="1rem"
              border="2px"
              borderColor="brand.600"
            >
              <Box px="5" py="3">
                <Box>
                  <Box mr="0.5rem">
                    {summary.orders && summary.orders[0]
                      ? summary.orders[0].totalSales.toFixed(2)
                      : 0}
                    &nbsp; RON
                  </Box>
                  <Box>Income</Box>
                </Box>
              </Box>
            </Box>
          </Flex>
          <Spacer />
          <Box my="2rem">
            <Heading as="h2">Sales</Heading>
            {summary.dailyOrders.length === 0 ? (
              <MessageBox status="warning">No Sales</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="AreaChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ['Date', 'Sales'],
                  ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                ]}
              ></Chart>
            )}
          </Box>
          <Spacer />
          <Box my="3">
            <Heading as="h2">Categories</Heading>
            {summary.productCategories.length === 0 ? (
              <MessageBox>No Categories</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ['Date', 'Sales'],
                  ...summary.productCategories.map((x) => [x._id, x.count]),
                ]}
              ></Chart>
            )}
          </Box>
        </Flex>
      )}
    </Box>
  );
}

export default DashboardPage;
