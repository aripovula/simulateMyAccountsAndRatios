import moment from 'moment';

export default (separateLines, {lineItem, amountF, amountFType='includes', sortBy, startDate, endDate}) => {
    
    return separateLines.filter((posting) => {
      const postDateAtMoment = moment(posting.postingDate);
      const startDateMatch = startDate ? startDate.isSameOrBefore(postDateAtMoment, 'day') : true;
      const endDateMatch = endDate ? endDate.isSameOrAfter(postDateAtMoment, 'day') : true;

      let lineItemMatch = lineItem ? false : true;
      let lineAmountMatch = amountF ? false : true;
 

        if (posting.lineItem.toLowerCase().includes(lineItem.toLowerCase())) lineItemMatch = true;
        if (amountFType=='includes' && (''+posting.amount).includes(''+amountF)) lineAmountMatch = true;
        if (amountFType=='equals' && parseFloat(posting.amount, 10) / 100 == amountF) lineAmountMatch = true;
        if (amountFType=='grthan' && parseFloat(posting.amount, 10) / 100 >= amountF) lineAmountMatch = true;
        if (amountFType=='lsthan' && parseFloat(posting.amount, 10) / 100 <= amountF) lineAmountMatch = true;


      return startDateMatch && endDateMatch && lineItemMatch && lineAmountMatch;

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
  };
  