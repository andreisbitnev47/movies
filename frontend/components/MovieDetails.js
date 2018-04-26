import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import getMovie from '../queries/getMovie';
import editMovie from '../queries/editMovie';
import { graphql, withApollo } from 'react-apollo';
import Input from './Input';
import classes from './MovieDetails.css'

class MovieDetails extends Component {
    constructor(props) {
        super(props);
        const { title, description } = this.props.client.readFragment({
            id: 'Movie:'+this.props.match.params.id,
            fragment: getMovie,
        });
        this.state = {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Movie title',
                    required: true
                },
                value: title
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Movie description'
                },
                value: description
            }
        };
    }
    updateState(key, value) {
        this.setState({ 
            [key]: Object.assign(this.state[key], { value })
        })
    }
    submitHandler(event) {
        event.preventDefault();
        this.props.mutate({
          variables: {
              id: this.props.match.params.id, 
              title: this.state.title.value,
              description: this.state.description.value
            }
        }).then(() => this.props.history.push('/'));
    }
    render() {
        return (
            <div className="container">
                <Link to={'/'} className="btn btn-info">Go back</Link>
                <div className="card">
                    <div className="card-body">
                        <h4 className={"card-title " + classes.title}>Edit a movie</h4>
                        <form onSubmit={this.submitHandler.bind(this)}>
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

export default withApollo(graphql(editMovie)(MovieDetails));