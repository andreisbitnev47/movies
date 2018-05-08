import React, { Component } from 'react';

class Form extends Component {
    componentWillReceiveProps(nextProps, asd) {
        return this.props.willReceiveProps(nextProps);
    }
    render() {
        return (
            <form>
                {this.props.children}
            </form>
        )
    }
}

export default Form;