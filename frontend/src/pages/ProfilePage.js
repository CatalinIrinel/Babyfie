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
  };
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" my="3rem">
        <Helmet>
          <title>User Profile</title>
        </Helmet>
        <Heading as="h1" my="3">
          User Profile
        </Heading>
        <Box w="md">
          <form onSubmit={submitHandler}>
            <FormControl mb="2rem">
              <FormLabel>Name:</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                isRequired
              />
            </FormControl>
            <FormControl mb="2rem">
              <FormLabel>Email:</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isRequired
              />
            </FormControl>
            <FormControl mb="2rem">
              <FormLabel>Password:</FormLabel>
              <Input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                isRequired
              />
            </FormControl>
            <FormControl mb="2rem">
              <FormLabel>Confirm Password:</FormLabel>
              <Input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                isRequired
              />
            </FormControl>
            <Box w="100%" display="flex" justifyContent="center">
              <Button type="submit" bg="brand.500">
                Change info
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default ProfilePage;
