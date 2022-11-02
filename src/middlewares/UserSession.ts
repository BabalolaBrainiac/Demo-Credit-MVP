import {Request, Response, NextFunction} from "express";
import {Keys} from '../config/config'
import jwt from 'jsonwebtoken';

interface UserPayload {
    userId: string,
    password: string
}

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
            session?: any
        }
    }
}

const currentSession = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return next()
    }

    try {
        const payload = jwt.verify(req.session.jwt, Keys.JWT_TOKEN as string) as UserPayload;
        req.user = payload;
    } catch(err) {
        return err
    }
    next();
}
