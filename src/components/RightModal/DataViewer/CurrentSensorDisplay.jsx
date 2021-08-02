import React from "react";

class CurrentSensorDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.props = props;
    this.width = this.props.dimensions[0];
    this.height = this.props.dimensions[1];
    this.margin = this.props.dimensions[2];

    this.backleft = this.props.backleft;
    this.backright = this.props.backright;
    this.front = this.props.front;

    this.sensornames = [
      "Back Left",
      "Front",
      "Back Right",
    ];
    this.sensorvals = [this.backleft, this.front, this.backright];

    this.average = Math.round(
      (this.backleft + this.backright + this.front) / 3
    );
  }

  render() {
    return (
      <div ref={this.myRef} className="sensor-readings-container">
        <div className="average-container">
          <span
            className="average-index"
            style={{
              color: this.average > 50 ? "#F1C510" : "#6CBE44",
            }}
          >
            {this.average}
          </span>
          <span className="average-desc">
            Current Averaged
            <br />
            Air Quality Index
          </span>
        </div>
        <div className="individual-sensors-container">
          {this.sensornames.map((val, i) => (
            <div className="sensor" key={"sensor-" + i}>
              <span
                className="individual-sensor-reading"
                height={this.height * 0.15}
                style={{
                  color: this.sensorvals[i] > 50 ? "#F1C510" : "#6CBE44",
                }}
              >
                {this.sensorvals[i]}
              </span>
              <span
                className="individual-sensor-desc"
              >
                {this.sensornames[i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default CurrentSensorDisplay;
