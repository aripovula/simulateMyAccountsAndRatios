import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

//const {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;
const data = [
  { name: 'opening', uv: 30, pv: 70, amt: 100 },
  { name: 'closing', uv: 35, pv: 65, amt: 100 },
];

export default class ReChartStackBarEL extends React.Component {

  render() {
    return (
      <BarChart width={200} height={280} data={data}
        margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" stackId="a" fill="#8884d8" name='liabilities' />
        <Bar dataKey="uv" stackId="a" fill="#82ca9d" name='equity' />
      </BarChart>
    );
  }
}
