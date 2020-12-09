import ADD_SEARCH from '../types/searchTypes';

const addSearch = (tags) => {
  return {
    type: ADD_SEARCH,
    payload: tags
  }
};

export default addSearch;
