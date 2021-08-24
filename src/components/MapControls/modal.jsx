import React from 'react';
import styled from 'styled-components';
import SatelliteMapImg from '../../assets/img/satellite-map.png';
import ClassicMapImg from '../../assets/img/classic-map.png';

function modal({ mapType, setMapType, setIsModalVisible }) {
  return (
    <Container>
      <Header>Layers</Header>
      <MapTypeContainer>
        <ClassicTypeButton
          mapType={mapType}
          onClick={() => setMapType('classic')}
        ></ClassicTypeButton>
        <SatelliteTypeButton
          mapType={mapType}
          onClick={() => setMapType('satellite')}
        ></SatelliteTypeButton>
      </MapTypeContainer>
      <ModalCloseButton onClick={() => setIsModalVisible(false)}>
        <ModalCloseIcon
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.6276 5.71076L5.60204 15.4826C5.20654 15.8681 5.19843 16.5012 5.58391 16.8967C5.9694 17.2922 6.60251 17.3003 6.99801 16.9148L17.0235 7.14298C17.419 6.75749 17.4272 6.12437 17.0417 5.72888C16.6562 5.33338 16.0231 5.32527 15.6276 5.71076Z"
            fill="#616161"
          />
          <path
            d="M16.9146 15.6276L7.14293 5.60198C6.75744 5.20648 6.12433 5.19836 5.72883 5.58384C5.33333 5.96933 5.32521 6.60244 5.71069 6.99794L15.4824 17.0236C15.8679 17.4191 16.501 17.4272 16.8965 17.0417C17.292 16.6562 17.3001 16.0231 16.9146 15.6276Z"
            fill="#616161"
          />
        </ModalCloseIcon>
      </ModalCloseButton>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  z-index: 4;
  bottom: 2rem;
  right: 9rem;
  width: 20rem;
  background-color: #f4f4f4;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  padding: 0.3rem;
  box-sizing: border-box;
  background-color: #616161;
  color: #f9f9f9;
  font-family: 'Vickey', serif;
  font-size: 1.05rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
`;

const MapTypeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.2rem 0.4rem;
  justify-content: space-evenly;
`;

const MapTypeButton = styled.div`
  width: 8rem;
  height: 5.5rem;
  border-radius: 1rem;
  cursor: pointer;
`;

const ClassicTypeButton = styled(MapTypeButton)`
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    url(${ClassicMapImg});
  background-size: cover;
  background-position: center center;
  outline: ${(props) =>
    props.mapType === 'classic'
      ? '0.3rem solid #616161'
      : '0.3rem solid transparent'};
`;

const SatelliteTypeButton = styled(MapTypeButton)`
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0) 100%
    ),
    url(${SatelliteMapImg});
  background-size: cover;
  background-position: center center;
  outline: ${(props) =>
    props.mapType === 'satellite'
      ? '0.3rem solid #616161'
      : '0.3rem solid transparent'};
`;

const ModalCloseButton = styled.div`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  width: 1.85rem;
  height: 1.85rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #f4f4f4;
  cursor: pointer;
`;
const ModalCloseIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
`;

export default modal;
