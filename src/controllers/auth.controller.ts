import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import { generateToken } from '../middleware/auth.middleware';

//User registration
export const registerUser = async (req: Request, res: Response) => {
    console.log('Register route hit');
    try {
        const { name, email, password, role, contact, business_name, address, geolocation } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role, contact, business_name, address, geolocation });
        await user.save();
        return res.status(201).json({ message: 'User created' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

//User login
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User does not exist' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = generateToken(user._id, user.role);
        return res.status(200).json({ token });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
