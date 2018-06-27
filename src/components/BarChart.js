import React from 'react';
import ReactDOM from 'react-dom';
import BarChart from "react-svg-bar-chart"

const data = [];
const that = this;

for (let x = 1; x <= 3; x++) {
    data.push({x: x, y: Math.floor(Math.random() * 100)})
}

const MyBarChart = () => (
    <div>
        <BarChart 
        data={data}  
        areaColor="#44B39D"
  areaVisible={true}
  axisColor="#34495e"
  axisOpacity={0.3}
  axisVisible={true}
  axisWidth={1}
  barsColor="#44B39D"
  barsMargin={0.1}
  barsOpacity={1}
  gridColor="#34495e"
  gridOpacity={0.2}
  gridVisible={true}
  gridWidth={1}
  labelsColor="#bdc3c7"
  labelsCountY={5}
  labelsStepX={2}
  labelsVisible={true}
  pathColor="#44B39D"
  pointsColor="#fff"
  pointsRadius={4}
  pointsStrokeColor="#44B39D"
  pointsStrokeWidth={2}
  pointsVisible={false}
  unitWidth={1}
  viewBoxHeight={300}
  viewBoxWidth={800}
        />
    </div>
)

export default MyBarChart;