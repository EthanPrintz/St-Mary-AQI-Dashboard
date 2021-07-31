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

	 if(!document.getElementById("tooltip")){
		 var tooltip = d3.select("body")
			.append("div")
			.attr('id', 'tooltip')
			.attr('style', 'position: absolute; opacity: 0;')
		 this.tooltip = tooltip
	 }

 }

 componentDidUpdate(){
	 let textHeight = this.margin/2;
	 let yScale = d3.scaleLinear()
		.domain([0, 100])
		.range([this.height - this.margin - textHeight, this.margin])


	 let svg = d3.select(this.myRef.current)
	 console.log(this.props.data)

	 svg.selectAll(".rect")
	 .data(this.props.data)
	 .transition()
     .duration(1000)
	 .attr("height", (d) => yScale(100-d))
	 .attr("y", (d) => yScale(d))
	 .attr("fill", (d) => {
		 if(this.props.gray){
			 return "#909090";
		 }
		 else{
			 return d < 75 ? "#6CBE44" : "#F1C510"
		 }
	 })

 }


 componentDidMount(){
	 console.log(this.props.data)

	 let textHeight = this.margin/2;

	 let xScale = d3.scaleLinear()
		.domain([0, this.props.data.length])
		.range([0, this.width])

	 let yScale = d3.scaleLinear()
		.domain([0, 100])
		.range([this.height - this.margin - textHeight, this.margin])

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
	 .attr("width", this.width/this.props.data.length-3)
	 .attr("fill", (d) => {
		 if(this.props.gray){
			 return "#909090";
		 }
		 else{
			 return d < 75 ? "#6CBE44" : "#F1C510"
		 }
	 })
	 .attr("rx", this.width/this.props.data.length/3)
	 .attr("class", "rect")
	 .on('mouseover', function(event, d) {
		 this.tooltip = d3.select("#tooltip")

		this.tooltip
			.transition()
			.duration(80)
			.style('display', 'block')
			.style('opacity', 1)
			 .text(d + " AQ")
			.style('left', (event.pageX+15) + 'px')
			.style('top', (event.pageY-15) + 'px')
			.transition()
			.duration(3000)
			.style('opacity', 0)
			.transition()
			.delay(1000)
			.style("display", "none")
	})
	.on('mouseout', function(e) {
		this.tooltip
			.style('opacity', 0)
			.style('display', 'none')
	})
	 

	 console.log(this.props.desc)
	 svg.append("text")
	 .attr("x", 0)
	 .attr("y", this.height-textHeight/4)
	 .attr("fill", "black")
	 .text(this.props.desc)
	 .attr("font-size", textHeight/2)
	 .attr("class", "bar-chart-text")

 }
 render(){
  return (
    <div ref={this.myRef}>
    </div>
  );
 }
 
}
export default BarChart;
