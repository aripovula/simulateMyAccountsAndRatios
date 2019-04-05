export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_DUMMY':
            // console.log('action.dummy-', action);
            
            return {
                dummy: action.dummy
            };
        case 'REMOVE_DUMMY':
            return {};
        default:
            return state;
    }
};
