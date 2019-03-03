import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Loader from '../loader/Loader';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  loading: {
    marginTop: '25%',
    padding: theme.spacing.unit * 3,
  },
});

const Home = props => {
  const { loading, authUser, classes } = props;

  if (loading) {
    return <Loader className={classes.loading} size={80} />;
  }
  if (authUser) {
    return <Redirect to="/todo" />;
  }

  return (
    <>
      <Typography component="h1" variant="h1">
        Yaro Todo
      </Typography>
      <Typography component="p" variant="h5">
        The only todo app you need!
      </Typography>
      <Button variant="contained" component={Link} to="/login">
        Login
      </Button>
      <Button variant="contained" component={Link} to="/register">
        Signup
      </Button>
    </>
  );
};

export default withStyles(styles)(Home);
