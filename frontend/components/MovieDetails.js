import React, { Component } from 'react';
import classes from './MovieDetails.css';
import Input from './Input';
import editMovieMutation from '../queries/EditMovie';
import environment from '../Environment';
import { createFragmentContainer, graphql } from 'react-relay';
import { Link } from 'react-router-dom';

class MovieDetails extends Component {
    constructor(props) {
        super(props);
        const movie = props.location.state.movie;
        this.state = {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Movie title',
                    required: true
                },
                value: movie.title
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Movie description'
                },
                value: movie.description
            },
            id: {
                elementType: 'text',
                elementConfig: {
                    hidden: 'text',
                },
                value: movie.id
            }
        };
    }
    updateState(key, value) {
        this.setState({ 
            [key]: Object.assign(this.state[key], { value })
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const id = this.state.id.value;
        const title = this.state.title.value;
        const description = this.state.description.value;
        editMovieMutation(id, title, description, () => this.props.history.push('/'));
    }
    render() {
        return (
            <div className="container">
                <Link to={'/'} className="btn btn-info">Go back</Link>
                <div className="card">
                    <div className="card-body">
                        <h4 className={"card-title " + classes.title}>Edit a movie</h4>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            {Object.entries(this.state).map(([key, val]) => (
                                <Input 
                                    key={key}
                                    elementType={val.elementType}
                                    elementConfig={val.elementConfig}
                                    value={this.state[key]['value']}
                                    changed={event => this.updateState(key, event.target.value)}
                                />
                            ))}
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        ) 
    }
}
export default MovieDetails;