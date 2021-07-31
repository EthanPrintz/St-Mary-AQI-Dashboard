import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LeftCol from './components/LeftCol';
import Map from './components/Map';
import BarChart from './components/BarChart';
import { getSensorDataByURL, getSensorDataByParams } from './utils/getSensorData';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import { isDOMComponent } from 'react-dom/test-utils';

function App() {
  useEffect(() => {
    getSensorDataByURL(
      'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?format=csv&limit=66536&location=224746&date_from=2021-04-17T07%3A00%3A00.000Z&date_to=2021-05-01T07%3A00%3A00.000Z&parameter=130&parameter=2'
    );
  }, []);

	const [data, setData] = useState([50, 70, 20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10])

	const [graphs, setGraphs] = useState([true, true, true, false])

	//#let data = [50, 70, 20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10]
	let dimensions = [300, 200, 50]

	let date_range = ["24 hours", "3 days", "1 week", "2 weeks"]

	let graph_names = ["PM 2.5", "PM 10", "Temperature", "Humidity"]

	function updateRange(index){
		for(let i = 0; i < 4; i++){
			if(index == i){
				document.getElementById("selector-button-" + i).classList.add("selected")
			}
			else{
				document.getElementById("selector-button-" + i).classList.remove("selected")
			}

		}
		console.log(date_range[index])
		if(index == 0){
			setData([50, 70, 20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10])
		}
		if(index == 1){
			setData([70, 20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10, 50])
		}
		if(index == 2){
			setData([20, 90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10, 50, 80])
		}
		if(index == 3){
			setData([90, 70, 30, 80, 40, 20, 50, 30, 90, 20, 10, 50, 80, 20])
		}

	}

   function updateGraphRange(index){
	   if(graphs[index]){
		document.getElementById("graph-selector-button-" + index).classList.remove("selected")
	   }
	   else{
		document.getElementById("graph-selector-button-" + index).classList.add("selected")
	   }
	   let temp = [...graphs]
	   temp[index] = !temp[index]
	   setGraphs(temp)
   }

  return (
    <AppContainer>
	  {/*<button className="selector-button" onClick={yo}>yo</button>*/}
	  {date_range.map((date, i) => <button className="selector-button" id={"selector-button-" + i} key={i} onClick={() => updateRange(i)}> {date} </button>)}
	  <br/>
	  {graph_names.map((graph_name, i) => <button className="selector-button" id={"graph-selector-button-" + i} key={i} onClick={() => updateGraphRange(i)}> {graph_name} </button>)}
	  {graphs[0] && <BarChart data={data} dimensions={dimensions} desc={graph_names[0]}/>}
	  {graphs[1] && <BarChart data={data} dimensions={dimensions} desc={graph_names[1]}/>}
	  {graphs[2] && <BarChart data={data} dimensions={dimensions} desc={graph_names[2]}/>}
	  {graphs[3] && <BarChart data={data} dimensions={dimensions} desc={graph_names[3]}/>}
	  {/*<LeftCol />*/}
	  {/*<Map />*/}
    </AppContainer>
  );
}


const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  background-color: grey;
`;

export default App;
