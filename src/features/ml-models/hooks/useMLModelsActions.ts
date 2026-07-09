import { useNavigate } from "react-router-dom";

import { useDeleteMLModel } from "./useDeleteMLModel";

export default function useMLModelsActions() {

    const navigate = useNavigate();

    const deleteMutation =
        useDeleteMLModel();

    return {

        createModel() {
            navigate("/ml-models/new");
        },

        viewModel(id: number) {
            navigate(`/ml-models/${id}`);
        },

        editModel(id: number) {
            navigate(`/ml-models/${id}/edit`);
        },

        deleteModel(
            id: number,
            options?: Parameters<
                typeof deleteMutation.mutate
            >[1]
        ) {

            deleteMutation.mutate(
                id,
                options
            );

        },

        loading:
            deleteMutation.isPending,

    };

}