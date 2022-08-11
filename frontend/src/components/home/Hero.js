import {
  Box,
  Button,
  Heading,
  Text,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function Hero() {
  const navigate = useNavigate();
  const [slider, setSlider] = useState(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '20%', md: '30px' });

  const cards = [
    '/images/hero.webp',
    '/images/hero2.webp',
    '/images/hero3.webp',
  ];
  return (
    <Box
      w="100%"
      h="600px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        position={'relative'}
        w={'full'}
        h={'600px'}
        overflow={'hidden'}
        px="0"
        py="0"
      >
        <IconButton
          aria-label="left-arrow"
          borderRadius="full"
          bg="brand.500"
          position={'absolute'}
          top={top}
          left={side}
          transform={'translate(0%,-50%)'}
          zIndex={'2'}
          _hover={{ background: 'brand.600', color: '#fff' }}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt style={{ width: '30px', height: '30px' }} />
        </IconButton>

        <IconButton
          aria-label="right-arrow"
          borderRadius="full"
          bg="brand.500"
          position={'absolute'}
          top={top}
          right={side}
          zIndex={'2'}
          transform={'translate(0%,-50%)'}
          _hover={{ background: 'brand.600', color: '#fff' }}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt style={{ width: '30px', height: '30px' }} />
        </IconButton>
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((url, index) => (
            <Box
              key={index}
              h={'600px'}
              position={'relative'}
              backgroundPosition={'center'}
              backgroundRepeat={'no-repeat'}
              backgroundSize={'cover'}
              backgroundImage={`url(${url})`}
            />
          ))}
        </Slider>
      </Box>
      <Box
        className="glass"
        position="absolute"
        zIndex={3}
        bgColor="rgba(0,0,0,0.14)"
        boxShadow={'0 0 30px #000'}
        borderRadius={'1rem'}
        px="4rem"
        py="2rem"
        display="flex"
        flexDirection={'column'}
        alignItems={'center'}
      >
        <Heading
          fontSize={['1.8rem', '3rem']}
          mb="0.8rem"
          as="h1"
          color={'#fff'}
          w={'100%'}
          textAlign={'center'}
        >
          Cele mai confortabile pătuțuri
        </Heading>
        <Text
          fontSize={['1.4rem', '2rem']}
          mb="0.8rem"
          color={'#fff'}
          w={'100%'}
          textAlign={'center'}
        >
          Alege un pătuț unic pentru copilul tău
        </Text>
        <Button
          bg="brand.300"
          transitionDuration=".8s"
          _hover={{ background: 'brand.500', color: '#fff' }}
          size="lg"
          onClick={() => navigate('/our-products')}
        >
          Produsele noastre
        </Button>
      </Box>
    </Box>
  );
}

export default Hero;
