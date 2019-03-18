import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Loader from '../loader/Loader';
import Typography from '@material-ui/core/Typography';
import styles from './styles';

const Home = props => {
  const { loading, authUser, classes } = props;

  if (loading) {
    return <Loader className={classes.loading} size={80} />;
  }
  if (authUser) {
    return <Redirect to="/todo" />;
  }

  return (
    <Paper className={classes.paper}>
      <Typography
        className={classes.text}
        component="h1"
        variant="h1"
        align="center"
      >
        Yaro Todo
      </Typography>
      <Typography
        className={classes.text}
        component="p"
        variant="h5"
        align="center"
      >
        The only todo app you need!
      </Typography>
      <div className={classes.buttons}>
        <Button variant="contained" component={Link} to="/login">
          Login
        </Button>
        <Button variant="contained" component={Link} to="/register">
          Signup
        </Button>
      </div>
    </Paper>
  );
};

export default withStyles(styles)(Home);
