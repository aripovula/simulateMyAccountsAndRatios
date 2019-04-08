import uuid from 'uuid';

// I added this action to work out certain testing techniques using JEST / Enzyme
export const addDummy = (dummy) => ({
  type: 'SET_DUMMY',
  dummy
});

export const startAddDummy = (obj = {}) => {
  return (dispatch, getState) => {
    const {
      dummy
    } = obj;
    
    const newObj = obj.dummy = 'changedValue';
    // console.log('newObj-', newObj);
    
    dispatch(addDummy(newObj));
  };
  
};

