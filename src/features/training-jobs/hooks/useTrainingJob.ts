import { useQuery } from "@tanstack/react-query";

import trainingJobsApi from "../api/trainingJobsApi";

export function useTrainingJob(id: number) {
    return useQuery({
        queryKey: ["training-job", id],
        queryFn: () => trainingJobsApi.get(id),
        enabled: !!id,
    });
}