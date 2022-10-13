import { Knex} from "knex";
import { table } from 'node:console';


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('transactions', (table: Knex.TableBuilder) => {
                table.increments();
            table.enum('status', ['PENDING', 'IN_PROGRESS', 'COMPLETE']);
            table.enum('type', ['WITHDRAW', 'SAVE']);
            table.uuid('userId').references('id').inTable('users');
            table.uuid('walletId').references('walletId').inTable('wallets');
            table.integer('value');
            table.string('denomination');
            table.integer('fees').nullable();
            table.integer('bankId').nullable();
            table.boolean('isInternal').nullable();
            table.integer('accountNumber').nullable();
            table.uuid('recipientId').nullable()
                .references('id').inTable('recipients');
            table.timestamps(true, true);
        });
}

export async function down(knex: Knex): Promise<void> {}
