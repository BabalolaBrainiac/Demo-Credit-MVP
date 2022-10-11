import app from './app'
import {createConnection} from "typeorm";
import dbConnectionOptions from "./config/typeorm";

const port = process.env.PORT;


(async () => await createConnection(dbConnectionOptions).then(() => {
    const server = app.listen(port, () => {
        console.log('DB Connection established')
        return console.log(`Express is listening at http://localhost:${port}`);
    });
        process.once('SIGUSR2', function() {
            server.close(function() {
                process.kill(process.pid, 'SIGUSR2');
            });
        });
})
        .catch((error) => {
            console.log('TypeOrm Connection Not Established')
        })
)();
