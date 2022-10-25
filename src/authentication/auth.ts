import {IExpressRequest, IResponse} from "../interfaces/IExpressReq";
import {NextFunction} from "express";
import {ErrorCode} from "../helpers/ErrorCodes";
import {Keys} from "../config/config";
import jwt from "jsonwebtoken";
import {Errors} from "../helpers/Errors";


export const authenticateToken = (req: any, res: IResponse, next: NextFunction) => {
    let authHeaders = req.headers['authorization'];

    const token = authHeaders && authHeaders.split(' ')[1]
    if(token == null) return res.status(401).json({
        message: ErrorCode.UNAUTHORIZED
    })

    return jwt.verify(token, Keys.JWT_TOKEN as string, (err: any, user: any) => {
        if (err) {
            throw new Errors(ErrorCode.UNAUTHORIZED, 'Could Not Authorize User')
        }
        req.user = user
        next()
    })

}

