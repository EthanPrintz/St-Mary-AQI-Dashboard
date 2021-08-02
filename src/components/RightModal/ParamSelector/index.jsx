import React from 'react';
import SelectionPill from './SelectionPill';
import "./style.scss"

function ParamSelector(props) {
  const {
    dataState, setDataState, queryParamType, allowMultiple, widget
  } = props;

  return (
    <div className={`selection-container ${widget ? "widget" : ""}`}>
      <div className="selection-title-container">
        <span className="selection-title">Select {queryParamType}</span>
      </div>
      <div className={`horizontal-list-container ${widget ? "widget" : ""}`}>
        {dataState.map((type) => (
          <SelectionPill
            dataParameter={type}
            state={dataState}
            changeState={setDataState}
            allowMultiple={allowMultiple}
            index={0}
          />
        ))}
      </div>
    </div>
  );
}

export default ParamSelector;
