import mongoose, { Schema } from 'mongoose';

export type UserRole = 'admin' | 'distributor' | 'retailer';

export interface IUser extends Document {
    role: UserRole;
    hash: string;
    name: string;
    email: string;
    password: string;
    contact: string;
    business_name: string;
    address: {
        line1: string;
        city: string;
        state: string;
        zipcode: string;
    };
    geolocation?: { lat: number; long: number };
}

const UserSchema: Schema = new Schema(
    {
        role: { type: String, enum: ['admin', 'distributor', 'retailer'], required: true },
        hash: { type: String },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        contact: { type: String, required: true },
        business_name: { type: String, required: true },
        address: {
            line1: String,
            city: String,
            state: String,
            zipcode: String
        },
        geolocation: {
            lat: Number,
            long: Number
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
