import postingsReducer from '../../reducers/postings';

it('should set empty array', () => {

    const state = postingsReducer(undefined, { type: '@@INIT' });
        expect(state).toEqual([]);
});