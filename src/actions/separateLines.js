import uuid from 'uuid';

// SEPARATE POSTING LINE
export const separatePostingLines = (enid, endate, crdate, isDr, lineItem, amount) => ({

      type: 'ADD_SEPARATED_LINE',
      separatedLine: {
        id: uuid(),
        entryId: enid,
        isDr,
        lineItem,
        amount,
        createdAt: crdate,
        postingDate: endate
      }
});

// REMOVE_ALL_SEPARATED_POSTING_LINES
export const removeSeparatedPostingLine = (id) => ({
  type: 'REMOVE_SEPARATED_POSTING_LINE',
  id
});
