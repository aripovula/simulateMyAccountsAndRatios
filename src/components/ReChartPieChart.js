import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import { PieChart, Pie, Sector, Cell, Legend, ResponsiveContainer, Label, XAxis } from 'recharts';

import { selectFinancialData } from '../selectors/financialData';

let data = [];
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

let isMounted = false;
let countT = -1;


class ReChartPieChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    }
  }

  componentDidMount = () => {
    isMounted = true;
    this.scheduleStateShare();
  }

  componentWillUnmount = () => {
    isMounted = false;
  }

  scheduleStateShare = () => {
    const revenue = this.props.financialData[17].amounts_current.balance;
    if (isMounted) {
      countT++;
      if (countT > 3) countT = 0;
      this.setState(() => { return { activeIndex: countT } });
      setTimeout(this.scheduleStateShare, 4 * 1000);
    }
  }

  render() {
    // console.log('financialData - ', this.props.financialData);
    
    data = this.getData();
    return (
      <ResponsiveContainer width='100%' aspect={1.0}>
        <div style={{ fontSize: 12 }}>
          <div style={{ color: '#0088FE', fontSize: '12px' }}>
            {`sales to date - ${data[this.state.activeIndex].name} - US$ ${numeral(data[this.state.activeIndex].value).format('0,0')}`}
            &nbsp;
            {data[this.state.activeIndex].arrowType == 1 && <span style={{
              color: '#57d500'
            }}>&#9650;</span>}

            {data[this.state.activeIndex].arrowType == -1 && <span style={{
              color: '#ff2e00'
            }}>&#9660;</span>}

          </div>
          <PieChart width={200} height={170} onMouseEnter={this.onPieEnter}>
            <Label value="Pages of my website" offset={0} position="outside" />
            <Pie
              dataKey="value"
              data={data}
              cx={130}
              cy={65}
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
  getData = () => {
    const revenue = parseFloat(this.props.financialData[17].amounts_current.balance.replace(/,/g, "")) * -1;
    const data = [
      { name: 'CA', value: revenue * 0.30, arrowType: 1 },
      { name: 'NY', value: revenue * 0.28, arrowType: -1 },
      { name: 'NJ', value: revenue * 0.22, arrowType: 1 },
      { name: 'Other', value: revenue * 0.20, arrowType: -1 }];
    return data;
  }
}

const mapStateToProps = (state) => {
  return {
    financialData: selectFinancialData(state),
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ReChartPieChart);
