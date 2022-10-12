import {Knex} from "knex";
import { table } from 'node:console';


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('users', (table: Knex.TableBuilder) => {
            table.increments();
        table.string('userName').nullable();
        table.string('lastName').nullable();
        table.string('firstName').nullable();
        table.string('email').unique();
        table.string('phoneNumber').nullable();
        table.string('dob').nullable();
        table.uuid('walletId').references('walletId').inTable('wallets');
        table.string('email').nullable();
        table.boolean('isVerified').nullable();
        table.integer('bonusPoints').nullable();
        table.timestamps(true, true);
    });



}

export async function down(knex: Knex): Promise<void> {}
