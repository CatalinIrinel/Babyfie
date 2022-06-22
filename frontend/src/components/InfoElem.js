import styled from 'styled-components/macro';

export const InfoContainer = styled.div`
  height: 100vh;

  @media screen and (max-width: 768px) {
    padding: 100px 0;
    height: auto;
  }

  @media screen and (max-width: 480px) {
    overflow: hidden;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  justify-content: center;
`;

export const InfoRow = styled.div`
  display: grid;
  grid-auto-columns: minmax(auto, 1fr);
  align-items: center;
  grid-template-areas: ${({ imgStart }) =>
    imgStart ? `'col2 col1'` : `'col1 col2'`};

  @media screen and (max-width: 768px) {
    grid-template-areas: ${({ imgStart }) =>
      imgStart ? `'col1''col2'` : `'col1 col1' 'col2 col2'`};
  }
`;
export const Column1 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col1;
`;

export const Column2 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col2;
`;
export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
`;

export const TopLine = styled.p`
  color: hsl(202, 65%, 59%);
  font-size: 1.4rem;
  line-height: 1rem;
  font-weight: 700;
  letter-spacing: 1.4px;
  margin-bottom: 1rem;
`;

export const Heading = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 3rem;
  line-height: 1.1;
  font-weight: 600;
  color: #000;

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;

export const Description = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: #000;
`;

export const ImgWrap = styled.div`
  max-width: 555px;
  height: 100%;
`;
