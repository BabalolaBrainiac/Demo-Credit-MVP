import {Knex} from "knex";
import { table } from 'node:console';


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('recipients', (table: Knex.TableBuilder) => {
            table.increments().unique();
            table.uuid('bankId').nullable();
            table.string('firstName').nullable();
            table.string('lastName').nullable();
            table.string('bankname').nullable();
            table.string('accountName').nullable();
            table.boolean('isUser');
            table.uuid('walletId').references('walletId')
                .inTable('wallets')
                .nullable();
            table.integer('accountNumber').nullable();
            table.timestamps(true, true);
        });
}

export async function down(knex: Knex): Promise<void> {}

