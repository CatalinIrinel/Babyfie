import {
  Box,
  Flex,
  ListItem,
  Text,
  UnorderedList,
  Link as LinkChak,
} from '@chakra-ui/react';
import React from 'react';
import { MdCopyright } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      w="100%"
      position={'relative'}
      bottom={'0'}
    >
      <Flex bg="brand.200" justifyContent="space-evenly">
        <UnorderedList listStyleType="none" color="#000" py="1.5rem">
          <ListItem>
            <Text
              textDecoration="underline"
              letterSpacing="1.5px"
              fontWeight="bold"
              fontSize="1.2rem"
            >
              Meniu Rapid
            </Text>
          </ListItem>
          <Link to="/">
            {' '}
            <ListItem
              _hover={{ color: 'brand.600' }}
              transition=".3s ease-in-out"
            >
              Acasă
            </ListItem>
          </Link>
          <Link to="/our-products">
            <ListItem
              _hover={{ color: 'brand.600' }}
              transition=".3s ease-in-out"
            >
              Produse
            </ListItem>
          </Link>
          <Link to="/about">
            <ListItem
              _hover={{ color: 'brand.600' }}
              transition=".3s ease-in-out"
            >
              Despre
            </ListItem>
          </Link>
          <Link to="/contact">
            <ListItem
              _hover={{ color: 'brand.600' }}
              transition=".3s ease-in-out"
            >
              Contact
            </ListItem>
          </Link>
        </UnorderedList>

        <UnorderedList listStyleType="none" color="#000" py="1.5rem">
          <ListItem>
            <Text
              textDecoration="underline"
              letterSpacing="1.5px"
              fontWeight="bold"
              fontSize="1.2rem"
            >
              Meniu Utilizator
            </Text>
          </ListItem>
          <Link to="/profile">
            <ListItem
              _hover={{ color: 'brand.600' }}
              transition=".3s ease-in-out"
            >
              Profil
            </ListItem>
          </Link>
          <Link to="/order-history">
            <ListItem
              _hover={{ color: 'brand.600' }}
              transition=".3s ease-in-out"
            >
              Istoric Comenzi
            </ListItem>
          </Link>
        </UnorderedList>

        <UnorderedList listStyleType="none" color="#000" py="1.5rem">
          <ListItem>
            <Text
              textDecoration="underline"
              letterSpacing="1.5px"
              fontWeight="bold"
              fontSize="1.2rem"
            >
              Politici
            </Text>
          </ListItem>
          <Link to="/terms">
            <ListItem
              _hover={{ color: 'brand.600' }}
              transition=".3s ease-in-out"
            >
              Termeni și Condiții
            </ListItem>
          </Link>
          <Link to="/privacy">
            <ListItem
              _hover={{ color: 'brand.600' }}
              transition=".3s ease-in-out"
            >
              Politică GDPR
            </ListItem>
          </Link>
          <Link to="/shipping-policy">
            {' '}
            <ListItem
              _hover={{ color: 'brand.600' }}
              transition=".3s ease-in-out"
            >
              Politică de livrare
            </ListItem>
          </Link>
          <Link to="/return">
            <ListItem
              _hover={{ color: 'brand.600' }}
              transition=".3s ease-in-out"
            >
              Politică de retur
            </ListItem>
          </Link>
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
            <LinkChak
              style={{ color: 'green' }}
              isExternal
              href="https://peakngo.com"
            >
              Peak & Go - Web
            </LinkChak>
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
