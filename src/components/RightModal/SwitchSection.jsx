import React from "react";

function SwitchSection(props) {
  const { svg, text, onClick } = props;
  return (
    <footer className="footer">
      <div className="switch-button-container" onClick={onClick}>
        {svg}
        <span>{text}</span>
      </div>
    </footer>
  );
}

export default SwitchSection;
