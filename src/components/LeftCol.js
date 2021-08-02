import React from 'react';
import styled from 'styled-components';
import { ReactComponent as OpenAQ } from '../assets/logos/openaq-logo.svg';
import { ReactComponent as StMary } from '../assets/logos/st-mary-logo.svg';
import SchoolContainer from './SchoolContainer';

function LeftCol({ combinedData, setSelectedSchoolID }) {
  return (
    <Container>
      <LeftColHeader>
        <a href="https://openaq.org">
          <OpenAQLogo />
        </a>
        <a href="https://smchd.org/breathewell/">
          <StMaryLogo />
        </a>
      </LeftColHeader>
      <SectionTitle>Elementary Schools</SectionTitle>
      {combinedData
        .filter((school) => school.category === 'Elementary')
        .map((school) => {
          return (
            <SchoolContainer
              schoolName={school.name}
              aqi={school.liveAQI}
              onClick={() => setSelectedSchoolID(school.id)}
            />
          );
        })}
      <SectionTitle>Middle Schools</SectionTitle>
      <SectionTitle>High Schools</SectionTitle>
      <SectionTitle>Other Facilities</SectionTitle>
    </Container>
  );
}

const Container = styled.div`
  width: 18.5rem;
  height: 92vh;
  position: absolute;
  z-index: 3;
  top: 4vh;
  left: 4vh;
  border-radius: 2rem;
  background-color: #f4f4f4;
`;

const LeftColHeader = styled.div`
  width: 100%;
  height: 5rem;
  background-color: #f9f9f9;
  border-bottom: 0.15rem solid #ededed;
  border-top-right-radius: 2rem;
  border-top-left-radius: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 0.4rem;
  box-sizing: border-box;
`;

const OpenAQLogo = styled(OpenAQ)`
  height: 4rem;
  width: 4rem;
`;
const StMaryLogo = styled(StMary)`
  height: 2.75rem;
  width: 12rem;
`;
const SectionTitle = styled.div`
  font-family: 'Vickey', 'PT Serif', serif;
  font-size: 1.1rem;
  width: 100%;
  padding: 0.7rem;
  color: #616161;
  text-align: center;
  box-sizing: border-box;
`;

export default LeftCol;
