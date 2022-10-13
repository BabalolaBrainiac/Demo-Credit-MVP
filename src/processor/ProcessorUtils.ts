// import { Request } from '../utils/Request';
// import { Logger } from '../../src/utils/Logger/Logger';
//
// export const KudaHelper = {
//   async getAuthToken(email: any, apiKey: any): Promise<any> {
//
//     try {
//       const authUrl = 'https://kuda-openapi-uat.kudabank.com/v2/Account/GetToken';
//
//       const response = await Request.postWithServiceToken(authUrl, {
//         email, apiKey,
//       });
//       return response.data;
//
//     } catch (err) {
//       Logger.Error(err.data, err.stack);
//     }
//   },
// };
//
// export enum KudaServiceType {
//   BANK_LIST = 'BANK_LIST',
//   NAME_ENQUIRY = 'NAME_ENQUIRY',
//   SINGLE_FUND_TRANSFER = 'SINGLE_FUND_TRANSFER',
//   TRANSACTION_STATUS_QUERY = 'TRANSACTION_STATUS_QUERY',
//   RETRIEVE_VIRTUAL_ACCOUNT_BALANCE = 'RETRIEVE_VIRTUAL_ACCOUNT_BALANCE',
//   ADMIN_MAIN_ACCOUNT_TRANSACTIONS = 'ADMIN_MAIN_ACCOUNT_TRANSACTIONS',
//   FUND_VIRTUAL_ACCOUNT = 'FUND_VIRTUAL_ACCOUNT'
//
// }
//
// export class KudaAccountVerificationParams {
//   beneficiaryAccountNumber!: string;
//   beneficiaryBankCode!: string;
//   SenderTrackingReference?: string;
//   isRequestFromVirtualAccount!: boolean;
//   BeneficiaryName!: string;
//   SenderAccountNumber?: string;
//   SenderName?: string;
//   BeneficiaryCustomerID?: any;
//   BeneficiaryBankCode!: string;
//   NameEnquiryID?: string;
//   ResponseCode?: string;
//   TransferCharge?: number;
//   SessionID?: string;
// }
//
// export class KudaAccountEnquiryResponse {
//   BeneficiaryAccountNumber!: string;
//   data!: KudaAccountVerificationParams
// }
//
// export class Bank {
//   name!: string;
//   code!: string;
// }
//
// export class KudaBankListResponse {
//   status?: string;
//   message?: string;
//   data!: Bank[];
// }
