import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post';

export default function Feed() {
  const posts = useSelector((state) => state.post.posts);
  const searchTags = useSelector((state) => state.search.value);

  console.log("FEED SEARCH TAGS", searchTags);
  let filteredPosts = [...posts];
  if (searchTags.length) {
    filteredPosts = filteredPosts.filter(post => {
      return searchTags.every(tag => {
        return post.tags.includes(tag);
      });
    });
  }
  filteredPosts.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <>
      {filteredPosts.map(post => (<Post post={post} key={post.id}/>))}
    </>
  );
}
