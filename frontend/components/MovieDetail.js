import React, { Component } from 'react';
import PropsRoute from './PropsRoute';
import Link from 'react-router-dom';
import classes from './MovieDetails.css';
import Input from './Input';
import Form from './Form';
import {
    QueryRenderer,
    graphql
  } from 'react-relay';
import editMovieMutation from '../queries/EditMovie';
import QueryRendererProps from './QueryRendererProps';
import environment from '../Environment';

const MovieDetailsQuery = graphql`
    query MovieDetailsQuery($id: ID!){
        node(id: $id){
            id
            ... on Movie{
                title,
                description
            }
        }
    }
`

class MovieDetailRender extends Component {
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
                value: "title"
            },
            description: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Movie description'
                },
                value: "description"
            },
            id: {
                elementType: 'text',
                elementConfig: {
                    hidden: 'text',
                },
                value: "id"
            }
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);

        this.setState({
            title: {...this.state.title, value: nextProps.res.node.title},
            description: {...this.state.title, value: nextProps.res.node.description},
            id: {...this.state.id, value: nextProps.res.node.id}
        });
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
        editMovieMutation(id, title, description, () => this.props.redirect('/'));
    }
    render() {
        if(this.props.res && this.props.res.node) {
            return (
                <div className="container">
                    {/* <Link to={'/'} className="btn btn-info">Go back</Link> */}
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
        return (<div>Loading...</div>)
        
    }
}

const MovieDetails = (properties) => {
    const handleRedirect = (url) => {
        properties.history.push(url);
    };
    return (
        <QueryRenderer
            environment={environment}
            query={MovieDetailsQuery}
            variables={{"id": properties.match.params.id}}
            render={({error, props}) => {
                if (error) {
                    return <div>{error.message}</div>
                }
                return <MovieDetailRender res={props} redirect={handleRedirect}/>
            }}
        />
    )
}
export default MovieDetails;