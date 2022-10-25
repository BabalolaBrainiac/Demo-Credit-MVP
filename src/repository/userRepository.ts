import db from "../db/dbQueryRunner";
import { uuid } from "uuidv4";
import { assignToken } from "../authentication/jwt";
import { passwordHash } from "../helpers/PasswordHash";
import { PrepareUser } from "../helpers/prepareUser";

export const UserRepository = {
  async deleteItem(id: any): Promise<any> {
    db("demo_users").where("userId", id).del();
  },

  updateItem(id: string, param: any, value: any): Promise<any> {
    return db("demo_users").where("userId", id).update(param, value);
  },

  getAllItems() {
    return db("demo_users").from("demo_users").select("*");
  },

  getSingleItemById(id: string) {
    return db("demo_users")
      .select("*")
      .from("demo_users")
      .where("userId", id)
      .first();
  },
  getSingleItemByEmail(email: string) {
    return db("demo_users")
      .select("*")
      .from("demo_users")
      .where("email", email)
      .first();
  },

  async createNewItem(item: any) {
    let user = await PrepareUser(item);

    return db("demo_users").insert({
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      demo_users_pass: user.password,
      dob: user.dob,
      walletId: uuid(),
        created_at: new Date(),
        updated_at: new Date(),
      bonusPoints: user.bonusPoints,
    });
  },
};
