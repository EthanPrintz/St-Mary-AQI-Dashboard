import React from 'react';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';

function LeftCol() {
  return (
    <Container>
      <LeftColHeader>
        <ReactSVG src="./img/logos/openq-logo.svg" />
      </LeftColHeader>
    </Container>
  );
}

const Container = styled.div`
  width: 20rem;
  height: 90vh;
  position: absolute;
  z-index: 3;
  top: 5vh;
  left: 5vh;
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
`;

export default LeftCol;
