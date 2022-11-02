import axios from "axios";
import { Logger } from "../../src/utils/Logger/Logger";

export const KudaHelper = {
  async getAuthToken(email: any, apiKey: any): Promise<any> {
    try {
      const authUrl =
        "https://kuda-openapi-uat.kudabank.com/v2/Account/GetToken";

      const response = await axios.post(authUrl, {
        email,
        apiKey,
      });
      return response.data;
    } catch (err: any) {
      Logger.Error(err.data, err.stack);
    }
  },
};
export class KudaAccountVerificationParams {
  beneficiaryAccountNumber!: string;
  beneficiaryBankCode!: string;
  SenderTrackingReference?: string;
  isRequestFromVirtualAccount!: boolean;
  BeneficiaryName!: string;
  SenderAccountNumber?: string;
  SenderName?: string;
  BeneficiaryCustomerID?: any;
  BeneficiaryBankCode!: string;
  NameEnquiryID?: string;
  ResponseCode?: string;
  TransferCharge?: number;
  SessionID?: string;
}

export class KudaAccountEnquiryResponse {
  BeneficiaryAccountNumber!: string;
  data!: KudaAccountVerificationParams;
}

export class Bank {
  name!: string;
  code!: string;
}

export class KudaBankListResponse {
  status?: string;
  message?: string;
  data!: Bank[];
}
