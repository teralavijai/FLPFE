import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import trainingJobsApi from "../api/trainingJobsApi";

export function useCreateTrainingJob() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: trainingJobsApi.create,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["training-jobs"],
            });

        },

    });

}