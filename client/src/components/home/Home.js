import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const Home = props => {
  const { loading, authUser } = props;

  if (loading) {
    return <CircularProgress size={80} />;
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

export default Home;
