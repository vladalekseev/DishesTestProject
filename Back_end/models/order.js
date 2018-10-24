import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema({
    dishes: [{
        id: String,
        name: String,
        quantity: Number,
        _id: false
    }],
    user: String,
    isActive: { type: Boolean, default: true },
    creationDate: { type: Date, default: Date.now }
});

export default mongoose.model('Order', OrderSchema);
