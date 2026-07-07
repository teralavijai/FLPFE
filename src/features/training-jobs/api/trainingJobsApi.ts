import api from "../../../services/api";

import type {
    CreateTrainingJobRequest,
    StartTrainingJobResponse,
    StopTrainingJobResponse,
    TrainingJob,
    TrainingJobStatusResponse,
    UpdateTrainingJobRequest,
    ApiDeleteResponse,
} from "../types/trainingJob";

const BASE = "/training-jobs";

export const trainingJobsApi = {
    list: async (): Promise<TrainingJob[]> => {
        const { data } = await api.get<TrainingJob[]>(BASE);
        return data;
    },

    get: async (id: number): Promise<TrainingJob> => {
        const { data } = await api.get<TrainingJob>(
            `${BASE}/${id}`
        );

        return data;
    },

    create: async (
        payload: CreateTrainingJobRequest
    ): Promise<TrainingJob> => {
        const { data } = await api.post<TrainingJob>(
            BASE,
            payload
        );

        return data;
    },

    update: async (
        id: number,
        payload: UpdateTrainingJobRequest
    ): Promise<TrainingJob> => {
        const { data } = await api.put<TrainingJob>(
            `${BASE}/${id}/update`,
            payload
        );

        return data;
    },

    delete: async (id: number): Promise<ApiDeleteResponse> => {
        const { data } = await api.delete<ApiDeleteResponse>(
            `${BASE}/${id}`
        );

        return data;
    },

//    delete: async (id: number): Promise<void> => {
//        await api.delete(`${BASE}/${id}`);
//    },

    start: async (
        id: number
    ): Promise<StartTrainingJobResponse> => {
        const { data } =
            await api.post<StartTrainingJobResponse>(
                `${BASE}/${id}/start`
            );

        return data;
    },

    stop: async (
        id: number
    ): Promise<StopTrainingJobResponse> => {
        const { data } =
            await api.post<StopTrainingJobResponse>(
                `${BASE}/${id}/stop`
            );

        return data;
    },

    status: async (
        id: number
    ): Promise<TrainingJobStatusResponse> => {
        const { data } =
            await api.get<TrainingJobStatusResponse>(
                `${BASE}/${id}/status`
            );

        return data;
    },

    running: async (): Promise<TrainingJob[]> => {
        const { data } = await api.get(`${BASE}/running`);

        return data.data;
    },
};

export default trainingJobsApi;
