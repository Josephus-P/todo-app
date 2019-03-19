import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Home from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Loader from '../loader/Loader';
import CustomSnackbar from '../snackbar/CustomSnackbar';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const INITIAL_STATE = {
  email: '',
  password1: '',
  password2: '',
  openSnackbar: false,
  snackbarMessage: '',
  snackbarVariant: '',
};

class Register extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const { email, password1 } = this.state;

    this.props.firebase
      .createUserWithEmailAndPassword(email, password1)
      .then(response => {
        console.log(response);
        this.setState({ ...INITIAL_STATE });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          snackbarMessage: err.message,
          openSnackbar: true,
          snackbarVariant: 'error',
        });
      });
  };

  snackbarClose = () => {
    this.setState({
      openSnackbar: false,
    });
  };

  render() {
    const { classes, authUser, loading } = this.props;
    const {
      email,
      password1,
      password2,
      openSnackbar,
      snackbarVariant,
      snackbarMessage,
    } = this.state;

    if (loading) {
      return <Loader className={classes.loading} size={80} />;
    }
    if (authUser) {
      return <Redirect to="/todo" />;
    }

    return (
      <>
        <nav className={classes.nav}>
          <div className={classes.navIcons}>
            <IconButton component={Link} to="/">
              <ArrowBack />
            </IconButton>
            <Home style={{ alignSelf: 'center' }} />
          </div>
          <Typography
            component="p"
            variant="body1"
            style={{ alignSelf: 'center' }}
          >
            Already have an account? Login <Link to="/login">Here</Link>
          </Typography>
        </nav>
        <main className={classes.main}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={this.handleChange}
                  autoFocus
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password1">Password</InputLabel>
                <Input
                  name="password1"
                  type="password"
                  id="password1"
                  value={password1}
                  onChange={this.handleChange}
                  autoComplete="current-password"
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password2">Confirm Password</InputLabel>
                <Input
                  name="password2"
                  type="password"
                  id="password2"
                  value={password2}
                  onChange={this.handleChange}
                  autoComplete="current-password"
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
            </form>
          </Paper>
          <CustomSnackbar
            open={openSnackbar}
            variant={snackbarVariant}
            message={snackbarMessage}
            onClose={this.snackbarClose}
            onClick={this.snackbarClose}
          />
        </main>
      </>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
