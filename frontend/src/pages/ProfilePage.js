import React, { useContext, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../Utils';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import LoadingBox from '../components/LoadingBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

function ProfilePage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (confirmPassword === password) {
      try {
        const { data } = await axios.put(
          '/api/users/profile',
          { name, email, password },
          { headers: { authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: 'UPDATE_SUCCESS' });
        ctxDispatch({ type: 'USER_SIGNIN', payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        toast.success('User updated successfully');
      } catch (error) {
        dispatch({ type: 'UPDATE_FAIL' });
        toast.error(getError(error));
      }
    } else {
      toast.error('Passwords do not match');
    }
  };
  return (
    <>
      <Box
        minH={'60vh'}
        display="flex"
        flexDirection="column"
        alignItems="center"
        py={'3rem'}
      >
        <Helmet>
          <title>User Profile</title>
        </Helmet>
        <Heading as="h1" my="3">
          Profilul utilizatorului
        </Heading>
        <Box w="md">
          <form onSubmit={submitHandler}>
            <FormControl mb="2rem">
              <FormLabel>Nume:</FormLabel>
              <Input
                borderColor={'#000'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                isRequired
              />
            </FormControl>
            <FormControl mb="2rem">
              <FormLabel>Email:</FormLabel>
              <Input
                borderColor={'#000'}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isRequired
              />
            </FormControl>
            <FormControl mb="2rem">
              <FormLabel>Parolă:</FormLabel>
              <Input
                borderColor={'#000'}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                isRequired
              />
            </FormControl>
            <FormControl mb="2rem">
              <FormLabel>Confirmă parola:</FormLabel>
              <Input
                borderColor={'#000'}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                isRequired
              />
            </FormControl>
            <Box w="100%" display="flex" justifyContent="center">
              <Button type="submit" bg="brand.500">
                Editează profilul
              </Button>
              {loadingUpdate && <LoadingBox></LoadingBox>}
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default ProfilePage;
