import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('demo_users', (table: Knex.TableBuilder) => {
            table.uuid('userId').primary().notNullable().unique();
            table.string('userName').nullable();
            table.string('lastName').nullable();
            table.string('firstName').nullable();
            table.string('phoneNumber').nullable();
            table.string('dob').nullable();
            table.uuid('walletId');
            table.string('email').nullable();
            table.boolean('isVerified').nullable();
            table.integer('bonusPoints').nullable();
            table.timestamps(true, true);
        });
}


export async function down(knex: Knex): Promise<void> {
}

