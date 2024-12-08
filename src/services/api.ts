import client from "@/config/axios";
import { Methods, } from "@/constants/enum";
import { AxiosRequestConfig, AxiosResponse } from "axios";

type NetworkRequestOptions<TRequest = any> = AxiosRequestConfig & {
    data?: TRequest /* POST, PUT requests */;
};

export type NetworkRequestParams<TRequest = any> = {
    url: string;
    method: Methods;
    options?: NetworkRequestOptions<TRequest>;
};

export const networkRequest = async <TResponse = any, TRequest = any>(
    params: NetworkRequestParams<TRequest>,
): Promise<AxiosResponse<TResponse>> => {
    const { method, url, options = {} } = params || {};

    try {
        const response = await client.request<TResponse>({
            method,
            url,
            ...options,
        });

        return response;
    } catch (error: any) {
        console.error(`Network request failed: ${method} ${url}`, error);
        throw error;
    }
};
