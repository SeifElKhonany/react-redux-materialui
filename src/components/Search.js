/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';

import addSearch from "../redux/actions/searchActions";

const useStyles = makeStyles((theme) => ({
  root: {
  },
}));

export default function Search() {
  const classes = useStyles();
  const posts = useSelector((state) => state.post.posts);
  const tags = posts.reduce((allTags, post) => {
    return allTags.concat(post.tags);
  }, [])

  const dispatch = useDispatch((state) => state.post.posts);


  const handleChange = (_, searchTags) => {
    console.log("SEARCH TAGS", searchTags);
    dispatch(addSearch([...searchTags]));
  }

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={tags}
        filterSelectedOptions
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Search"
            placeholder="Favorites"
          />
        )}
      />
    </div>
  );
}
