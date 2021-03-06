/* eslint-disable react/prop-types */
//https://medium.com/@varvara.munday/d3-in-react-a-step-by-step-tutorial-cba33ce000ce
import React from 'react';
import * as d3 from 'd3';
import { convertAQIToColor } from '../../../utils/conversions';

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.props = props;
    //console.log(this.props.dimensions);
    //console.log(this.props);
    this.width = this.props.dimensions[0];
    this.height = this.props.dimensions[1];
    this.margin = this.props.dimensions[2];


    this.max = 100

    if (!document.getElementById('tooltip')) {
      var tooltip = d3
        .select("body")
        .append("div")
        .attr("id", "tooltip")
        .attr("style", "position: absolute; opacity: 0; z-index: 4;");
      this.tooltip = tooltip;
    }
  }

  componentDidUpdate() {
    //console.log("updated")
    let textHeight = this.margin;
    let yScale = d3
      .scaleLinear()
      .domain([0, this.max])
      .range([this.height - this.margin - textHeight, this.margin]);

    let xScale = d3
      .scaleLinear()
      .domain([0, this.props.data.length])
      .range([this.margin, this.width - this.margin]);

    //let svg = d3.select(this.myRef.current);
    let svg = this.svg;
    //console.log(this.props.data);

    let rects = svg.selectAll(".rect").data(this.props.data);

    //console.log(rects)

	rects.enter()
      .append('rect')
      .attr('class', 'rect')
      .attr('height', (d) => yScale(this.max))
      .attr('width', this.width / this.props.data.length - 3)
      .attr('x', (d, i) => xScale(i))
      .attr('y', (d) => yScale(0))
      .attr('rx', this.width / this.props.data.length / 3)
      .attr('fill', (d) => {
        if (this.props.gray) {
          return "#909090";
        } else {
		  return  this.props.colorFunc(d);
        }
      })
      .on("mouseover", function (event, d) {
        this.tooltip = d3.select("#tooltip");

        this.tooltip
          .transition()
          .duration(80)
          .style("display", "block")
          .style("opacity", 1)
          .text(d + " ??g/m??")
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY - 15 + "px")
          .transition()
          .duration(3000)
          .style("opacity", 0)
          .transition()
          .delay(1000)
          .style("display", "none");
      })
      .on("mouseout", function (e) {
        this.tooltip.style("opacity", 0).style("display", "none");
      })
      .merge(rects)
      .transition()
      .duration(1000)
      .attr('height', (d) => yScale(this.max - d))
      .attr('width', this.width / this.props.data.length - 3)
      .attr('x', (d, i) => xScale(i))
      .attr('y', (d) => yScale(d))
      .attr('rx', this.width / this.props.data.length / 3)
      .attr('fill', (d) => {
        if (this.props.gray) {
          return "#909090";
        } else {
		  return  this.props.colorFunc(d);
        }
      });
  }

  componentDidMount() {
    //console.log(this.props.data);

    let textHeight = this.margin;

    let xScale = d3
      .scaleLinear()
      .domain([0, this.props.data.length])
      .range([this.margin, this.width - this.margin]);

    let yScale = d3
      .scaleLinear()
      .domain([0, this.max])
      .range([this.height - this.margin - textHeight, this.margin]);

    let svg = d3
      .select(this.myRef.current)
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    this.svg = svg;

    svg
      .selectAll(".rect")
      .data(this.props.data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('height', (d) => yScale(this.max - d))
      .attr('y', (d) => yScale(d))
      .attr('width', this.width / this.props.data.length - 3)
      .attr('fill', (d) => {
        if (this.props.gray) {
          return "#909090";
        } else {
		  return  this.props.colorFunc(d);
        }
      })
      .attr("rx", this.width / this.props.data.length / 3)
      .attr("class", "rect")
      .on("mouseover", function (event, d) {
        this.tooltip = d3.select("#tooltip");

        this.tooltip
          .transition()
          .duration(80)
          .style("display", "block")
          .style("opacity", 1)
          .text(d + " ??g/m??")
          .style("left", event.pageX + 15 + "px")
          .style("top", event.pageY - 15 + "px")
          .transition()
          .duration(3000)
          .style("opacity", 0)
          .transition()
          .delay(1000)
          .style("display", "none");
      })
      .on("mouseout", function (e) {
        this.tooltip.style("opacity", 0).style("display", "none");
      });

  }
  render() {
    return (
      <div className="air-bar-chart">
        <div ref={this.myRef} className="svg-chart-container"/>
        <span className="bar-chart-text">{this.props.desc}</span>
      </div>
    );
  }
}
export default BarChart;
