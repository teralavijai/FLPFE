import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import mlModelsApi from "../api/mlModelsApi";

export function useUpdateMLModel() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: ({
            id,
            payload,
        }: {
            id: number;
            payload: any;
        }) =>
            mlModelsApi.update(id, payload),

        onSuccess: (_, variables) => {

            queryClient.invalidateQueries({

                queryKey: ["ml-models"],

            });

            queryClient.invalidateQueries({

                queryKey: [
                    "ml-model",
                    variables.id,
                ],

            });

        },

    });

}