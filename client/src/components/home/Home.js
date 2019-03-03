import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Home = props => {
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
