import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { selectSeparateLines } from '../selectors/separateLines';

let data = [];

class ReChartLineSales extends React.Component {

  render() {
    data = this.getData();
    return (
      <div style={{ fontSize: "12px" }}>
        <ResponsiveContainer width='100%' aspect={6.0}>
          <LineChart width={1000} height={150} data={data}
            margin={{ top: 5, right: 35, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis
              type="number"
              domain={['dataMin - 1000', 'dataMax + 1000']}
              tickFormatter={(tickItem) => numeral(tickItem).format('0,0')} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth='2' activeDot={{ r: 8 }} name="benchmark ( market )" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" name="our group" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  getData = () => {
    data = [];
    for (let x = 0; x < moment(this.props.filters.endDate).month() + 1; x++) {
      let newAmountGr = (1160000 * Math.pow(x + 1, 1.005)).toFixed(0);
      let newAmountPr = (1160000 * Math.pow(x, 1.005)).toFixed(0);
      data[x] = {
        name: moment().month(x).format('MMM YYYY'),
        pv: 0,
        uv: (newAmountGr - newAmountPr)
      };
    }
    this.props.separateLines.map(separateLine => {
      if (!separateLine.isUnPosted && separateLine.lineItem == 'Revenue') {
        data[moment(separateLine.postingDate).month()].pv += Math.round(separateLine.amount / 100);
      }
    });
    return data;
  }
}

const mapStateToProps = (state) => {
  return {
    separateLines: selectSeparateLines(state),
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ReChartLineSales);
