import bcrypt from "bcrypt";
import {has} from "config";

export const passwordHash = async (password: string) => {
  try {
    let salt: any = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch (err) {
    return err;
  }
};

export const comparePassword = async (
  input: string,
  hashedPassword: string
) => {
  try {
    if (!hashedPassword) {
      return false
    }
    return await bcrypt.compare(input, hashedPassword);
  } catch (err) {
    return err;
  }
};
