import axios from "axios";

let serviceId: any = process.env.IDEA_SERVICE_ID;
let authUrl: any = process.env.AUTH_SERVICE_URL
let publicKey: any = process.env.JWT_PUBLIC_KEY

export const GipperAuthenticator = {
    getServiceTokenFromAuthService: async (payload?: any) => {

        try {
            return await axios({
                method: 'POST',
                url: `${authUrl}/token`,
                data: {
                    serviceId: serviceId,
                    payload: payload
                }
            });


        } catch (err) {
            return err
        }
    },
    async validateServiceToken(token?: any): Promise<any> {
        try {
            return await axios({
                method: 'POST',
                url: `${authUrl}/validate`,
                headers: {
                    "x-auth-token": token
                },
                data: {
                    publicKey
                }
            })

        } catch (err: any) {
            return err;
        }
    },

    async getUserTokenFromAuthService(payload?: any): Promise<any> {

        const {userId, data, user_permissions} = payload;
        try {
            return await axios({
                method: 'POST',
                url: `${authUrl}/user/token`,
                data: {
                    payload: payload
                }
            });
        } catch (err) {
            return err
        }
    },

    async validateUserToken(token?: any): Promise<any> {
        try {
            return await axios({
                method: 'POST',
                url: `${authUrl}/user/token/validate`,
                headers: {
                    "x-auth-token": token
                },
                data: {
                    publicKey
                }
            })

        } catch (err: any) {
            return err;
        }
    },
}