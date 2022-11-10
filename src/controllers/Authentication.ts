import {KudaHelper} from "../processor/ProcessorUtils";
import {Logger} from "../utils/Logger/Logger";
import {ErrorCode} from "../helpers/ErrorCodes";
import {Errors} from "../helpers/Errors";


export const AuthenticationController = {
    async getKudaAuthToken() {
        let email = process.env.KUDA_EMAIL
        let apiKey = process.env.KUDA_API_KEY
        try {
            const token = await KudaHelper.getAuthToken(email, apiKey);
            console.log(token);
            return token;
        } catch(err) {
            return new Errors(ErrorCode.REQUEST_FAILED, 'Could not get auth token' )
        }
    }
}
