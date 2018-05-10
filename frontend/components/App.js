import React, { Component } from 'react';
import MovieList from './MovieList';
import PropsRoute from './PropsRoute';
import { Switch } from 'react-router-dom';
import AddMovie from './AddMovie';
import MovieDetails from './MovieDetails';

import {
    QueryRenderer,
    graphql
  } from 'react-relay';
import environment from '../Environment';

const AppMainQuery = graphql`
  query AppMainQuery{
    main {
        id
      ...MovieList_main
    }
  }
`

class App extends Component {
    render() {
        return (
            <QueryRenderer
                environment={environment}
                query={AppMainQuery}
                render={({error, props}) => {
                if (error) {
                    return <div>{error.message}</div>
                } else if (props) {
                    return (
                        <Switch>
                            <PropsRoute exact path='/' component={MovieList} main={props.main} />
                            <PropsRoute path='/addmovie' component={AddMovie} id={props.main.id} />
                            <PropsRoute path='/:id' component={MovieDetails} />
                        </Switch> 
                    )
                }
                return <div>Loading</div>
                }}
            />
        )
    }
}

export default App;