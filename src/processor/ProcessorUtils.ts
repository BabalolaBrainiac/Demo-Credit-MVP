import axios from "axios";
import { Logger } from "../../src/utils/Logger/Logger";

export const KudaHelper = {
  async getAuthToken(email: any, apiKey: any): Promise<any> {
    let authUrl = process.env.KUDA_AUTH_URL_STAGING as string;
    try {
      const response = await axios.post(authUrl, {
        email,
        apiKey,
      });
      console.log(response)
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
