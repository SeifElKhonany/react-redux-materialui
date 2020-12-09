import ADD_POST from '../types/postTypes';
import { v4 as uuidv4 } from 'uuid';

const addPost = (author, content, tags, file) => {
  return {
    type: ADD_POST,
    payload: {
      id: uuidv4(),
      createdAt: Date.now(),
      author,
      content,
      tags,
      file: file
    }
  }
};

export default addPost;
