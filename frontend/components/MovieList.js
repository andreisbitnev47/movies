import React, { Component } from 'react';
import Movie from './Movie';
import { createFragmentContainer, graphql } from 'react-relay';
import { Link } from 'react-router-dom';
import PropsRoute from './PropsRoute';

class MovieList extends Component {
    renderMovies() {
        return this.props.main.movies.edges.map( ({node}, index) => {
            return (
                <div key={node.__id}>
                    <Movie movie={node}/>
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
                <Link to='/addmovie' >add New</Link>
            </div>
        )
    }
}

export default createFragmentContainer(MovieList, graphql`
  fragment MovieList_main on Main {
    movies(last: 100) @connection(key: "MovieList_movies", filters: []){
      edges {
        node {
          ...Movie_movie
        }
      }
    }
  }
`);