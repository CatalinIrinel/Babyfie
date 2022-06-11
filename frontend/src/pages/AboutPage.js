import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet-async';

function AboutPage() {
  return (
    <Box
      minH={'60vh'}
      paddingY="2rem"
      paddingX="4rem"
      display="flex"
      justifyContent="center"
    >
      <Helmet>
        <title>Despre - Babyfie</title>
      </Helmet>
      <Heading as="h1">AboutPage</Heading>
    </Box>
  );
}

export default AboutPage;
