import React from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';
import { Link } from 'react-router-dom';

import { getPYbalances } from "../utils/getFinData";
import PostingOneLine from './PostingOneLine';

let idCounter = 1, countP = 0;
let is2go2list = true;
let isEditMode = false;
let isNewLIused = false;

export default class PostingForm extends React.Component {
  constructor(props) {
    super(props);
    console.log('PostingForm CONSTRUCTOR this.props.postingForm');
    console.log(this.props.posting);
    this.state = {
      note: this.props.posting ? this.props.posting.note : '',
      totalAmount: this.props.posting ? this.props.posting.totalAmount : '',
      createdAt: this.props.posting ? moment(this.props.posting.createdAt) : moment(),
      postingDate: this.props.posting ? moment(this.props.posting.postingDate) : moment(),
      success: '',
      error: '',
      offeredFSLIs: '',
      offeredFSLIindex: '',
      linesData: this.props.posting ? this.props.posting.linesData : [
        { idu: 0, isDr: true, lineItem: '', amount: 0 },
        { idu: 1, isDr: false, lineItem: '', amount: 0 }
      ]
    };
    this.processDateChange = this.processDateChange.bind(this);
    this.processAddDrLine = this.processAddDrLine.bind(this);
    this.processAddCrLine = this.processAddCrLine.bind(this);
    this.processDeleteLine = this.processDeleteLine.bind(this);
    this.processEntryTypeChange = this.processEntryTypeChange.bind(this);
    this.onAmountChanged = this.onAmountChanged.bind(this);
    this.onLineItemChange = this.onLineItemChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.onStayHereSelected = this.onStayHereSelected.bind(this);
    this.handleOfferSelection = this.handleOfferSelection.bind(this);
    idCounter = this.props.posting ? this.props.posting.linesData.length + 1 : 4;
    isEditMode = this.props.posting ? true : false;
    is2go2list = true;
    isNewLIused = false;
  }

  onActionButtonSelected = (posting) => {
    console.log('in onActionButtonSelected data=');
    console.log(posting.lines);
    idCounter = 4;
    this.setState(() => {
      return {
        note: `entry to reflect ${posting.name.substring(5).replace("\n\r", "")}`,
        linesData: posting.lines
      }
    }, this.checkSum);
  }

