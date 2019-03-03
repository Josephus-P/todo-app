import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

class TodoPage extends Component {
  state = {};

  onChange = event => {
    this.setState({ [event.target]: event.target.value });
  };

  signOut = () => {
    this.props.firebase.signOut();
  };

  render() {
    const { classes, authUser, loading } = this.props;

    if (loading) {
      return <CircularProgress size={80} />;
    }
    if (!authUser) {
      return <Redirect to="/login" />;
    }

    return (
      <>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Todo
            </Typography>
            <Button color="inherit" onClick={this.signOut}>
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
        <main className={classes.main}>
          <Paper className={classes.paper}>
            <Typography>Hello Yaro</Typography>
          </Paper>
        </main>
      </>
    );
  }
}

TodoPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoPage);
