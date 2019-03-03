import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Loader from '../loader/Loader';
import EmptyPage from '../emptypage/EmptyPage';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  loading: {
    marginTop: '25%',
    padding: theme.spacing.unit * 3,
  },
  addTodoBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '25px',
    padding: theme.spacing.unit * 3,
  },
  emptyPage: {
    height: '70vh',
    padding: theme.spacing.unit * 3,
  },
});

class TodoPage extends Component {
  state = {
    todos: [],
  };

  onChange = event => {
    this.setState({ [event.target]: event.target.value });
  };

  signOut = () => {
    this.props.firebase.signOut();
  };

  render() {
    const { classes, authUser, loading } = this.props;
    const { todos } = this.state;

    if (loading) {
      return <Loader className={classes.loading} size={80} />;
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
          <div className={classes.addTodoBar}>
            <Button variant="contained">Add Todo</Button>
          </div>
          {todos.length < 1 ? (
            <EmptyPage
              className={classes.emptyPage}
              variant="h3"
              message="Please add a todo."
              color="textSecondary"
            />
          ) : null}
        </main>
      </>
    );
  }
}

TodoPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoPage);
