import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import cn from 'classnames';
import './OrderList.scss';

import ActiveOrders from './ActiveOrder/ActiveOrder';

@inject('orderStore')
@observer
class OrderList extends Component {

    render() {
        const { orderStore } = this.props;

        return (
            <div className="order-list">
                <h2 className="order-list__title">Active orders</h2>
                {
                    orderStore.activeOrders.map((order) => {
                        return <ActiveOrders
                            key={order._id}
                            id={order._id}
                            user={order.user}
                            dishes={order.dishes}
                        />
                    })
                }
                <div className={cn("order-list__hint", { "d-none": orderStore.activeOrdersCount })}>
                    No active orders
                </div>
            </div>
        );
    }
}

export default OrderList;
