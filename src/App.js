import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav/Nav';
import News from './components/News/News';
import Music from './components/Music/Music';
import {Route, withRouter} from 'react-router-dom';

import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {initializeApp} from './redux/app-reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() { 
    if(!this.props.initialized) {
      return <Preloader />
    }
    return (    
      <div className = "inner">
        <HeaderContainer />
        <Nav />
        <div className = "content">          
            <Route path = "/profile/:userId?" render = { () => {
                                        return <React.Suspense fallback = {<div>Loading...</div>}>
                                            <ProfileContainer/>
                                        </React.Suspense>
                                      }} />
            <Route path = "/dialogs" render = { () => {
                                        return <React.Suspense fallback = {<div>Loading...</div>}>
                                            <DialogsContainer/>
                                        </React.Suspense>
                                      }} />
            <Route path = "/music" component = {Music} />
            <Route path = "/news" component = {News} />
            <Route path = "/users" render = { () => <UsersContainer />} />
            <Route path = "/login" render = { () => <Login />} />
        </div>      
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ 
  initialized: state.app.initialized
})

export default compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);

