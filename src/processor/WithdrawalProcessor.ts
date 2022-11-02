import axios from "axios";
import { KudaHelper } from "./ProcessorUtils";
import { Logger } from "../utils/Logger/Logger";
import { ErrorCode } from "../helpers/ErrorCodes";
import { Errors } from "../helpers/Errors";

const kudaBaseUrl = "https://kuda-openapi-uat.kudabank.com/v2";

export class KudaProcessor {
  async getBankList() {
    let res: any;
    try {
      res = await axios.post(
        kudaBaseUrl,
        {
          data: '{"serviceType":"BANK_LIST", "requestRef":"testReference"}',
        },
        {
          headers: {
            Authorization: `Bearer ${await KudaHelper.getAuthToken(
              process.env.KUDA_EMAIL,
              process.env.KUDA_API_KEY
            )}`,
          },
        }
      );
    } catch (e) {
      console.log(e);
      Logger.Error(ErrorCode.REQUEST_FAILED);
    }

    const banks = res as [];

    return banks.map(({ bankId, bankName }) => {
      return {
        bankId: bankId,
        bankName: bankName,
      };
    });
  }

  async lookupAccount(bankId: string, accountNumber: string) {
    let accountRequestInfo = {
      beneficiaryAccountNumber: accountNumber,
      beneficiaryBankCode: bankId,
      SenderTrackingReference: "",
      isRequestFromVirtualAccount: false,
    };

    try {
      let response: any = await axios.post(
        kudaBaseUrl,
        {
          data: `{"serviceType":"NAME_ENQUIRY", "requestRef":"testReference",
                  "data": { 'beneficiaryAccountNumber': ${accountRequestInfo.beneficiaryAccountNumber},
                             'beneficiaryBankCode': ${accountRequestInfo.beneficiaryBankCode},
                             'isRequestFromVirtualAccount': ${accountRequestInfo.isRequestFromVirtualAccount}}}`,
        },
        {
          headers: {
            Authorization: `Bearer ${await KudaHelper.getAuthToken(
              process.env.KUDA_EMAIL,
              process.env.KUDA_API_KEY
            )}`,
          },
        }
      );

      return {
        accountName: response.data,
        accountNumber: response.BeneficiaryAccountNumber,
        bankId,
      };
    } catch (err) {
      throw new Errors(ErrorCode.REQUEST_FAILED, "Could not lookup account");
    }
  }

  async withdrawToExternal() {
    //To Be Implemented
  }

  async verifyTransactionStatus() {
    //To Be implemented
  }

  async creditUserAccount() {
    //To Be Implemented
  }
}
