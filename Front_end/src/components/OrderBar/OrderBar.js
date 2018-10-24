import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './OrderBar.scss';

import CurrentOrder from './CurrentOrder/CurrentOrder';

@inject('orderStore')
@observer
class OrderBar extends Component {

    render() {
        const { orderStore } = this.props;

        return (
            <div className="order__wrapper col-xl-4 order-xl-2" style={{display : this.props.isOrderOpened ? 'block' : ''}}>
                <form className="order__container clearfix">
                    <h4 className="order__title">Order</h4>
                    {
                        orderStore.currentOrders.map((order) => {
                            return <CurrentOrder
                                key={order.id}
                                id={order.id}
                                name={order.name}
                                description={order.description}
                                img={order.img}
                                quantity={order.quantity}
                            />
                        })
                    }
                    {
                        orderStore.ordersCount
                            ? <button type="button" className="button button--order" onClick={() => { orderStore.orderDishes() }} >order</button>
                            : <div className="order__empty" >Your order list is empty, add dishes to your order</div>
                    }
                </form>
            </div>
        );
    }
}

export default OrderBar;
