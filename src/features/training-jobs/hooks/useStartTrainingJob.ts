import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import trainingJobsApi from "../api/trainingJobsApi";

export function useStartTrainingJob() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: trainingJobsApi.start,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["training-jobs"],
            });

        },

    });

}