import uuid from 'uuid';
import database from '../../firebase/firebase';
import {addPosting, editPosting, removePosting} from '../../actions/postings';

test('should remove posting', () => {
    const action = removePosting({id: 'a123'});
    expect(action).toEqual({
        type: "REMOVE_POSTING",
        id: "a123"
    })
})