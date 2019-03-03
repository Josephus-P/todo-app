import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import 'typeface-roboto';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    );
  }
}

export default App;
