import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import MovieDetails from './components/MovieDetail';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const app = (
  <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App}/>
        <Route path='/movies/:id' component={MovieDetails} />
      </Switch>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));