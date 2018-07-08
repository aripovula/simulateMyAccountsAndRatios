import moment from 'moment';

export default (postings, { text, sortBy, startDate, endDate }) => {
    
    return postings.filter((posting) => {
      const postDateAtMoment = moment(posting.postingDate);
      console.log('PICKER startDate = ' + startDate +' -- '+startDate.format('MMMM D, YYYY'));
      console.log('PICKER endDate = ' + endDate+' -- '+endDate.format('MMMM D, YYYY'));
      console.log('PICKER postDateAtMoment = ' + postDateAtMoment+' -- '+postDateAtMoment.format('MMMM D, YYYY'));
      console.log('PICKER st= '+startDate.isSameOrBefore(postDateAtMoment, 'day'));
      console.log('PICKER end= '+endDate.isSameOrAfter(postDateAtMoment, 'day'));
      const startDateMatch = startDate ? startDate.isSameOrBefore(postDateAtMoment, 'day') : true;
      const endDateMatch = endDate ? endDate.isSameOrAfter(postDateAtMoment, 'day') : true;
      const textMatch = posting.note.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;

    }).sort((a, b) => {
      if (sortBy === 'createdDate') {
        return a.createdAt < b.createdAt ? -1 : 1;
      } else if (sortBy === 'postingDate') {
        return a.postingDate < b.postingDate ? -1 : 1;
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }
    });
  };
  