import React from 'react';
import './style.scss';
import SelectionPill from './SelectionPill';

function HParamSelector(props) {
  const {
    dataState, setDataState, queryParamType, allowMultiple,
  } = props;

  return (
    <div className="selection-container horizontal">
      <div className="selection-title-container horizontal">
        <span className="selection-title">Select {queryParamType}</span>
      </div>
      <div className="horizontal-list-container horizontal">
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

export default HParamSelector;
