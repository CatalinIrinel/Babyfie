import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  ListItem,
  Textarea,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = () => {
    console.log('yay');
  };
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
      <Heading my="3rem" as="h1">
        Contact babyfie's team
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
            Contact Informations:
          </Heading>
          <UnorderedList m={0} listStyleType={'none'}>
            <ListItem
              w={'fit-content'}
              mb={'2.5rem'}
              borderBottom={'1px solid #000'}
              fontSize={'1.5rem'}
            >
              General Informations:{' '}
              <Link color={'brand.400'} href="mailto:contact@babyfie.eu">
                <strong>contact[at]babyfie.eu</strong>
              </Link>
            </ListItem>
            <ListItem
              w={'fit-content'}
              mb={'2.5rem'}
              borderBottom={'1px solid #000'}
              fontSize={'1.5rem'}
            >
              Complaints Informations:{' '}
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
              Customer Support:{' '}
              <Link
                color={'brand.400'}
                href="mailto:customersupport@babyfie.eu"
              >
                <strong>customersupport[at]babyfie.eu</strong>
              </Link>
            </ListItem>
          </UnorderedList>
        </Box>
        <Box
          maxW={'550px'}
          w={'full'}
          className="glass"
          boxShadow={'10px 10px 20px #000'}
          py={'2rem'}
          px={'4rem'}
          borderRadius={'1rem'}
        >
          <form onSubmit={sendEmail()}>
            <Box
              mb={'3.5rem'}
              w={'full'}
              display={'flex'}
              justifyContent={'center'}
            >
              <Heading as={'h2'} fontSize={'1.8rem'}>
                Get in touch
              </Heading>
            </Box>

            <FormControl mb={'3.5rem'} isRequired>
              <FormLabel>Name:</FormLabel>
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
              <FormLabel>Message:</FormLabel>
              <Textarea
                border={'none'}
                borderBottom={'1px solid #000'}
                type="text"
                _hover={'none'}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormControl>
            <Button
              boxShadow={'0 0 20px hsl(267, 30%, 57%)'}
              color={'#fff'}
              bg={'brand.500'}
              _hover={'none'}
              type="submit"
            >
              Send Message
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default ContactPage;
