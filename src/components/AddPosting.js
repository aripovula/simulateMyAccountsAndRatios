import React from 'react';
import { connect } from 'react-redux';
import { Route , withRouter} from 'react-router-dom';
import PostingForm from './PostingForm';
import AddActionButton from './AddActionButton';
import { addPosting } from '../actions/postings';

let actButtons = [
  {idu:1, name:'book Revenue and COGS'}, 
  {idu:2, name:'book Admin expenses'}, 
  {idu:3, name:'book Accounts receivable'}, 
  {idu:4, name:'book Short-term lending'}, 
  {idu:5, name:'book Long-term lending'}, 
  {idu:6, name:'book Short-term borrowing'}, 
  {idu:7, name:'book Long-term borrowing'}, 
  {idu:8, name:'book Accounts payable'}
];

const AddPosting = (props) => {
  //console.log("PROPs=");
  //console.log(props);
  return (
      <div>
      <div className="boxedtransp">
          {actButtons.map((actButton) => {
            return <AddActionButton key={actButton.idu} {...actButton} />;
          })}
      </div>
  
      <div className="card-4">
      <div className="bggreen">
      
        <h4><strong>Entry Form</strong> - use options above</h4>
      </div>
      <PostingForm
        onSubmit={(posting) => {
          console.log('POSTING addPosting = ' + posting);
          props.dispatch(addPosting(posting));
          props.history.push('/');
        }}

      />
      <br/><br/>
      </div>
    </div>
    );
}

export default withRouter(connect() (AddPosting));


