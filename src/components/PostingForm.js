import React from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';

import PostingOneLine from './PostingOneLine';

let idCounter = 1;
let is2go2list = true;

export default class PostingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: this.props.posting ? this.props.posting.note : '',
      totalAmount: this.props.posting ? this.props.posting.totalAmount : '',
      createdAt: this.props.posting ? moment(this.props.posting.createdAt) : moment(),
      postingDate: this.props.posting ? moment(this.props.posting.postingDate) : moment(),
      //calendarFocused: false,
      error: '',
      linesData: this.props.posting ? this.props.posting.linesData :[
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
  }

  onActionButtonSelected = (posting) => {
    console.log('in onActionButtonSelected data=');
    console.log(posting.lines);
    idCounter = 4;
    this.setState(() => {
      return {
        note: `entry to reflect ${posting.name.substring(5)}`,
        linesData: posting.lines
      }
    }, this.checkSum);
  }

  onStayHereSelected = () => {
    idCounter = 2;
    this.setState(() => {
      return {
        note: "",
        totalAmount: '',
        createdAt: moment(),
        postingDate: moment(),  
        linesData: [
          { idu: 0, isDr: true, lineItem: '', amount: 0 },
          { idu: 1, isDr: false, lineItem: '', amount: 0 }
        ]
      }
    }, () => this.onErrorChange('Entry has been posted !'));
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
      this.setState((prevState) => {
        prevState.linesData[index2change].lineItem = lineItem;
        return {
          linesData: prevState.linesData
        }
      });
      this.onErrorChange('');
    } else {
      e.target.value = this.state.linesData[index2change].lineItem;
      this.onErrorChange('Please use only letters, numbers, hyphen and space');
    }
  };

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
    
    if (missingLineItems != 0) { errorText = `${errorText} add ${missingLineItems} line item(s); `;isValidEntry=false;}
    if (entryAbsValue == 0) { errorText = `${errorText} add amounts; `;isValidEntry=false;}
    if (this.state.note.length == 0) { errorText = `${errorText} add posting comment; `;isValidEntry=false;}
    if (totalAmnt != 0) { errorText = `${errorText} not balanced: ${totalAmnt.toFixed(2)}; `;isValidEntry=false;}
    this.onErrorChange(errorText);
    return isValidEntry;
  }

  onErrorChange = (text) => {
    this.setState(() => { return { error: text } });
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (this.checkSum()) {
      this.onErrorChange('');
      this.props.onSubmit({
        linesData: this.state.linesData,
        createdAt: this.state.createdAt.valueOf(),
        postingDate: this.state.postingDate.valueOf(),
        note: this.state.note,
        totalAmount: this.state.totalAmount,
        is2go2list
      });
    }
  };



  render() {
    console.log("postingDate");
    console.log(this.state.postingDate);
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

          <span className="warning">{this.state.error!=null && this.state.error}</span>

          <br />
          <span className="verIndentFive"></span>
          <span className="horIndent"></span>

          <input
            type="text"
            placeholder="Comment (optional)"
            size="60"
            className="text-input"
            value={this.state.note}
            onChange={this.onNoteChange}
          />

          <span className="verIndentFive"></span>
          <span className="horIndent"></span>

          <span>Date of posting:
          <span className="horIndent"></span>
            <DayPickerInput
              value = {this.state.postingDate.format('MMMM D, YYYY')}
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
          
          <span className="text14black">&amp; stay here &nbsp;</span>
          <input
            name="is2go2list"
            type="checkbox"
            onChange={this.handleCheckboxChange} />
            
        
          <br /><span className="smalltext">* click Dr or Cr buttons to toggle between Dr and Cr. Total check is auto re-counted.</span>
        </div>
      </form>
    )
  }
  //render();
}