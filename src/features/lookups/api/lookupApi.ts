import api from "../../../services/api";

import type {
    ApiResponse,
    ModelLookup,
} from "../types/lookup";

const lookupApi = {
    async listModels(): Promise<ModelLookup[]> {

        const { data } =
            await api.get<ApiResponse<any[]>>(
                "/ml-models"
            );

        return data.data.map((model) => ({
            id: model.id,
            name: model.name,
        }));
    },
};

export default lookupApi;
