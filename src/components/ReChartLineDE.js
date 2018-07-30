import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { selectRatioData } from '../selectors/ratioData';

let data = [];

class ReChartLineDE extends React.Component {
  render() {
    data = this.getData();
    return (
      <div style={{ fontSize: "12px" }}>
        <ResponsiveContainer width='100%' aspect={2}>
          <LineChart width={500} height={150} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis 
            type="number" 
            domain={['dataMin - 0.6', 'dataMax + 0.6']} 
            tickFormatter={(tickItem) => numeral(tickItem).format('0,0.00')}
            />
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
    let x = moment(this.props.filters.endDate).month();
      let newAmountGr = (1.96 * Math.pow(x + 1, 0.955));
      let newAmountPr = (1.96 * Math.pow(x, 0.955));

      data[0] = {
        name: moment().subtract(1,'years').endOf('year').format('MMM YYYY'),
        pv: this.props.ratioData[3].ratio_comparatives.ratioOp.toFixed(4),
        uv: 1.96
      };

      data[1] = {
        name: moment(this.props.filters.endDate).format('MMM YYYY'),
        pv: this.props.ratioData[3].ratio_current.ratio.toFixed(4),
        uv: (newAmountGr - newAmountPr).toFixed(4)
      };

    return data;
  }
}

const mapStateToProps = (state) => {
  return {
    ratioData: selectRatioData(state),
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ReChartLineDE);


