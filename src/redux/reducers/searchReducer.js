import ADD_SEARCH from '../types/searchTypes'

const initialState = {
  value: []
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SEARCH:
      return {
        ...state,
        value: action.payload
      };

    default:
      return state;
  }
}

export default searchReducer;
