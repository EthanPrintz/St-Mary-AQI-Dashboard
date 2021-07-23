import React from 'react';
import styled from 'styled-components';
import { ReactComponent as OpenAQ } from '../assets/logos/openaq-logo.svg';
import { ReactComponent as StMary } from '../assets/logos/st-mary-logo.svg';

function LeftCol() {
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

export default LeftCol;
