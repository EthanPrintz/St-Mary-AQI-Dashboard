import React from 'react';
import styled from 'styled-components';
import { ReactComponent as OpenAQ } from '../assets/logos/openaq-logo.svg';
import { ReactComponent as StMary } from '../assets/logos/st-mary-logo.svg';
import SchoolContainer from './SchoolContainer';

function LeftCol({ combinedData, selectedSchoolID, setSelectedSchoolID }) {
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
      <SectionTitle>High Schools</SectionTitle>
      {combinedData
        .filter((school) => school.category === 'High')
        .map((school, i) => {
          return (
            <SchoolContainer
              schoolName={school.name}
              key={'school-' + i}
              aqi={school.liveAQI}
              setSelectedSchoolID={setSelectedSchoolID}
              schoolCode={school.id}
              selectedSchoolID={selectedSchoolID}
            />
          );
        })}
      <SectionTitle>Middle Schools</SectionTitle>
      {combinedData
        .filter((school) => school.category === 'Middle')
        .map((school, i) => {
          return (
            <SchoolContainer
              schoolName={school.name}
              key={'school-' + i}
              aqi={school.liveAQI}
              setSelectedSchoolID={setSelectedSchoolID}
              schoolCode={school.id}
              selectedSchoolID={selectedSchoolID}
            />
          );
        })}
      <SectionTitle>Elementary Schools</SectionTitle>
      {combinedData
        .filter((school) => school.category === 'Elementary')
        .map((school, i) => {
          return (
            <SchoolContainer
              schoolName={school.name}
              key={'school-' + i}
              aqi={school.liveAQI}
              setSelectedSchoolID={setSelectedSchoolID}
              schoolCode={school.id}
              selectedSchoolID={selectedSchoolID}
            />
          );
        })}
      <SectionTitle>Other Facilities</SectionTitle>
      {combinedData
        .filter((school) => school.category === 'Other')
        .map((school, i) => {
          return (
            <SchoolContainer
              schoolName={school.name}
              key={'school-' + i}
              aqi={school.liveAQI}
              setSelectedSchoolID={setSelectedSchoolID}
              schoolCode={school.id}
              selectedSchoolID={selectedSchoolID}
            />
          );
        })}
    </Container>
  );
}

const Container = styled.div`
  width: 16.5rem;
  height: 92vh;
  position: absolute;
  z-index: 3;
  top: 4vh;
  left: 4vh;
  border-radius: 2rem;
  background-color: #f4f4f4;
  overflow-y: scroll;
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
  height: 3.2rem;
  width: 3.2rem;
`;
const StMaryLogo = styled(StMary)`
  height: 2.2rem;
  width: 9.6rem;
`;
const SectionTitle = styled.div`
  font-family: 'Vickey', 'PT Serif', serif;
  font-size: 0.92rem;
  width: 100%;
  padding: 0.7rem;
  color: #616161;
  text-align: center;
  box-sizing: border-box;
`;

export default LeftCol;
