import { Box, Heading, Image } from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import data from '../data';

function HomePage() {
  return (
    <Box display="flex" justifyContent="center" flexDirection={'column'}>
      <Helmet>
        <title>Acasa - Babyfie</title>
      </Helmet>
      <Hero />
      <Box
        w={'full'}
        bg={'brand.300'}
        display="flex"
        flexWrap={'wrap'}
        flexDirection={'column'}
        py={'3rem'}
        px={'6rem'}
      >
        <Box w={'full'} display={'flex'} justifyContent={'center'}>
          <Heading
            w="fit-content"
            my="2rem"
            textAlign={'center'}
            as={'h2'}
            borderTop={'4px solid hsl(267, 30%, 57%)'}
            borderBottom={'4px solid hsl(267, 30%, 57%)'}
            letterSpacing="3px"
            lineHeight={1.5}
          >
            Our Products
          </Heading>
        </Box>
        <Box display="flex" flexWrap={'wrap'} justifyContent={'space-between'}>
          {data.products.map((product) => (
            <Box
              key={product.slug}
              display="flex"
              alignItems={'center'}
              flexDirection={'column'}
            >
              <Image mb="2rem" src="/images/p1.webp" alt="produsul1" />
              <Box className="buttonEffect">
                <Link to={`/product/${product.slug}`}>More Details</Link>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
