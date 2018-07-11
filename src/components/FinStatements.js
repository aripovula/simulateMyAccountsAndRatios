import React from 'react';
import ReactTable from "react-table";
import { render } from "react-dom";
import { connect } from 'react-redux';
import selectPostings from '../selectors/postings';
import "react-table/react-table.css";

import { Tips } from "../utils/tableUtils";

class FinStatements extends React.Component {
  constructor(props) {
    super(props);
    this.props.postings.map(posting => {
      console.log(posting.note);
    });
    this.state = {
      data: this.getUData()
    };
    this.getUData = this.getUData.bind(this);
  }

  render() {


    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Trial Balance",
              columns: [
                {
                  Header: "Line items",
                  accessor: "assets"
                },
                {
                  Header: "US$",
                  id: "amounts_assets",
                  accessor: d => d.amounts_assets
                },
                {
                  Header: "US$",
                  id: "amounts_assets",
                  accessor: d => d.amounts_assets
                }
              ]
            },
            {
              Header: "US$",
              accessor: "status",
              Cell: row => (
                <span>
                  <span style={{
                    color: row.value === 'relationship' ? '#ff2e00'
                      : row.value === 'complicated' ? '#ffbf00'
                        : '#57d500',
                    transition: 'all .3s ease'
                  }}>
                    &#x25cf;
                  </span> {
                    row.value === 'relationship' ? 'In a relationship'
                      : row.value === 'complicated' ? `It's complicated`
                        : 'Single'
                  }
                </span>)
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        <Tips />
      </div>
    );
  }

  getUData = () => {
    let data = [];
    let accum = [];

    var mySet = new Set();

    this.props.postings.map(posting => {
      posting.linesData.map(lineData => {
        mySet.add(lineData.lineItem);
      });
    });

    let LIs = [...mySet];

    this.props.postings.map(posting => {
      posting.linesData.map(lineData => {
        for (let x = 0; x < LIs.length; x++) {
          if (LIs[x] == lineData.lineItem) {
            let amt = parseFloat(lineData.amount, 10) / 100;
            if (accum[x] == null) accum[x] = 0;
            if (lineData.isDr) accum[x] = accum[x] + amt;
            if (!lineData.isDr) accum[x] = accum[x] - amt;
          }
        }
      });
    });

    let accs = [];
    for (let x = 0; x < LIs.length; x++) {
      accs[x] = {lineItem: LIs[x], balance: accum[x]}
    }
    console.log('accum = ');
    console.log(accum);

    let accounts = this.sortAccounts(accs);

    accounts.map(acc => {
        //console.log('')
        data.push(
          {
            assets: acc.lineItem,
            amounts_assets: acc.balance.toLocaleString('en-US'),
            liabilities: 'Current loans',
            amounts_liabs: 22,
            visits: 33,
            progress: 33,
            status: 223
          }
        );
      });
    
    return data;
  }

  sortAccounts = (accs) => {
    return accs.sort((a, b) => {
        return a.balance < b.balance ? 1 : -1;
    });
  }
}

const mapStateToProps = (state) => {
  return {
    postings: state.postings
  };
};

export default connect(mapStateToProps)(FinStatements);
