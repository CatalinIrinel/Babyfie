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
import { returnDataRo } from './data';

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
        <Text>
          <strong>Ultima actualizare Mai 29,2022</strong>
        </Text>
        <br />
        <Text>
          Vă multumim pentru cumpărăturile făcute. Sperăm că sunteți mulțumit de
          achiziția dvs. Cu toate acestea, dacă nu sunteți complet mulțumit de
          achiziția dvs. din orice motiv, îl puteți returna pentru o rambursare
          completă sau un schimb. Vă rugăm să consultați mai jos pentru mai
          multe informații despre politica noastră de returnare.
        </Text>
        <Accordion my="2rem" allowToggle allowMultiple>
          {returnDataRo.map((item) => (
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
