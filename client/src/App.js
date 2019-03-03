import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withFirebase } from './components/firebase';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import TodoPage from './components/todo/TodoPage';
import axios from 'axios';
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
              .post('/login')
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
        <Route
          exact
          path="/"
          render={() => (
            <Home loading={loading} authUser={authUser} firebase={firebase} />
          )}
        />
        <Route
          path="/login"
          render={() => (
            <Login loading={loading} authUser={authUser} firebase={firebase} />
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
          path="/todo"
          render={() => (
            <TodoPage
              loading={loading}
              authUser={authUser}
              firebase={firebase}
            />
          )}
        />
      </div>
    );
  }
}

export default withFirebase(App);
