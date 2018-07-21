import React from 'react';
import { PieChart, Pie, Sector, Cell, Legend, ResponsiveContainer } from 'recharts';

let countT = 1;
let isMounted = false;
const data = [{ name: 'Our Group', value: 246 }, { name: 'C-Corp', value: 550 },
{ name: 'SamCo', value: 200 }];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value, name } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill="#FFBB28"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill='#00C49F'
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${name}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#57d500">
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};

export default class ReChartPieMarket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    }
    this.onPieEnter = this.onPieEnter.bind(this);

  }

  componentDidMount = () => {
    isMounted = true;
    this.scheduleMarketShare();
  }

  componentWillUnmount = () => {
    isMounted = false;
  }

  onPieEnter(data, index) {
    this.setState({
      activeIndex: index,
    });
  }

  scheduleMarketShare = () => {
    if (isMounted) {
      countT--;
      if (countT < 0) countT = 2;
      this.setState(() => { return { activeIndex: countT } });
      setTimeout(this.scheduleMarketShare, 4 * 1000);
    }
  }


  render() {
    return (
      <ResponsiveContainer width='100%' aspect={1.0}>
        <PieChart width={800} height={400}>
          <Pie
            dataKey="value"
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx={180}
            cy={75}
            innerRadius={40}
            outerRadius={60}
            fill="#00C49F"
            onMouseEnter={this.onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

