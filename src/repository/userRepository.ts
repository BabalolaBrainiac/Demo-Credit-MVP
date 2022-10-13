import db from '../db/dbQueryRunner'
import {CrudRepository} from "./CrudRepository";



export class UserRepository implements CrudRepository{
    deleteItem(id: any): Promise<any> {
        return Promise.resolve(undefined);
    }

    getAllItem(): Promise<any> {
        return Promise.resolve(undefined);
    }

    getSingleItem(id: string): any {
    }

    updateItem(id: string, data: any): Promise<any> {
        return Promise.resolve(undefined);
    }


}
