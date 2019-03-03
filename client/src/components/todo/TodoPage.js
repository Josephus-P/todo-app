import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => {};

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
        <main className={classes.main}>
          <Paper className={classes.paper}>
            <Typography>Hello Yaro</Typography>
            <Button onClick={this.signOut} />
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
