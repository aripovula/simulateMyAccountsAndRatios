import { createStore } from 'redux';

const store = createStore((state = { name: 'a' }, action) => {
  switch (action.type) {
    case 'ABC':
      return {
        name: 'abc'
      };
    case 'XYZ':
      return {
        name: 'xyz'
      };
    case 'RESET':
      return {
        name: 'a'
      };
    default:
      return state;
  }
});

// console.log(store.getState());

// Actions - than an object that gets sent to the store


store.subscribe(()=>{
  console.log(store.getState());
});


// I'd like to increment the count
store.dispatch({
  type: 'ABC'
});

store.dispatch({
  type: 'XYZ'
});

store.dispatch({
  type: 'RESET'
});

store.dispatch({
  type: 'ABC'
});

// I'd like to reset the count to zero


// console.log(store.getState());
