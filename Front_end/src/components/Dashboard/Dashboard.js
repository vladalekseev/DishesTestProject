import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import './Dashboard.scss';

import Charts from '../../widgets/Charts/index';
import ActiveOrdersContainer from './ActiveOrdersContainer/OrderList';

@inject('userStore')
@observer
class Dashboard extends Component {
    render() {
        const { userStore } = this.props;

        return userStore.isAdmin ? (
            <div className="container-fluid">
                <div className="row dashboard">
                    <div className="menu col-xl-8">
                        <Charts />
                    </div>
                    <div className="menu col-xl-4">
                        <ActiveOrdersContainer />
                    </div>
                </div>
            </div>
        ) : <Redirect to={{ pathname: '/' }}/>;
    }
}

export default Dashboard;
