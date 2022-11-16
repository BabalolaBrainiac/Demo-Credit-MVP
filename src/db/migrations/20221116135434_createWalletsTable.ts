import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('demo_wallets', (table: Knex.TableBuilder) => {
            table.uuid('walletId').primary().notNullable().unique();
            table.uuid('userId');
            table.integer('balance');
            table.enum('type', ['USER', 'BUSINESS']);
            table.datetime('created');
            table.timestamps(true, true);
        });
}


export async function down(knex: Knex): Promise<void> {
}

