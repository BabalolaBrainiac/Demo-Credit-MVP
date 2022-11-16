import knex from 'knex';
import config from '../db/knexfile';

const configuration = config['development']
const db = knex(configuration);

export default db;