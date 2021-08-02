import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as BuilderSVG } from "../../assets/icons/query-builder.svg";
import { ReactComponent as GraphViewSVG } from "../../assets/icons/graph-view.svg";
import LocationTitle from "./LocationTitle";
import "./style.scss";

import DataViewer from "./DataViewer";
import CSVModal from "./CSVModal";
import SwitchSection from "./SwitchSection";

function RightModal(props) {
  const { children } = props;
  const [showDataCharts, setShowDataCharts] = useState(false);

  return (
    <div className="right-modal">
      {/* TODO: remove hard-coded school loc */}
      <LocationTitle location="gmhs" />
      {showDataCharts ? <DataViewer /> : <CSVModal school="gmhs" />}
      <SwitchSection
        svg={showDataCharts ? <BuilderSVG /> : <GraphViewSVG />}
        text={
          showDataCharts ? "Open Data Query Builder" : "Return to Graph View"
        }
        onClick={(e) => {
          setShowDataCharts(!showDataCharts);
          console.log("Yeetus");
        }}
      />
    </div>
  );
}

export default RightModal;
