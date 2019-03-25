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
import Loader from '../loader/Loader';
import CustomSnackbar from '../snackbar/CustomSnackbar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import * as ROUTES from '../../constants/routes';
import styles from './styles';

const INITIAL_STATE = {
  email: '',
  password: '',
  openSnackbar: false,
  snackbarMessage: '',
  snackbarVariant: '',
};

class Login extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    this.props.firebase
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(err => {
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
    const { classes, loading, authUser } = this.props;
    const {
      email,
      password,
      openSnackbar,
      snackbarMessage,
      snackbarVariant,
    } = this.state;

    if (loading) {
      return <Loader className={classes.loading} size={80} />;
    }
    if (authUser) {
      return <Redirect to={ROUTES.TODO_DASH} />;
    }

    return (
      <>
        <nav className={classes.nav}>
          <div className={classes.navIcons}>
            <IconButton component={Link} to={ROUTES.LANDING}>
              <ArrowBack />
            </IconButton>
            <Home style={{ alignSelf: 'center' }} color="primary" />
          </div>
          <Typography
            component="p"
            variant="body1"
            style={{ alignSelf: 'center' }}
          >
            No account? Register <Link to={ROUTES.REGISTER}>Here</Link>
          </Typography>
        </nav>
        <main className={classes.main}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Login
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
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={this.handleChange}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
            </form>
            <Link to="password-reset">
              <Typography component="p" variant="body1">
                Forgot Password?
              </Typography>
            </Link>
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

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
