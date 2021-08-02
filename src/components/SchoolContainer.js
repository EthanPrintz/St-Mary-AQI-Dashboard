import React from 'react';
import styled from 'styled-components';
import { convertAQIToColor } from '../utils/conversions';

function SchoolContainer({ schoolName, aqi }) {
  return (
    <Container aqi={aqi}>
      <AQINum>{aqi}</AQINum>
      <School>{schoolName}</School>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 0.4rem;
  font-size: 0.85rem;
  box-sizing: border-box;
  color: #f9f9f9;
  font-family: 'PT Serif', serif;
  font-weight: bold;
  background-color: ${(props) => convertAQIToColor(props.aqi)};
  display: flex;
  flex-direction: row;
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
