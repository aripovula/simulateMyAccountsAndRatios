import React from 'react';
import FinStatements from './FinStatements';
import { connect } from 'react-redux';
import SplitterLayout from 'react-splitter-layout';
import AddPosting from './AddPosting';
import ThreeInfoTypeComp from './ThreeInfoTypeComp';
import EditPosting from './EditPosting';

export default class MainAddPosting extends React.Component {
  constructor(props) {
    super(props);
    console.log('in MainAddPosting CONSTRUCTOR - props:');
    console.log(props);
    console.log(props.match.path);
    console.log(props.match.path == '/createposting');
  }

  render() {
    return (
      <div className="margintop">
        <SplitterLayout primaryIndex={0} percentage={true} primaryMinSize={30} secondaryInitialSize={50} secondaryMinSize={40}>
          <div>
            {this.props.match.path == "/createposting" && <AddPosting />}
            {this.props.match.path == "/editposting/:id" && <EditPosting
              idtoedit = {this.props.match.params.id}
            />}
          </div>
          <div>
            <ThreeInfoTypeComp />
          </div>
        </SplitterLayout>
      </div>
    );
  }
}