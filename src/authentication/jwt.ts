import jwt from 'jsonwebtoken';
import {Keys} from "../config/config";
import {IUserDto} from "../interfaces/IUser";
let tokens;

export const assignToken = (payload: any) => {
    return jwt.sign(payload, Keys.JWT_TOKEN as string)
}

const generateToken = (item: any) => {
    return jwt.sign(item, Keys.JWT_TOKEN as string, {expiresIn: '20s'})
}

const refreshedToken = (item: any) => {
    const refreshedToken = jwt.sign(item, Keys.JWT_REFRESH_SECRET as string)
    tokens.push(refreshedToken);
    return refreshedToken;
}

export const authenticateLogin = (user: IUserDto) => {
    const accessToken = generateToken(user);
    const refreshToken = refreshedToken(user);

    return ({accessToken, refreshToken})
}
