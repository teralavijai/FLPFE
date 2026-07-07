import { useNavigate } from "react-router-dom";

import { useDeleteTrainingJob } from "./useDeleteTrainingJob";
import { useStartTrainingJob } from "./useStartTrainingJob";
import { useStopTrainingJob } from "./useStopTrainingJob";

export default function useTrainingJobsActions() {

    const navigate = useNavigate();

    const startMutation =
        useStartTrainingJob();

    const stopMutation =
        useStopTrainingJob();

    const deleteMutation =
        useDeleteTrainingJob();

    return {

        createJob() {
            navigate("/training-jobs/new");
        },

        editJob(id: number) {
            navigate(
                `/training-jobs/${id}/edit`
            );
        },

        viewJob(id: number) {
            navigate(
                `/training-jobs/${id}`
            );
        },

        startJob(id: number) {
            startMutation.mutate(id);
        },

        stopJob(id: number) {
            stopMutation.mutate(id);
        },

        async deleteJob(id: number) {
            return await deleteMutation.mutateAsync(id);
        },

        loading:
            startMutation.isPending ||
            stopMutation.isPending ||
            deleteMutation.isPending,
    };
}