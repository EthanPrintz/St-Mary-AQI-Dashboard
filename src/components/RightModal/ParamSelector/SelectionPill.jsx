import React from "react";

function SelectionPill(props) {
  const { dataParameter, state, changeState, allowMultiple } = props;
  const runFunction = props.runFunction 

  function handleFetchChange(e) {
    const newState = [...state];
    const dataChecked = dataParameter.checked;
    if (!allowMultiple) {
      newState.forEach((data) => (data.checked = false));
    }
    dataParameter.checked = !dataChecked;
    changeState(newState);
    console.log(runFunction)
    if(runFunction !== undefined){
      runFunction();
    }
  }

  return (
    <div
      className={`selection-item${dataParameter.checked ? " checked" : ""}`}
      onClick={handleFetchChange}
      onKeyPress={handleFetchChange}
      role="button"
      tabIndex={0}
    >
      <span>{dataParameter.value}</span>
    </div>
  );
}

export default SelectionPill;
