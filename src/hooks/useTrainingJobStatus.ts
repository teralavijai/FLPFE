import { useQuery } from "@tanstack/react-query";

import trainingJobsApi from "../api/trainingJobsApi";

export function useTrainingJobStatus(
    id: number
) {
    return useQuery({
        queryKey: [
            "training-job-status",
            id,
        ],

        queryFn: () =>
            trainingJobsApi.status(id),

        enabled: !!id,

        refetchInterval: 60000,
    });
}