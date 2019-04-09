import React, { Component } from 'react'

export class Source extends Component {
  render() {
    return (
      <div className="margintop marginLeft">
        <br/>
        <h3 style={{color: 'red'}}>Links to source:</h3>
        <br/>

        <div>Link to github repo - &nbsp;&nbsp;
            <a target="_blank" className="addnlightbg" href="https://github.com/aripovula/simulateMyAccountsAndRatios">click here</a>
        </div>
        <br/>

        <div>Link to main component of posting form - &nbsp;&nbsp;
            <a target="_blank" className="addnlightbg" href="https://github.com/aripovula/simulateMyAccountsAndRatios/blob/master/src/components/PostingForm.js">click here</a>
        </div>
        <br/>

        <p>Since it is not a real life app only a subset of components are tested with JEST / Enzyme testing.</p>
          <ul>
            <li><a target="_blank" className="addnlightbg" href="https://github.com/aripovula/simulateMyAccountsAndRatios/tree/master/src/tests">all tests</a></li>
            <li><a target="_blank" className="addnlightbg" href="https://github.com/aripovula/simulateMyAccountsAndRatios/blob/master/src/tests/PostingForm.test.js">testing State and actual display based on state change</a></li>
            <li><a target="_blank" className="addnlightbg" href="https://github.com/aripovula/simulateMyAccountsAndRatios/blob/master/src/tests/MountedUseSpy.test.js">mounted component and using spies</a></li>
            <li><a target="_blank" className="addnlightbg" href="https://github.com/aripovula/simulateMyAccountsAndRatios/blob/master/src/tests/Integration.test.js">integration tests using actual store ( synchronous and asynchronous tasks )</a></li>
         </ul>
        <br/>

      </div>
    )
  }
}

export default Source
