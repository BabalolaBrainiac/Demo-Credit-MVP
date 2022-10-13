import knex, {Knex} from 'knex';
import config from './knexfile';


const configuration = config['development'];
const db = knex(config);

export default db;
