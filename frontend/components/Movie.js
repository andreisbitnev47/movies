import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

const Movie = (props) => {
    return (
        <li className="list-group-item">
            <div>{props.movie.title}</div>
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