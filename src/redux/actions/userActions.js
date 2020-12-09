import EDIT_USER from '../types/userTypes';

const editUser = (name, imageUrl) => {
  return {
    type: EDIT_USER,
    payload: {
      name,
      imageUrl,
    }
  }
};

export default editUser;
