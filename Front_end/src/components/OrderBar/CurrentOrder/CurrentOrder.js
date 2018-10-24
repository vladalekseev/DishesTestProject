import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import './CurrentOrder.scss';

@inject('orderStore')
@observer
class CurrentOrder extends Component {
    render() {
        const { orderStore, id } = this.props;

        return (
            <li className="order-item">
                <div className="order-item__img-wrapper">
                    <img src={`/img/${this.props.img}`} className="order-item__img" alt={this.props.name}/>
                </div>
                <p className="order-item__description">{this.props.description}</p>
                <strong className="order-item__name">{this.props.name}</strong>
                <i className="fa fa-times order-item__remove-btn" onClick={() => { orderStore.manageOrder('remove', id) }} />
                <div className="order-item_quantity-wrapper">
                    <i className="fa fa-minus order-item_quantity-minus" onClick={() => { orderStore.manageOrder('reduce', id) }}/>
                    <div className="order-item_quantity">
                        {this.props.quantity}
                    </div>
                    <i className="fa fa-plus order-item_quantity-plus" onClick={() => { orderStore.manageOrder('increase', id) }} />
                </div>
            </li>
        );
    }
}

export default CurrentOrder;
