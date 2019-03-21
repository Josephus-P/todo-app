import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Loader from '../loader/Loader';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import moment from 'moment';
import axios from 'axios';
import * as ROUTES from '../../constants/routes';
import styles from './styles';

class AddTodoPage extends Component {
  state = {
    title: '',
    description: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const todo = { ...this.state, createdAt: moment().format() };

    if (todo.title === '' || todo.description === '') {
      return;
    }

    axios
      .post('/api/todos', todo)
      .then(response => {
        // SQLite3 and PostgreSQL return data differently so the next
        // line sets the id accordingly
        todo.id = response.data[0].id ? response.data[0].id : response.data[0];
        this.props.history.push(`/todo/${todo.id}`, todo);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { classes, authUser, loading } = this.props;
    const { title, description } = this.state;

    if (loading) {
      return <Loader className={classes.loading} size={80} />;
    }
    if (!authUser) {
      return <Redirect to={ROUTES.SIGNIN} />;
    }

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Typography className={classes.title} component="h5" variant="h5">
            Add a Todo
          </Typography>
          <form onSubmit={this.onSubmit} className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={this.handleChange}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="description">Description</InputLabel>
              <Input
                id="description"
                name="description"
                value={description}
                onChange={this.handleChange}
                multiline
                rows={5}
              />
            </FormControl>
            <div className={classes.buttonWrapper}>
              <Button variant="contained" type="submit" color="primary">
                Add Todo
              </Button>
              <Button
                component={Link}
                to={ROUTES.TODO_DASH}
                variant="contained"
                type="submit"
                color="primary"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Paper>
      </main>
    );
  }
}

AddTodoPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddTodoPage);
