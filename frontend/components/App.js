import React, { Component } from 'react';
import MovieList from './MovieList';
import PropsRoute from './PropsRoute';

import {
    QueryRenderer,
    graphql
  } from 'react-relay';
import environment from '../Environment';

const AppMainQuery = graphql`
  query AppMainQuery{
    main {
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
                        <MovieList main={props.main} />
                    )
                    
                }
                return <div>Loading</div>
                }}
            />
        )
    }
}

export default App;