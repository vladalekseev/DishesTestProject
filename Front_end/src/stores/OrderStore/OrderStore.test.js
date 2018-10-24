import orderStore from './OrderStore';
import userStore from '../UserStore/UserStore';

describe('OrderStore', () => {
    it('should add dish to order or increase quantity', () => {
        orderStore.addDishToOrder('id', 'name', 'description', 'img');

        expect(orderStore.currentOrders.length).toBe(1);
        expect(orderStore.currentOrders[0].quantity).toBe(1);

        orderStore.addDishToOrder('id2', 'name', 'description', 'img');
        orderStore.addDishToOrder('id2', 'name', 'description', 'img');

        expect(orderStore.currentOrders.length).toBe(2);
        expect(orderStore.currentOrders[1].quantity).toBe(2);
    });

    it('should reduce quantity or remove dish from order', () => {
        orderStore.manageOrder('reduce', 'id');
        expect(orderStore.currentOrders.length).toBe(1);

        orderStore.manageOrder('reduce', 'id2');
        expect(orderStore.currentOrders.length).toBe(1);
        expect(orderStore.currentOrders[0].quantity).toBe(1);
    });

    it('should increase dish quantity', () => {
        orderStore.manageOrder('increase', 'id2');
        orderStore.manageOrder('increase', 'id2');
        expect(orderStore.currentOrders[0].quantity).toBe(3);
    });

    it('should remove dish from order', () => {
        orderStore.manageOrder('remove', 'id2');
        expect(orderStore.currentOrders.length).toBe(0);
    });

    it('should correctly set order for db', () => {
        orderStore.addDishToOrder('id', 'name', 'description', 'img');
        userStore.userType = 'user';

        expect(orderStore.currentOrders.length).toBeGreaterThan(0);
        expect(userStore.userType).not.toBeNull();
        expect(orderStore.setOrder()).toEqual({
            dishes: [
                {
                    id: 'id',
                    name: 'name',
                    quantity: 1
                }
            ],
            user: 'user'
        });
    });

    it('should reset order', () => {
        orderStore.addDishToOrder('id', 'name', 'description', 'img');
        orderStore.addDishToOrder('id2', 'name', 'description', 'img');
        orderStore.resetOrder();

        expect(orderStore.currentOrders.length).toBe(0);
    });

    const activeOrders = [
        {
            _id: 'id',
            isActive: true,
            dishes: [{}],
            user: 'user',
            creationDate: 'date'
        },
        {
            _id: 'id2',
            isActive: true,
            dishes: [{}, {}],
            user: 'user2',
            creationDate: 'date2'
        }
    ];

    it('should set active orders', done => {
        fetch.mockResponse(JSON.stringify(activeOrders));
        orderStore.fetchOrders()
            .then(() => {
                expect(orderStore.activeOrders.length).toBe(2);

                orderStore.activeOrders.forEach((order) => {
                    expect(order.isActive).toBe(true);
                    expect(order.dishes.length).not.toBe(0);
                    expect(order.user).toBeDefined();
                });
            })
            .then(done)
            .catch(done.fail);
    });

    it('should close active order', done => {
        const testID = 'id';
        fetch.mockResponse(JSON.stringify(testID));
        orderStore.activeOrders = activeOrders;

        expect(orderStore.activeOrders.length).toBe(2);

        orderStore.fulfillOrder(testID)
            .then(() => {
                expect(orderStore.activeOrders.length).toBe(1);
                orderStore.activeOrders.forEach((order) => {
                    expect(order._id).not.toBe(testID);
                });
            })
            .then(done)
            .catch(done.fail);
    });
});
