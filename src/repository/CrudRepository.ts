export interface CrudRepository {

    deleteItemById(id: any, item: any, table: any ): Promise<any>;

    getAllItems(item: any, table: any): Promise<any>;

    getSingleItemById(id: string, item: any,  tableName: string ): Promise<any>;

    updateItemById(id: string, data: any, item: any): Promise<any>


}
