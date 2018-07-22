import moment from 'moment';

export default (postings, { text, lineItem, amountF, amountFType='includes', sortBy, startDate, endDate }) => {
    
    return postings.filter((posting) => {
      const postDateAtMoment = moment(posting.postingDate);
      const startDateMatch = startDate ? startDate.isSameOrBefore(postDateAtMoment, 'day') : true;
      const endDateMatch = endDate ? endDate.isSameOrAfter(postDateAtMoment, 'day') : true;
      const textMatch = posting.note.toLowerCase().includes(text.toLowerCase());

      let lineItemMatch = lineItem ? false : true;
      let lineAmountMatch = amountF ? false : true;

      posting.linesData.map(lineData =>  {
        if (lineData.lineItem.toLowerCase().includes(lineItem.toLowerCase())) lineItemMatch = true;
        if (amountFType=='includes' && (''+lineData.amount).includes(''+amountF)) lineAmountMatch = true;
        if (amountFType=='equals' && parseFloat(lineData.amount, 10) / 100 == amountF) lineAmountMatch = true;
        if (amountFType=='grthan' && parseFloat(lineData.amount, 10) / 100 >= amountF) lineAmountMatch = true;
        if (amountFType=='lsthan' && parseFloat(lineData.amount, 10) / 100 <= amountF) lineAmountMatch = true;
      });

      return startDateMatch && endDateMatch && textMatch && lineItemMatch && lineAmountMatch;

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
  