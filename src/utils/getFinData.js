import React from "react";

export const getFinData = (postings) => {

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
    });

    let accs = [];
    for (let x = 0; x < LIs.length; x++) {
      accs[x] = { lineItem: LIs[x], balance: accum[x], openingBalance: accumOpening[x] }
    }
    console.log('accum = ');
    console.log(accum);

    let accounts =  accs.sort((a, b) => {
      return a.balance < b.balance ? 1 : -1;
    });


    accounts.map(acc => {
      console.log('acc');
      console.log(acc);
      let percentChange = (parseFloat(acc.balance, 10) - parseFloat(acc.openingBalance, 10)) / parseFloat(acc.openingBalance, 10);
      console.log(percentChange);
      data.push(
        {
          TBLineItems: acc.lineItem,
          amounts_current: acc.balance != null ? acc.balance.toLocaleString('en-US') : '',
          amounts_comparatives: acc.openingBalance != null ? acc.openingBalance.toLocaleString('en-US') : '',
          percent_change: (acc.balance != null && acc.openingBalance != null) ? percentChange.toFixed(2) + "%" : 'n/a',
          status: 223
        }
      );
    });
    console.log('postingsInFinStatementUpdated changed Data');
    return data;
  }

  export const getPYbalances = () => {
    return [
      { isDr: true, lineItem: 'Cash and equivalents', amount: '322324234' },
      { isDr: true, lineItem: 'Accounts receivable', amount: '46323242' },
      { isDr: true, lineItem: 'Inventory', amount: '46323242' },
      { isDr: true, lineItem: 'Long-term loans', amount: '46323242' },
      { isDr: true, lineItem: 'Short-term loans', amount: '46323242' },
      { isDr: true, lineItem: 'Advance payments', amount: '46323242' },
      { isDr: true, lineItem: 'Other assets', amount: '46323242' },
      { isDr: false, lineItem: 'Accounts payable', amount: '46323242' },
      { isDr: false, lineItem: 'Long-term borrowings', amount: '46323242' },
      { isDr: false, lineItem: 'Short-term borrowings', amount: '46323242' },
      { isDr: false, lineItem: 'Advances received', amount: '46323242' },
      { isDr: false, lineItem: 'Other liabilities', amount: '46323242' },
      { isDr: false, lineItem: 'Share capital', amount: '46323242' },
      { isDr: false, lineItem: 'Retained earnings', amount: '46323242' },
      { isDr: false, lineItem: 'Reserves', amount: '46323242' },
      { isDr: false, lineItem: 'Revenue', amount: '46323242' },
      { isDr: false, lineItem: 'Interest income', amount: '46323242' },
      { isDr: true, lineItem: 'Cost of goods sold', amount: '46323242' },
      { isDr: true, lineItem: 'Admin expenses', amount: '46323242' },
      { isDr: true, lineItem: 'Interest expenses', amount: '46323242' },
      { isDr: true, lineItem: 'Other expenses', amount: '46323242' }
    ];
  }

