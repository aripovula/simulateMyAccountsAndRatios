import React from 'react';
import { PieChart, Pie, Sector, Cell, Legend, ResponsiveContainer, Label, XAxis } from 'recharts';

const data = [{ name: 'CA', value: 400 }, { name: 'NY', value: 300 },
{ name: 'WA', value: 300 }, { name: 'Other', value: 200 }];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${name}`}
    </text>
  );
};

export default class ReChartPieChart extends React.Component {

  render() {
    return (
      <ResponsiveContainer width='100%' aspect={1.0}>
        <div style={{ fontSize: 12 }}>
          <PieChart width={400} height={400} onMouseEnter={this.onPieEnter}>
          <Label value="Pages of my website" offset={0} position="outside" />
            <Pie
              dataKey="value"
              data={data}
              cx={100}
              cy={75}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={60}
              isAnimationActive={false} 
              fill="#8884d8"
            >
              {
                data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
          </PieChart>
        </div>
      </ResponsiveContainer>
    );
  }
}
