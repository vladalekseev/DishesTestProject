import Order from '../models/order';

export const create = (req, res, next) => {
    const data = req.body;

    Order.create(data)
        .then(order => res.json(order))
        .catch(err => next(err));
};

export const getActive = (req, res, next) => {
    Order.find({ isActive: true })
        .then(orders => {
            if(orders)
                res.json(orders);
        })
        .catch(err => next(err))
};

export const change = (req, res, next) => {
    const _id = req.params.id;

    Order.findOneAndUpdate({ _id }, { $set: { isActive: false } })
        .then(() => res.json(_id))
        .catch(err => next(err));
};

export const getDays = (req, res, next) => {
    Order.find({})
        .then(orders => {
            const days = orders.map(order => {
                return { day: order.creationDate.getUTCDate() }
            });
            res.json(days);
        })
        .catch(err => next(err));
};
