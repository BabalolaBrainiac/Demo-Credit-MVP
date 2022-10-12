// import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// import {KudaHelper} from "../processor/kudaHelper";
//
// /**
//  * Implemented with axios
//  */
// export const Request = {
//     ...Axios,
//
//     prepareOptions(axiosOpts: AxiosRequestConfig, authToken: string): { options: Object; data: any } {
//         /* eslint-disable-next-line */
//         const { url, method, headers, data, ...requestOptions } = axiosOpts;
//
//         let options = {
//             ...requestOptions,
//             headers: {
//                 ...headers,
//                 'x-auth-token': authToken,
//             },
//         };
//
//         return { options, data };
//     },
//     /**
//      * Makes a post request to a service with service token
//      *
//      * @param endpoint
//      * @param options
//      */
//     async postWithServiceToken(endpoint: string, options: AxiosRequestConfig): Promise<AxiosResponse> {
//         const authToken: string = await KudaHelper.getAuthToken('email', 'id');
//
//         const opts = this.prepareOptions(options, authToken);
//
//         return Axios.post(endpoint, opts.data, opts.options);
//     },
//     /**
//      * Makes a get request to a service with service token
//      *
//      * @param endpoint
//      * @param options
//      */
//     async getWithServiceToken(endpoint: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse> {
//         const authToken: string = await KudaHelper.getAuthToken('email', 'id');
//
//         const opts = this.prepareOptions(options, authToken);
//
//         return Axios.get(endpoint, opts.options);
//     },
// };
