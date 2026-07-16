import api from "../../services/api";

import type {
    TrainingRoundPayload,
    ClientMetricPayload,
    TrainingEventPayload,
    ClientPayload,
} from "../../types/runtime";

class RuntimeRepository {

    //------------------------------------------------------------------
    // Training Rounds
    //------------------------------------------------------------------

    async getTrainingRounds(
        jobId: number,
    ): Promise<TrainingRoundPayload[]> {

        const { data } = await api.get<TrainingRoundPayload[]>(
            `/training-rounds/job/${jobId}`,
        );

        return data;

    }

    //------------------------------------------------------------------
    // Client Metrics
    //------------------------------------------------------------------

    async getClientMetrics(
        jobId: number,
    ): Promise<ClientMetricPayload[]> {

        const { data } = await api.get<ClientMetricPayload[]>(
            `/client-metrics/job/${jobId}`,
        );

        return data;

    }

    //------------------------------------------------------------------
    // Training Events
    //------------------------------------------------------------------

    async getTrainingEvents(
        jobId: number,
    ): Promise<TrainingEventPayload[]> {

        const { data } = await api.get<TrainingEventPayload[]>(
            `/training-events/job/${jobId}`,
        );

        return data;

    }

    //------------------------------------------------------------------
    // Clients
    //------------------------------------------------------------------

    async getClients(): Promise<ClientPayload[]> {

        const { data } = await api.get<ClientPayload[]>(
            "/clients",
        );

        return data;

    }

}

const runtimeRepository = new RuntimeRepository();

export default runtimeRepository;