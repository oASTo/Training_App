import React, { Component } from 'react';
import {LoginPage} from './LoginPage/LoginPage';
import {connect} from 'react-redux'
import menu from './MenuPage/Menu';
import profil from './ProfilPage/Profil';
import list from './ListPage/ListTraining';
import request from './RequestPage/RequestTraining';
import Error from './Error';
import {history} from './_helpers'
import {RegisterPage} from './RegisterPage';


import {BrowserRouter, Route, Switch } from "react-router-dom";
import { alertActions } from './_actions/alert.action';



class App extends Component {
  constructor(props) {
    super(props);
  
    const {dispatch} = this.props;
    history.listen((location, action)=>{
      dispatch(alertActions.clear());
    });
  }

  render() {
    const {alert} = this.props;
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm8 col-sm-offset2">
          {alert.message &&
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          }
      <div className="App">
      <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={LoginPage} exact />
          <Route path="/Login" component={LoginPage} />
          <Route path="/Menu" component={menu} />
          <Route path="/Register" component={RegisterPage} />
          <Route path="/Profil" component={profil} />
          <Route path="/ListTraining" component={list} />
          <Route path="/RequestTraining" component={request} />
          <Route component={Error} />
          </Switch>
          
      </div>
      
      </BrowserRouter>
      
      </div>
      </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  const {alert} = state;
  return {
    alert
  };
}

export default connect(mapStateToProps)(App);
