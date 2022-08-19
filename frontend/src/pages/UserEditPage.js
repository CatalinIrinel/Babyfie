import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../Utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
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

function UserEditPage() {
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: userId } = params;
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `https://ecommapi.babyfie.eu//api/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userId, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (confirmPassword === password) {
      try {
        dispatch({ type: 'UPDATE_REQUEST' });

        await axios.put(
          `https://ecommapi.babyfie.eu//api/users/${userId}`,
          { _id: userId, name, email, isAdmin, password },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({
          type: 'UPDATE_SUCCESS',
        });
        toast.success('User updated successfully');
        navigate('/admin/users');
      } catch (error) {
        toast.error(getError(error));
        dispatch({ type: 'UPDATE_FAIL' });
      }
    } else {
      toast.error('Passwords do not match');
    }
  };
  return (
    <Box
      minH={'60vh'}
      mx="3rem"
      py="4rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Helmet>
        <title>Edit User</title>
      </Helmet>
      <Heading as="h1">Editează utilizatorul{name}</Heading>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <form onSubmit={submitHandler}>
          <FormControl isRequired mb="2rem">
            <FormLabel htmlFor="name">Nume:</FormLabel>
            <Input
              borderColor={'#000'}
              w="300px"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb="2rem">
            <FormLabel htmlFor="email">Email:</FormLabel>
            <Input
              borderColor={'#000'}
              w="300px"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl mb="2rem">
            <FormLabel>Parolă:</FormLabel>
            <Input
              borderColor={'#000'}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl mb="2rem">
            <FormLabel>Confirmă parola:</FormLabel>
            <Input
              borderColor={'#000'}
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>

          <FormControl mb={'2rem'}>
            <Checkbox
              colorScheme={'orange'}
              id="isAdmin"
              label="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            >
              Setează utilizatorul ca admin
            </Checkbox>
          </FormControl>

          <Box display="flex" justifyContent="center" w="100%">
            <Button
              my="1rem"
              type="submit"
              size="md"
              variant="solid"
              bg="brand.500"
              w="200px"
              disabled={loadingUpdate}
              _hover={{ backgroundColor: 'brand.600', color: '#fff' }}
              _focus={{ boxShadow: 'none' }}
            >
              Actualizează
            </Button>
            {loadingUpdate && <LoadingBox></LoadingBox>}
          </Box>
        </form>
      )}
    </Box>
  );
}

export default UserEditPage;
