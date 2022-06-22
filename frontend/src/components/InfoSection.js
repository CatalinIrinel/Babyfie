import { Box, Heading, Image } from '@chakra-ui/react';
import React from 'react';
import {
  Column1,
  Column2,
  Description,
  InfoContainer,
  InfoRow,
  InfoWrapper,
  TextWrapper,
  TopLine,
} from './InfoElem';

function InfoSection({
  imgSrc,
  imgAlt,
  imgStart,
  topLine,
  headline,
  text,
  displayImg,
  dataAosTxt,
  dataAosImg,
  dataAosDuration,
  dataAosEasing,
  dataAosDelayTxt,
  dataAosDelayImg,
}) {
  return (
    <Box
      minH={'60vh'}
      paddingY="2rem"
      paddingX="4rem"
      display="flex"
      justifyContent="center"
    >
      <Box
        display={'flex'}
        alignContent={'center'}
        flexDirection={'column'}
        justifyItems={'center'}
      >
        <InfoContainer>
          <InfoWrapper>
            <InfoRow imgStart={imgStart}>
              <Column1>
                <TextWrapper
                  data-aos={dataAosTxt}
                  data-aos-duration={dataAosDuration}
                  data-aos-easing={dataAosEasing}
                  data-aos-delay={dataAosDelayTxt}
                >
                  <TopLine>{topLine}</TopLine>
                  <Heading>{headline}</Heading>
                  <Description>{text}</Description>
                </TextWrapper>
              </Column1>
              <Column2 style={{ display: `${displayImg}` }}>
                <Image
                  boxSize={'400px'}
                  src={imgSrc}
                  alt={imgAlt}
                  data-aos={dataAosImg}
                  data-aos-duration={dataAosDuration}
                  data-aos-easing={dataAosEasing}
                  data-aos-delay={dataAosDelayImg}
                />
              </Column2>
            </InfoRow>
          </InfoWrapper>
        </InfoContainer>
      </Box>
    </Box>
  );
}

export default InfoSection;
