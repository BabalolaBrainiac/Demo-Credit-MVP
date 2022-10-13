import {CrudRepository} from "./CrudRepository";

export class WalletRepository implements CrudRepository{
    getSingleItem?(id: string) {
        throw new Error('Method not implemented.');
    }
    getAllItem?(): Promise<any> {
        throw new Error('Method not implemented.');
    }
    updateItem(id: string, data: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    deleteItem(id: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
