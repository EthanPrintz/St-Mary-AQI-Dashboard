import React, { useState } from "react";
import styled from 'styled-components';
import { ReactComponent as BuilderSVG } from '../../assets/icons/query-builder.svg';
import { ReactComponent as GraphViewSVG } from '../../assets/icons/graph-view.svg';
import LocationTitle from "./LocationTitle";
import './style.scss';

import BarViewController from "./BarViewController";
import SwitchSection from "./SwitchSection";

function RightModal(props){
    const { children } = props
    const [showDataCharts, setShowDataCharts] = useState(true);

    return (
        <Container>
            {/* TODO: remove hard-coded school loc */}
            <LocationTitle location="gmhs" />
            {children}
            <BarViewController/>
            <SwitchSection
                svg={showDataCharts ? <BuilderSVG /> : <GraphViewSVG />}
                text={showDataCharts ? "Open Data Query Builder" : "Return to Graph View"}
                onClick={(e) => {setShowDataCharts(!showDataCharts);
                console.log("Yeetus")}}
            />
        </Container>

    )
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
  font-family: "PT Sans"
`;

export default RightModal;
