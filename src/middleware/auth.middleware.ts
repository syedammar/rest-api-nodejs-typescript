import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { IUser, UserRole } from '../models/user.model';
import { JWT_SECRET } from '../config/config';
import mongoose from 'mongoose';

export interface JwtRequest extends Request {
    user?: {
        email: string;
        role: UserRole;
    };
}

export const authentication = (req: JwtRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json('No authorization header found');
    }

    const token = authHeader.split(' ')[1]; // Token structure is 'Bearer <token>'
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded as IUser;
        next();
    } catch (error) {
        return res.status(401).json('Invalid token');
    }
};

export function authorizeRoles(allowedRoles: UserRole[]) {
    return (req: JwtRequest, res: Response, next: NextFunction) => {
        const user = req.user;

        if (user && !allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: `Forbidden, you are a ${user.role} and this service is only available for ${allowedRoles}` });
        }

        next();
    };
}

export const generateToken = (_id: mongoose.Types.ObjectId, role: string) => {
    return jwt.sign({ _id, role }, JWT_SECRET, { expiresIn: '1h' });
};
