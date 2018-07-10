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
              Header: "Assets, 30 Jun 18",
              columns: [
                {
                  Header: "",
                  accessor: "firstName"
                },
                {
                  Header: "US$'000",
                  id: "lastName",
                  accessor: d => d.lastName
                }
              ]
            },
            {
              Header: "Liabilities, 30 Jun 18",
              columns: [
                {
                  Header: "",
                  accessor: "age"
                },
                {
                  Header: "US$'000",
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
              ]
            },
            {
              Header: 'Stats',
              columns: [
                {
                  Header: "Visits",
                  accessor: "visits"
                }
              ]
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
    this.props.postings.map(posting => {
      posting.linesData.map(lineData => {
        //console.log('')
        data.push(
          {
            firstName: lineData.lineItem,
            lastName: (parseFloat(lineData.amount, 10) / 100).toLocaleString('en-US'),
            age: 'Current loans',
            visits: 33,
            progress: 33,
            status: 223
          }
        );
      });
    });
    return data;
  }
}

const mapStateToProps = (state) => {
  return {
    postings: state.postings
  };
};

export default connect(mapStateToProps)(FinStatements);
