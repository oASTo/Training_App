import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import {connect} from 'react-redux';
// import { Field, reduxForm } from 'redux-form';

import {userActions} from '../_actions/user.action';

const appRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w+/g;



export class RegisterPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: {
        fullName:'',
        address:'',
        idNum:'',
        phoneNum:'',
        gender:'',
        username:'',
        password:'',
      },
      formErrors:{
        fullName: true,
        address:true,
        idNum:true,
        phoneNum:true,
        gender:true,
        username:true,
        password:true,  
      },
      submitted:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event){
    const {name, value} = event.target;
    const { user } = this.state;
    console.log("name: "+name);
    console.log("value:" +value);
    this.setState({
      user: {
        ...user,   
        [name]: value,
      }})
  }

  handleSubmit(event){
    event.preventDefault();
    this.setState({submitted:true});
    const {dispatch} = this.props;
    let {user} = this.state;
    console.log('User : ', user);
    let formValidation = {};
    Object.keys(user).forEach(field => {
      if(field === 'username') {
        formValidation[field] = isFormatCase(user[field])
      } 
      else if(field === 'password') {
        formValidation[field] = isFormatCase(user[field])
      } 
      else if(field === 'idNum'){
        formValidation[field] = isKTP(user[field])
      } else if(field === 'phoneNum'){
        formValidation[field] = isPhone(user[field])
      }
      else {
        formValidation[field] = isEmpty(user[field]);       
      }
    })
    this.setState({formErrors: formValidation})
    console.log('formValidation', formValidation)
    if(formValidation){
      dispatch(userActions.register(user));
    }


  }
  render() {
    const {registering} = this.props;
    const {user, submitted} = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
        {/* first Name */}
          <div className={'form-group' + (submitted && !user.fullName ? 'has-error' : '')}>
              <label htmlFor="fullName">FullName</label>
              <input type="text"
              className="form-control is-invalid" 
              name="fullName" 
              value={user.fullName} 
              onChange={this.handleChange} />
              {submitted && user.fullName}
              <p className="alert-danger">{!this.state.formErrors.fullName && 'This is invalid'}</p>
          </div>
           {/*address */} 
          <div className={'form-group' + (submitted && !user.address ? 'has-error' : '')}>
              <label htmlFor="address">Address</label>
              <input type="text" 
              className="form-control" 
              name="address" 
              value={user.address} 
              onChange={this.handleChange} />
              {submitted && user.address}
              <p className="alert-danger">{!this.state.formErrors.address && 'Address is required'}</p>
          </div>
            {/* idNum */}
          <div className={'form-group' + (submitted && !user.idNum ? 'has-error' : '')}>
              <label htmlFor="idNum">No KTP</label>
              <input type="text" 
              className="form-control" 
              name="idNum" 
              value={user.idNum} 
              onChange={this.handleChange} />
              {submitted && user.idNum}
              <p className="alert-danger">{!this.state.formErrors.idNum && 'KTP is required'}</p>
          </div>
            {/* PhoneNum */}
          <div className={'form-group' + (submitted && !user.phoneNum ? 'has-error' : '')}>
              <label htmlFor="phoneNum">Phone Number</label>
              <input type="text" 
              className="form-control" 
              name="phoneNum" 
              value={user.phoneNum} 
              onChange={this.handleChange} />
              {submitted && user.phoneNum}
              <p className="alert-danger">{!this.state.formErrors.fullName && 'phone number is invalid'}</p>
          </div>
            {/* Gender */}
          <div className={'form-check form-check-inline' + (submitted && !user.gender ? 'has-error' : '')}>
              <label htmlFor="gender">Gender</label>
              <br/>
              <input type="radio" 
              className="form-check-input" 
              name="genderOption" 
              value={user.gender = "Male"} 
              onChange={this.handleChange}/>Male
              <input type="radio" 
              className="form-check-input" 
              name="genderOption" 
              value={user.gender = "Female"} 
              onChange={this.handleChange}/>Female
              {submitted && user.gender}
              <p className="alert-danger">{!this.state.formErrors.gender && 'Gender is required'}</p>
          </div>

          {/* Login - Username */}
          <div className={'form-group' + (submitted && !user.username ? 'has-error' : '')}>
              <label htmlFor="username">Username</label>
              <input type="text" 
              className="form-control" 
              name="username" 
              value={user.username} 
              onChange={this.handleChange} />
              {submitted && user.username}
              <p className="alert-danger">{!this.state.formErrors.username && 'Username with 1 number and 1 Uppercase'}</p>

          </div>

          {/* Password */}
          <div className={'form-group' + (submitted && !user.password ? 'has-error' : '')}>
              <label htmlFor="password">Password</label>
              <input type="password" 
              className="form-control" 
              name="password" 
              value={user.password} 
              onChange={this.handleChange} />
              {submitted && user.password}
              <p className="alert-danger">{!this.state.formErrors.password && 'Password with 1 number and 1 uppercase'}</p>

          </div>

          <div className = "form-group">
          <button type="submit" className ="btn btn-primary">Register</button>
          {/* {registering &&
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />

          } */}
          <br/>
          <small><NavLink to="./Login">Already have an account ?</NavLink></small>
          </div>
        </form>

      </div>
    )
  }
}


function mapStateToProps(state){
  const { registering } =state.registration;
  return {
    registering
    
  };
}


function isEmpty(field){ 
  return field.length > 4 ? true : false; 
}

function isKTP(field){
  return field.length === 16 ? true : false;
}

function isPhone(field){
  return field.length >10 ? true : false;
}



function isFormatCase(field) {
  return appRegex.test(field)
}

export default connect(mapStateToProps)(RegisterPage); 