import React from 'react';
import './style.scss';
import SelectionPill from './SelectionPill';

function ParamSelector(props) {
  const {
    dataState, setDataState, queryParamType, allowMultiple,
  } = props;

  return (
    <div className="selection-container">
      <div className="selection-title-container">
        <span className="selection-title">
          Select
          {' '}
          {queryParamType}
        </span>
      </div>
      <div className="horizontal-list-container">
        {
          dataState.map((type) => (
            <SelectionPill
              dataParameter={type}
              state={dataState}
              changeState={setDataState}
              allowMultiple={allowMultiple}
              index={0}
            />
          ))
        }
      </div>
    </div>
  );
}

export default ParamSelector;
