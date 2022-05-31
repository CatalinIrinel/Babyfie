import { Box, Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { MdCopyright } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" w="100%">
      <Flex bg="brand.200" justifyContent="space-evenly">
        <UnorderedList listStyleType="none" color="#000" py="1.5rem">
          <ListItem>
            <Text
              textDecoration="underline"
              letterSpacing="1.5px"
              fontWeight="bold"
              fontSize="1.2rem"
            >
              Quick Menu
            </Text>
          </ListItem>
          <ListItem
            _hover={{ color: 'brand.600' }}
            transition=".3s ease-in-out"
          >
            <Link to="/">Home</Link>
          </ListItem>
          <ListItem
            _hover={{ color: 'brand.600' }}
            transition=".3s ease-in-out"
          >
            <Link to="/products">Products</Link>
          </ListItem>
          <ListItem
            _hover={{ color: 'brand.600' }}
            transition=".3s ease-in-out"
          >
            <Link to="/about">About</Link>
          </ListItem>
          <ListItem
            _hover={{ color: 'brand.600' }}
            transition=".3s ease-in-out"
          >
            <Link to="/contact">Contact</Link>
          </ListItem>
        </UnorderedList>

        <UnorderedList listStyleType="none" color="#000" py="1.5rem">
          <ListItem>
            <Text
              textDecoration="underline"
              letterSpacing="1.5px"
              fontWeight="bold"
              fontSize="1.2rem"
            >
              User Menu
            </Text>
          </ListItem>
          <ListItem
            _hover={{ color: 'brand.600' }}
            transition=".3s ease-in-out"
          >
            <Link to="/profile">Profile</Link>
          </ListItem>
          <ListItem
            _hover={{ color: 'brand.600' }}
            transition=".3s ease-in-out"
          >
            <Link to="/order-history">Order History</Link>
          </ListItem>
        </UnorderedList>

        <UnorderedList listStyleType="none" color="#000" py="1.5rem">
          <ListItem>
            <Text
              textDecoration="underline"
              letterSpacing="1.5px"
              fontWeight="bold"
              fontSize="1.2rem"
            >
              Policies
            </Text>
          </ListItem>
          <ListItem
            _hover={{ color: 'brand.600' }}
            transition=".3s ease-in-out"
          >
            <Link to="/terms">Terms and Conditions</Link>
          </ListItem>
          <ListItem
            _hover={{ color: 'brand.600' }}
            transition=".3s ease-in-out"
          >
            <Link to="/privacy">Privacy Policy</Link>
          </ListItem>
          <ListItem
            _hover={{ color: 'brand.600' }}
            transition=".3s ease-in-out"
          >
            <Link to="/shipping-policy">Shipping Policy</Link>
          </ListItem>
          <ListItem
            _hover={{ color: 'brand.600' }}
            transition=".3s ease-in-out"
          >
            <Link to="/return">Return Policy</Link>
          </ListItem>
        </UnorderedList>
      </Flex>
      <Flex
        px="1rem"
        py="1rem"
        w="100%"
        bg="brand.100"
        justifyContent="space-between"
        fontSize={['.8rem', '1rem']}
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <Text w="fit-content" fontSize="3xl" className="logo">
            Babyfie
          </Text>
        </Box>
        <Box
          display="flex"
          flexDirection={['column', 'row']}
          alignItems="center"
          justifyContent="center"
        >
          <Text>All rights reserved &nbsp;</Text>
          <MdCopyright style={{ margin: 0 }} />
          <Text>
            &nbsp; Created by{' '}
            <Link style={{ color: 'green' }} to="https://peakngo.com">
              Peak & Go - Web
            </Link>
          </Text>
        </Box>
        <Box
          display="flex"
          justifyContent="space-evenly"
          flexDirection={['column', 'row']}
        >
          <Box mb={['.5rem', '0']}>
            <a
              className="icon"
              href="https://facebook.com"
              target="_blank"
              aria-label="facebook"
              rel="noreferrer"
            >
              <i className="ri-facebook-circle-line ri-2x"></i>
            </a>
          </Box>
          <Box ml={['0', '1.5rem']}>
            <a
              className="icon2"
              href="https://instagram.com"
              target="_blank"
              aria-label="instagram"
              rel="noreferrer"
            >
              <i className="ri-instagram-line ri-2x"></i>
            </a>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default Footer;
