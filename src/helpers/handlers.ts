import {IExpressResponse, IResponse} from "../interfaces/IExpressReq";
import {ErrorCode} from './ErrorCodes';


export const HandleSuccessResponse = (data: any) => {
    return {
        status: data.status,
        data: data,
    };
};

/**
 * Handles undefined route errors
 * @param req Express request
 * @param res Express response
 */
export async function RouteError(req: Request, res: any): Promise<Response> {
    return res.status(404).json({
        errors: {
            message: 'Invalid route. See documentation.',
            error: {
                status: 404,
            },
        },
    });
}

export const isSuccessfulStatus = (code: Number): boolean => {
    return code.toString().startsWith('2');
};

/**
 * Handles errors based on response codes.
 *  Advantage is, here, we can decide to report specific error types
 *  For now, we're only reporting 500
 * @param {Error} err    Custom error object
 * @param {Response} res Express response handler
 * @returns {Response}
 */
export const HandleErrorResponse = (err: any): IExpressResponse => {
    const { message, code } = err;

    if (code === ErrorCode.SERVER_ERROR || code === undefined) {

        return {
            status: 500,
            data: {
                code: ErrorCode.SERVER_ERROR,
                message: 'An unexpected internal server error occurred',
                data: err.stack,
            },
        };
    }

    switch (code) {
        case ErrorCode.FORBIDDEN:
        case ErrorCode.INVALID_OTP:
        case ErrorCode.ACCESS_RESTRICTED:
            return {
                status: 403,
                data: {
                    ...err,
                    message: message || 'Unauthorized endpoint access',
                },
            };
        case ErrorCode.BAD_REQUEST:
            return {
                status: 400,
                data: {
                    ...err,
                    message: message || 'Some important parameters are missing. See documentation',
                },
            };
        case ErrorCode.SERVICE_UNAVAILABLE:
        case ErrorCode.REQUEST_FAILED:
            return {
                status: 500,
                data: err,
            };
        case ErrorCode.RESOURCE_NOT_FOUND:
            return {
                status: 404,
                data: err,
            };
        default:
            return {
                status: 403,
                data: err,
            };
    }
};
