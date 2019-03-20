import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Loader from '../loader/Loader';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import moment from 'moment';
import styles from './viewTodoStyles';

class ViewTodoPage extends Component {
  signOut = () => {
    this.props.firebase.signOut();
  };

  render() {
    const { classes, authUser, loading, location } = this.props;
    const todo = { ...location.state };

    if (loading) {
      return <Loader className={classes.loading} size={80} />;
    }
    if (!authUser) {
      return <Redirect to="/login" />;
    }
    if (!location.state) {
      return <Redirect to="/todo" />;
    }

    return (
      <>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <Link className={classes.link} to="/todo">
              <Typography color="inherit" component="h2" variant="h5">
                Todo App
              </Typography>
            </Link>
            <Button color="inherit" onClick={this.signOut}>
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
        <main className={classes.main}>
          <Paper className={classes.paper}>
            <div className={classes.buttonWrapper}>
              <Button
                component={Link}
                to={{
                  pathname: `${location.pathname}/edit`,
                  state: {
                    id: todo.id,
                    title: todo.title,
                    description: todo.description,
                  },
                }}
                color="primary"
              >
                Edit
              </Button>
            </div>
            <div className={classes.title}>
              <Typography component="h6" variant="title">
                {todo.title}
              </Typography>
              <Typography component="span" variant="caption">
                {moment(todo.createdAt).format('MM-DD-YYYY')}
              </Typography>
            </div>
            <Typography
              className={classes.description}
              component="p"
              variant="body1"
            >
              {todo.description}
            </Typography>
          </Paper>
        </main>
      </>
    );
  }
}

ViewTodoPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewTodoPage);
