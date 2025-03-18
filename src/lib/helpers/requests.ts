import type { ResponseType } from "axios";
import { api } from "../utils/axios";

export const getData = async ({
    endpoint,
    token,
    params,
    responseType,
}: {
    endpoint: string;
    token?: string;
    params?: object;
    responseType?: ResponseType;
}) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    return api
        .get(endpoint, { headers, params, responseType })
        .then((res) => res.data)
        .catch((err) => {
            console.error(err);
            throw err;
        });
};

export const postData = async ({
    endpoint,
    data,
    token,
    responseType,
}: {
    endpoint: string;
    data: object;
    token?: string;
    responseType?: ResponseType;
}) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    return api
        .post(endpoint, data, { headers, responseType })
        .then((res) => res.data)
        .catch((err) => {
            console.error(err);
            throw err;
        });
};

export const deleteData = async ({
    endpoint,
    token,
}: {
    endpoint: string;
    token?: string;
}) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    return api
        .delete(endpoint, { headers })
        .then((res) => res.data)
        .catch((err) => {
            console.error(err);
            throw err;
        });
};
