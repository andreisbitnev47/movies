import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import DeleteMovieMutation from '../queries/DeleteMovie';
import { Link } from 'react-router-dom';

const Movie = ({movie, main}) => {
    const handleDelete = () => {
        DeleteMovieMutation(main.id, movie.id);
    }
    return (
        <li className="list-group-item">
            <Link to={{ pathname: '/' + movie.id, state: { movie } }} >
                {movie.title}
            </Link>: 
            <span> {movie.description}</span>
            <span className="btn btn-danger" onClick={handleDelete}>Delete</span>
        </li>
    );
}

export default createFragmentContainer(Movie, graphql`
    fragment Movie_main on Main {
        id
    }
    fragment Movie_movie on Movie {
        id
        title
        description
    }
`)