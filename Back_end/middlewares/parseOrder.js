import User from '../models/user';
import Dish from '../models/dish';

export default async (req, res, next) => {
    try {
        const { user, dishes } = req.body;

        await User.findOneAndUpdate({ login: user }, { $inc : { numberOfOrders: 1 } });
        await User.findOneAndUpdate({ displayName: user }, { $inc : { numberOfOrders: 1 } });

        for (let i = 0; i < dishes.length; i++) {
            await Dish.findOneAndUpdate({ name: dishes[i].name }, { $inc : { numberOfOrders: 1 } });
        }

        next();

    } catch (err) {
        next(err);
    }
};
