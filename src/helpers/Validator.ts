import {body, validationResult} from 'express-validator';
import {NextFunction, Request, Response} from 'express';
import {ContextRunner} from 'express-validator/src/chain';
import {ErrorCode} from './ErrorCodes';
import {UserService} from "../services/userService";
import {Errors} from "./Errors";

/**
 * Uniform handling of express validators
 * @param validations
 */
export const Validator = {
    validate: (validations: ContextRunner[]) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            await Promise.all(validations.map((validation: ContextRunner) => validation.run(req)));

            const errors = validationResult(req);

            if (errors.isEmpty()) return next();

            res.status(400).json({
                code: ErrorCode.BAD_REQUEST,
                errors: errors.array().map(({param, msg}) => ({
                    param,
                    message: msg,
                })),
            });
        };
    },
};

const isAccountNumberPresent = (v: any, {req}: any) => req.body.accountNumber;
const isUserId = (v: any, {req}: any) => req.body.userId;

/**
 * Withdrawal validators
 */
export const requestValidator = () => {
    return Validator.validate([
        body('userId', 'Please provide a valid userId')
            .isUUID(4)
            .trim()
            .escape(),
        body('accountNumber', 'Please provide a valid account number')
            .notEmpty()
            .trim()
            .escape(),
        body('amount', 'Request provide valid amount').custom((amount: any) => 'number' === typeof amount && amount > 0),
        body('denomination', 'Please provide a valid denomination.')
            .isString()
            .trim()
            .escape(),
        // momo validations
        body('accountNumber', ' Please provide a valid accountNumber')
            .if(isAccountNumberPresent)
            .exists()
            .trim()
            .escape(),
        body('userId', 'Please provide a valid user id')
            .if(isUserId)
            .exists()
            .trim()
            .escape(),

    ]);
};

/**
 * Lookup validators
 */
export const fieldValidator = () => {
    return Validator.validate([
        body('bankId', 'Please provide a valid bank ID.')
            .exists()
            .trim()
            .escape(),
        body('accountNumber', 'Please provide a valid account number.')
            .exists()
            .trim()
            .escape(),
    ]);
};

export const userExists = async (email: any) => {
    await UserService.getUserByEmail(email).then((user) => {
        if (user) {
            throw new Errors(ErrorCode.BAD_REQUEST, 'User with this email already exist')
        }
        return new Errors(ErrorCode.BAD_REQUEST, 'User with this email already exist')
    })
}
