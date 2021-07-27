//https://medium.com/@varvara.munday/d3-in-react-a-step-by-step-tutorial-cba33ce000ce
import React from 'react';
import * as d3 from 'd3';

class BarChart extends React.Component {

 constructor(props){
    super(props);
    this.myRef = React.createRef(); 
	 this.props = props
	 console.log(this.props.dimensions)
	 console.log(this.props)
	 this.width = this.props.dimensions[0]
	 this.height= this.props.dimensions[1]
	 this.margin = this.props.dimensions[2]
 }
 componentDidMount(){
	 let xScale = d3.scaleLinear()
		.domain([0, this.props.data.length])
		.range([0, this.width])

	 let yScale = d3.scaleLinear()
		.domain([0, 100])
		.range([this.height - this.margin, this.margin])

	 let svg = d3.select(this.myRef.current)
		.append("svg")
		.attr("width", this.width)
		.attr("height", this.height)

	 svg.selectAll(".rect")
	 .data(this.props.data)
	 .enter()
	 .append("rect")
	 .attr("x", (d,i) => xScale(i))
	 .attr("height", (d) => yScale(100-d))
	 .attr("y", (d) => yScale(d))
	 .attr("width", this.width/this.props.data.length-1)
	 .attr("fill", (d) => {
		 if(this.props.gray){
			 return "#909090";
		 }
		 else{
			 return d < 75 ? "#6CBE44" : "#F1C510"
		 }
	 })
	 .attr("rx", this.width/this.props.data.length/3)

	 console.log(this.props.desc)
	 svg.append("text")
	 .attr("x", 0)
	 .attr("y", this.height)
	 .attr("fill", "black")
	 .text(this.props.desc)

 }
 render(){
  return (
    <div ref={this.myRef}>
    </div>
  );
 }
 
}
export default BarChart;
