import Axios, {AxiosRequestConfig} from 'axios';
import {plainToClass} from 'class-transformer';
import {Authenticator} from "./helpers/Authenticator";

declare type ClassType<T> = {
    new(...args: any[]): T;
    [x: string]: any;
};

type TransformClassType<T> = T & {
    [x: string]: any;
};

const IfTransformFromClass = <T extends any>(data: any, transformFromClass?: ClassType<T>): TransformClassType<T> => {
    // @ts-ignore
    return plainToClass(transformFromClass!, data);
};

export const Request = {
    /**
     * Prepares request options
     *
     * @param axiosOpts
     * @param authToken
     */
    prepareOptions(axiosOpts: AxiosRequestConfig, authToken: string): Object {
        /* eslint-disable-next-line */
        const {url, method, headers, data, ...requestOptions} = axiosOpts || {};

        let options = {
            ...requestOptions,
            headers: {
                ...(headers || {}),
                'x-auth-token': authToken,
                'x-app-version-code': '999',
            },
        };

        return {data, ...options};
    },
    /**
     * Makes a GET request
     *
     * @param endpoint
     * @param options
     * @param transformFromClass
     */
    async get<T>(
        endpoint: string,
        options?: AxiosRequestConfig | null,
        transformFromClass?: ClassType<T>,
    ): Promise<TransformClassType<T> | void> {
        const responseData = (await Axios.get(endpoint, options || {})).data;

        return IfTransformFromClass(responseData, transformFromClass);
    },
    /**
     * Makes a POST request
     *
     * @param endpoint
     * @param options
     * @param transformFromClass
     */
    async post<T>(
        endpoint: string,
        options?: AxiosRequestConfig | null,
        transformFromClass?: ClassType<T>,
    ): Promise<TransformClassType<T> | void> {
        const {data, ...requestOptions} = options!;

        const responseData = (await Axios.post(endpoint, data, requestOptions)).data;

        return IfTransformFromClass(responseData, transformFromClass!);
    },
    /**
     * Makes a Delete request
     *
     * @param endpoint
     * @param options
     * @param transformFromClass
     */
    async delete<T>(
        endpoint: string,
        options?: AxiosRequestConfig | null,
        transformFromClass?: ClassType<T>,
    ): Promise<TransformClassType<T> | void> {
        const {...requestOptions} = options!;

        const responseData = (await Axios.delete(endpoint, requestOptions)).data;

        return IfTransformFromClass(responseData, transformFromClass!);
    },
    /**
     * Makes a Delete request
     *
     * @param endpoint
     * @param options
     * @param transformFromClass
     */
    async put<T>(
        endpoint: string,
        options?: AxiosRequestConfig | null,
        transformFromClass?: ClassType<T>,
    ): Promise<TransformClassType<T> | void> {
        const {data, ...requestOptions} = options!;
        const responseData = (await Axios.put(endpoint, data, requestOptions)).data;

        return IfTransformFromClass(responseData, transformFromClass!);
    },
    /**
     * Makes a POST request to a service with service token
     *
     * @param endpoint
     * @param options
     * @param transformFromClass
     */
    async postWithServiceToken<T>(
        endpoint: string,
        options?: AxiosRequestConfig,
        transformFromClass?: ClassType<T>,
    ): Promise<TransformClassType<T> | void> {
        const authToken: any = await Authenticator.getServiceTokenFromAuthService(); // Get service token from authenticator

        const opts = this.prepareOptions(options!, authToken);

        return await this.post(endpoint, opts, transformFromClass);
    },
    /**
     * Makes a GET request to a service with service token
     *
     * @param endpoint
     * @param options
     * @param transformFromClass
     */
    async getWithServiceToken<T>(
        endpoint: string,
        options?: AxiosRequestConfig,
        transformFromClass?: ClassType<T>,
    ): Promise<TransformClassType<T> | void> {
        const authToken: any = await Authenticator.getServiceTokenFromAuthService(); // Get service token from authenticator

        const opts = this.prepareOptions(options!, authToken);

        return await this.get(endpoint, opts, transformFromClass);
    },
    /**
     * Makes a DELETE request to a service with service token
     *
     * @param endpoint
     * @param options
     * @param transformFromClass
     */
    async deleteWithServiceToken<T>(
        endpoint: string,
        options?: AxiosRequestConfig,
        transformFromClass?: ClassType<T>,
    ): Promise<TransformClassType<T> | void> {
        const authToken: any = await Authenticator.getServiceTokenFromAuthService();
        const opts = this.prepareOptions(options!, authToken);
        return await this.delete(endpoint, opts, transformFromClass);
    },
    /**
     * Makes a PUT request to a service with service token
     *
     * @param endpoint
     * @param options
     * @param transformFromClass
     */
    async putWithServiceToken<T>(
        endpoint: string,
        options?: AxiosRequestConfig,
        transformFromClass?: ClassType<T>,
    ): Promise<TransformClassType<T> | void> {
        const authToken: any = await Authenticator.getServiceTokenFromAuthService();
        const opts = this.prepareOptions(options!, authToken);
        return await this.put(endpoint, opts, transformFromClass);
    },

    // /**
    //  * Makes a GET request to a service with user token
    //  *
    //  * @param endpoint
    //  * @param options
    //  */
    // async getWithUserToken<T>(
    //     endpoint: string,
    //     options?: AxiosRequestConfig,
    //     transformFromClass?: ClassType<T>,
    // ): Promise<TransformClassType<T> | void> {
    //     const authToken: string = Authenticator.getUserToken();
    //
    //     const opts = this.prepareOptions(options!, authToken);
    //
    //     return await this.get(endpoint, opts, transformFromClass);
    // },
    //
    // /**
    //  * Makes a POST request to a service with user token
    //  *
    //  * @param endpoint
    //  * @param options
    //  */
    // async postWithUserToken<T>(
    //     endpoint: string,
    //     options?: AxiosRequestConfig,
    //     transformFromClass?: ClassType<T>,
    // ): Promise<TransformClassType<T> | void> {
    //     const authToken: string = Authenticator.getUserToken();
    //
    //     const opts = this.prepareOptions(options!, authToken);
    //     return await this.post(endpoint, opts, transformFromClass);
    // },
    //
    // async sendMessageToSlack(template: string, channelID: any) {
    //     return await this.post<any>('https://slack.com/api/chat.postMessage', {
    //         data: {
    //             channel: channelID,
    //             text: template,
    //         },
    //         headers: {
    //             Authorization: `Bearer ${config.slack.messagingToken}`,
    //         },
    //     });
    // },
};
