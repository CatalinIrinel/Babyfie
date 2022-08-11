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
          <Heading as={'h1'}>Vrei să stii mai mult?</Heading>
        </Box>
        <Box w={'100%'}>
          <Box w={'100%'} mb="1.5rem">
            <Heading as={'h2'}>Informatii generale</Heading>
            <UnorderedList>
              <ListItem></ListItem>
            </UnorderedList>
          </Box>
          <Accordion w={'full'} allowToggle>
            <AccordionItem border={'2px solid hsl(267, 30%, 57%)'}>
              <Heading as={'h2'}>
                <AccordionButton
                  flex={'1'}
                  display={'flex'}
                  justifyContent={'space-between'}
                >
                  <Text fontWeight={'bold'}>Patut Combi Maxi</Text>{' '}
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel display={'flex'} gap="1rem">
                <UnorderedList>
                  <ListItem>
                    Dimensiunile exterioare: 180(L) x 75(l) cm
                  </ListItem>
                  <ListItem>Dimensiunea interioara: 110(L) x 68(l) cm</ListItem>
                  <ListItem>
                    Dimensiunile interioare ale patutului junior: 173 (L) x 70
                    (l) cm
                  </ListItem>
                  <ListItem>Timp de executie: 4 - 6 zile lucratoare</ListItem>
                  <ListItem>Greutate: 80 kg</ListItem>
                </UnorderedList>
                <UnorderedList>
                  <ListItem>Sistem modular, 3 in 1</ListItem>
                  <ListItem>Sistem de balansoar</ListItem>
                  <ListItem>
                    Comoda dotata cu 3 sertare si spatiu pentru infasat/schimbat
                  </ListItem>
                  <ListItem>
                    Se poate transforma in pat de adolescent, comoda si birou.{' '}
                  </ListItem>
                  <ListItem>
                    Grilajul saltelei este reglabil pe 3 nivele
                  </ListItem>
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
        {/* <Box textAlign={'center'} paddingY="2rem" w={'100%'}>
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
        </Box> */}
      </Box>
    </Box>
  );
}

export default AboutPage;
