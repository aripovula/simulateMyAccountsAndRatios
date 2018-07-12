import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

//const {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;
const data = [
      {name: 'Revenue', py: 4000, target: 3344, cy: 2400, amt: 2400},
      {name: 'Page B', py: 3000, cy: 1398, amt: 2210},
      {name: 'Page C', py: 2000, cy: 9800, amt: 2290},
      {name: 'Page D', py: 2780, cy: 3908, amt: 2000},
      {name: 'Page E', py: 1890, cy: 4800, amt: 2181},
      {name: 'Page F', py: 2390, cy: 3800, amt: 2500},
      {name: 'Page G', py: 3490, cy: 4300, amt: 2100},
];

export default class SimpleBarChart extends React.Component {

	render () {
  	return (
    	<BarChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="name"/>
       <YAxis/>
       <Tooltip/>
       <Legend />

       <Bar dataKey="py" fill="#00C49F" name="Prior year"/>
       <Bar dataKey="target" fill="#FFBB28" name="Current year's target"/>
       <Bar dataKey="cy" fill="#0088FE" name="Current year"/>

      </BarChart>
    );
  }
}
