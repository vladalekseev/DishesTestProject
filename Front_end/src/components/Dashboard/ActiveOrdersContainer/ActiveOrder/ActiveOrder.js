import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './ActiveOrder.scss';

@inject('orderStore')
@observer
class ActiveOrder extends Component {
    render() {
        const { orderStore } = this.props;

        return (
            <div className="active-order clearfix">
                <div className="active-order__user">{this.props.user}</div>
                <div className="active-order__table">
                    <div className="active-order__row active-order__row--head">
                        <div className="active-order__name">Name</div>
                        <div className="active-order__quantity">Quantity</div>
                    </div>
                    {
                        this.props.dishes.map((dish, i) => {
                            return (
                                <div className="active-order__row" key={i}>
                                    <div className="active-order__name">{dish.name}</div>
                                    <div className="active-order__quantity">{dish.quantity}</div>
                                </div>
                            )
                        })
                    }
                </div>
                    <button
                        className="active-order__btn"
                        onClick={() => { orderStore.fulfillOrder(this.props.id) }}>
                        <i className="fa fa-check active-order__check" aria-hidden="true"/>
                    </button>
            </div>
        );
    }
}

export default ActiveOrder;
