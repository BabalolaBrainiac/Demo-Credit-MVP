// import { Knex } from 'knex';
// import {CrudRepository} from "./CrudRepository";
// import {typeHelper} from "../utils/typeHelper";
// import db from "../db/dbQueryRunner";
//
// export class CrudQuery implements CrudRepository {
//
//     deleteItemById(id: any, item: any, table: any): Promise<any> {
//         return Promise.resolve(undefined);
//     }
//
//     getAllItems(item: any, table: any): Promise<any> {
//         return Promise.resolve(undefined);
//     };
//
//     async getSingleItemById(id: any, type: any): Promise<any> {
//             const {item, tableName} = await typeHelper(type)
//         console.log(item, tableName)
//
//              return new Promise((resolve, reject) => {
//                  let user = db()
//                      .select
//                      ('*')
//                      .from(tableName)
//                      .where(item, id).first();
//
//                  return resolve(user);
//              })
//         };
//
//
//     updateItemById(id: string, data: any, item: any): Promise<any> {
//         return Promise.resolve(undefined);
//     }
// }
