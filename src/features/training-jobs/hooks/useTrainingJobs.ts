import { useQuery } from "@tanstack/react-query";

import trainingJobsApi from "../api/trainingJobsApi";

export function useTrainingJobs() {
    return useQuery({
        queryKey: ["training-jobs"],
        queryFn: trainingJobsApi.list,
        refetchOnWindowFocus: false,
    });
}