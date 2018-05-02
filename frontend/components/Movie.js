import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

const Movie = (props) => {
    return (
        <li key={props.movie.id} className="list-group-item">
            <Link to={`/movies/${props.movie.id}`}>
                {props.movie.title}
            </Link>
            <span className="btn btn-danger float-right" onClick={() => this.onMovieDelete(props.movie.id)}>Delete</span>
            <div>{props.movie.description}</div>
        </li>
    );
}

export default createFragmentContainer(Movie, graphql`
    fragment Movie_movie on Movie {
        id
        title
        description
    }
`)