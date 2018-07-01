import React from 'react';
import { connect } from 'react-redux';
import { removePosting } from '../actions/postings';


export const PostingOneLineDr = ({ dispatch, id, description, amount, createdAt }) => (
  <div>
  <span className="horIndent"></span>
    <select>
      <option value="dr" selected>Dr</option>
      <option value="cr">Cr</option>
    </select>

    <input type="text" placeholder="line item"
        //value={props.filters.text} onChange={(e) => {
        //props.dispatch(setTextFilter(e.target.value));
        //}} 
      />

    <input type="number" placeholder="amount, in USD'000"
        //value={props.filters.text} onChange={(e) => {
        //props.dispatch(setTextFilter(e.target.value));
        //}} 
      />
    <span className="horIndent"></span>
    <span className="glyphicon glyphicon-remove"></span>
  </div>
);

export const PostingOneLineCr = ({ dispatch, id, description, amount, createdAt }) => (
  <div>
  <span className="horIndent"></span>
    <select>
      <option value="dr" >Dr</option>
      <option value="cr" selected>Cr</option>
    </select>

    <input type="text" placeholder="line item"
        //value={props.filters.text} onChange={(e) => {
        //props.dispatch(setTextFilter(e.target.value));
        //}} 
      />

    <input type="number" placeholder="amount, in USD'000"
        //value={props.filters.text} onChange={(e) => {
        //props.dispatch(setTextFilter(e.target.value));
        //}} 
      />
    <span className="horIndent"></span>
    <span className="glyphicon glyphicon-remove"></span>
  

  </div>
);
//export default (PostingOneLine);
