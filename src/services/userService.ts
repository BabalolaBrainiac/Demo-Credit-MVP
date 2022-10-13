import {CrudQuery} from "../repository/CrudQuery";

let crudQuery: CrudQuery;
export const UserService = {
    crudQuery: new CrudQuery(),

    async getAllUsers() {

        try {
            console.log('working');
            return {
                data: 'Opelope anointing',
                status: 200
            };

        } catch (err) {
            throw err
        }

    },

    async getUserById(userId: any ) {
        try {
            return await crudQuery.getSingleItemById(userId, 'user')
            }
        catch (e) {
            throw e
        }
    },
}
