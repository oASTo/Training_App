import React, { Component } from 'react'
import logo from '../logo.jpg'
import { NavLink } from "react-router-dom";

export class Menu extends Component {
  render() {
    return (
      <div className="col-md6 col-md-offset-3">
        <h2>Training App</h2>
        <div><img src={logo} name="logo-menu" alt="logo-menu"></img></div>
        <br/>
        <div>        
        <button className="btn btn btn-default"><NavLink to="/RequestTraining">Request Training</NavLink></button>
        <button className="btn btn btn-default"><NavLink to="/ListTraining">ListTraining</NavLink></button>
        <br/><br/>
        <button className="btn btn btn-link"><NavLink to="/Profil">Profile</NavLink></button>
        <button className="btn btn btn-warning"><NavLink to="/">Logout</NavLink></button>
        </div>

      </div>
    )
  }
}

export default Menu
