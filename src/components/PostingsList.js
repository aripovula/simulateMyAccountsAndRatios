import React from 'react';
import { connect } from 'react-redux';
import PostingListItem from './PostingListItem';
import selectPostings from '../selectors/postings';

const PostingsList = (props) => {
  console.log("from PList PROPs =");
  console.log(props);
  return (
    <div>
      <h1>Postings List</h1>
      {props.postings.map((posting) => {
        return <PostingListItem key={posting.id} {...posting} />;
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    postings: selectPostings(state.postings, state.filters)
  };
};

export default connect(mapStateToProps)(PostingsList);
