import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import mutation from '../queries/addMovie';
import getMovies from '../queries/getMovies';
import { Link } from 'react-router-dom';
import Input from './Input';

class AddMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Movie title',
                    required: true
                },
                value: ''
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Movie description'
                },
                value: ''
            }
        }
    }
    submitHandler(event) {
        event.preventDefault();
        this.props.mutate({
          variables: { 
              title: this.state.title.value,
              description: this.state.description.value
            },
            update: (store, { data: { addMovie } }) => {
                let data = store.readQuery({ query: getMovies });
                data.movies.push(addMovie);
                store.writeQuery({ query: getMovies, data });
            }
        }).then(() => this.props.history.push('/'));
    }
    render() {
        return (
            <div className="container">
                <Link to={'/'} className="btn btn-info">Go back</Link>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Add a movie</h4>
                        <form onSubmit={this.submitHandler.bind(this)}>
                            {Object.entries(this.state).map(([key, val]) => (
                                <Input 
                                    key={key}
                                    elementType={val.elementType}
                                    elementConfig={val.elementConfig}
                                    value={val.value}
                                    changed={event => this.setState({ 
                                        [key]: Object.assign(this.state[key], {value: event.target.value })
                                    })}
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

export default graphql(mutation)(AddMovie);