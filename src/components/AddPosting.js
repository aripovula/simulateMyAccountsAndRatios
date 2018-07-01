import React from 'react';
import { connect } from 'react-redux';
import { Route , withRouter} from 'react-router-dom';
import PostingForm from './PostingForm';
import AddActionButton from './AddActionButton';
import { addPosting } from '../actions/postings';

let actButtons = [{name:'book Sales revenue'}, {name:'book COGS'}];

const AddPosting = (props) => {
  console.log("PROPs=");
  console.log(props);

  return (
      <div>
      <div className="boxedtransp">
          <button className="actionButton">Book sales revenue and COGS</button>
          <button className="actionButton">Book<br/>admin<br/>expenses</button>
          <button className="actionButton">Book sales revenue and COGS</button>
          <button className="actionButton">Book sales revenue and COGS</button>
          <button className="actionButton">Book sales revenue and COGS</button>
          <button className="actionButton">Book sales revenue and COGS</button>
          <button className="actionButton">Book sales revenue and COGS</button>
          <button className="actionButton">Book sales revenue and COGS</button>
          {actButtons.map((actButton) => {
            return <AddActionButton key={actButton.name} {...actButton} />;
          })}
      </div>
  
      <div className="card-4">
      <div className="bggreen">
      
        <h4><strong>Entry Form</strong> - use options above</h4>
      </div>
      <PostingForm
        onSubmit={(posting) => {
          props.dispatch(addPosting(posting));
          props.history.push('/');
        }}

      />
      {/*<PostingOneLineDr/>
      <PostingOneLineCr/>
      <br/>
      <span className="horIndent"></span>
      <button>+ Dr line</button>
      <span className="horIndent"></span>
      <button>+ Cr line</button>
      <span className="horIndent"></span>
      <button>Post the entry</button>*/}
      <br/><br/>
      </div>
    </div>
    );
}

// const mapDispatchToProps = (dispatch) => ({
//   startAddPosting: (posting) => dispatch(startAddPosting(posting))
// });

export default withRouter(connect() (AddPosting));


