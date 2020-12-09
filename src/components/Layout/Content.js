import React from 'react';

import PostForm from '../PostForm';
import UserForm from '../UserForm';
import Feed from '../Feed';
import Search from '../Search';


export default function Content() {

  return (
    <>
      <UserForm />
      <PostForm />
      <Search />
      <Feed />
    </>
  );
}
