export interface CrudRepository {

    getSingleItemById(id: string): any;

    getAllItems(): Promise<any>;

    updateItem(id: string, data: any): Promise<any>;

    deleteItem(id: any): Promise<any>;

    createNewItem(item: any): Promise<any>;

}
