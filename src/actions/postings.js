import uuid from 'uuid';

// ADD_POSTING
export const addPosting = (
  {
    ptype = '',
    lineItem = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_POSTING',
  posting: {
    id: uuid(),
    ptype,
    lineItem,
    note,
    amount,
    createdAt
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
