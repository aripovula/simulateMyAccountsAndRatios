import React from 'react';
import { connect } from 'react-redux';
import { removePosting } from '../actions/postings';

const PostingsListItem = ({ dispatch, id, lineItem, amount, note, createdAt }) => (
  <div>
    <h3>{lineItem}</h3>
    <p>{amount} - {note}</p>
    <button onClick={() => {
      dispatch(removePosting({ id }));
    }}>Remove</button>
  </div>
);

export default connect()(PostingsListItem);
