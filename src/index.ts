import app from './app'
import knex from "./db/knex/knex"
const port = process.env.PORT;

knex.raw("Select Version()").then(() => {
    const server = app.listen(port, () => {
        console.log('DB Connection established')
        return console.log(`Express is listening at http://localhost:${port}`);
    });
})

module.exports = knex;

