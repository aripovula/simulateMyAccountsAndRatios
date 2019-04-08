import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import PostingForm from './PostingForm';
import AddActionButton from './AddActionButton';
import { startAddPosting } from '../actions/postings';
import { getEntryOptions } from "../utils/getEntryOptions";

let actButtons;

class AddPosting extends React.Component {
  constructor(props) {
    // console.log('in AddPosting');
    super(props);
    actButtons = getEntryOptions().slice(0,12); // this function is defined at the bottom
    this.state = {
    }
    this.textInput = React.createRef();
    this.applyActionButtonValues = this.applyActionButtonValues.bind(this);
  }

  // posting form has 8 buttons with pre-defined postings. 
  // this fn adds text of selected predefined posting
  // this component is child component of posting form parent component
  applyActionButtonValues = (e) => {
    // console.log('in applyActionButtonValues');
    // console.log(e.target.id);
    this.textInput.current.onActionButtonSelected(actButtons[e.target.id]);
  }

  render() {
    return (
      <div>
        <div className="boxed ">

          {/* this part renders 8 action buttons each representing pre-defined postings*/}
          {actButtons.map((actButton) => {
            return <AddActionButton
              key={actButton.idu}
              idu={actButton.idu}
              name={actButton.name}
              applyActionButtonValues={this.applyActionButtonValues}
            />;
          })}
        </div>

        <div className="card-4">
          <div className="bggreen">

            <h4><strong>Entry Form</strong><span style={{ fontSize: 14 }}> - use options above or type - uses auto-completion when typed</span></h4>
          </div>
          <PostingForm
            ref={this.textInput}
            onSubmit={(posting) => {
              // console.log('POSTING addPosting = ');
              // console.log(posting);
              // console.log(posting.is2go2list);
              this.props.dispatch(startAddPosting(posting));//.then(() => {
              if (posting.is2go2list) this.props.history.push('/postings');
              if (!posting.is2go2list) this.textInput.current.onStayHereSelected();
              //});
            }}
          />
          <br />
        </div>
      </div>
    );
  }

}

export default withRouter(connect()(AddPosting));