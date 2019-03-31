import uuid from 'uuid';
import database from '../../firebase/firebase';
import {addPosting, editPosting, removePosting} from '../../actions/postings';


it('should remove posting', () => {
    const action = removePosting({id: 'a123'});
    expect(action).toEqual({
        type: "REMOVE_POSTING",
        id: "a123"
    })
})

// it('should edit posting', ()=> {
//     expect(editPosting()).toBe({});
// });

it('should edit posting', () => {
    const action = editPosting('a123', {isUnPosted: false, note: 'testing'});
    expect(action).toEqual({
        id: "a123",
        type: "EDIT_POSTING",
        updates: {isUnPosted: false, note: 'testing'}
    })
});

it('should add new posting', () => {
    const aPosting = {
      linesData: null,
      note: '',
      totalAmount: '',
      createdAt: 0,
      postingDate: 0,
      isUnPosted: false
    };
    const action = addPosting(aPosting);
    expect(action).toEqual({posting: aPosting, type: "ADD_POSTING"});
});