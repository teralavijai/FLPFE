import api from "../../../services/api";

import type {
    ApiResponse,
    LookupsResponse,
    ModelLookup,
} from "../types/lookup";

const lookupApi = {

    async listModels(): Promise<ModelLookup[]> {

        const { data } =
            await api.get<ApiResponse<ModelLookup[]>>(
                "/ml-models"
            );

        return data.data;

    },

    async getLookups(): Promise<LookupsResponse> {

        const { data } =
            await api.get<ApiResponse<LookupsResponse>>(
                "/lookups"
            );

        return data.data;

    },

};

export default lookupApi;