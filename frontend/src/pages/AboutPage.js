import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { productsDescriptions } from '../components/InfoData';

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
          <Heading as={'h1'}>Vrei să știi mai mult?</Heading>
        </Box>
        <Box w={'100%'}>
          <Box w={'100%'} mb="1.5rem">
            <Heading as={'h2'} fontSize={'1.8rem'}>
              Informații generale
            </Heading>
            <UnorderedList>
              <ListItem>Paturile sunt realizate din PAL și MDF.</ListItem>
              <ListItem>Palul folosit are o grosime de 18 mm</ListItem>
              <ListItem>
                Vopseaua folosită este non-toxica, pe bază de apă.
              </ListItem>
              <ListItem>
                Cantul este confecționat din PVC pentru a atenua, eventualele
                loviri.
              </ListItem>
            </UnorderedList>
          </Box>
          <Box w={'100%'} mb="1.5rem">
            <Heading as={'h2'} fontSize={'1.8rem'}>
              Salteaua din fibră de cocos
            </Heading>
            <UnorderedList>
              <ListItem>
                Saltea compusă din 2 straturi din fibră de cocos și spumă
                poliuretanică la mijloc.
              </ListItem>
              <ListItem>
                Salteaua tip sandwich asigură copilului un confort sporit în
                timpul somnului, datorită stratului dublu de fibră de cocos.
              </ListItem>
              <ListItem>Are proprietăți antialergice și antimucegai.</ListItem>
              <ListItem>
                Husa este din material plăcut la atingere, este detașabilă și
                lavabilă.
              </ListItem>
              <ListItem>Salteaua este produsă în România.</ListItem>
            </UnorderedList>
          </Box>

          {productsDescriptions.product.map((item, index) => (
            <Accordion key={index} w={'full'} allowToggle>
              {' '}
              <AccordionItem border={'2px solid hsl(267, 30%, 57%)'}>
                <Heading as={'h2'}>
                  <AccordionButton
                    flex={'1'}
                    display={'flex'}
                    justifyContent={'space-between'}
                  >
                    <Text fontWeight={'bold'}>{item.title}</Text>{' '}
                    <AccordionIcon />
                  </AccordionButton>
                </Heading>
                <AccordionPanel display={'flex'} gap="1rem">
                  {item.description}
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default AboutPage;
