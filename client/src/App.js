import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withFirebase } from './components/firebase';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import PasswordReset from './components/passwordreset/PasswordReset';
import Todo from './components/todo/Todo';
import axios from 'axios';
import * as ROUTES from './constants/routes';
import theme from './theme/theme';
import 'typeface-roboto';

class App extends Component {
  state = {
    authUser: null,
    loading: true,
    authError: false,
  };

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        return this.props.firebase.auth.currentUser
          .getIdToken()
          .then(idToken => {
            axios.defaults.headers.common['Authorization'] = idToken;

            axios
              .post('/verifyregistration')
              .then(response => {
                this.setState({
                  authUser: authUser,
                  loading: false,
                });
              })
              .catch(err => {
                console.log(err);
                this.props.firebase.signOut();
                this.setState({ loading: false, authError: true });
              });
          });
      } else {
        this.setState({
          authUser: null,
          loading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    const { authUser, loading } = this.state;
    const { firebase } = this.props;

    return (
      <div className="App">
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Switch>
            <Route
              exact
              path={ROUTES.LANDING}
              render={() => <Home loading={loading} authUser={authUser} />}
            />
            <Route
              path={ROUTES.SIGNIN}
              render={() => (
                <Login
                  loading={loading}
                  authUser={authUser}
                  firebase={firebase}
                />
              )}
            />
            <Route
              path={ROUTES.REGISTER}
              render={() => (
                <Register
                  loading={loading}
                  authUser={authUser}
                  firebase={firebase}
                />
              )}
            />
            <Route
              path={ROUTES.PWD_FORGOT}
              render={() => (
                <PasswordReset
                  loading={loading}
                  authUser={authUser}
                  firebase={firebase}
                />
              )}
            />
            <Route
              path={ROUTES.TODO_DASH}
              render={() => (
                <Todo
                  loading={loading}
                  authUser={authUser}
                  firebase={firebase}
                />
              )}
            />
          </Switch>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withFirebase(App);
