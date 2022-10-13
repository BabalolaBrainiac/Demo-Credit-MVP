import app from './app'

const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
        pool: {min: 0, max: 7}
    },
});
const port = process.env.PORT;

knex.raw("Select Version()").then(() => {
    const server = app.listen(port, () => {
        console.log('DB Connection established')
        return console.log(`Express is listening at http://localhost:${port}`);
    });
})

module.exports = knex;

