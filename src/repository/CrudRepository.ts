export interface CrudRepository {

    getSingleItem?(id: string): any;

    getAllItem?(): Promise<any>;

    updateItem(id: string, data: any): Promise<any>;

    deleteItem(id: any): Promise<any>;

}
