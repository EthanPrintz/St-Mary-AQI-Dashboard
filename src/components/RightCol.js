import React from 'react';
import { ReactSVG } from 'react-svg';
import styled from 'styled-components';

function RightCol(props) {
  return (
    <Container>
	  {props.children}
    </Container>
  );
}

const Container = styled.div`
  width: 25rem;
  height: 85vh;
  position: absolute;
  z-index: 3;
  top: 5vh;
  right: 5vh;
  border-radius: 2rem;
  background-color: #f4f4f4;
  text-align: center;
`;


export default RightCol;
