import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import { Store } from '../Store';
import { getError } from '../Utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loadingCreate: false,
      };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};
function CreateProductPage() {
  const [{ error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const { state } = useContext(Store);
  const { userInfo } = state;

  const createHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      await axios.post(
        '/api/products',
        {
          name,
          slug,
          price,
          image,
          category,
          brand,
          countInStock,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      toast.success('product created successfully');
      dispatch({ type: 'CREATE_SUCCESS' });
    } catch (err) {
      toast.error(getError(error));
      dispatch({
        type: 'CREATE_FAIL',
      });
    }
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);

    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });

      toast.success('Image uploaded successfully');
      setImage(data.secure_url);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };
  return (
    <Box
      mx="3rem"
      my="4rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Helmet>
        <title>Create Product - Babyfie</title>
      </Helmet>
      <Heading mb={'3rem'} as="h1">
        Create New Product
      </Heading>
      <form onSubmit={createHandler}>
        <FormControl mb="2rem">
          <FormLabel htmlFor="name">Name: </FormLabel>
          <Input
            w={['300px', '500px']}
            type="text"
            isRequired
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl mb="2rem">
          <FormLabel htmlFor="Slug">Slug: </FormLabel>
          <Input
            w={['300px', '500px']}
            type="text"
            isRequired
            onChange={(e) => setSlug(e.target.value)}
          />
        </FormControl>

        <FormControl mb="2rem">
          <FormLabel htmlFor="brand">Brand:</FormLabel>
          <Input
            w={['300px', '500px']}
            type="text"
            isRequired
            onChange={(e) => setBrand(e.target.value)}
          />
        </FormControl>

        <FormControl mb="2rem">
          <FormLabel htmlFor="countInStock">Count In Stock:</FormLabel>
          <Input
            w={['300px', '500px']}
            type="number"
            isRequired
            onChange={(e) => setCountInStock(e.target.value)}
          />
        </FormControl>

        <FormControl mb="2rem">
          <FormLabel htmlFor="description">Description:</FormLabel>
          <Input
            w={['300px', '500px']}
            type="text"
            isRequired
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <FormControl mb="2rem">
          <FormLabel htmlFor="price">Price:</FormLabel>
          <Input
            w={['300px', '500px']}
            type="number"
            isRequired
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>

        <FormControl mb="2rem">
          <FormLabel htmlFor="imageFile">Upload Image:</FormLabel>
          <Input
            w={['300px', '500px']}
            type="file"
            isRequired
            onChange={uploadFileHandler}
          />
        </FormControl>

        <FormControl mb="2rem">
          <FormLabel htmlFor="category">Category:</FormLabel>
          <Input
            w={['300px', '500px']}
            type="text"
            isRequired
            onChange={(e) => setCategory(e.target.value)}
          />
        </FormControl>

        <Button disabled={loadingUpdate} type="submit">
          Create new product
        </Button>
        {loadingUpdate && <LoadingBox></LoadingBox>}
      </form>
    </Box>
  );
}

export default CreateProductPage;
