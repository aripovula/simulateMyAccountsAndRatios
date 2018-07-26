import React from 'react';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
  { name: `${moment().subtract(3, 'weeks').format('MM/D')}`, uv: 4000, pv: 2400, amt: 2400 },
  { name: `${moment().subtract(2, 'weeks').format('MM/D')}`, uv: 3000, pv: 1398, amt: 2210 },
  { name: `${moment().subtract(1, 'weeks').format('MM/D')}`, uv: 2000, pv: 9800, amt: 2290 },
  { name: `${moment().format('MM/D')}`, uv: 2780, pv: 3908, amt: 2000 },
];

export default class ReChartLineGM extends React.Component {
  render() {
    return (
      <div style={{ fontSize:"12px"}}>
        <ResponsiveContainer width='100%' aspect={2}>
          <LineChart width={500} height={150} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} name="benchmark ( market )" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" name="our group" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

