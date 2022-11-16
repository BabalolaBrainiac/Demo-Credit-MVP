import type { Knex } from "knex";
require('dotenv').config();
import {connectionOpts} from "./src/config/config";
import dotenv from 'dotenv'

dotenv.config()

interface IKnexConfig {
  [key:string]: Knex.Config;
}

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: connectionOpts.host,
      port: connectionOpts.port,
      user: connectionOpts.username,
      password: connectionOpts.password,
      database: connectionOpts.database,
      pool: {min: 0, max: 7}
    },
    debug: true,
    useNullAsDefault: true,
    migrations: {
      directory: 'src/db/migrations'
    },
    seeds: {
      directory: 'src/db/seeds'
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

export default config;
