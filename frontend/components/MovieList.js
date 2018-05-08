import React, { Component } from 'react';
import Movie from './Movie';
import { createFragmentContainer, graphql } from 'react-relay';
import MovieDetails from './MovieDetail';
import { Link } from 'react-router-dom';
import PropsRoute from './PropsRoute';

class MovieList extends Component {
    onMovieDelete(id) {
        this.props.mutate({ variables: { id },
            update: (store, { deleted }) => {
                let data = store.readQuery({ query: getMovies });
                const index = data.movies.findIndex((movie) => movie.id === id);
                data.movies.splice(index, 1);
                store.writeQuery({ query: getMovies, data });
            }
          });
    }
    renderMovies() {
        return this.props.main.movies.edges.map( ({node}, index) => {
            return (
                <div key={node.__id}>
                    <Link to={this.props.match.url + node.__id}>
                        <Movie movie={node} />
                    </Link>
                    <PropsRoute path={this.props.match.url + node.__id} component={ MovieDetails } movie={node} />
                </div>
            )
        });
    }
    render() {
        return (
            <div className="container">
                <h4>Movies</h4>
                <ul className="list-group">
                    {this.renderMovies()}
                </ul>
            </div>
        )
    }
}

export default createFragmentContainer(MovieList, graphql`
  fragment MovieList_main on Main {
    movies{
      edges {
        node {
          ...Movie_movie
          ...MovieDetails_movie
        }
      }
    }
  }
`);