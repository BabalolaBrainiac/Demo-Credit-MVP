import db from '../db/dbQueryRunner'
import {CrudRepository} from "./CrudRepository";
import {uuid} from "uuidv4";



export const UserRepository = {

    async deleteItem(id: any): Promise<any> {
        db('demo_users')
            .where('userId', id)
            .del()
    },

    updateItem(id: string, param: any, value: any): Promise<any> {
        return db('demo_users')
            .where('userId', id)
            .update(param, value)
    },


      getAllItems() {
        return db('demo_users')
                    .from('demo_users')
                    .select('*');

    },

      getSingleItemById(id: string) {

        return db('demo_users').select('*')
            .from('demo_users')
            .where('userId', id)
            .first();
    },
    getSingleItemByEmail(email: string) {

        return db('demo_users').select('*')
            .from('demo_users')
            .where('email', email)
            .first();
    },

     createNewItem(item: any) {
        return db('demo_users').insert({
            userId: uuid(),
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            userName: item.userName,
            phoneNumber: item.phoneNumber,
            dob: item.dob,
            walletId: uuid(),
            bonusPoints: item.bonusPoints
        })
    }


}
