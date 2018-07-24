import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
      {name: 'Sales margin', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Receivable days', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Payable days', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];
export default class ReChartLineBench extends React.Component {
  
	render () {
  	return (
        <ResponsiveContainer width='100%' aspect={4.0 / 1.0}>
    	<LineChart width={1000} height={240} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}} name="benchmark ( market )"/>
       <Line type="monotone" dataKey="uv" stroke="#82ca9d" name = "our group"/>
      </LineChart>
      </ResponsiveContainer>
    );
  }
}

