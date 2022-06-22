import { Box, Heading, Image, Text } from '@chakra-ui/react';
import React from 'react';

function TeamCard({ img, name, title, description }) {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Box mb={'1rem'}>
        <Image
          boxSize={'250px'}
          objectPosition={'center'}
          objectFit={'cover'}
          borderRadius={'full'}
          src={img}
          alt={name}
        ></Image>
      </Box>
      <Box>
        <Heading color={'brand.400'} fontSize={'1.4rem'} as={'h2'}>
          {name}
        </Heading>
        <Heading fontSize={'.8rem'} as={'h3'}>
          {title}
        </Heading>
        <Text>{description}</Text>
      </Box>
    </Box>
  );
}

export default TeamCard;
