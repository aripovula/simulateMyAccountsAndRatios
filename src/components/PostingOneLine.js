import React from 'react';
import { connect } from 'react-redux';
import { removePosting } from '../actions/postings';

const PostingOneLine = ({ dispatch, id, description, amount, createdAt }) => (
  <div>
  &nbsp;&nbsp;
    <select>
      <option value="dr">Dr</option>
      <option value="cr">Cr</option>
    </select>

    <input type="text" 
        //value={props.filters.text} onChange={(e) => {
        //props.dispatch(setTextFilter(e.target.value));
        //}} 
      />

    <input type="number" 
        //value={props.filters.text} onChange={(e) => {
        //props.dispatch(setTextFilter(e.target.value));
        //}} 
      />

  </div>
);

export default (PostingOneLine);
