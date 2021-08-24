import React from 'react';
import styled from 'styled-components';
import {
  convertAQIToColor,
  convertAQIToDescription,
} from '../../utils/conversions';
import parse from 'html-react-parser';

function InfoHeader({ countyAQI }) {
  return (
    <Container>
      <UpperContainer>
        <FlagIconStyled
          width="27"
          height="27"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.26 3.85999H6V22.42C6 22.8682 5.82194 23.2981 5.50501 23.615C5.18807 23.9319 4.75821 24.11 4.31 24.11C3.86178 24.11 3.43192 23.9319 3.11498 23.615C2.79805 23.2981 2.62 22.8682 2.62 22.42V5.53999C2.6224 5.10203 2.79472 4.68211 3.10065 4.36872C3.40658 4.05533 3.82223 3.87294 4.26 3.85999V3.85999Z"
            fill="#D6D6D6"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 3.88999H20.34C20.6336 3.8926 20.9144 4.01038 21.122 4.21798C21.3296 4.42558 21.4474 4.7064 21.45 4.99999C21.4418 5.27277 21.3393 5.53427 21.16 5.73999L17.78 9.49999L21.15 13.25C21.3455 13.4743 21.4455 13.7662 21.4287 14.0633C21.4119 14.3604 21.2795 14.6391 21.06 14.84C20.8464 15.0179 20.578 15.1167 20.3 15.12H6V3.85999V3.88999Z"
            fill={convertAQIToColor(countyAQI)}
          />
        </FlagIconStyled>
        <CurrentAQI>{countyAQI}</CurrentAQI>
        <AQILabel>
          County <br /> AQI
        </AQILabel>
      </UpperContainer>
      <LowerContainer>
        {parse(convertAQIToDescription(countyAQI))}
      </LowerContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 10rem;
  border-bottom: 0.15rem solid #ededed;
  color: #616161;
`;

const UpperContainer = styled.div`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const FlagIconStyled = styled.svg`
  width: 2.6rem;
  height: 2.6rem;
`;

const CurrentAQI = styled.div`
  font-size: 2.5rem;
  font-family: 'PT Serif', sans-serif;
  padding: 0 0.2rem 0 0.5rem;
`;

const AQILabel = styled.div`
  font-size: 1rem;
  font-family: 'PT Sans', serif;
  font-weight: bold;
  font-style: italic;
  line-height: 1rem;
`;

const LowerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 1rem 1rem 1rem;
  font-family: 'PT Sans', serif;
  font-style: italic;
  font-weight: bold;
  font-size: 0.87rem;
`;
export default InfoHeader;
