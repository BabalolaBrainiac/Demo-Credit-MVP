import { authenticateLogin } from "../authentication/jwt";
export const Authentication = {
  login: (user: any) => {
    return authenticateLogin(user);
  },
};
