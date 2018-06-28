import React from 'react';
import PostingOneLine from './PostingOneLine';

const AddPosting = () => (
  <div>
    <h3>Make a new posting</h3>
    <button className="actionButton">Book sales revenue and COGS</button>
    <button className="actionButton">Book<br/>admin<br/>expenses</button>
    <button className="actionButton">Book sales revenue and COGS</button>
    <button className="actionButton">Book sales revenue and COGS</button>
    <button className="actionButton">Book sales revenue and COGS</button>
    <button className="actionButton">Book sales revenue and COGS</button>
    <button className="actionButton">Book sales revenue and COGS</button>
    <button className="actionButton">Book sales revenue and COGS</button>

    <div className="card-4">
    <div className="bggreen">
      <h3>Entry Form:
      <button>+ add entry line</button>
      </h3>
    </div>
    <PostingOneLine/>
    <PostingOneLine/>
    </div>
  </div>
);

export default AddPosting;
