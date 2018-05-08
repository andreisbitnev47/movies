import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { Link } from 'react-router-dom';

const Movie = ({movie}) => {
    return (
        <li className="list-group-item">
            <Link to={'/movies/' + movie.id} {...{movie}} >{movie.title}</Link>
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