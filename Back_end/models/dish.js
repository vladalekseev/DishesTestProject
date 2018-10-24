import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const DishSchema = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    creationDate : { type: Date, default: Date.now },
    isEditable: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    numberOfOrders: { type: Number, default: 0 }
});

DishSchema.plugin(mongoosePaginate);

export default mongoose.model('Dish', DishSchema);
