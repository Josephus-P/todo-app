import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Loader from '../loader/Loader';
import EmptyPage from '../emptypage/EmptyPage';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import styles from './todoStyles';

class TodoPage extends Component {
  state = {
    todos: [],
    gettingTodos: true,
    checked: [],
  };

  componentDidMount() {
    const { authUser } = this.props;
    if (authUser) {
      axios.get('/api/users/todos').then(response => {
        this.setState({ todos: response.data, gettingTodos: false });
      });
    }
  }

  // Get the todos if the user is logged in.
  // Handles the case when a user refreshes the page
  componentDidUpdate(prevProps) {
    const { authUser } = this.props;

    if (authUser && authUser !== prevProps.authUser) {
      axios.get('/api/users/todos').then(response => {
        this.setState({ todos: response.data, gettingTodos: false });
      });
    }
  }

  signOut = () => {
    this.props.firebase.signOut();
  };

  handleCheckToggle = id => () => {
    const { checked } = this.state;
    const currentID = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentID === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentID, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  deleteTodos = event => {
    event.preventDefault();

    const { checked } = this.state;

    if (checked.length < 1) {
      return;
    }

    const todos = this.state.todos.filter(
      todo => checked.indexOf(todo.id) === -1
    );

    console.log(checked);
    axios
      .delete('/api/todos', { data: { checked } })
      .then(response => {
        this.setState({ todos, checked: [] });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes, authUser, loading } = this.props;
    const { todos, gettingTodos, checked } = this.state;

    if (loading || gettingTodos) {
      return <Loader className={classes.loading} size={80} />;
    }
    if (!authUser) {
      return <Redirect to="/login" />;
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
          <div className={classes.addTodoBar}>
            <Button component={Link} to="/todo/new" variant="contained">
              Add Todo
            </Button>
            <Button variant="contained" onClick={this.deleteTodos}>
              Delete
            </Button>
          </div>
          <Grid container spacing={0} justify="center">
            <Grid
              className={classes.gridItem}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              {todos.length < 1 ? (
                <EmptyPage
                  className={classes.emptyPage}
                  variant="h3"
                  message="Please add a todo."
                  color="textSecondary"
                />
              ) : (
                <List className={classes.list}>
                  {todos.map((todo, index) => (
                    <ListItem
                      key={index}
                      button
                      onClick={this.handleCheckToggle(todo.id)}
                    >
                      <Checkbox
                        checked={checked.indexOf(todo.id) !== -1}
                        tabIndex={-1}
                      />
                      <ListItemText primary={todo.title} />
                      <ListItemSecondaryAction>
                        <Button
                          component={Link}
                          to={{
                            pathname: `/todo/${todo.id}`,
                            state: { ...todo },
                          }}
                        >
                          View
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )}
            </Grid>
          </Grid>
        </main>
      </>
    );
  }
}

TodoPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TodoPage);
