import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import ReactTooltip from 'react-tooltip'

import { startRemovePosting } from '../actions/postings';
import { startEditPosting } from '../actions/postings';
import DeleteModal from './DeleteModal';

let uniqCount = 0;
class PostingsListItem extends React.Component {
  constructor(props) {
    super(props);
    const pydate = moment().subtract(1,'years').endOf('year');

    this.state = {
      mainText: undefined,
      shortText: undefined
    };
    this.handleModalCancelOptionSelected = this.handleModalCancelOptionSelected.bind(this);
    this.handleModalYesOptionSelected = this.handleModalYesOptionSelected.bind(this);
  }

  handleModalCancelOptionSelected = () => {
    this.setState(() => ({ mainText: undefined }));
  }

  handleModalYesOptionSelected = (id) => {
    this.setState(() => ({ mainText: undefined }));
    this.props.dispatch(startRemovePosting({ id }));
  }

  render() {
    let { dispatch, id, linesData, note, createdAt, postingDate, isUnPosted, totalAmount, countP } = this.props;

    return (
      <div className="boxed">
        <ReactTooltip place="bottom" type="info" effect="float" />
        <h4><span className="postingNote">{countP}. {note}</span>
          <span className="horIndent"></span>

          <Link to={`/editposting/${id}`} className="addnlightbg notbold">edit</Link>

          <span className="horIndent"></span>

          {!isUnPosted &&
            <span
              className="addnlightbg notbold cursorpointer"
              data-tip="temporarily un-posts entry. Can be re-posted again later"
              onClick={() => {
                const newPosting = {
                  linesData,
                  note,
                  totalAmount,
                  createdAt,
                  postingDate,
                  isUnPosted: true
                }
                dispatch(startEditPosting(id, newPosting));
              }}>un-post</span>}

          {isUnPosted &&
            <span
              className="addnlightbg notbold cursorpointer"
              onClick={() => {
                const newPosting = {
                  linesData,
                  note,
                  totalAmount,
                  createdAt,
                  postingDate,
                  isUnPosted: false
                }
                dispatch(startEditPosting(id, newPosting));
              }}>re-post</span>}

          <span className="horIndent"></span>

          <span
            className="addnlightbg notbold cursorpointer"
            data-tip="permanently deletes entry. You will be prompted to confirm"
            onClick={() => {
              this.setState(() => ({
                shortText: 'Confirm delete',
                mainText: "Permanently delete the selected posting ?"
              }));
            }}>delete</span>
          <DeleteModal
            // selectedOption = {this.state.selectedOption}
            lid={id}
            mainText={this.state.mainText}
            shortText={this.state.shortText}
            handleModalYesOptionSelected={this.handleModalYesOptionSelected}
            handleModalCancelOptionSelected={this.handleModalCancelOptionSelected}
          />

        </h4>

        {linesData.map((line) => {
          { uniqCount++ }
          return (<p
            key={uniqCount}
            className="postLineList"
          >
            {line.isDr ? 'Dr ' : '\xa0 \xa0   Cr '}
            {line.lineItem} &nbsp; - &nbsp;&nbsp;
        {numeral(parseFloat(line.amount, 10) / 100).format('0,0')}
            {isUnPosted && <span style={{ color: 'red', fontSize: '12px' }}> &nbsp; &nbsp; ( un-posted )</span>}
          </p>)
        })}

        <span className="smalltext">( posted on&nbsp;
          {moment(createdAt).format('MMMM D, YYYY')}; &nbsp; posted for date of&nbsp;
          {moment(postingDate).format('MMMM D, YYYY')} )
        </span>



      </div>
    );
  }
}

export default connect()(PostingsListItem);
