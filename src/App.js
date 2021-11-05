import React from 'react';
import ApplicationUI from './ApplicationUI';
import { Login } from './login/Login';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token:null,
      user:null
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
  }

  onLoginSuccess(_token, _user) {
    this.setState({
      token:_token,
      user:_user
    });
  }

  render() {

    if(this.state.token) {
      return (<ApplicationUI token={this.state.token} user={this.state.user}/>)
    }
    else {
      return (<Login loginSuccess={this.onLoginSuccess}/>);
    }
  }
}