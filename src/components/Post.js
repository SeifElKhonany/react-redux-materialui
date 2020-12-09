import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { formatDistance } from "date-fns";

const useStyles = makeStyles((theme) => ({
  post: {
    padding: "2rem",
    margin: "2rem 0",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "12px",
  },
  postFile: {
    width: "100%",
    height: "300px",
    objectFit: "contain",
    marginTop: "2rem"
  },
  postFileContainer: {
    display: "flex",
    justifyContent: "center",
  },
  avatar: {
    marginRight: "0.5rem"
  },
  author: {
    fontSize: "0.9rem",
  },
  time: {
    fontSize: "0.8rem",
    color: "grey",
  },
  tag: {
    marginRight: "0.5rem"
  },
  postInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
}));

export default function Post({ post }) {
  const classes = useStyles();
  const displayFile = () => {
    const file = post.file;
    if (file) {
      if (file.type.includes("image")) {
        return (<img src={file.url} alt="post" className={classes.postFile}/>);
      }
      console.log(file.url);
      return (<video src={file.url} className={classes.postFile} controls/>);
    }
    return null;
  }
  return (
    <div className={classes.post}>
      <div className={classes.postInfo}>
        {post.author.imageUrl ?
          (<Avatar alt={post.author.name} src={post.author.imageUrl} className={classes.avatar}/>)
          : (<Avatar alt={post.author.name} className={classes.avatar}>{post.author.name[0]?.toUpperCase()}</Avatar>)}

        <div>
          <div className={classes.author}>{post.author.name}</div>
          <div className={classes.time}>{formatDistance(post.createdAt, Date.now(), { addSuffix: true })}</div>
        </div>
      </div>
      <p>
        {post.content}
      </p>
      <div>
        {post.tags.map(tag => (<Chip key={tag} label={tag} clickable color="primary" className={classes.tag}/>))}
      </div>
      <div className={classes.postFileContainer}>
        {displayFile()}
      </div>
    </div>
  );
}
