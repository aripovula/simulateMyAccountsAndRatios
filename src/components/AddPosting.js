import React from 'react';
import { connect } from 'react-redux';
import { startAddPosting } from '../actions/postings';
import configureStore from '../store/configureStore';
import getVisiblePostings from '../selectors/postings';
import { Route , withRouter} from 'react-router-dom';
//import {PostingOneLineDr} from './PostingOneLine';
//import {PostingOneLineCr} from './PostingOneLine';
import PostingLineForm from './PostingLineForm';

const store = configureStore();

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
      </div>
  
      <div className="card-4">
      <div className="bggreen">
      
        <h4><strong>Entry Form</strong> - use options above</h4>
      </div>
      <PostingLineForm
      
        onSubmit={(posting) => {
          let state = store.getState();
          let visiblePostings = getVisiblePostings(state.postings, state.filters);
          console.log("BEFORE="+visiblePostings);

          props.dispatch(AddPosting(posting));

           state = store.getState();
           visiblePostings = getVisiblePostings(state.postings, state.filters);
          console.log("AFTER ="+visiblePostings);
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


