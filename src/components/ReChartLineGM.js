import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { selectSeparateLines } from '../selectors/separateLines';

let data = [];

class ReChartLineGM extends React.Component {
  render() {
    data = this.getData();
    return (
      <div style={{ fontSize: "12px" }}>
        <ResponsiveContainer width='100%' aspect={2}>
          <LineChart width={500} height={150} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis type="number" domain={['dataMin - 0.2', 'dataMax + 0.6']} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth='2' activeDot={{ r: 8 }} name="our group" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" name="benchmark ( market )" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  getData = () => {
    let data = [];
    let dataRevenue = [];
    let dataCOGS = [];
    for (let x = 0; x < moment(this.props.filters.endDate).month() + 1; x++) {
      let newAmountGr = (22 * Math.pow(x + 1, 1.002));
      let newAmountPr = (22 * Math.pow(x, 1.002));
      data[x] = {
        name: moment().month(x).format('MMM YYYY'),
        pv: 0,
        uv: (newAmountGr - newAmountPr).toFixed(2)
      };
      dataRevenue[x] = {pv:0};
      dataCOGS[x] = {pv:0}
    }
    this.props.separateLines.map(separateLine => {
      if (!separateLine.isUnPosted && separateLine.lineItem == 'Revenue') {
        dataRevenue[moment(separateLine.postingDate).month()].pv += Math.round(separateLine.amount / 100);
      }
      if (!separateLine.isUnPosted && separateLine.lineItem == 'Cost of goods sold') {
        dataCOGS[moment(separateLine.postingDate).month()].pv -= Math.round(separateLine.amount / 100);
      }
    });

    for (let x = 0; x < moment(this.props.filters.endDate).month() + 1; x++) {
      data[x].pv = ((dataRevenue[x].pv + dataCOGS[x].pv) / dataRevenue[x].pv).toFixed(4)*100;
    }
    return data;
  }
}

const mapStateToProps = (state) => {
  return {
    separateLines: selectSeparateLines(state),
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ReChartLineGM);
