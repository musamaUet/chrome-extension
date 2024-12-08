import { AxiosResponse } from "axios";
import { useMutation } from "@tanstack/react-query";
import { networkRequest, NetworkRequestParams } from "./api";

const handleError = (error: any) => {
    console.error(error?.response?.data?.message);

    return false;
};

export const useLoginService = () => {
    const handleSuccess = ({ data }: AxiosResponse<any, any>) => {
        console.log(data)
        localStorage.setItem("token", JSON.stringify(data?.data?.token));
    };

    const { mutate: login } = useMutation({
        mutationFn: async (params: NetworkRequestParams) => networkRequest(params),
        onSuccess: handleSuccess,
        onError: handleError,
        retry: false,
    });

    return { login };
};

export const useSignupService = () => {
    const handleSuccess = ({ data }: AxiosResponse<any, any>) => {
        console.log(data)
    };

    const { mutate: signup } = useMutation({
        mutationFn: async (params: NetworkRequestParams) => networkRequest(params),
        onSuccess: handleSuccess,
        onError: handleError,
        retry: false,
    });

    return { signup };
};

