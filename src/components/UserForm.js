import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch } from 'react-redux';

import editUser from "../redux/actions/userActions";

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
  avatar: {
    marginBottom: theme.spacing(3),
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
  uploadButton: {
    marginBottom: theme.spacing(3),
  },
  form: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    marginBottom: theme.spacing(3),
  },
}));

export default function UserForm() {
  const classes = useStyles();

  const [name, setName] = useState("Ahmed");
  const [imageUrl, setImageUrl] = useState(null);

  const dispatch = useDispatch();

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    dispatch(editUser(newName, imageUrl));
  };

  const handleFileChange = (event) => {
    const fileList = event.target.files

    if (fileList.length) {
      const lastFile = fileList[fileList.length - 1]
      const reader = new FileReader();
      reader.addEventListener("load", function() {
        setImageUrl(reader.result);
        dispatch(editUser(name, reader.result));
      }, false);
      reader.readAsDataURL(lastFile);
    }
    else {
      setImageUrl(null);
      dispatch(editUser(name, null));
    }
  };

  const avatar = () => {
    if (imageUrl) {
        return (<Avatar alt={name} src={imageUrl} className={classes.avatar}/>);
    }
    return (<Avatar className={classes.avatar}>{name[0]?.toUpperCase()}</Avatar>);
  }

  return (
    <div className={classes.form}>
      {avatar()}
      <TextField
        className={classes.textField}
        name="content"
        variant="outlined"
        value={name}
        onChange={handleNameChange}
        placeholder="What's your name?"
      />
      <Button
        className={classes.uploadButton}
        variant="contained"
        component="label"
      >
        Upload Avatar
        <input
          type="file"
          hidden
          onChange={handleFileChange}
          accept="image/*"
        />
      </Button>
    </div>
  );
}
