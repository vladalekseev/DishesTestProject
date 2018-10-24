import { observable, computed, action } from 'mobx';
import userStore from '../UserStore/UserStore';
import appStore from '../AppStore/AppStore';
import { createOrder, getActiveOrders, changeOrder } from '../../utils/order-api';

class OrderStore {

    @observable currentOrders;
    @observable activeOrders;

    constructor() {
        this.checkStorage();
        this.fetchOrders();

        this.activeOrders = [];
    }

    @computed
    get ordersCount() {
        return this.currentOrders.length;
    }

    @computed
    get activeOrdersCount() {
        return this.activeOrders.length;
    }

    @action
    checkStorage() {
        const orders = localStorage.getItem('orders');
        this.currentOrders = orders ? JSON.parse(orders) : [];
    }

    @action
    fetchOrders() {
        return getActiveOrders()
            .then(res => res.json())
            .then(orders => { this.activeOrders = orders })
            .catch(err => err);
    }

    @action
    addDishToOrder(id, name, description, img) {
        const foundOrder = this.currentOrders.find((order) => {
            return order.id === id;
        });

        foundOrder
            ? foundOrder.quantity++
            : this.currentOrders.push({ id, name, description, img, quantity: 1 });

        localStorage.setItem('orders', JSON.stringify(this.currentOrders));
    }

    @action
    manageOrder(act, id) {
        const foundIndex = this.currentOrders.findIndex((order) => {
            return order.id === id;
        });

        if (~foundIndex) {
            const order = this.currentOrders[foundIndex];

            switch(act) {

                case 'reduce':
                    order.quantity === 1
                        ? this.currentOrders.splice(foundIndex, 1)
                        : order.quantity--;
                    break;

                case 'increase':
                    order.quantity++;
                    break;

                default:
                    // Remove order
                    this.currentOrders.splice(foundIndex, 1);
                    break;
            }

            localStorage.setItem('orders', JSON.stringify(this.currentOrders));
        }
    }

    @action
    orderDishes() {
        if(!userStore.userType)
            return appStore.createNotification('info', 'Please log in to order !');

        createOrder(this.setOrder())
            .then(() => {
                this.resetOrder();
                appStore.createNotification('success', 'Thanks for your order !');
            })
            .catch(err => err);
    }

    setOrder() {
        const user = userStore.userType;
        const dishes = this.currentOrders.map((order) => {
            return {
                id : order.id,
                name : order.name,
                quantity: order.quantity
            }
        });
        return { user, dishes }
    }

    @action
    resetOrder() {
        this.currentOrders = [];
        localStorage.removeItem('orders');
    }

    @action
    fulfillOrder(id) {
        return changeOrder(id)
            .then(res => res.json())
            .then(id => {
                const foundOrder = this.activeOrders.findIndex((order) => {
                    return order._id === id;
                });

                if(~foundOrder)
                    this.activeOrders.splice(foundOrder, 1);
            })
            .catch(err => err);
    }
}

const orderStore = new OrderStore();
export default orderStore;
