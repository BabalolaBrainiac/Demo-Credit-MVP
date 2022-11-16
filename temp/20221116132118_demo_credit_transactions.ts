import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
        return knex.schema
            .createTable('demo_transactions', (table: Knex.TableBuilder) => {
                    table.uuid('transactionId').primary().notNullable().unique();
                    table.enum('status', ['PENDING', 'IN_PROGRESS', 'COMPLETE']);
                    table.enum('type', ['WITHDRAW', 'SAVE']);
                    table.uuid('userId');
                    table.uuid('walletId');
                    table.integer('value');
                    table.string('denomination');
                    table.integer('fees').nullable();
                    table.integer('bankId').nullable();
                    table.boolean('isInternal').nullable();
                    table.integer('accountNumber').nullable();
                    table.uuid('recipientId').nullable();
                    table.timestamps(true, true);
            });
}


export async function down(knex: Knex): Promise<void> {
}

