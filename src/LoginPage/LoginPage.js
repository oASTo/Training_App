import React, { Component } from 'react'
import logo from '../logo.jpg'
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';

import { userActions } from '../_actions/user.action';


export class LoginPage extends Component {
  constructor(props){
    super(props);

    //mereset login
    //this.props.dispatch(userActions.logout());

    
    //state awal dari Login page seperti apa
    this.state = {
      username: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


  }
  

  //handleChange -> membuat state terekam setiap perubahannya dalam hal ini username dan passwordnya, pakai (e) menandakkan perubahannya /eventnya.

  handleChange(e){
    const { name, value } = e.target;
    this.setState({[name]: value });
  }

  //handleSubmit -> menghandle/menangani setiap submit yang dilakukan, diterima/tolak/diberi alert tidak sesuai

  handleSubmit(e){
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if(username && password){
      dispatch(userActions.login(username, password));
    }
  }

  render() {

    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <div className="col-md6 col-md-offset-3">

          <h2>Login</h2>
          <img src ={logo} className="logo" alt="logo"></img>
          <form name="form" onSubmit={this.handleChange}>
            <div className={'form-group' + (submitted && !username ? ' has error' : '')}>
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
              {submitted && !username && 
              <div className="help-block">Username is required</div>
              }
            </div>

            <div className={'form-group' + (submitted && !password ? ' has error' : '')}>
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
              {submitted && !password && 
              <div className="help-block">Password is required</div>
              }
            </div>

          <div className="form-group">
          <button className="btn btn-link"><NavLink to="/Register">Register</NavLink></button>
          <button className="btn btn-primary">Login</button>
          {
            loggingIn 
          }
          
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state){
  const { loggingIn } = state.authentication;
  return{
    loggingIn
  };
}



//export sakti yang biso
export default connect(mapStateToProps)(LoginPage);

//export default LoginPage
