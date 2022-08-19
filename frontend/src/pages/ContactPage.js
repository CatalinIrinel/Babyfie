import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  ListItem,
  Textarea,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { toast } from 'react-toastify';
import axios from 'axios';

function ContactPage() {
  const [name, setName] = useState('');
  const [issue, setIssue] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = async (e) => {
    e.preventDefault();
    document.getElementById('formC').reset();
    await axios
      .post('/send-mail', {
        name,
        issue,
        email,
        message,
      })
      .then(toast.succes('Mesajul a fost trimis'));
  };

  useEffect(() => {
    Aos.init({
      disable: window.innerWidth < 480,
    });
  }, []);
  return (
    <Box
      minH={'60vh'}
      paddingY="2rem"
      paddingX="4rem"
      display="flex"
      flexDirection={'column'}
      alignItems="center"
    >
      <Helmet>
        <title>Contact - Babyfie</title>
      </Helmet>
      <Heading my="3rem" as="h1" fontSize={'2.3rem'}>
        Contactează echipa Babyfie
      </Heading>
      <Box
        my={'4rem'}
        w="full"
        display={'flex'}
        flexWrap="wrap"
        justifyContent={'space-evenly'}
      >
        <Box w="fit-content">
          <Heading mb={'1.5rem'} fontSize={'1.8rem'} as={'h2'}>
            Informații de contact:
          </Heading>
          <UnorderedList m={0} listStyleType={'none'}>
            <ListItem
              w={'fit-content'}
              mb={'2.5rem'}
              borderBottom={'1px solid #000'}
              fontSize={'1.5rem'}
            >
              Informații generale:{' '}
              <Link
                color={'brand.400'}
                href={`mailto:${process.env.USER_EMAIL}`}
              >
                <strong>contact[at]babyfie.eu</strong>
              </Link>
            </ListItem>
            <ListItem
              w={'fit-content'}
              mb={'2.5rem'}
              borderBottom={'1px solid #000'}
              fontSize={'1.5rem'}
            >
              Depuneri plângeri:{' '}
              <Link color={'brand.400'} href="mailto:complain@babyfie.eu">
                <strong>complain[at]babyfie.eu</strong>
              </Link>
            </ListItem>
            <ListItem
              w={'fit-content'}
              mb={'2.5rem'}
              borderBottom={'1px solid #000'}
              fontSize={'1.5rem'}
            >
              Relații cu clienții:{' '}
              <Link
                color={'brand.400'}
                href="mailto:customersupport@babyfie.eu"
              >
                <strong>customersupport[at]babyfie.eu</strong>
              </Link>
            </ListItem>
          </UnorderedList>
          <Box maxW={'550px'}>
            <Image boxSize={'550px'} src="/images/contact.svg" />
          </Box>
        </Box>
        <Box
          maxW={'550px'}
          w={'full'}
          className="glass"
          boxShadow={'10px 10px 40px rgba(0,0,0,0.5)'}
          py={'2rem'}
          px={['1rem', '4rem']}
          borderRadius={'1rem'}
        >
          <form id="formC" onSubmit={sendEmail}>
            <Box
              mb={'3.5rem'}
              w={'full'}
              display={'flex'}
              justifyContent={'center'}
            >
              <Heading as={'h2'} fontSize={'1.8rem'}>
                Să luăm legătura
              </Heading>
            </Box>

            <FormControl mb={'3.5rem'} isRequired>
              <FormLabel>Nume:</FormLabel>
              <Input
                border={'none'}
                borderBottom={'1px solid #000'}
                type="text"
                _hover={'none'}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>

            <FormControl mb={'3.5rem'} isRequired>
              <FormLabel>Email:</FormLabel>
              <Input
                border={'none'}
                borderBottom={'1px solid #000'}
                type="email"
                _hover={'none'}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl mb={'3.5rem'} isRequired>
              <FormLabel>Problema/Motivul:</FormLabel>
              <Input
                border={'none'}
                borderBottom={'1px solid #000'}
                type="text"
                _hover={'none'}
                onChange={(e) => setIssue(e.target.value)}
              />
            </FormControl>

            <FormControl mb={'3.5rem'} isRequired>
              <FormLabel>Messaj:</FormLabel>
              <Textarea
                border={'none'}
                borderBottom={'1px solid #000'}
                type="text"
                _hover={'none'}
                placeholder="Va rugam detaliati motivul..."
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormControl>
            <Box
              w={'full'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Button
                boxShadow={'0 0 20px hsl(267, 30%, 57%)'}
                color={'#fff'}
                bg={'brand.500'}
                _hover={'none'}
                type="submit"
              >
                Trimite Messaj
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default ContactPage;
