import {body, validationResult} from 'express-validator';
import {NextFunction, Request, Response} from 'express';
import {ContextRunner} from 'express-validator/src/chain';
import {ErrorCode} from './ErrorCodes';

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

const isBankMomoOrCrypto = (prop: any) => prop.bank || prop.momo || prop.crypto;
const isMomo = (v: any, {req}: any) => req.body.paymentDetails.momo;
const isBank = (v: any, {req}: any) => req.body.paymentDetails.bank;
const isCrypto = (v: any, {req}: any) => req.body.paymentDetails.crypto;

/**
 * Withdrawal validators
 */
export const withdrawalValidator = () => {
    return Validator.validate([
        body('walletId', 'Please provide a valid wallet ID.')
            .isUUID(4)
            .trim()
            .escape(),
        body('methodId', 'Please provide a valid transfer method ID.')
            .notEmpty()
            .trim()
            .escape(),
        body('amount', 'Request amount details is required').custom((amount: any) => 'number' === typeof amount && amount > 0),
        body('denomination', 'Please provide a valid account denomination.')
            .isString()
            .trim()
            .escape(),
        body('paymentDetails', 'Please provide either a "bank" or "momo" recipient payment details').custom(isBankMomoOrCrypto),

        // momo validations
        body('paymentDetails.momo.accountName', 'Momo: Please provide a valid momo account name')
            .if(isMomo)
            .exists()
            .trim()
            .escape(),
        body('paymentDetails.momo.accountNumber', 'Momo: Please provide a valid momo account number (Phone number)')
            .if(isMomo)
            .exists()
            .trim()
            .escape(),
        body('paymentDetails.momo.network', 'Momo: Please provide a valid momo network')
            .if(isMomo)
            .exists()
            .trim()
            .escape(),
        body('paymentDetails.momo.country', 'Momo: Please provide a valid momo country')
            .if(isMomo)
            .exists()
            .trim()
            .escape(),
        body('paymentDetails.momo.denomination', 'Momo: Please provide a valid momo denomination (NGN, ...etc)')
            .if(isMomo)
            .isString()
            .isLength({max: 3})
            .trim()
            .escape(),

        // bank validations
        body('paymentDetails.bank.bankId', 'Bank: Please provide a valid bank Id (42, ...etc)')
            .if(isBank)
            .exists()
            .trim()
            .escape(),
        body('paymentDetails.bank.bankName', 'Bank: Please provide a valid bank name')
            .if(isBank)
            .exists()
            .trim()
            .escape(),
        body('paymentDetails.bank.accountNumber', 'Bank: Please provide a valid bank account number')
            .if(isBank)
            .exists()
            .trim()
            .matches(/^\d+$/)
            .isLength({max: 20})
            .escape(),
        body('paymentDetails.bank.accountName', 'Bank: Please provide a valid account name')
            .if(isBank)
            .exists()
            .trim()
            .isLength({max: 255})
            .escape(),
        body('paymentDetails.bank.denomination', 'Bank: Please provide a valid bank account denomination')
            .if(isBank)
            .isString()
            .trim()
            .isLength({max: 3})
            .escape(),

        // crypto validation
        body('paymentDetails.crypto.accountName', 'Crypto: Please provide a valid account name')
            .if(isCrypto)
            .optional()
            .exists()
            .trim()
            .escape(),
        body('paymentDetails.crypto.denomination', 'Crypto: Please provide a valid crypto denomination')
            .if(isCrypto)
            .isString()
            .isLength({max: 6})
            .trim()
            .escape(),
        body('paymentDetails.crypto.address', 'Crypto: Please provide a valid crypto address')
            .if(isCrypto)
            .exists()
            .trim()
            .escape(),
        body('paymentDetails.crypto.network', 'Crypto: Please provide a withdrawal network type')
            .if(isCrypto)
            .optional()
            .exists()
            .trim()
            .escape(),
    ]);
};

/**
 * Lookup validators
 */
export const lookupValidator = () => {
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

export const cryptoAddressValidate = () => {
    return Validator.validate([
        body('address', 'Please provide a crypto address')
            .isString()
            .trim()
            .escape(),
        body('denomination', 'Please provide a crypto denomination')
            .isString()
            .trim()
            .escape(),
    ]);
};

const isMomoAccount = (v: any, {req}: any) => req.body.momo;
const isBankAccount = (v: any, {req}: any) => req.body.bank;
const isCryptoAccount = (v: any, {req}: any) => req.body.crypto;

export const validateSaveAccount = () => {
    return Validator.validate([
        body('', 'Please provide valid bank, crypto or momo withdrawal account type.').custom((payload: any) => {
            return !!(payload.bank || payload.crypto || payload.momo);
        }),
        // momo validations
        body('momo.accountName', 'Momo: Please provide a valid momo account name')
            .if(isMomoAccount)
            .optional()
            .exists()
            .trim()
            .escape(),
        body('momo.accountNumber', 'Momo: Please provide a valid momo account number (Phone number)')
            .if(isMomoAccount)
            .exists()
            .trim()
            .escape(),
        body('momo.network', 'Momo: Please provide a valid momo network')
            .if(isMomoAccount)
            .exists()
            .trim()
            .escape(),
        body('momo.country', 'Momo: Please provide a valid momo country')
            .if(isMomoAccount)
            .exists()
            .trim()
            .escape(),
        body('momo.denomination', 'Momo: Please provide a valid momo denomination (NGN, ...etc)')
            .if(isMomoAccount)
            .isString()
            .isLength({max: 3})
            .trim()
            .escape(),

        // bank validations
        body('bank.bankId', 'Bank: Please provide a valid bank Id (42, ...etc)')
            .if(isBankAccount)
            .exists()
            .trim()
            .escape(),
        body('bank.bankName', 'Bank: Please provide a valid bank name')
            .if(isBankAccount)
            .exists()
            .trim()
            .escape(),
        body('bank.accountNumber', 'Bank: Please provide a valid bank account number')
            .if(isBankAccount)
            .exists()
            .trim()
            .matches(/^\d+$/)
            .isLength({max: 20})
            .escape(),
        body('bank.accountName', 'Bank: Please provide a valid account name')
            .if(isBankAccount)
            .exists()
            .trim()
            .isLength({max: 255})
            .escape(),
        body('bank.denomination', 'Bank: Please provide a valid bank account denomination')
            .if(isBankAccount)
            .isString()
            .trim()
            .isLength({max: 3})
            .escape(),

        // crypto validation
        body('crypto.accountName', 'Crypto: Please provide a valid account name')
            .if(isCryptoAccount)
            .optional()
            .exists()
            .trim()
            .escape(),
        body('crypto.denomination', 'Crypto: Please provide a valid crypto denomination')
            .if(isCryptoAccount)
            .isString()
            .isLength({max: 6})
            .trim()
            .escape(),
        body('crypto.address', 'Crypto: Please provide a valid crypto address')
            .if(isCryptoAccount)
            .exists()
            .trim()
            .escape(),
    ]);
};
