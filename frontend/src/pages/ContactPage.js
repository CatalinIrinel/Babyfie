import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet-async';

function ContactPage() {
  return (
    <Box paddingY="2rem" paddingX="4rem" display="flex" justifyContent="center">
      <Helmet>
        <title>Contact - Babyfie</title>
      </Helmet>
      <Heading as="h1">ContactPage</Heading>
    </Box>
  );
}

export default ContactPage;
