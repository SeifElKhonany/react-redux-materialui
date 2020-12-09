import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Snackbar from '@material-ui/core/Snackbar';
import { useDispatch, useSelector } from 'react-redux';

import addPost from "../redux/actions/postActions";

import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
    marginBottom: "1rem"
  },
  tagContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
    marginBottom: "2rem",
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      marginLeft: "25%",
      "& button": {
        marginTop: theme.spacing(1)
      }
    },
  },
  tagList: {
    marginBottom: theme.spacing(4),
  },
  filePreview: {
    //border: "1px solid black",
    padding: "0",
    "& img, video": {
      width: "300px",
      height: "300px",
      objectFit: "contain",
      padding: "0",
      margin: "0",
      marginLeft: "calc(50% - 150px)",
      boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)"
    }
  },
  addButton: {
    float: "right"
  },
  tag: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  mainButtons: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  submitButton: {
    float: "right",
  },
  form: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    marginBottom: "8rem",
  },
}));

export default function PostForm() {
  const classes = useStyles();

  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState([]);
  const [success, setSuccess] = useState(false);

  const author = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const submitPost = (e) => {
    e.preventDefault();
    dispatch(addPost(author, text, tags, file));
    setSuccess(true);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleTagChange = (event) => {
    setCurrentTag(event.target.value);
  };

  const handleFileChange = (event) => {
    const fileList = event.target.files

    if (fileList.length) {
      const lastFile = fileList[fileList.length - 1]
      const reader = new FileReader();
      reader.addEventListener("load", function() {
        setFile({
          url: reader.result,
          type: lastFile.type
        });
      }, false);
      reader.readAsDataURL(lastFile);
    }
    else {
      setFile(null);
    }
  };

  const handleTagAdd = (event) => {
    if (!tags.includes(currentTag)) setTags([...tags, currentTag]);
  };

  const handleTagDelete = (tag) => {
    const index = tags.indexOf(tag);
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleSuccessClose = (event, reason) => {
    setSuccess(false);
  };

  const filePreview = () => {
    if (file) {
      if (file.type.includes("image")) {
        return (<img src={file.url} alt="Your post"/>);
      }
      return (<video src={file.url} controls/>);
    }
    return null;
  }

  return (
    <form noValidate autoComplete="off" className={classes.form} onSubmit={submitPost}>
      <TextField
        className={classes.textField}
        name="content"
        variant="outlined"
        multiline
        rows={4}
        value={text}
        onChange={handleTextChange}
        placeholder="What's on your mind?"
      />
      <div className={classes.tagContainer}>
        <TextField
          label="Tags"
          variant="outlined"
          size="small"
          className={classes.tagField}
          onChange={handleTagChange}
          value={currentTag}
        />
        <Button
          variant="contained"
          color="secondary"
          className={classes.addButton}
          onClick={handleTagAdd}
        >
          Add
        </Button>
      </div>
      <div className={classes.tagList}>
        {tags ? tags.map(tag => (
          <Chip
            label={tag}
            key={tag}
            onDelete={() => handleTagDelete(tag)}
            color="primary"
            className={classes.tag}
          />
        )) : null}
      </div>

      <div className={classes.filePreview}>
        {filePreview()}
      </div>

      <div className={classes.mainButtons}>
        <Button
          className={classes.uploadButton}
          variant="contained"
          component="label"
        >
          Upload File
          <input
            type="file"
            hidden
            onChange={handleFileChange}
            accept="image/*,video/mp4,video/x-m4v,video/*"
          />
        </Button>

        <Button
          className={classes.submitButton}
          variant="contained"
          color="primary"
          type="submit"
          disabled={!text && !file}
        >
        Submit
        </Button>
        <Snackbar open={success} autoHideDuration={6000} onClose={handleSuccessClose}>
          <Alert onClose={handleSuccessClose} severity="success">
            Post submitted!
          </Alert>
        </Snackbar>
      </div>
    </form>
  );
}
