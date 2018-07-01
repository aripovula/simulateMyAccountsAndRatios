// Get visible postings

export default (postings, { text, sortBy, startDate, endDate }) => {
    return postings.filter((posting) => {
      const startDateMatch = typeof startDate !== 'number' || posting.createdAt >= startDate;
      const endDateMatch = typeof endDate !== 'number' || posting.createdAt <= endDate;
      const textMatch = true;//posting.lineItem.toLowerCase().includes(text.toLowerCase());
  
      return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'amount') {
        return a.amount < b.amount ? 1 : -1;
      }
    });
  };
  