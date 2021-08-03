import React from "react";
import { convertAQIToColor } from '../../../utils/conversions';

class CurrentSensorDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.props = props;
    this.width = this.props.dimensions[0];
    this.height = this.props.dimensions[1];
    this.margin = this.props.dimensions[2];

  }
  

  render() {
    return (
      <div ref={this.myRef} className="sensor-readings-container">
        <div className="average-container">
          <span
            className="average-index"
            style={{
              color: convertAQIToColor(this.props.liveAQI),
            }}
          >
            {this.props.liveAQI}
          </span>
          <span className="average-desc">
            Current Averaged
            <br />
            Air Quality Index
          </span>
        </div>
        <div className="individual-sensors-container">
          {this.props.liveSensors.map((val, i) => (
            <div className="sensor" key={"sensor-" + i}>
              <span
                className="individual-sensor-reading"
                height={this.height * 0.15}
                style={{
			      color: convertAQIToColor(this.props.liveSensors[i].liveAQI),
                }}
              >
                {this.props.liveSensors[i].liveAQI}
              </span>
              <span
                className="individual-sensor-desc"
              >
                {this.props.liveSensors[i].name.replace(" Sensor", "")}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default CurrentSensorDisplay;
