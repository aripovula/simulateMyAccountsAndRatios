import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { selectFinancialData } from '../selectors/financialData';

const pydate = moment().subtract(1, 'years').endOf('year');

let data = [];
let liabilities = 0, liabilitiesOp = 0, equity = 0, equityOp = 0;

class ReChartStackBarEL extends React.Component {
  render() {

    data = this.getData();

    return (
      <div style={{ fontSize: "12px" }}>
        <ResponsiveContainer width='100%' aspect={0.75}>
          <BarChart width={200} height={240} data={data}
            margin={{ top: 20, right: 10, left: 0, bottom: 15 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="#8884d8" name='liabilities' />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" name='equity' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  getData = () => {
    liabilities = 0; liabilitiesOp = 0;
    equity = 0; equityOp = 0;
    for (let x = 8; x < 15; x++) {
      liabilities += parseFloat(this.props.financialData[x].amounts_current.balance.replace(/,/g, ""), 10);
      liabilitiesOp += parseFloat(this.props.financialData[x].amounts_comparatives.openingBalance.replace(/,/g, ""), 10);
    }
    for (let x = 15; x < 24; x++) {
      equity += parseFloat(this.props.financialData[x].amounts_current.balance.replace(/,/g, ""), 10);
      equityOp += parseFloat(this.props.financialData[x].amounts_comparatives.openingBalance.replace(/,/g, ""), 10);
    }

    console.log('EL = ' + liabilities, liabilitiesOp, equity, equityOp);

    data = [
      {
        name: `${pydate.format('MM/D/YY')}`,
        pv: liabilitiesOp / (liabilitiesOp + equityOp) * 100,
        uv: equityOp / (liabilitiesOp + equityOp) * 100
      },
      {
        name: `${moment(this.props.filters.endDate).format('MM/D/YY')}`,
        pv: liabilities / (liabilities + equity) * 100,
        uv: equity / (liabilities + equity) * 100
      }
    ];
    return data;
  }
}

const mapStateToProps = (state) => {
  return {
    financialData: selectFinancialData(state),
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ReChartStackBarEL);
