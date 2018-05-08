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
            }
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({
            title: {...this.state.title, value: nextProps.res.node.title},
            description: {...this.state.title, value: nextProps.res.node.description}
        });
    }
    render() {
        if(this.props.res && this.props.res.node) {
            return (
                <div className="container">
                    {/* <Link to={'/'} className="btn btn-info">Go back</Link> */}
                    <div className="card">
                        <div className="card-body">
                            <h4 className={"card-title " + classes.title}>Edit a movie</h4>
                            <form>
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
    return (
        <QueryRenderer
            environment={environment}
            query={MovieDetailsQuery}
            variables={{"id": properties.match.params.id}}
            render={({error, props}) => {
                if (error) {
                    return <div>{error.message}</div>
                }
                return <MovieDetailRender res={props}/>
            }}
        />
    )
}
export default MovieDetails;