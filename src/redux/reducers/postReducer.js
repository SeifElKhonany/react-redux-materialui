import ADD_POST from '../types/postTypes'

const initialState = {
  posts: [
    {
      id: 1,
      content: 'This is great',
      createdAt: 1602242529123,
      tags: ["Sun", "Flowers"],
      author: {
        name: "Seif Assem",
        imageUrl: ""
      },
      file: {
        url: "cropped.jpg",
        type: "image"
      }
    },
        {
      id: 2,
      content: 'Here I am',
      createdAt: 1604242829123,
      tags: ["Milk", "Flour"],
      author: {
        name: "Ahmed amir",
        imageUrl: ""
      },
    },
        {
      id: 3,
      content: 'No it\'s alright',
      createdAt: 1603242629123,
      tags: ["Time", "Life"],
      author: {
        name: "Seif Assem",
        imageUrl: ""
      },
      file: {
        url: "cropped.jpg",
        type: "image"
      }
    },
        {
      id: 4,
      content: 'I\'m buying milk',
      createdAt: 1607242729123,
      tags: ["Power"],
      author: {
        name: "Karim Assem",
        imageUrl: "cropped.jpg"
      }
    },

  ]
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };

    default:
      return state;
  }
}

export default postReducer;
