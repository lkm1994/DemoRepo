import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeComponent from './components/home/home';
import NavigationBar from './components/nav/nav';
import ScoreCardComponent from './components/scorecard/scorecard'
require('dotenv').config();
this.state = {
    isUserLoggedIn: false
}
ReactDOM.render(
    // isUserLoggedIn = false;
    // <Redirect from = '/' to='/login'/>
    <Router>
        <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/login' component={App} />
            <Route path='/home' component={HomeComponent} />
            <Route path='/nav' component={NavigationBar}/>
            <Route path= '/scorecard' component={ScoreCardComponent}/>
        </Switch>
    </Router>, document.getElementById('root'));
    registerServiceWorker();
