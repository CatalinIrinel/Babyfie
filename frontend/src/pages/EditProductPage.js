import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BiTrash } from 'react-icons/bi';
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
function EditProductPage() {
  const navigate = useNavigate();

  const params = useParams();
  const { id: productId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, loadingUpload, loadingUpdate }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `http://ecommpai.babyfie.eu/api/products/${productId}`
        );
        setName(data.name);
        setSlug(data.slug);
        setPrice(data.price);
        setImage(data.image);
        setImages(data.images);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setBrand(data.brand);
        setDescription(data.description);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `http://ecommapi.babyfie.eu/api/products/${productId}`,
        {
          _id: productId,
          name,
          slug,
          price,
          image,
          images,
          category,
          brand,
          countInStock,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Produs editat cu succes');
      navigate('/admin/products');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };
  const uploadFileHandler = async (e, forImages) => {
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

      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      toast.success(
        'Pozele au fost urcate cu succes. Apasati pe Editeaza Produsul pentru a aplica schimbarile'
      );
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };

  const deleteFileHandler = async (fileName, f) => {
    console.log(fileName, f);
    console.log(images);
    console.log(images.filter((x) => x !== fileName));
    setImages(images.filter((x) => x !== fileName));
    toast.success(
      'Poza stearsa cu succes. Apasati pe Editeaza Produsul pentru a aplica schimbarile'
    );
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
        <title>Edit Product - Babyfie</title>
      </Helmet>
      <Heading as={'h1'}>Editează Produsul {name}</Heading>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox status="error">{error}</MessageBox>
      ) : (
        <Box>
          <form onSubmit={submitHandler}>
            <FormControl mb="2rem">
              <FormLabel htmlFor="name">Nume: </FormLabel>
              <Input
                borderColor={'#000'}
                w="300px"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mb="2rem">
              <FormLabel htmlFor="Slug">Slug: </FormLabel>
              <Input
                borderColor={'#000'}
                w="300px"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </FormControl>

            <FormControl mb="2rem">
              <FormLabel htmlFor="brand">Brand:</FormLabel>
              <Input
                borderColor={'#000'}
                w="300px"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </FormControl>

            <FormControl mb="2rem">
              <FormLabel htmlFor="countInStock">Count In Stock:</FormLabel>
              <Input
                borderColor={'#000'}
                w="300px"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </FormControl>

            <FormControl mb="2rem">
              <FormLabel htmlFor="description">Descriere:</FormLabel>
              <Input
                borderColor={'#000'}
                w="300px"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl mb="2rem">
              <FormLabel htmlFor="price">Preț:</FormLabel>
              <Input
                borderColor={'#000'}
                w="300px"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>

            <FormControl mb="2rem">
              <FormLabel htmlFor="image">Poze:</FormLabel>
              <Input
                borderColor={'#000'}
                w="300px"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </FormControl>

            <FormControl mb="2rem">
              <FormLabel htmlFor="image">Poze aditionale</FormLabel>
              {images.length === 0 && <MessageBox>Nici o poza</MessageBox>}
              <UnorderedList listStyleType={'none'}>
                {images.map((x) => (
                  <ListItem key={x}>
                    {x}

                    <IconButton
                      bg={'brand.600'}
                      color={'brand.300'}
                      _hover={'none'}
                      onClick={() => deleteFileHandler(x)}
                      icon={<BiTrash />}
                    />
                  </ListItem>
                ))}
              </UnorderedList>
            </FormControl>

            <FormControl mb="2rem">
              <FormLabel htmlFor="image">Încarcă poze aditionale:</FormLabel>
              <Input
                borderColor={'#000'}
                w="300px"
                type={'file'}
                onChange={(e) => uploadFileHandler(e, true)}
              />
            </FormControl>

            <FormControl mb="2rem">
              <FormLabel htmlFor="category">Categorie:</FormLabel>
              <Input
                borderColor={'#000'}
                w="300px"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              {loadingUpload && <LoadingBox></LoadingBox>}
            </FormControl>

            <Button bg={'brand.500'} disabled={loadingUpdate} type="submit">
              Editează produsul
            </Button>
            {loadingUpdate && <LoadingBox></LoadingBox>}
          </form>
        </Box>
      )}
    </Box>
  );
}

export default EditProductPage;
