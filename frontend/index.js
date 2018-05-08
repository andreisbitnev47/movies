import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import MovieDetails from './components/MovieDetail';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const app = (
  <BrowserRouter>
      <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));