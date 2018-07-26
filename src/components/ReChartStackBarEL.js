import React from 'react';
import moment from 'moment';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

//const {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;
let date = new Date();
const pydate = moment('' + (date.getFullYear() - 1) + '-12-31');

const data = [
  { name: `${pydate.format('MM/D/YY')}`, uv: 30, pv: 70, amt: 100 },
  { name: `${moment().format('MM/D/YY')}`, uv: 35, pv: 65, amt: 100 },
];

export default class ReChartStackBarEL extends React.Component {

  render() {
    return (
      <div style={{ fontSize: "12px" }}>
        <ResponsiveContainer width='100%' aspect={0.75}>
          <BarChart width={200} height={240} data={data}
            margin={{ top: 20, right: 10, left: 0, bottom: 15 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="#8884d8" name='liabilities' />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" name='equity' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
