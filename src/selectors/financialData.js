import React from "react";
import numeral from 'numeral';
import { createSelector } from 'reselect';

import { selectPostings } from './postings';
import { getPYbalances } from '../utils/getPYbalances';

const getPostings = (state) => selectPostings(state);

export const selectFinancialData = createSelector(
  getPostings, (postings) => {

    // console.log('postings in selectFinancialData  postings.length = '+postings.length);
    //console.log(postings);

    let accounts = getPYbalances();
    let data = [];

    postings.map(posting => {
      if (!posting.isUnPosted) {
        posting.linesData.map(lineData => {
          let x = lineData.lineItemID - 1;
          if (accounts[x].lineItem == lineData.lineItem) {
            let amt = parseFloat(lineData.amount, 10);
            if (lineData.isDr) { accounts[x].amount = accounts[x].amount + amt; }
            if (!lineData.isDr) { accounts[x].amount = accounts[x].amount - amt; }
          }
        });
      }
    });

    accounts.map(account => {
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
    return data;
  });
