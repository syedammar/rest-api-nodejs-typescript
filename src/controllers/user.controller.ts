import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

// Protected
export const protectedRoute = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Successfully access the protected route' });
};

// Get user by id (READ)
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

// Update user   (UPDATE)
export const updateUser = async (req: Request, res: Response) => {
    try {
        const updates = req.body;
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
            new: true
        });
        res.status(201).json(updatedUser);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

// Delete user   (DELETE)
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(204).send();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
