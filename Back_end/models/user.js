import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook', 'instagram'],
        required: true
    },
    login: { type: String, unique: true },
    password: String,
    displayName: { type: String, unique: false },
    socialID: String,
    numberOfOrders: { type: Number, default: 0 }
});

UserSchema.pre('save', async function(next) {
    try {
        if(this.method !== 'local')
            return next();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);

        this.password = hashedPassword;
        next();

    } catch(err) {
        next(err);
    }
});

UserSchema.methods.comparePasswords = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', UserSchema);
