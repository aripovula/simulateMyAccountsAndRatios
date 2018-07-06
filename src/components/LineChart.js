import React from "react";
import { Chart, Axis, Series, Tooltip, Cursor, Line } from "react-charts";

class LineChart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

    }
}

render() {
return
<div>
<p>TEST</p>
  <Chart
    data={[
      {
        label: "Series 1",
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
      },
      {
        label: "Series 2",
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
      }
    ]}
  >
    <Axis primary type="time" />
    <Axis type="linear" />
    <Series type={Line} />
  </Chart>
  </div>
}
}
export default LineChart;