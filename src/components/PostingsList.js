import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip'

import PostingListItem from './PostingListItem';
import SeparateLineItem from './SeparateLineItem';
import selectPostings from '../selectors/postings';
import selectSeparateLines from '../selectors/separateLines';
import { separatePostingLines, removeSeparatedPostingLine } from '../actions/separateLines';
import addSimulatedEntries from '../utils/addSimulatedEntries';
import LoadingModal from './LoadingModal';
import LoadFailedModal from './LoadFailedModal';

let countP;
let isSecondTime = false;
let isRestored = false;

class PostingsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLinesOnly: false,
      mainText: undefined,
      mainTextFail: undefined,
      shortText: undefined
    }
    this.startRestoreDefaults = this.startRestoreDefaults.bind(this);
    this.restoreTimedOut = this.restoreTimedOut.bind(this);
    // this.restoreDefaultsDone = this.restoreDefaultsDone.bind(this);
  }

  startRestoreDefaults = () => {

    this.setState(() => ({
      shortText: 'In process ...',
      mainText: "Restoring defaults. Please wait"
    }));
    isRestored = false;
    setTimeout(this.restoreTimedOut, 8 * 1000);
    addSimulatedEntries(this.props);
  }

  restoreTimedOut = () => {
    if (!isRestored) {
      this.setState(() => ({
        mainText: undefined,
        mainTextFail: 'Restoring defaults failed. Please check your INTERNET connection !'
      }));
    }
  }

  componentWillReceiveProps = () => {
    this.setState(() => ({
      shortText: undefined,
      mainText: undefined,
      mainTextFail: undefined
    }));
    isRestored = true;
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
    console.log("from PList PROPs =");
    console.log(this.props.postings);
    // console.log('amountF=' + this.props.postings.amountF)
    countP = 0;
    return (

      <div>
        <LoadingModal
          mainText={this.state.mainText}
          shortText={this.state.shortText}
        />
        <LoadFailedModal
          mainTextFail={this.state.mainTextFail}
          shortText={this.state.shortText}
        />

        <ReactTooltip place="bottom" type="info" effect="float" />
        <div className="card-4">
          <div className="bggreen">
            <h4>Postings List
          <span className="horIndent"></span>
              <span className="notbold"> &nbsp; &nbsp;
                <Link to="/createposting" className="addn" >add new</Link>

                <span className="horIndent"></span>
                <span
                  data-tip="Filter by 'Line item' above to use 'entry lines' option - shows all entries on one lineitem"
                  className="text14white">show &nbsp;



                  <span onChange={this.togglePostingsAndLines.bind(this)}>
                    <input type="radio" value="postings" name="filterby" defaultChecked /> &nbsp;postings &nbsp;
                    <input type="radio" value="lines" name="filterby" /> &nbsp;entry lines
                  </span>
                </span>
                <span className="horIndent"></span>
                <span
                  className="text14white cursorpointer"
                  data-tip="Since other users could have posted blah blah Test entries this option deletes all postings from the database and adds / restores default entries"
                  onClick={this.startRestoreDefaults}
                >restore defaults</span>
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
