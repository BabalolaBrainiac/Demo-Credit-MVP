import {IExpressResponse, IResponse} from "../interfaces/IExpressReq";
import {ErrorCode} from './ErrorCodes';


export const HandleSuccessResponse = (data: any): IExpressResponse => {
    return {
        status: 200,
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
export const HandleErrorResponse = (err: any): { data: any; status: any } => {
    const { message, code } = err;

    if (!code) {
        return {
            status: 500,
            data: {
                code: ErrorCode.SERVER_ERROR,
                message: 'An unexpected internal server error occurred',
                data: err.stack,
            },
        };
    }

    // if (err) {
    //     return {
    //         status: 500,
    //         data: {
    //             code: ErrorCode.SERVER_ERROR,
    //             message: 'An unexpected internal server error occurred',
    //             data: err.stack,
    //         },
    //     };
    // }
    switch (code) {
        case 401:
            return {
                status: ErrorCode.UNAUTHORIZED,
                data: {
                    ...err,
                    message: message || 'You are not authorized to access this endpoint',
                },
            };
        case 400:
            return {
                status: 400,
                data: {
                    ...err,
                    message: message || 'Some important parameters are missing. See documentation',
                },
            };
        case 500:
            return {
                status: 500,
                data: {
                    ...err,
                    message: 'An unexpected error has occurred, kindly check the documentation'
                },
            };
        case ErrorCode.NOT_FOUND:
            return {
                status: 404,
                data: {
                    ...err,
                    message: 'The resource you are looking for does not exist'
                },
            };
        default:
            return {
                status: 403,
                data: err,
            };
    }
};
