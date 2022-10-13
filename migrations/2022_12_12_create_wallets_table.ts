import {Knex} from "knex";
import { table } from 'node:console';
import knex from "../knex/knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('wallets', (table: Knex.TableBuilder) => {
            table.increments();
            table.uuid('walletId').unique();
            table.uuid('userId').references('id').inTable('users');
            table.integer('balance');
            table.enum('type', ['USER', 'BUSINESS']);
            table.datetime('created');
            table.timestamps(true, true);
        });
};

export async function down(knex: Knex): Promise<void> {}

