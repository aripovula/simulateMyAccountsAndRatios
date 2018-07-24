import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

//const {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;
const data = [
  { name: 'opening', uv: 60, pv: 40, amt: 100 },
  { name: 'closing', uv: 55, pv: 45, amt: 100 },
];

export default class ReChartStackBarAL extends React.Component {

  render() {
    return (
      <BarChart width={240} height={290} data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" stackId="a" fill="#8884d8" name='current liabilities'/>
        <Bar dataKey="uv" stackId="a" fill="#82ca9d" name='current assets'/>
      </BarChart>
    );
  }
}
