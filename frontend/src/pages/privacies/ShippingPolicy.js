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
import { shippingDataRo } from './data';

function ShippingPolicy() {
  return (
    <Flex h="auto" mx="3rem" py="4rem" justifyContent="center">
      <Helmet>
        <title>Shipping Policy - Babyfie</title>
      </Helmet>
      <Box w="100%" maxW="1100px">
        <Heading as="h1" textTransform="uppercase">
          POLITICA DE LIVRARE
        </Heading>
        <Text>
          <strong>Ultima actualizare 29 mai 2022</strong>
        </Text>
        <Text>
          Această politică de livrare și livrare face parte din Termenii și
          condițiile noastre ("Termeni") și, prin urmare, trebuie citită
          împreună cu Termenii noștri principali: &nbsp;
          <a href="https://babyfie.eu/terms">https://babyfie.eu/terms</a>.Vă
          rugăm să consultați cu atenție Politica noastră de livrare și livrare
          atunci când cumpărați produsele noastre. Această politică se va aplica
          oricărei comenzi pe care o plasați la noi.
        </Text>
        <Accordion my="2rem" allowToggle allowMultiple>
          {shippingDataRo.map((item) => (
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
