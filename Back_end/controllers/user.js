import User from '../models/user';

export const getPopular = (req, res, next) => {
    User.find({}).limit(5).sort({ numberOfOrders: -1 })
        .then(users => {
            const values = users.map((user) => {
                return { x: user.login || user.displayName, y: user.numberOfOrders };
            });

            res.json(values);
        })
        .catch(err => next(err));
};
