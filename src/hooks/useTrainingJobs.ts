import { useQuery } from "@tanstack/react-query";

import trainingJobsApi from "../api/trainingJobsApi";

export const TRAINING_JOBS_QUERY_KEY = [
    "training-jobs",
];

export function useTrainingJobs() {
    return useQuery({
        queryKey: TRAINING_JOBS_QUERY_KEY,
        queryFn: trainingJobsApi.list,
        refetchInterval: 300000,
        staleTime: 5000,
    });
}