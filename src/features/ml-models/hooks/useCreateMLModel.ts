import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import mlModelsApi from "../api/mlModelsApi";

export function useCreateMLModel() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: mlModelsApi.create,

        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["ml-models"],
            });

        },

    });

}