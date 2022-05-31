import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';

function HomePage() {
  return (
    <Box paddingY="2rem" paddingX="4rem" display="flex" justifyContent="center">
      <Helmet>
        <title>Acasa - Babyfie</title>
      </Helmet>
      <Hero />
    </Box>
  );
}

export default HomePage;
