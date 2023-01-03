import express, {Router} from "express";
import {GipperAuthenticator} from "../helpers/Authenticator";
import {IExpressRequest, IResponse} from "../interfaces/IExpressReq";

const router: Router = express.Router();


export const AuthService = {
    getServiceToken: async (req: IExpressRequest, res: IResponse) => {
        GipperAuthenticator.getServiceTokenFromAuthService().then((data: any) => {
            let resData = {
                code: data.status,
                data: data.data || data.response.data
            }
            res.send(resData)
        }).catch((err) => {
            res.send(err)
        });
    },
    validateTokenFromAuthService: async (req: IExpressRequest, res: IResponse) => {
        const token: any = req.headers["x-auth-token"];

        GipperAuthenticator.validateServiceToken(token).then((data: any) => {
            let resData = {
                code: data.status,
                data: data.data || data.response.data
            }
            res.send(resData)
        }).catch((err: any) => {
            return res.send(err)
        })
    },

    getUserToken: async (req: IExpressRequest, res: IResponse) => {
        // const payload = {
        //     userId: "678d158b-185a-45a7-80e6-98c6a4a655ef",
        //     user_permissions: ["gpsv.user.full.login", "gpsv.user.basic"],
        //     data: {
        //         "name": "Babalola Opeyemi",
        //         "user-type": "Dev"
        //     }
        // }

        const payload = {
            userId: "678d158b-185a-45a7-80e6-98c6a4a655ef",
            user_permissions: [],
            data: {
                "name": "Babalola Opeyemi",
                "user-type": "Dev"
            }
        }
        GipperAuthenticator.getUserTokenFromAuthService(payload).then((data) => {
            let resData = {
                code: data.status,
                data: data.data || data.response.data
            }
            res.send(resData)
        }).catch((err) => {
            res.send(err)
        });
    },
    validateUserToken: async (req: IExpressRequest, res: IResponse) => {
        const token: any = req.headers["x-auth-token"];

        GipperAuthenticator.validateUserToken(token).then((data: any) => {
            let resData = {
                code: data.status,
                data: data.data || data.response.data
            }
            res.send(resData)
        }).catch((err: any) => {

            return res.send(err)
        })
    }
}
router.post("/", AuthService.getServiceToken)

router.post("/validate", AuthService.validateTokenFromAuthService);

router.post("/user/token", AuthService.getUserToken)

router.post("/user/token/validate", AuthService.validateUserToken);
export default router