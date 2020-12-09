import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Header from './components/Layout/Header';
import Content from './components/Layout/Content';
import { Provider } from 'react-redux';
import store from './redux/store';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  center: {
    borderLeft: "1px solid rgba(0, 0, 0, 0.1)",
    borderRight: "1px solid rgba(0, 0, 0, 0.1)",
    padding: "6rem"
  }
}));

function App() {

  const classes = useStyles();
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
            <Header />
        </header>
        <Grid container spacing={2}>
          <Grid item md={0} lg={2}></Grid>
          <Grid item md={12} lg={8}>
            <div className={classes.center}><Content /></div>
          </Grid>
          <Grid item md={0} lg={2}></Grid>
        </Grid>
      </div>
    </Provider>
  );
}

export default App;