  onStayHereSelected = () => {
    idCounter = 2;
    isNewLIused = false;
    this.setState(() => {
      return {
        note: "",
        totalAmount: '',
        createdAt: moment(),
        postingDate: moment(),
        linesData: [
          { idu: 0, isDr: true, lineItem: '', amount: 0 },
          { idu: 1, isDr: false, lineItem: '', amount: 0 }
        ],
        offeredFSLIs: '',
        offeredFSLIindex: ''
      }
    });
  }

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
    this.onErrorChange('');
  };

  onLineItemChange = (e) => {
    const id2locate = e.target.id;
    const lineItem = e.target.value;
    console.log('id = ' + id2locate + ' lineItem = ' + lineItem);
    let index2change;
    let counterF = 0;
    this.state.linesData.map((lineData) => {
      if (lineData.idu == id2locate) index2change = counterF;
      counterF++;
    });
    if (!lineItem || lineItem.match(/^[a-zA-Z\d-\s]+$/)) {
      const selNum = parseInt(lineItem.replace(/^\D+/g, ''));
      //console.log('selNum='+selNum);
      if (selNum > 0 && this.state.offeredFSLIs.length > 0) {
        this.handleOfferSelection(selNum);
      } else {
        if (!lineItem || lineItem.match(/^[a-zA-Z-\s]+$/)) {
          this.setState((prevState) => {
            prevState.linesData[index2change].lineItem = lineItem;
            return {
              linesData: prevState.linesData
            }
          });
          this.onErrorChange('');
          this.offerFSLI(lineItem, id2locate);
        } else {
          e.target.value = this.state.linesData[index2change].lineItem;
          this.onErrorChange('Please use only letters, hyphen or space');
        }
      }
    }
  };

  offerFSLI = (lineItem, index2change) => {
    if (lineItem.length > 1) {
      let FSLIs = getPYbalances();
      let FSLIs2offer = [];
      for (let x = 0; x < FSLIs.length; x++) {
        //console.log('FSLIs[x].lineItem ='+FSLIs[x].lineItem+' lineItem='+lineItem);
        if (FSLIs[x].lineItem.toLowerCase().includes(lineItem.toLowerCase())) FSLIs2offer.push(FSLIs[x].lineItem);
      }
      if (FSLIs2offer.length > 0) {
        this.setState(() => {
          return {
            offeredFSLIs: FSLIs2offer,
            offeredFSLIindex: index2change
          }
        });
        console.log('FSLIs2offer');
        console.log(FSLIs2offer);
      } else {
        isNewLIused = true;
        this.onErrorChange('This line item is not found. Only admin can add new line items !');
      }
    } else {
      this.setState(() => {
        return {
          offeredFSLIs: '',
          offeredFSLIindex: ''
        }
      });
    }
  }

  handleOfferSelection = (selectionNum) => {
    const idSel = selectionNum - 1;
    console.log('idSel = ' + idSel);
    // console.log('this.state.linesData');
    // console.log(this.state.linesData);
    // console.log('e.target.id = ' + e.target.id);
    // console.log('this.state.offeredFSLIs[e.target.id] = ' + this.state.offeredFSLIs[idSel]);
    let newLinesData = [];
    this.setState((prevState) => {
      prevState.linesData.map(lineData => {
        // console.log('lineData.idu=' + lineData.idu);
        // console.log('prevState.offeredFSLIindex=' + prevState.offeredFSLIindex);
        // console.log('prevState.offeredFSLIs[idSel]=' + prevState.offeredFSLIs[idSel]);
        if (lineData.idu == prevState.offeredFSLIindex) { lineData.lineItem = prevState.offeredFSLIs[idSel] }
        newLinesData.push(lineData);
      });
      // console.log('newLinesData');
      // console.log(newLinesData);

      return {
        linesData: newLinesData,
        offeredFSLIs: '',
        offeredFSLIindex: ''
      }
    });
    console.log('this.state.linesData IN FUNCTION');
    console.log(this.state.linesData);
  }

  onAmountChanged = (e) => {
    const id2locate = e.target.id;
    const amount = e.target.value;
    let index2change;
    let counterF = 0;
    this.state.linesData.map((lineData) => {
      if (lineData.idu == id2locate) index2change = counterF;
      counterF++;
    });
    console.log('id = ' + e.target.id + ' amount = ' + amount);
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState((prevState) => {
        if (!amount) { prevState.linesData[index2change].amount = '' }
        else { prevState.linesData[index2change].amount = (amount * 100).toString(); }
        return {
          linesData: prevState.linesData
        }
      }, this.checkSum);
    } else {
      e.target.value = this.state.linesData[index2change].amount;
      this.onErrorChange('Please use valid amount');
    }
  };

  processAddDrLine = () => {
    idCounter++;
    this.setState((prevState) => {
      return {
        linesData: prevState.linesData.concat({ idu: idCounter, isDr: true, lineItem: '', amount: 0 })
      }
    });
    this.onErrorChange('');
  }

  processAddCrLine = () => {
    idCounter++;
    this.setState((prevState) => {
      return {
        linesData: prevState.linesData.concat({ idu: idCounter, isDr: false, lineItem: '', amount: 0 })
      }
    });
    this.onErrorChange('');
  }

  processDeleteLine = (props) => {
    let line2remove = props.target.id;
    this.setState((prevState) => {
      return {
        linesData: prevState.linesData.filter(linesDataPr => linesDataPr.idu != line2remove)
      }
    });
    this.onErrorChange('');
  }

  processDateChange(date) {
    this.setState({
      postingDate: moment(date)
    });
  }

  processEntryTypeChange = (e) => {
    let id2locate = e.target.id;
    let index2change;
    console.log('id = ' + id2locate);
    this.setState((prevState) => {
      // console.log('state - all lines');
      let counterF = 0;
      this.state.linesData.map((lineData) => {
        console.log(lineData);
        if (lineData.idu == id2locate) { index2change = counterF; console.log(index2change); }
        counterF++;
      });
      let isDr = !prevState.linesData[index2change].isDr;
      prevState.linesData[index2change].isDr = isDr;
      console.log('id = ' + index2change + ' isDr = ' + isDr);
      return {
        linesData: prevState.linesData
      }
    }, this.checkSum);
  }

  handleCheckboxChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    is2go2list = !value;
  }

  checkSum = () => {
    let missingLineItems = 0;
    let entryAbsValue = 0;
    let totalAmnt = 0;
    let errorText = "";
    let isValidEntry = true;

    this.state.linesData.map((lineData) => {
      if (lineData.lineItem.length == 0) missingLineItems++;
      if (lineData.amount) {
        let amnt = parseFloat(lineData.amount, 10) / 100;
        if (lineData.isDr) totalAmnt = totalAmnt + amnt;
        if (!lineData.isDr) totalAmnt = totalAmnt - amnt;
        entryAbsValue = entryAbsValue + Math.abs(amnt);
      }
    });

    this.setState(() => { return { totalAmount: entryAbsValue } });

    if (missingLineItems != 0) { errorText = `${errorText} add ${missingLineItems} line item(s); `; isValidEntry = false; }
    if (entryAbsValue == 0) { errorText = `${errorText} add amounts; `; isValidEntry = false; }
    if (this.state.note.length == 0) { errorText = `${errorText} add description; `; isValidEntry = false; }
    if (totalAmnt != 0) { errorText = `${errorText} not balanced: ${totalAmnt.toFixed(2)}; `; isValidEntry = false; }
    if (isNewLIused) {errorText = 'One of line items is not found. Only admin can add new line items';isValidEntry = false;}
    this.onErrorChange(errorText);
    return isValidEntry;
  }

  onErrorChange = (text) => {
    this.setState(() => { return { error: text, success: '' } });
  }

  onSuccessChange = (text) => {
    this.setState(() => { return { success: text } });
  }


  onSubmit = (e) => {
    e.preventDefault();
    console.log('is2go2list=' + is2go2list);

    if (this.checkSum()) {
      this.onErrorChange('');
      if (!is2go2list) this.onSuccessChange('Entry has been posted !');
      this.props.onSubmit({
        linesData: this.state.linesData,
        createdAt: this.state.createdAt.valueOf(),
        postingDate: this.state.postingDate.valueOf(),
        note: this.state.note,
        totalAmount: this.state.totalAmount,
        isUnPosted: false,
        is2go2list
      });
    }
  };



  render() {
    console.log('this.state.linesData in RENDER');
    console.log(this.state.linesData);
    { countP = 0 }
    return (
      <form className="form" onSubmit={this.onSubmit}>

        {this.state.linesData.map((lineData) => {
          return <PostingOneLine
            key={lineData.idu}
            idu={lineData.idu}
            isDr={lineData.isDr}
            lineItem={lineData.lineItem}
            amount={lineData.amount}
            processDeleteLine={this.processDeleteLine}
            processEntryTypeChange={this.processEntryTypeChange}
            onAmountChanged={this.onAmountChanged}
            onLineItemChange={this.onLineItemChange}
          />
        })}

        <div>
          <span className="verIndent"></span>
          <span className="horIndent"></span>

          <button
            className="button1"
            type="button"
            onClick={this.processAddDrLine}
          >+ Dr line
            </button>

          <span className="horIndent"></span>

          <button
            className="button1"
            type="button"
            onClick={this.processAddCrLine}
          >+ Cr line
          </button>

          <span className="horIndent"></span>

          <span className="warning">{this.state.error != null && this.state.error}</span>
          <span className="success"><strong>{this.state.success != null && this.state.success}</strong></span>

          <br />
          <span className="verIndentFive"></span>
          <span className="horIndent"></span>

          <input
            type="text"
            autoComplete="off"
            placeholder="Description"
            className="text-input forComment"
            value={this.state.note}
            onChange={this.onNoteChange}
          />

          <span className="horIndent"></span>
          <span className="noDecor" onClick={this.onStayHereSelected}>clear form</span>

          <span className="verIndentFive"></span>
          <span className="horIndent"></span>

          <span>Date of posting:
          <span className="horIndent"></span>
            <DayPickerInput
              value={this.state.postingDate.format('MMMM D, YYYY')}
              selectedDays={this.state.postingDate}
              format="LL"
              formatDate={formatDate}
              onDayClick={day => this.processDateChange(day)}
              onDayChange={day => this.processDateChange(day)}
              placeholder={this.state.postingDate.format('MMMM D, YYYY')}
            />
          </span>
          <span className="horIndent"></span>

          <button className="button button1 buttonwide">Post Entry</button>

          {console.log('this.isEditMode' + isEditMode)}
          {!isEditMode && <span>
            <label className="text14black">&amp; stay here &nbsp;
            <input
                name="is2go2list"
                type="checkbox"
                onChange={this.handleCheckboxChange} />
            </label>
          </span>
          }


          <br /><span className="smalltext">* click Dr or Cr buttons to toggle between Dr and Cr. Total check is auto re-counted.</span>

          <div>
            <br />
            {console.log('this.state.offeredFSLIs.length = ' + this.state.offeredFSLIs.length)}
            {this.state.offeredFSLIs.length > 0 &&

              this.state.offeredFSLIs.map(offeredFSLI => {
                return (
                  <div key={++countP}>
                    <span className="horIndent"></span>
                    <span>

                      <span style={{ color: 'red' }}>{countP}. {offeredFSLI}</span>

                      <span className="horIndent"></span>

                      <span id={countP} className="noDecor2" onClick={(e) => this.handleOfferSelection(e.target.id)}>click to select or type {countP}</span>
                    </span>
                  </div>
                )
              })
              //offeredFSLIindex
            }

          </div>

        </div>
      </form>
    )
  }
  //render();
}