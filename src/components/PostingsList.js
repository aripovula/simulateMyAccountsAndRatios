import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

import PostingListItem from './PostingListItem';
import SeparateLineItem from './SeparateLineItem';
import selectPostings from '../selectors/postings';
import selectSeparateLines from '../selectors/separateLines';
import { separatePostingLines, removeSeparatedPostingLine } from '../actions/separateLines';

let countP;

class PostingsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLinesOnly: false
    }
  }

  togglePostingsAndLines(event) {
    //console.log(event.target.value);

    if (event.target.value === 'lines') {
      this.setState(() => { return { showLinesOnly: true } });
      this.props.separateLines.map(separateLine => {
        this.props.dispatch(removeSeparatedPostingLine(separateLine.id));
      });

      this.props.postings.map(posting => {
        let enid = posting.id;
        let endate = posting.postingDate;
        let crdate = posting.createdAt;
        let isUnPosted = posting.isUnPosted;
        posting.linesData.map(lineData => {
          this.props.dispatch(separatePostingLines(enid, endate, crdate, lineData.isDr, lineData.lineItem, lineData.amount, isUnPosted));
        });
      });
    } else {
      this.setState(() => { return { showLinesOnly: false } });
    }
    // console.log('REDUX STATE=');
    // console.log(this.props);
  }

  render() {
    // console.log("from PList PROPs =");
    // console.log(this.props);
    // console.log('amountF=' + this.props.postings.amountF)
    countP = 0;
    return (

      <div>
        <div className="card-4">
          <div className="bggreen">
            <h4>Postings List
          <span className="horIndent"></span>
              <Link to="/createposting" className="addn" >add new</Link>

              <span className="horIndent"></span>
              <span className="text14white">apply filter data to: &nbsp; &nbsp;

              <span onChange={this.togglePostingsAndLines.bind(this)}>
                  <input type="radio" value="postings" name="filterby" defaultChecked /> &nbsp;postings &nbsp; &nbsp; &nbsp; &nbsp;
              <input type="radio" value="lines" name="filterby" /> &nbsp;entry lines
              </span>
              </span>
            </h4>
          </div>
          <div>
            {this.props.postings.length == 0 && this.props.separateLines.length == 0 && <div className="boxedtransp"><br />No entries have been found !<br /><br /></div>}

            {this.state.showLinesOnly == true && this.props.separateLines.map((separateLine) => {
              //console.log(separateLine);
              countP++;
              return <SeparateLineItem key={separateLine.id} countP={countP} {...separateLine} />;
            })}

            {this.state.showLinesOnly == false && this.props.postings.map((posting) => {
              //console.log(posting);
              countP++;
              return <PostingListItem key={posting.id} countP={countP} {...posting} />;
            })}

          </div>
          <span className="verIndentFive"></span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postings: selectPostings(state.postings, state.filters),
    separateLines: selectSeparateLines(state.separateLines, state.filters)
  };
};

export default connect(mapStateToProps)(PostingsList);
