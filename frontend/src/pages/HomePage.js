import { Box, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
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
        py={'6rem'}
        px={'6rem'}
      >
        <Box mb={'4rem'} w={'full'} display={'flex'} justifyContent={'center'}>
          <Heading
            w="fit-content"
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
              <Image
                boxSize={'300px'}
                borderRadius={'full'}
                mb="2rem"
                src={product.image}
                alt={product.name}
              />
              <Box className="buttonEffect">
                <Link to={`/product/${product.slug}`}>More Details</Link>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      {/* Insert parallax */}
      <Parallax
        blur={5}
        bgImage="/images/hero.webp"
        bgImageAlt="babyfie luxury cribs"
        strength={600}
      >
        <div style={{ height: '500px' }} />
      </Parallax>
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
            Why the babyfie cribs?
          </Heading>
        </Box>
        <Box display="flex" flexWrap={'wrap'} justifyContent={'space-between'}>
          {data.promise.map((item) => (
            <Box
              key={item.name}
              display="flex"
              alignItems={'center'}
              flexDirection={'column'}
              my={'2rem'}
            >
              <Image
                boxSize={'150px'}
                objectFit="cover"
                src={item.image}
                alt={item.name}
                mb={'0.5rem'}
              />
              <Text fontWeight={'bold'} textTransform={'uppercase'}>
                {item.name}
              </Text>
              <Box mt={'2rem'} w="300px" textAlign={'center'}>
                <Text>{item.description}</Text>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
