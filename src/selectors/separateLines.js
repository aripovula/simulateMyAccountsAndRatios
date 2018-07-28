import { createSelector } from 'reselect';
import moment from 'moment';
import uuid from 'uuid';

const getPostings = (state) => state.postings;
const getText = (state) => state.filters.text || '';
const getLineItem = (state) => state.filters.lineItem || '';
const getAmountF = (state) => state.filters.amountF || 0;
const getAmountFType = (state) => state.filters.amountFType || 'includes';
const getSortBy = (state) => state.filters.sortBy || 'createdDate';
const getStartDate = (state) => state.filters.startDate;
const getEndDate = (state) => state.filters.endDate;

export const selectSeparateLines = createSelector(
  getPostings,
  getText, getLineItem, getAmountF, getAmountFType, getSortBy, getStartDate, getEndDate,
  (postings, text, lineItem, amountF, amountFType, sortBy, startDate, endDate) => {
    console.log('postings from ABC separateLines');
    // 1. Re-builds from a posting to a separateLine
    let separateLines = [];
    postings.map(posting => {
      let enid = posting.id;
      let endate = posting.postingDate;
      let crdate = posting.createdAt;
      let isUnPosted = posting.isUnPosted;
      posting.linesData.map(lineData => {
        separateLines.push({
          id: uuid(),
          entryId: enid,
          isDr: lineData.isDr,
          lineItem: lineData.lineItem,
          amount: lineData.amount,
          createdAt: crdate,
          postingDate: endate,
          isUnPosted
        });
      });
    });

    // 2. Filters
    return separateLines.filter((posting) => {
      const postDateAtMoment = moment(posting.postingDate);
      const startDateMatch = startDate ? startDate.isSameOrBefore(postDateAtMoment, 'day') : true;
      const endDateMatch = endDate ? endDate.isSameOrAfter(postDateAtMoment, 'day') : true;

      let lineItemMatch = lineItem ? false : true;
      let lineAmountMatch = amountF ? false : true;


      if (posting.lineItem.toLowerCase().includes(lineItem.toLowerCase())) lineItemMatch = true;
      if (amountFType == 'includes' && ('' + posting.amount).includes('' + amountF)) lineAmountMatch = true;
      if (amountFType == 'equals' && parseFloat(posting.amount, 10) / 100 == amountF) lineAmountMatch = true;
      if (amountFType == 'grthan' && parseFloat(posting.amount, 10) / 100 >= amountF) lineAmountMatch = true;
      if (amountFType == 'lsthan' && parseFloat(posting.amount, 10) / 100 <= amountF) lineAmountMatch = true;


      return startDateMatch && endDateMatch && lineItemMatch && lineAmountMatch;

      // 3. Sorts
    }).sort((a, b) => {
      if (sortBy === 'createdDate') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'postingDate') {
        return a.postingDate < b.postingDate ? 1 : -1;
      } else if (sortBy === 'amount') {
        return a.totalAmount < b.totalAmount ? 1 : -1;
      } else if (sortBy === 'status') {
        return a.isUnPosted * 1 < b.isUnPosted * 1 ? 1 : -1;
      }
    });
  });
