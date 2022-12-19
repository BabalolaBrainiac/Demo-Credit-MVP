import db from "../db/dbQueryRunner";
import { uuid } from "uuidv4";
import {isBoolean} from "util";

export const BeneficiaryRepository = {
    async deleteBeneficiary(id: any): Promise<any> {
        db("demo_beneficiary").where("beneficiaryId", id).del();
    },

    updateBeneficiary(id: string, param: any, value: any): Promise<any> {
        return db("demo_beneficiary").where("beneficiaryId", id).update(param, value);
    },

    getAllBeneficiaries() {
        return db("demo_beneficiary").from("demo_beneficiary").select("*");
    },

    getBeneficiary(id: string) {
        return db("demo_beneficiary")
            .select("*")
            .from("demo_beneficiary")
            .where("beneficiaryId", id)
            .first();
    },

    getBeneficiaryByAccountNumberOrWalletId(identifier: any) {
        let param;
        if (identifier.walletId) {
            param = identifier.walletId
        }
        param = identifier.accountNumber

        return db("demo_beneficiary")
            .select("*")
            .from("demo_beneficiary")
            .where("accountNumber", param)
            .first();
    },

    createNewBeneficiary(item: any) {
        return db("demo_beneficiary").insert({
            beneficiaryId: uuid(),
            firstName: item.firstName,
            lastName: item.lastName,
            bankId: item.bankId,
            bankName: item.bankName,
            accountName: item.accountName,
            accountNumber: item.accountNumber,
            isUser: item.isUser,
           isActive: item.isActive,
            dateAdded: item.dateAdded,
            lastUpdated: item.lastUpdated,

        });
    },

    createNewBeneficiaryWithParams(
        beneficiaryId: string,
        firstName: string,
        lastName: string,
        isUser: boolean,
        isActive?: boolean,
        bankId?: string,
        bankName?: string,
        accountName?: string,
        accountNumber?: number,
        dateAdded?: string,
        lastUpdated?: string
    ) {
        return db("demo_beneficiary").insert({
            recipientId: beneficiaryId,
            firstName: firstName,
            lastName: lastName,
            isUser: isUser,
            bankId: bankId,
            bankName: bankName,
            accountName: accountName,
            accountNumber: accountNumber,
            isActive: isActive,
            dateAdded: dateAdded,
            lastUpdated: lastUpdated
        });
    },
};
