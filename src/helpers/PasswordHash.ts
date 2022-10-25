import bcrypt from 'bcrypt';
import {Errors} from "./Errors";
import {ErrorCode} from "./ErrorCodes";

export const passwordHash = async (password: string) => {
    try {
        let salt: any = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    } catch(err) {
        return err
    }
}

export const comparePassword = async(input: any, hashedPassword: any) => {
    try {
        let isCorrect =  bcrypt.compare(input, hashedPassword)
        if(!isCorrect) return new Errors(ErrorCode.BAD_REQUEST, 'Passwords do not match')

    }catch (err) {
        return err

    }

}
