import {IWalletTDto} from "./IWallet";

export class IUserDto {
    userId!: string;
    userName!: string;
    firstName!: string;
    lastName!: string;
    walletId: string;
    email!: string;
    phoneNumber!: string;
    demo_users_pass!: string;
    isVerified!: boolean;
    dob!: string;
    bonusPoints!: number;
}
