import React from 'react';
import styled from 'styled-components';
import { convertAQIToColor } from '../../utils/conversions';

function SchoolContainer({
  schoolName,
  aqi,
  schoolCode,
  selectedSchoolID,
  setSelectedSchoolID,
}) {
  return (
    <Container
      aqi={aqi}
      schoolCode={schoolCode}
      onClick={() => setSelectedSchoolID(schoolCode)}
      selectedSchoolID={selectedSchoolID}
    >
      <AQINum>{aqi}</AQINum>
      <School>{schoolName}</School>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 0.4rem;
  font-size: 0.88rem;
  box-sizing: border-box;
  color: #f9f9f9;
  font-family: 'PT Serif', sans-serif;
  cursor: pointer;
  font-weight: 700;
  background-color: ${(props) =>
    props.selectedSchoolID === props.schoolCode
      ? '#616161'
      : convertAQIToColor(props.aqi)};
  display: flex;
  flex-direction: row;
  &:hover {
    filter: brightness(0.96);
  }
`;
const AQINum = styled.div`
  margin-right: 0.8rem;
`;
const School = styled.div`
  max-width: 16.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default SchoolContainer;
