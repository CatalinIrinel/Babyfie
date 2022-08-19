import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { getError } from '../Utils';

function LoginPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectUrl ? redirectUrl : '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://ecommapi.babyfie.eu/api/users/signin',
        {
          email,
          password,
        }
      );
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <Box minH={'60vh'} paddingY="2rem">
      <Helmet>
        <title>Logare - Babyfie</title>
      </Helmet>
      <Flex flexDirection="column" alignItems="center">
        <Box
          mb="3rem"
          display="flex"
          justifyContent="center"
          w="100%"
          fontSize="2.5rem"
        >
          <Heading as="h1">Logează-te</Heading>
        </Box>
        <form onSubmit={submitHandler}>
          <FormControl isRequired mb="2rem">
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input
              borderColor={'#000'}
              w="300px"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb="2rem">
            <FormLabel htmlFor="password">Parola:</FormLabel>
            <Input
              borderColor={'#000'}
              w="300px"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Box display="flex" justifyContent="center" w="100%">
            <Button
              my="1rem"
              type="submit"
              size="md"
              variant="solid"
              bg="brand.500"
              w="200px"
              _hover={{ backgroundColor: 'brand.600', color: '#fff' }}
              _focus={{ boxShadow: 'none' }}
            >
              Logare
            </Button>
          </Box>
          <Box display="flex" justifyContent="center">
            Client Nou?&nbsp;
            <Link className="links" to={`/register?redirect=${redirect}`}>
              Crează-ți contul aici!
            </Link>
          </Box>
        </form>
      </Flex>
    </Box>
  );
}

export default LoginPage;
