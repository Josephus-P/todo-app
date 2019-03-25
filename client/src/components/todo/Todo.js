import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TodoDashPage from '../todoDashPage/TodoDashPage';
import AddTodoPage from '../addTodoPage/AddTodoPage';
import ViewTodoPage from '../viewTodoPage/ViewTodoPage';
import EditTodoPage from '../editTodoPage/EditTodoPage';
import withStyles from '@material-ui/core/styles/withStyles';
import * as ROUTES from '../../constants/routes';
import styles from './styles';

const Todo = props => {
  const { authUser, loading, firebase, classes } = props;

  if (!authUser) {
    return <Redirect to={ROUTES.SIGNIN} />;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Link className={classes.link} to={ROUTES.TODO_DASH}>
            <Typography color="inherit" component="h2" variant="h5">
              Todo App
            </Typography>
          </Link>
          <Button color="inherit" onClick={() => firebase.signOut()}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route
          exact
          path={ROUTES.TODO_DASH}
          render={() => <TodoDashPage loading={loading} />}
        />
        <Route
          path={ROUTES.TODO_ADD}
          render={props => <AddTodoPage loading={loading} {...props} />}
        />
        <Route
          exact
          path={ROUTES.TODO_VIEW}
          render={props => <ViewTodoPage loading={loading} {...props} />}
        />
        <Route
          exact
          path={ROUTES.TODO_EDIT}
          render={props => <EditTodoPage loading={loading} {...props} />}
        />
      </Switch>
    </>
  );
};

export default withStyles(styles)(Todo);
