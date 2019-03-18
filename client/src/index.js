import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import Firebase, { FirebaseContext } from './components/firebase';
import axios from 'axios';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://yaro-todo.herokuapp.com/'
    : 'http://localhost:8000';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <Router>
      <App />
    </Router>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
