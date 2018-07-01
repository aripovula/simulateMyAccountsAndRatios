import React from 'react';
import ReactTable from "react-table";
import { render } from "react-dom";
import "react-table/react-table.css";

import { Tips } from "../utils/tableUtils";


let Udata = [
{
    firstName: 'Cash',
    lastName: '123',
    age: 'Current loans',
    visits: 33,
    progress: 33,
    status: 223
},
{
    firstName: 'ABC2',
    lastName: 'XYZ2',
    age: 22,
    visits: 33,
    progress: 33,
    status: "relationship"
}
    
];

class FinStatements extends React.Component {
  constructor() {
    super();
    this.state = {
      data: Udata
    };
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
}

export default FinStatements;
