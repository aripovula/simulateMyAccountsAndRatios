import { Chart } from 'react-google-charts';
import React from 'react';

 
class GChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        title: 'Age vs. Weight comparison',
        hAxis: { title: '', minValue: 2, maxValue: 10 },
        vAxis: { title: 'Weight', minValue: 0, maxValue: 15 },
        legend: 'none',
      },
      rows: [
        [8, 12],
        [4, 5.5],
      ],
      columns: [
        {
          type: 'number',
          label: 'Age',
        },
        {
          type: 'number',
          label: 'Weight',
        },
      ],
    };
  }
  render() {
    return (
      <div>
      <Chart
        chartType="BarChart"
        rows={this.state.rows}
        columns={this.state.columns}
        options={this.state.options}
        graph_id="ScatterChart"
        width={'400px'}
        height={'400px'}
        legend_toggle
      />

      <Chart chartType = "Timeline" columns = {[{"id":"President","type":"string"},{"id":"Start","type":"date"},{"id":"End","type":"date"}]} rows= {[['Washington', new Date(1789, 3, 30), new Date(1797, 2, 4)],
      ['Adams', new Date(1797, 2, 4), new Date(1801, 2, 4)],
      ['Jefferson', new Date(1801, 2, 4), new Date(1809, 2, 4)]]} options = {{}} graph_id = "TimelineChart"  width={"100%"} height={"400px"}   chartEvents={this.chartEvents} chartPackages={['timeline']}/>
      </div>
    );
  }
}
export default GChart;