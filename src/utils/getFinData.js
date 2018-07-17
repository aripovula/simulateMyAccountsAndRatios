import React from "react";
import numeral from 'numeral';

export const getFinData = (postings) => {

  //console.log('postings==');
  // console.log(postings);

  let broughtForward = getPYbalances();
  let data = [];
  let accum = [];
  let accumOpening = [];

  var mySet = new Set();

  broughtForward.map(lineData => {
    mySet.add(lineData.lineItem);
  });

  postings.map(posting => {
    posting.linesData.map(lineData => {
      mySet.add(lineData.lineItem);
    });
  });

  let LIs = [...mySet];

  broughtForward.map(lineData => {
    for (let x = 0; x < LIs.length; x++) {
      if (LIs[x] == lineData.lineItem) {
        let amt = parseFloat(lineData.amount, 10) / 100;
        if (accum[x] == null) accum[x] = 0;
        if (lineData.isDr) accum[x] = accum[x] + amt;
        if (!lineData.isDr) accum[x] = accum[x] - amt;

        if (accumOpening[x] == null) accumOpening[x] = 0;
        if (lineData.isDr) accumOpening[x] = accumOpening[x] + amt;
        if (!lineData.isDr) accumOpening[x] = accumOpening[x] - amt;
      }
    }
  });

  postings.map(posting => {
    if (!posting.isUnPosted) {
      posting.linesData.map(lineData => {
        for (let x = 0; x < LIs.length; x++) {
          if (LIs[x] == lineData.lineItem) {
            let amt = parseFloat(lineData.amount, 10) / 100;
            if (accum[x] == null) accum[x] = 0;
            if (lineData.isDr) accum[x] = accum[x] + amt;
            if (!lineData.isDr) accum[x] = accum[x] - amt;
          }
        }
      });
    }
  });

  let accs = [];
  for (let x = 0; x < LIs.length; x++) {
    accs[x] = { lineItem: LIs[x], balance: accum[x], openingBalance: accumOpening[x] }
  }
  // console.log('accum = ');
  // console.log(accum);

  let accounts = accs;//.sort((a, b) => {
    //return a.lid < b.lid ? 1 : -1;
  //});


  accounts.map(acc => {
    // console.log('acc');
    // console.log(acc);
    let percentChange = (acc.balance != null && acc.openingBalance != null) ? ((parseFloat(acc.balance, 10) - parseFloat(acc.openingBalance, 10)) / parseFloat(acc.openingBalance, 10)) : 0;
    let difce = acc.balance - acc.openingBalance;
    let arrowType = 0;
    if (percentChange > 0 && difce > 0) arrowType = 2;
    if (percentChange > 0 && difce < 0) arrowType = 1;
    if (percentChange < 0 && difce < 0) arrowType = -1;
    if (percentChange < 0 && difce > 0) arrowType = -2;

    let balance = acc.balance != null ? numeral(acc.balance).format('0,0') : '';
    let openingBalance = acc.openingBalance != null ? numeral(acc.openingBalance).format('0,0') : '';

    // console.log(percentChange);
    data.push(
      {
        TBLineItems: { lineItem: acc.lineItem, isUpdated: false },
        amounts_current: { balance, isUpdated: false },
        amounts_comparatives: { openingBalance, isUpdated: false },
        percent_change: { percentChange, arrowType },
        isPosted: true
      }
    );
  });
  //console.log('postingsInFinStatementUpdated changed Data');
  //console.log(data);
  return data;
}

export const getPYbalances = () => {
  return [
    { lid:1, isDr: true, lineItem: 'Cash and cash equivalents', amount: '42616000', type: 'STA,a,'},
    { lid:2, isDr: true, lineItem: 'Accounts receivable', amount: '530488000', type: 'STA,a,'},
    { lid:3, isDr: true, lineItem: 'Inventory', amount: '34524000', type: 'STA,a,Inventory'},
    { lid:4, isDr: true, lineItem: 'Prepaid charges', amount: '16576000', type: 'STA,a,'},
    { lid:5, isDr: true, lineItem: 'Equity in joint venture', amount: '28784000', type: 'LTA,a,'},
    { lid:6, isDr: true, lineItem: 'Long-term lendings', amount: '24500000', type: 'LTA,a,'},
    { lid:7, isDr: true, lineItem: 'Property and equipment, net', amount: '136696000', type: 'LTA,a,'},
    { lid:8, isDr: false, lineItem: 'Trade payables', amount: '24157000', type: 'STL,l,'},
    { lid:9, isDr: false, lineItem: 'Borrowings - current portion', amount: '356034000', type: 'STL,l,debt'},
    { lid:10, isDr: false, lineItem: 'Advances received', amount: '33880000', type: 'STL,l,'},
    { lid:11, isDr: false, lineItem: 'Accrued loss on uncompleted contract', amount: '10738000', type: 'STL,l,'},
    { lid:12, isDr: false, lineItem: 'Other current liabilities', amount: '12404000', type: 'STL,l,'},
    { lid:13, isDr: false, lineItem: 'Borrowings - non-current portion', amount: '69041000', type: 'LTL,l,debt'},
    { lid:14, isDr: false, lineItem: 'Long-term accrued liabilities', amount: '21588000', type: 'LTL,l,'},
    { lid:15, isDr: false, lineItem: 'Share capital', amount: '42000000', type: 'ShC,c,'},
    { lid:16, isDr: false, lineItem: 'Retained earnings of prior periods', amount: '127050000', type: 'ShC,c,'},
    { lid:17, isDr: false, lineItem: 'Revenue', amount: '1348312000', type: 'GM,p,'},
    { lid:18, isDr: true, lineItem: 'Cost of revenues earned', amount: '1041054000', type: 'GM,p,'},
    { lid:19, isDr: true, lineItem: 'Selling general and admin expense', amount: '125384000', type: 'Adm,p,da'},
    { lid:20, isDr: false, lineItem: 'Earnings from share in joint venture', amount: '6986000', type: 'Other,p,'},
    { lid:21, isDr: false, lineItem: 'Gain on sale of equipment', amount: '1400000', type: 'Other,p,'},
    { lid:22, isDr: true, lineItem: 'Interest expense', amount: '9730000', type: 'FinEx,p,ebitda'},
    { lid:23, isDr: true, lineItem: 'Income tax expense', amount: '63238000', type: 'IncTax,p,ebitda'}
  ];
}

