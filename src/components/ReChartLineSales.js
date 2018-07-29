import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import {selectSeparateLines} from '../selectors/separateLines';

// const data = [
//   { name: 'Sales margin', uv: 4000, pv: 2400, amt: 2400 },
//   { name: 'Receivable days', uv: 3000, pv: 1398, amt: 2210 },
//   { name: 'Payable days', uv: 2000, pv: 9800, amt: 2290 },
//   { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
//   { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
//   { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
//   { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
// ];
let data = [];

class ReChartLineSales extends React.Component {


  render() {
    data = [];
    // console.log('moment().month() = '+moment().month());
    // console.log('moment().month(4) = '+moment().month(4).format('MMM'));
    for (let x = 0; x < moment(this.props.filters.endDate).month()+1; x++) {
      data[x] = { 
        name: moment().month(x).format('MMM YYYY'), 
        pv: 0, 
        uv: 1160000 
      };
    }
    // console.log('data(4) = ');
    // console.log(data[4]);
    // console.log('data(4).pv = '+data[4].pv);
    this.props.separateLines.map( separateLine => {
      if (separateLine.lineItem == 'Revenue') {
        // console.log(moment(separateLine.postingDate).format('MMM'));
        // console.log(moment(separateLine.postingDate).month());  
        // console.log('data(x).pv = '+data[moment(separateLine.postingDate).month()].pv);
        data[moment(separateLine.postingDate).month()].pv += Math.round(separateLine.amount/100);
      }
    });

    return (
      <div style={{ fontSize: "12px" }}>
        <ResponsiveContainer width='100%' aspect={6.0}>
          <LineChart width={1000} height={150} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis type="number" domain={['dataMin - 10000', 'dataMax + 10000']} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} name="benchmark ( market )" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" name="our group" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    separateLines: selectSeparateLines(state),
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ReChartLineSales);
