import React, { useState } from "react";
import { ReactComponent as BuilderSVG } from "../../assets/icons/query-builder.svg";
import { ReactComponent as GraphViewSVG } from "../../assets/icons/graph-view.svg";
import LocationTitle from "./LocationTitle";
import "./style.scss";

import DataViewer from "./DataViewer";
import CSVModal from "./CSVModal";
import SwitchSection from "./SwitchSection";

function RightModal(props) {
  const [showDataCharts, setShowDataCharts] = useState(true);
  console.log(props.combinedData)

  return (
    <div className="right-modal">
      {/* TODO: remove hard-coded school loc */}
      <LocationTitle location="gmhs" schoolName = {props.combinedData.length !== 0 ? props.combinedData[props.selectedSchoolID].name : "School Name"}
        liveAQI={props.combinedData.length !== 0 ? props.combinedData[props.selectedSchoolID].liveAQI : 0}/>
      {showDataCharts ? <DataViewer combinedData={props.combinedData} selectedSchoolID={props.selectedSchoolID}/> : <CSVModal school="gmhs" />}
      <SwitchSection
        svg={showDataCharts ? <BuilderSVG /> : <GraphViewSVG />}
        text={
          showDataCharts ? "Open Data Query Builder" : "Return to Graph View"
        }
        onClick={(e) => {
          setShowDataCharts(!showDataCharts);
        }}
      />
    </div>
  );
}

export default RightModal;
