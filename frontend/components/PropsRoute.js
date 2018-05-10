import React from 'react';
import { Route } from 'react-router-dom';

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
      React.createElement(component, finalProps)
    );
  }
  
const PropsRoute = (props) => {
    const { component } = props;
    const rest = {};
    Object.entries(props).forEach(([key, value]) => {
        if(key !== 'component') {
            rest[key] = value;
        }
    });
    return (
        <Route {...rest} render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
        }}/>
    );
}

export default PropsRoute;