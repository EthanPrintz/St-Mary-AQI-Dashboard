//https://medium.com/@varvara.munday/d3-in-react-a-step-by-step-tutorial-cba33ce000ce
import React from 'react';
import * as d3 from 'd3';

class SensorCurrentDisplay extends React.Component {

 constructor(props){
    super(props);
    this.myRef = React.createRef(); 
	 this.props = props
	 this.width = this.props.dimensions[0]
	 this.height= this.props.dimensions[1]
	 this.margin = this.props.dimensions[2]

	 this.backleft = this.props.backleft
	 this.backright = this.props.backright
	 this.front = this.props.front

	 this.sensornames = ["Back Left Sensor", "Front Sensor", "Back Right Sensor"]
	 this.sensorvals = [this.backleft, this.front, this.backright]

	 this.average = Math.round((this.backleft + this.backright + this.front)/3)

 }


 componentDidMount(){
	 //	 let xScale = d3.scaleLinear()
	 //		.domain([0, 1])
	 //		.range([0, this.width])
	 //
	 //	 let yScale = d3.scaleLinear()
	 //		.domain([0, 1])
	 //		.range([this.height - this.margin, this.margin])
	 //
	 //	 let svg = d3.select(this.myRef.current)
	 //		.append("svg")
	 //		.attr("width", this.width)
	 //		.attr("height", this.height)
	 //
	 //	 svg.append("text")
	 //		.attr("text-anchor", "middle")
	 //		.attr("alignment-baseline", "center")
	 //		.attr("x", xScale(0.3))
	 //		.attr("y", yScale(0.65))
	 //		.attr("fill", "#6CBE44")
	 //		.text(this.average)
	 //		.attr("font-size", this.height/4)
	 //
	 //	 svg.append("text")
	 //		.attr("text-anchor", "middle")
	 //		.attr("alignment-baseline", "center")
	 //		.attr("x", xScale(0.65))
	 //		.attr("y", yScale(0.65)-this.height/16)
	 //		.attr("fill", "black")
	 //		.text("Current AQ Average")
	 //		.attr("font-size", this.height/8)

	 
 }
 render(){
  return (
    <div ref={this.myRef}>
	  <div>
	  <p height={this.height*.25 + "px"} style={{'display': 'inline-block', 'marginTop': 0, 'marginBottom': this.height*.05, 'fontSize': this.height*.28, 'color': this.average > 50 ? "#F1C510" : "#6CBE44" }}>{this.average}</p>
	  <p height={this.height*.25 + "px"} style={{'display': 'inline-block', 'width': this.width*.5, 'textAlign': 'left', 'marginLeft': '5px', 'fontStyle': 'italic'}}>Current Averaged Air Quality Index</p>
	  </div>
	  {
	  this.sensornames.map((val, i) => 
		  <div style={{"display": "inline-block", 'margin': '10px'}}>
			  <p height={this.height*.15}
				 style={{'display': 'block', 'fontSize': this.height*.15, 'marginTop': 0, 'marginBottom': 0, 'color': this.sensorvals[i]> 50 ? "#F1C510" : "#6CBE44" }}
			  >{this.sensorvals[i]}</p>
		  <p height={this.height*.1} style={{'display': 'block', 'fontSize': this.height*.08, 'marginTop': 0}}>{this.sensornames[i]}</p>
		  </div>
	  )
	  }

    </div>
  );
 }
 
}
export default SensorCurrentDisplay;
