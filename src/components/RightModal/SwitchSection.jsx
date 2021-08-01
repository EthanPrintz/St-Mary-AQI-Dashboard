import React from "react";

function SwitchSection( props ){
    const { svg, text, onClick } = props;
    return (
        <div 
            className="modal-switch"
            onClick={onClick}
        >
            {svg}
            <span>{text}</span>
        </div>
    )
}

export default SwitchSection