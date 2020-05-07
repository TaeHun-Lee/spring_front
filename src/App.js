import React, {Component} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import SignSide from './SignSide';
import Main from './Main';
import Admin from './Admin';
import axios from 'axios';


const springUrl = "http://localhost:8090/spring/user/";
class App extends Component {
  constructor(){
    super()
    this.state = {
      initiation : true,
      isLoggedIn : false,
      userInfo : null,
      isAdmin : false,
    }
  }

  componentDidMount(){
    axios.get(springUrl + "checkUserSession/", {
      withCredentials : true,
    }).then(res => {
      this.setState({
        initiation : false,
      });
      const auth = res.data.AUTH;
      const session = JSON.parse(window.sessionStorage.getItem("AUTH"));
      if(auth == null || session == null)
        this.authInstanceCheck();
      else if ( (auth.userName!=null)&&(session.userName!=null)&&(auth.userName === session.userName) )
        this.authInstanceCheck(JSON.stringify(session));
      else if ( (session.tk != null)&&(auth === session.tk)&&(auth === "ADMIN") )
        this.authInstanceCheck(JSON.stringify(session));
      else
        this.authInstanceCheck();
    });
  }

  authInstanceCheck = (auth) => {
    if(auth){
      const tk = JSON.parse(auth);
      window.sessionStorage.setItem("AUTH", auth);
      if(tk.tk != null && tk.tk === "ADMIN"){
        this.setState({
          isAdmin : true,
          isLoggedIn : true,
        });
      }
      else{
        this.setState({
          isAdmin : false,
          isLoggedIn : true,
          userInfo : tk,
        })
      }
    }
    else{
      window.sessionStorage.clear();
      this.setState({
        isLoggedIn : false,
        userInfo : null,
        isAdmin : false,
      });
    }
  }

  getUserInfo = ()=>{
    return this.state.userInfo;
  }

  routingRender = () => {
    const logged = this.state.isLoggedIn;
    const isAdmin = this.state.isAdmin;
    const initiationState = this.state.initiation;
    let rendering = null;
    if(initiationState){
      return rendering;
    }
    if(logged){
      if(!isAdmin){
        return rendering = (
          <Switch>
            <Route exact path="/" render={(props) => <Main {...props} _authInstanceCheck={this.authInstanceCheck} url="/" />} />
            <Route exact path="/userInfo" render={(props) => <Main {...props} _authInstanceCheck={this.authInstanceCheck} url="/userInfo" getUserInfo={this.getUserInfo} />} />
            <Route exact path="/userModify" render={(props) => <Main {...props} _authInstanceCheck={this.authInstanceCheck} url="/userModify" getUserInfo={this.getUserInfo} />} />
            <Route path="/regist" render={(props) => <Main {...props} _authInstanceCheck={this.authInstanceCheck} url="/regist" />} />
            <Route path="/album/:albumId" render={(props) => <Main {...props} _authInstanceCheck={this.authInstanceCheck} url="/album/:albumId" />} />
            <Route path="/albumModify/:albumId" render={(props) => <Main {...props} _authInstanceCheck={this.authInstanceCheck} url="/albumModify/:albumId" />} />
            <Route render={(props) => <Redirect {...props} to="/" _authInstanceCheck={this.authInstanceCheck} url="/" />} />
          </Switch>
        );
      }
      else
        return rendering = (
          <Switch>
            <Route exact path="/" render={(props) => <Admin {...props} _authInstanceCheck={this.authInstanceCheck} url="/" />} />
          </Switch>
        );
    }
    else {
      return rendering = (
        <Switch>
          <Route exact path="/" render={(props) => <SignSide {...props} _authInstanceCheck={this.authInstanceCheck} url="/" />} />
          <Route exact path="/signIn" render={(props) => <SignSide {...props} _authInstanceCheck={this.authInstanceCheck} url="/signIn" />} />
          <Route exact path="/signUp" render={(props) => <SignSide {...props} _authInstanceCheck={this.authInstanceCheck} url="/signUp" />} />
          <Route render={(props) => <Redirect {...props} _authInstanceCheck={this.authInstanceCheck} url="/" to="/" />} />
        </Switch>
      );
    }
  }

  render(){
    return (
      <div className="App">
        <BrowserRouter>
          {this.routingRender()}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
