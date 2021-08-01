import React from 'react';
import styled from 'styled-components';
import BarChart from '../components/BarChart';

function RightModal(props) {
  return <Container>{props.children}</Container>;
}

const Container = styled.div`
  position: absolute;
  width: 30rem;
  min-height: 34vh;
  top: 5vh;
  right: 5vh;
  border-radius: 2rem;
  z-index: 3;
  background-color: #f4f4f4;
`;

export default RightModal;
