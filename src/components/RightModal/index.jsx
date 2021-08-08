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
  const { combinedData, selectedSchoolID } = props;
  return (
    <div className="right-modal">
      <LocationTitle
        schoolName={
          combinedData.length !== 0
            ? combinedData.find((school) => school.id === selectedSchoolID)
                ?.name
            : "School Name"
        }
        liveAQI={
          combinedData.length !== 0
            ? combinedData.find((school) => school.id === selectedSchoolID)
                ?.liveAQI
            : 0
        }
      />
      {showDataCharts ? (
        <DataViewer
          combinedData={combinedData}
          selectedSchoolID={selectedSchoolID}
        />
      ) : (
        <CSVModal
          sensors={combinedData[selectedSchoolID - 1].sensors}
        />
      )}
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
