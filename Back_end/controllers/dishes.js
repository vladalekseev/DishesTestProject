import Dish from '../models/dish';

/**
 * Get all dishes
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const getAll = (req, res, next) => {
    const isAdmin = (req.query.isAdmin === 'true');
    const filter = isAdmin ? {} : { isPublished: true };
    const page = req.query.page;
    const limit = 4;

    Dish.paginate(filter, { page, limit, sort:{ creationDate : -1 }, })
        .then(dishes => res.json(dishes))
        .catch(err => next({ status: 404, message: err.message }));
};

/**
 * Get popular dishes
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const getPopular = (req, res, next) => {
    Dish.find({}).limit(5).sort({ numberOfOrders: -1 })
        .then(dishes => {
            const values = dishes.map((dish) => {
                return { x: dish.name, y: dish.numberOfOrders }
            });

            res.json(values);
        })
        .catch(err => next(err));
};

/**
 * Create new dish
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const create = (req, res, next) => {
    const data = req.body;

    Dish.create(data)
        .then(dish => res.json(dish))
        .catch(err => next({ status: 400, message: 'Dish with the same name already exists' }));
};

/**
 * Remove dish
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const remove = (req, res, next) => {
    const _id = req.params.id;

    Dish.findOneAndRemove({ _id })
        .then(() => res.json(_id))
        .catch(err => next(err));
};

/**
 * Update dish with new name and description
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {Object}
 */
export const update = (req, res, next) => {
    const _id = req.params.id;

    Dish.findOneAndUpdate({ _id }, { $set: req.body })
        .then(dish => res.json(dish))
        .catch(err => next({ status: 400, message: 'Dish with the same name already exists' }));
};

/**
 * Upload image for dish
 * @param {Object} req
 * @param {Object} res
 * @return {Object}
 */
export const uploadImage = (req, res) => {
    res.json({
        name: req.file.filename,
        message: 'Image successfully uploaded'
    });
};
