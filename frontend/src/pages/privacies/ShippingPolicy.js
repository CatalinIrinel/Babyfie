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
import { shippingData } from './data';

function ShippingPolicy() {
  return (
    <Flex h="auto" mx="3rem" my="4rem" justifyContent="center">
      <Helmet>
        <title>Shipping Policy - Babyfie</title>
      </Helmet>
      <Box w="100%" maxW="1100px">
        <Heading as="h1" textTransform="uppercase">
          Shipping Policy
        </Heading>
        <Text>Last updated May 29,2022</Text>
        <Text>
          This Shipping & Delivery Policy is part of our Terms and Conditions
          ("Terms") and should be therefore read alongside our main Terms:&nbsp;
          <a href="https://babyfie.eu/terms">https://babyfie.eu/terms</a>.
          Please carefully review our Shipping & Delivery Policy when purchasing
          our products. This policy will apply to any order you place with us.{' '}
        </Text>
        <Accordion my="2rem" allowToggle allowMultiple>
          {shippingData.map((item) => (
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

export default ShippingPolicy;
