import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { teamData } from '../components/InfoData';
import TeamCard from '../components/TeamCard';

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
      <Box
        w={'full'}
        maxW={'1100px'}
        display={'flex'}
        alignItems={'center'}
        flexDirection={'column'}
        justifyContent={'flex-start'}
      >
        <Box my="2rem" w={'fit-content'}>
          <Heading as={'h1'}>Vrei să cunoști echipa?</Heading>
        </Box>
        <Box textAlign={'center'} paddingY="2rem" w={'100%'}>
          <Box mb={'5rem'} w={'full'}>
            <Heading
              color={'brand.400'}
              fontSize={'1.2rem'}
              lineHeight={'1'}
              letterSpacing={'0.1rem'}
              fontWeight={'700'}
              as={'h3'}
            >
              {teamData.topLine}
            </Heading>
            <Heading
              mb={'1rem'}
              fontSize={'1.6rem'}
              lineHeight={'1.1'}
              fontWeight={'600'}
              as={'h2'}
            >
              {teamData.headline}
            </Heading>
            {/* <Text fontSize={'1.2rem'}>{teamData.text}</Text> */}
          </Box>

          <Box
            w={'100%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-evenly'}
            flexWrap={'wrap'}
          >
            <TeamCard {...teamData.catalin} />
            <TeamCard {...teamData.ferdil} />
            <TeamCard {...teamData.cristina} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AboutPage;
