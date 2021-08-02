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
      "Back Left Sensor",
      "Front Sensor",
      "Back Right Sensor",
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
            <div style={{ display: "inline-block", margin: "10px" }}>
              <p
                height={this.height * 0.15}
                style={{
                  display: "block",
                  fontSize: this.height * 0.15,
                  marginTop: 0,
                  marginBottom: 0,
                  color: this.sensorvals[i] > 50 ? "#F1C510" : "#6CBE44",
                }}
              >
                {this.sensorvals[i]}
              </p>
              <p
                height={this.height * 0.1}
                style={{
                  display: "block",
                  fontSize: this.height * 0.08,
                  marginTop: 0,
                }}
              >
                {this.sensornames[i]}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default CurrentSensorDisplay;
