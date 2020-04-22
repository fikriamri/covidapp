import React from 'react';  
import { connect } from 'react-redux';  

export default function (ComposedComponent) {  
  class Authenticate extends React.Component {

    componentDidMount() {
      this._checkAndRedirect();
    }

    componentDidUpdate() {
      this._checkAndRedirect();
    }

    _checkAndRedirect() {
      const { token } = this.props;

      if (!token) {
        this.props.history.push('/')
      }
    }

    render() {
      return (
        <div>
          { this.props.token ? <ComposedComponent {...this.props} /> : null }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      token: state.loginReducer.token
    };
  };
  
  

  return connect(
    mapStateToProps, 
  )(Authenticate);
}