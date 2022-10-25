import { passwordHash } from "./PasswordHash";
import { uuid } from "uuidv4";
import { assignToken } from "../authentication/jwt";

export const PrepareUser = async (user: any) => {
  try {
    user.password = await passwordHash(user.password);
    user.userId = uuid();

    console.log(user);
    return user
  } catch (err) {
    return err;
  }
};
