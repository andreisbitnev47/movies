import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import AddMovie from './AddMovie';

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" exact component={ MovieList } />
                    <Route path="/movies/add" component={ AddMovie } />
                    <Route path="/movies/:id" component={ MovieDetails } />
                </Switch>
            </div>
        )
    }
}

export default App;