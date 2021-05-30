import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ global, component: Component, ...rest }) => {
  return (
    <Route  {...rest} render={
      (props) => {
        if (global.isAuthenticated) {
          return <Component  {...props} />
        } else if (global.shop_slug) {
          return <Redirect to={
            {
              pathname: `/${global.shop_slug}`,
              state: {
                from: props.location
              }
            }
          } />
        } else {
          return <Redirect to={
            {
              pathname: `/`,
              state: {
                from: props.location
              }
            }
          } />
        }

      }
    } />
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    global: state.global,
  }
}
export default connect(mapStateToProps)(ProtectedRoute);
