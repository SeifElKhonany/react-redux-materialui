import ADD_USER from '../types/userTypes'

const initialState = {
  user: {
    name: "Ahmed Ali",
    imageUrl: ""
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
}

export default userReducer;
