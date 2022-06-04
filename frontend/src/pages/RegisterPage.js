import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { getError } from '../Utils';

function RegisterPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
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
    <Box paddingY="2rem">
      <Helmet>
        <title>Inregistrare - Babyfie</title>
      </Helmet>
      <Flex flexDirection="column" alignItems="center">
        <Box
          mb="3rem"
          display="flex"
          justifyContent="center"
          w="100%"
          fontSize="2.5rem"
        >
          <Heading as="h1"> Creaza contul tau Babyfie</Heading>
        </Box>
        <form onSubmit={submitHandler}>
          <FormControl isRequired mb="2rem">
            <FormLabel htmlFor="name">Nume Complet:</FormLabel>
            <Input
              w="300px"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb="2rem">
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input
              w="300px"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb="2rem">
            <FormLabel htmlFor="password">Parola:</FormLabel>
            <Input
              w="300px"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb="2rem">
            <FormLabel htmlFor="password">Confirma Parola:</FormLabel>
            <Input
              w="300px"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Creaza Contul
            </Button>
          </Box>

          <Box display="flex" justifyContent="center">
            Ai deja cont babyfie?&nbsp;
            <Link className="links" to={`/login?redirect=${redirect}`}>
              {' '}
              Logheaza-te aici
            </Link>
          </Box>
        </form>
      </Flex>
    </Box>
  );
}

export default RegisterPage;
