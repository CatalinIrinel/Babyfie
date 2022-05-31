import { Box, Button, Container, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();
  return (
    <Box w="100%" h="50vh" mt="-2rem" position="relative" zIndex="10">
      <Box position="absolute" zIndex={-1} w="100%" h="100%">
        <Image w="100px" src="/images/hero.webp" alt="Babyfie" />
      </Box>
      <Container position="relative" zIndex="100">
        <Heading as="h1">Most comfortable baby cribs</Heading>
        <Text>Have a look and choose a unique crib for your child</Text>
        <Button size="md" onClick={() => navigate('/products')}>
          Our Products
        </Button>
      </Container>
    </Box>
  );
}

export default Hero;
