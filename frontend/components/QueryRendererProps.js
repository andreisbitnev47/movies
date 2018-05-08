import React, { Component } from 'react';
import { QueryRenderer } from 'react-relay';

class QueryRendererProps extends Component {
    shouldComponentUpdate(nextProps) {
        return this.props.willReceiveProps(nextProps);
    }
    render(){
        return (
            <QueryRenderer {...this.props}/>
        )
    }
}

export default QueryRendererProps;