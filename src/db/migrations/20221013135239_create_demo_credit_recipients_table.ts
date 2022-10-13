import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('demo_recipients', (table: Knex.TableBuilder) => {
            table.uuid('recipientId').primary().notNullable().unique();
            table.uuid('bankId').nullable();
            table.string('firstName').nullable();
            table.string('lastName').nullable();
            table.string('bankname').nullable();
            table.string('accountName').nullable();
            table.boolean('isUser').notNullable();
            table.uuid('walletId').nullable();
            table.integer('accountNumber').nullable();
            table.timestamps(true, true);
        });
}


export async function down(knex: Knex): Promise<void> {
}

