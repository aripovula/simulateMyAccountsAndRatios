import React from "react";
import numeral from 'numeral';

export const getFinData = (postings) => {
  console.log('postings in getFinData');
  console.log(postings);

  let accounts = getPYbalances();
  let data = [];

  postings.map(posting => {
    // console.log('posting');
    // console.log(posting);
    if (!posting.isUnPosted) {
      posting.linesData.map(lineData => {
        let x = lineData.lineItemID - 1;
        // console.log('x='+x);
        // console.log('accounts[x].lineItem='+accounts[x].lineItem);
        // console.log('lineData.lineItem='+lineData.lineItem);
        if (accounts[x].lineItem == lineData.lineItem) {
          let amt = parseFloat(lineData.amount, 10);
          if (lineData.isDr) { accounts[x].amount = accounts[x].amount + amt; }
          if (!lineData.isDr) { accounts[x].amount = accounts[x].amount - amt; }
        }
      });
    }
  });

  // console.log('AccountS');
  // console.log(accounts);

  accounts.map(account => {
    // console.log('acc');
    // console.log(acc);
    let difce = (account.amount / 100) - (account.amountOpening / 100);
    let percentChange = (account.amount != null && account.amountOpening != null) ? difce / (account.amountOpening / 100) : 0;
    let arrowType = 0;
    if (account.type.includes(',a,') || account.type.includes(',l,') || account.type.includes(',c,')) {
      if (percentChange > 0 && difce > 0) arrowType = 2;
      if (percentChange > 0 && difce < 0) arrowType = 1;
      if (percentChange < 0 && difce < 0) arrowType = -1;
      if (percentChange < 0 && difce > 0) arrowType = -2;
    }
    if (account.type.includes(',p,')) {
      if (account.amountOpening < 0 && percentChange > 0) arrowType = 2;
      if (account.amountOpening > 0 && percentChange > 0) arrowType = 1;
      if (account.amountOpening < 0 && percentChange < 0) arrowType = -1;
      if (account.amountOpening > 0 && percentChange < 0) arrowType = -2;
    }

    let balance = account.amount != null ? numeral(account.amount / 100).format('0,0') : '';
    let openingBalance = account.amountOpening != null ? numeral(account.amountOpening / 100).format('0,0') : '';

    // console.log(percentChange);
    data.push(
      {
        TBLineItemsID: account.lid,
        TBLineItems: { lineItem: account.lineItem, isUpdated: false },
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
    { lid: 1, isDr: true, lineItem: 'Cash and cash equivalents', amount: 42616000, amountOpening: 42616000, type: 'STA,a,' },
    { lid: 2, isDr: true, lineItem: 'Accounts receivable', amount: 230488000, amountOpening: 230488000, type: 'STA,a,' },
    { lid: 3, isDr: true, lineItem: 'Inventory', amount: 134524000, amountOpening: 134524000, type: 'STA,a,Inventory' },
    { lid: 4, isDr: true, lineItem: 'Prepaid charges', amount: 16576000, amountOpening: 16576000, type: 'STA,a,' },
    { lid: 5, isDr: true, lineItem: 'Equity in joint venture', amount: 28784000, amountOpening: 28784000, type: 'LTA,a,' },
    { lid: 6, isDr: true, lineItem: 'Long-term lendings', amount: 24500000, amountOpening: 24500000, type: 'LTA,a,' },
    { lid: 7, isDr: true, lineItem: 'Property and equipment, gbv', amount: 505044000, amountOpening: 505044000, type: 'LTA,a,' },
    { lid: 8, isDr: false, lineItem: 'Accumulated depreciation', amount: -168348000, amountOpening: -168348000, type: 'LTA,a,' },
    { lid: 9, isDr: false, lineItem: 'Trade payables', amount: -24157000, amountOpening: -24157000, type: 'STL,l,' },
    { lid: 10, isDr: false, lineItem: 'Borrowings - current portion', amount: -356034000, amountOpening: -356034000, type: 'STL,l,debt' },
    { lid: 11, isDr: false, lineItem: 'Advances received', amount: -33880000, amountOpening: -33880000, type: 'STL,l,' },
    { lid: 12, isDr: false, lineItem: 'Accrued loss on uncompleted contract', amount: -10738000, amountOpening: -10738000, type: 'STL,l,' },
    { lid: 13, isDr: false, lineItem: 'Other current liabilities', amount: -12404000, amountOpening: -12404000, type: 'STL,l,' },
    { lid: 14, isDr: false, lineItem: 'Borrowings - non-current portion', amount: -69041000, amountOpening: -69041000, type: 'LTL,l,debt' },
    { lid: 15, isDr: false, lineItem: 'Long-term accrued liabilities', amount: -21588000, amountOpening: -21588000, type: 'LTL,l,' },
    { lid: 16, isDr: false, lineItem: 'Share capital', amount: -42000000, amountOpening: -42000000, type: 'ShC,c,' },
    { lid: 17, isDr: false, lineItem: 'Retained earnings of prior periods', amount: -127050000, amountOpening: -127050000, type: 'ShC,c,' },
    { lid: 18, isDr: false, lineItem: 'Revenue', amount: -1348312000, amountOpening: -1348312000, type: 'GM,p,' },
    { lid: 19, isDr: true, lineItem: 'Cost of goods sold', amount: 1041054000, amountOpening: 1041054000, type: 'GM,p,' },
    { lid: 20, isDr: true, lineItem: 'Selling, general and admin expenses', amount: 125384000, amountOpening: 125384000, type: 'Adm,p,da' },
    { lid: 21, isDr: false, lineItem: 'Earnings from share in joint venture', amount: -6986000, amountOpening: -6986000, type: 'Other,p,' },
    { lid: 22, isDr: false, lineItem: 'Gain on sale of equipment', amount: -1400000, amountOpening: -1400000, type: 'Other,p,' },
    { lid: 23, isDr: true, lineItem: 'Interest expense', amount: 9730000, amountOpening: 9730000, type: 'FinEx,p,ebitda' },
    { lid: 24, isDr: true, lineItem: 'Income tax expense', amount: 63238000, amountOpening: 63238000, type: 'IncTax,p,ebitda' }
  ];
}

