import uuid from 'uuid';

// ADD_POSTING
export const addPosting = (
  {
    linesData,
    note = '',
    createdAt = 0,
    postingDate = 0
  } = {}
) => ({
  type: 'ADD_POSTING',
  posting: {
    id: uuid(),
    linesData,
    note,
    createdAt,
    postingDate
  }
});

// REMOVE_POSTING
export const removePosting = ({ id } = {}) => ({
  type: 'REMOVE_POSTING',
  id
});

// EDIT_POSTING
export const editPosting = (id, updates) => ({
  type: 'EDIT_POSTING',
  id,
  updates
});
