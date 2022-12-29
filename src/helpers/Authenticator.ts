import axios from "axios";
import {IExpressRequest} from "../interfaces/IExpressReq";
import {NextFunction} from "express";

export class Authenticator {
    private static authUrl: string;
    private static payload: any;
    private static serviceId: any;

    constructor() {

    }

    static async getServiceTokenFromAuthService() {
        return await axios({
            method: 'POST',
            url: `${this.authUrl}/token`,
            params: {
                payload: this.payload,
                serviceId: this.serviceId
            }
        })
    }

    static async validateTokenFromAuthService(req: IExpressRequest, res: Response, next: NextFunction) {
        const token: any = req.headers["x-auth-token"];

        return await axios({
            method: 'POST',
            url: `${this.authUrl}/validate`,
            params: {
                token: token
            }
        })
    }
}