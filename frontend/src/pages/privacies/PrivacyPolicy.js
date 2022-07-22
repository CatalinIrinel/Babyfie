import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { gdprDataRo } from './data';

function PrivacyPolicy() {
  return (
    <Flex h="auto" mx="3rem" py="4rem" justifyContent="center">
      <Helmet>
        <title>Privacy Policy - Babyfie</title>
      </Helmet>
      <Box w="100%" maxW="1100px">
        <Heading as="h1" textTransform="uppercase">
          POLITICA DE CONFIDENȚIALITATE
        </Heading>
        <Text>
          <strong>Ultima actualizare 29 mai 2022</strong>
        </Text>
        <br />
        <Text>
          Această notificare de confidențialitate pentru Babyfie SRL ({' '}
          <strong>„Companie”, „noi”, „noi”,</strong> sau{' '}
          <strong>„nostru”</strong> ,), descrie cum și de ce am putea colecta,
          stoca, folosi și/sau partaja („procesează”) informațiile dvs. atunci
          când utilizați serviciile noastre (<strong>„ Serviciile ”</strong>),
          cum ar fi atunci când:
        </Text>
        <UnorderedList>
          <ListItem>
            Vizitați site-ul nostru web la{' '}
            <Link to="https://babyfie.eu">https://babyfie.eu </Link>sau orice
            site de-al nostru care trimite la această notificare de
            confidențialitate
          </ListItem>
          <ListItem>
            Interacționați cu noi în alte moduri conexe, inclusiv în orice
            vânzări, marketing sau evenimente
          </ListItem>
        </UnorderedList>
        <br />
        <Text>
          <strong>Întrebări sau Nelămuriri?</strong> Citirea acestei notificări
          de confidențialitate vă va ajuta să înțelegeți drepturile și opțiunile
          dvs. de confidențialitate. Dacă nu sunteți de acord cu politicile și
          practicile noastre, vă rugăm să nu utilizați Serviciile noastre. Dacă
          mai aveți întrebări sau nelămuriri, vă rugăm să ne contactați la
          contact@babyfie.eu.
        </Text>
        <Accordion my="2rem" allowToggle allowMultiple>
          {gdprDataRo.map((item) => (
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

export default PrivacyPolicy;
