import Axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {GipperAuthenticator} from "./helpers/Authenticator";

/**
 * Implemented with axios
 */
export const Request = {
    ...Axios,

    prepareOptions(axiosOpts: AxiosRequestConfig, authToken: string): { options: Object; data: any } {
        /* eslint-disable-next-line */
        const {url, method, headers, data, ...requestOptions} = axiosOpts;

        let options = {
            ...requestOptions,
            headers: {
                ...headers,
                'x-auth-token': authToken,
            },
        };

        return {options, data};
    },
    /**
     * Makes a post request to a service with Gipper Service token
     *
     * @param endpoint
     * @param options
     */
    async postRequestWithGipperServiceToken(endpoint: string, options: AxiosRequestConfig): Promise<AxiosResponse> {
        const response: any = await GipperAuthenticator.getServiceTokenFromAuthService();

        const {authToken} = response.data.data.token;

        const opts = this.prepareOptions(options, authToken);

        return Axios.post(endpoint, opts.data, opts.options);
    },
    /**
     * Makes a get request to a service with Gipper service token
     *
     * @param endpoint
     * @param options
     */
    async getRequestWithGipperServiceToken(endpoint: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        const response: any = await GipperAuthenticator.validateServiceToken();

        const {authToken} = response.data.data.token;

        const opts = this.prepareOptions(options, authToken);

        return Axios.get(endpoint, opts.options);
    },

    //User Requests
    /**
     * Makes a post request to a service with Gipper Service token
     *
     * @param endpoint
     * @param options
     */
    async postWithUserToken(endpoint: string, options: AxiosRequestConfig): Promise<AxiosResponse> {
        const authToken: string = await GipperAuthenticator.getUserTokenFromAuthService(options.data);

        const opts = this.prepareOptions(options, authToken);

        return Axios.post(endpoint, opts.data, opts.options);
    },
    /**
     * Makes a get request to a service with Gipper service token
     *
     * @param endpoint
     * @param options
     */
    async getWithUserToken(endpoint: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        const authToken: string = await GipperAuthenticator.getUserTokenFromAuthService();

        const opts = this.prepareOptions(options, authToken);

        return Axios.get(endpoint, opts.options);
    },
};
