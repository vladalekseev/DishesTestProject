import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications/lib/notifications.css';
import 'react-confirm-alert/src/react-confirm-alert.css'
import './global.scss';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Dashboard from './components/Dashboard/Dashboard';

class App extends Component {
    render() {
        return(
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route path='/page:number' component={Main}/>
                        <Route path="/dashboard" component={Dashboard} />
                        <Route component={Main} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
