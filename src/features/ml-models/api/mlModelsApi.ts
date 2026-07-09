import api from "../../../services/api";

import type {
    MLModel,
    CreateMLModelRequest,
    UpdateMLModelRequest,
} from "../types/mlModel";

import type {
    ApiResponse,
} from "../../lookups/types/lookup";

const BASE = "/ml-models";

export const mlModelsApi = {

    list: async (): Promise<MLModel[]> => {

        const { data } =
            await api.get<ApiResponse<MLModel[]>>(BASE);

        return data.data;

    },

    get: async (
        id: number
    ): Promise<MLModel> => {

        const { data } =
            await api.get<ApiResponse<MLModel>>(
                `${BASE}/${id}`
            );

        return data.data;

    },

    create: async (
        payload: CreateMLModelRequest
    ): Promise<ApiResponse<MLModel>> => {

        const { data } =
            await api.post<ApiResponse<MLModel>>(
                BASE,
                payload
            );

        return data;

    },

    update: async (
        id: number,
        payload: UpdateMLModelRequest
    ): Promise<ApiResponse<MLModel>> => {

        const { data } =
            await api.put<ApiResponse<MLModel>>(
                `${BASE}/${id}`,
                payload
            );

        return data;

    },

    delete: async (
        id: number
    ): Promise<ApiResponse<null>> => {

        const { data } =
            await api.delete<ApiResponse<null>>(
                `${BASE}/${id}`
            );

        return data;

    },

};

export default mlModelsApi;