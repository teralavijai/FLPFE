import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import trainingJobsApi from "../api/trainingJobsApi";

export function useDeleteTrainingJob() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: trainingJobsApi.delete,

        onSuccess: (response) => {

            if (response.success) {

                queryClient.invalidateQueries({
                    queryKey: ["training-jobs"],
                });

            }

        },

    });

}