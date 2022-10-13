import knex from 'knex';
import config from './knexfile';


const configuration = config['development']
const db = knex(configuration);

export default db;
