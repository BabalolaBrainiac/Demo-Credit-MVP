import {IBeneficiary} from "../interfaces/IBeneficiary";


export const BeneficiaryService = {

    async createNewBeneficiary(beneficiary: IBeneficiary): Promise<any> {

        try {
            return await BeneficiaryService.createNewBeneficiary(beneficiary);
        } catch(err) {
            return err
        }
    },


}
