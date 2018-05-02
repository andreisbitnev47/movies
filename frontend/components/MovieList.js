import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getMovies from '../queries/getMovies';
import deleteMovie from '../queries/deleteMovie';
import { QueryRenderer, graphql } from 'react-relay';
import environment from '../Environment';

const getMovies = graphql`
    query getMovies {
        main {
            
        }
    }
`;

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
        return this.props.data.movies.map( ({ id, title, description }) => {
            return (
                <li key={id} className="list-group-item">
                    <Link to={`/movies/${id}`}>
                        {title}
                    </Link>
                    <span className="btn btn-danger float-right" onClick={() => this.onMovieDelete(id)}>Delete</span>
                    <div>{description}</div>
                </li>
            )
        });
    }
    render() {
        if(this.props.data.loading) {
            return (
                <div></div>
            )
        }
        return (
            <div className="container">
                <h4>Movies</h4>
                <ul className="list-group">
                    {this.renderMovies()}
                </ul>
                <Link to={`/movies/add`} className="btn btn-success">
                    Add new movie
                </Link>
            </div>
        )
    }
}

export default graphql(deleteMovie)(
    graphql(getMovies)(MovieList)
);