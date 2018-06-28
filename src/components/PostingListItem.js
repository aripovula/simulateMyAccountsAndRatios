import React from 'react';
import { connect } from 'react-redux';
import { removePosting } from '../actions/postings';

const PostingsListItem = ({ dispatch, id, description, amount, createdAt }) => (
  <div>
    <h3>{description}</h3>
    <p>{amount} - {createdAt}</p>
    <button onClick={() => {
      dispatch(removeExpense({ id }));
    }}>Remove</button>
  </div>
);

export default connect()(PostingsListItem);
