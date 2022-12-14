import {scrypt, randomBytes} from "crypto";
import {promisify} from 'util'


const scryptAsync = promisify(scrypt);

class PasswordManager {
    static async hashPassword(password: string) {
        const salt = randomBytes(8).toString('hex')
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

        return `${buffer.toString('hex')}.${salt}`

    }

    static async comparePasswod(hashedPassword: string, enteredPassword: string) {


    }
}
