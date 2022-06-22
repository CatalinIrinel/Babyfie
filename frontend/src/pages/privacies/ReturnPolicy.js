import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { returnData } from './data';

function ReturnPolicy() {
  return (
    <Flex h="auto" mx="3rem" py="4rem" justifyContent="center">
      <Helmet>
        <title>Return Policy - Babyfie</title>
      </Helmet>
      <Box w="100%" maxW="1100px">
        <Heading as="h1" textTransform="uppercase">
          Return Policy
        </Heading>
        <Text>Last updated May 29,2022</Text>
        <Text>
          Thank you for your purchase. We hope you are happy with your purchase.
          However, if you are not completely satisfied with your purchase for
          any reason, you may return it to us for a full refund or an exchange.
          Please see below for more information on our return policy.
        </Text>
        <Accordion my="2rem" allowToggle allowMultiple>
          {returnData.map((item) => (
            <AccordionItem key={item.title}>
              <h2>
                <AccordionButton>
                  <Box flex={1} textAlign="left">
                    <Heading as="h3" fontSize="2xl" textTransform="uppercase">
                      {item.title}
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {item.texts.map((text, index) => (
                  <Box key={index} mb="1rem" textAlign="justify">
                    {text}
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Flex>
  );
}

export default ReturnPolicy;
