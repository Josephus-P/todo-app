import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Loader from '../loader/Loader';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import * as ROUTES from '../../constants/routes';
import styles from './styles';

class EditTodoPage extends Component {
  state = {
    title: this.props.location.state.title,
    description: this.props.location.state.description,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const { id } = this.props.location.state;
    const todo = { ...this.state };

    if (todo.title === '' || todo.description === '') {
      return;
    }

    axios
      .put(`/api/todos/${id}`, todo)
      .then(response => {
        this.props.history.push(`/todo/${id}`, { id, ...todo });
      })
      .catch(err => {
        console.log(err);
      });
  };

  goBack = () => () => {
    this.props.history.goBack();
  };

  render() {
    const { classes, loading, location } = this.props;
    const { title, description } = this.state;

    if (loading) {
      return <Loader className={classes.loading} size={80} />;
    }
    if (!location.state) {
      return <Redirect to={ROUTES.TODO_DASH} />;
    }

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Typography className={classes.title} component="h5" variant="h5">
            Edit Todo
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
                Update
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.goBack()}
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

EditTodoPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditTodoPage);
