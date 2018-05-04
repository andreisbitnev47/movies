import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

const Movie = ({movie}) => {
    return (
        <li className="list-group-item">
            {movie.title}
            <div>{movie.description}</div>
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