import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withFirebase } from './components/firebase';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import PasswordReset from './components/passwordreset/PasswordReset';
import TodoPage from './components/todo/TodoPage';
import AddTodoPage from './components/todo/AddTodoPage';
import EditTodoPage from './components/todo/EditTodoPage';
import axios from 'axios';
import ViewTodoPage from './components/todo/ViewTodoPage';
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
            console.log(authUser);
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
              path="/"
              render={() => (
                <Home
                  loading={loading}
                  authUser={authUser}
                  firebase={firebase}
                />
              )}
            />
            <Route
              path="/login"
              render={() => (
                <Login
                  loading={loading}
                  authUser={authUser}
                  firebase={firebase}
                />
              )}
            />
            <Route
              path="/register"
              render={() => (
                <Register
                  loading={loading}
                  authUser={authUser}
                  firebase={firebase}
                />
              )}
            />
            <Route
              path="/password-reset"
              render={() => (
                <PasswordReset
                  loading={loading}
                  authUser={authUser}
                  firebase={firebase}
                />
              )}
            />
            <Route
              exact
              path="/todo"
              render={() => (
                <TodoPage
                  loading={loading}
                  authUser={authUser}
                  firebase={firebase}
                />
              )}
            />
            <Route
              path="/todo/new"
              render={props => (
                <AddTodoPage
                  loading={loading}
                  authUser={authUser}
                  firebase={firebase}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/todo/:id"
              render={props => (
                <ViewTodoPage
                  loading={loading}
                  authUser={authUser}
                  firebase={firebase}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/todo/:id/edit"
              render={props => (
                <EditTodoPage
                  loading={loading}
                  authUser={authUser}
                  firebase={firebase}
                  {...props}
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
