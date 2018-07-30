import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import { PieChart, Pie, Sector, Cell, Legend, ResponsiveContainer } from 'recharts';

import { selectFinancialData } from '../selectors/financialData';

let countT = 1;
let isMounted = false;
let data = [];

class ReChartPieMarket extends React.Component {
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
    data = this.getData();
    return (
      <ResponsiveContainer width='100%' aspect={1.0}>
        <PieChart width={400} height={200}>
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
  getData = () => {
    const c_corpShare = 33391790;
    const samCoShare = 12687924;
    const revenue = parseFloat(this.props.financialData[17].amounts_current.balance.replace(/,/g, "")) * -1 ;

    const annualizationFactor = 12 / ( moment(this.props.filters.endDate).month() +1 );
    // console.log('cmonthpie = '+moment().month());
    const normalizedRevenue = revenue * annualizationFactor;
    // console.log('revenue rev = '+revenue);
    // console.log('revenue fact = '+annualizationFactor);
    // console.log('revenue nrev= '+normalizedRevenue);

    const data = [{ name: 'Our Group', value: normalizedRevenue }, { name: 'C-Corp', value: c_corpShare },
    { name: 'SamCo', value: samCoShare }];
    return data;
  }
}

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

const mapStateToProps = (state) => {
  return {
    financialData: selectFinancialData(state),
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ReChartPieMarket);
