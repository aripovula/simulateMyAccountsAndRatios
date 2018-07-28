import React from 'react';
import moment from 'moment';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

let date = new Date();
const pydate = moment().subtract(1,'years').endOf('year');

const data = [
  { name: `${pydate.format('MM/D/YY')}`, uv: 60, pv: 40, amt: 100 },
  { name: `${moment().format('MM/D/YY')}`, uv: 55, pv: 45, amt: 100 },
];

export default class ReChartStackBarAL extends React.Component {

  render() {
    return (
      <div style={{ fontSize: "12px" }}>
        <ResponsiveContainer width='100%' aspect={0.75}>
          <BarChart width={200} height={250} data={data}
            margin={{ top: 20, right: 10, left: 0, bottom: 15 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="#8884d8" name='current liabilities' />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" name='current assets' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
