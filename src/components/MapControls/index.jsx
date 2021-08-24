import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as LayerIcon } from '../../assets/icons/layers.svg';
import { ReactComponent as PositionIcon } from '../../assets/icons/position.svg';
import Modal from './modal';

function MapControls({ mapType, setMapType }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <Container>
        {isModalVisible ? (
          <LayerButtonSelected
            onClick={() => setIsModalVisible(!isModalVisible)}
          >
            <LayerIconSelected />
          </LayerButtonSelected>
        ) : (
          <LayerButton onClick={() => setIsModalVisible(!isModalVisible)}>
            <LayerIconUnselected />
          </LayerButton>
        )}
        <LayerButton>
          <PositionIconStyled />
        </LayerButton>
      </Container>
      {isModalVisible && (
        <Modal
          mapType={mapType}
          setMapType={setMapType}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </>
  );
}

const Container = styled.div`
  position: absolute;
  z-index: 3;
  bottom: 0;
  right: 0;
  width: 7rem;
  height: 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const LayerButton = styled.div`
  display: flex;
  background-color: #f4f4f4;
  border-radius: 100%;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  transition: 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #ebebeb;
  }
`;

const LayerButtonSelected = styled(LayerButton)`
  background-color: #616161;
  &:hover {
    background-color: #525252;
  }
`;

const LayerIconUnselected = styled(LayerIcon)`
  width: 3rem;
  height: 3rem;
  fill: #616161;
`;
const LayerIconSelected = styled(LayerIconUnselected)`
  fill: #f4f4f4;
`;

const PositionIconStyled = styled(PositionIcon)`
  width: 3rem;
  height: 3rem;
  fill: #616161;
`;
export default MapControls;
