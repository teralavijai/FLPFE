import { useEffect } from "react";

import type { TrainingJob } from "../types/trainingJob";

interface Props {
    jobs: TrainingJob[];
    refetch(): void;
}

export default function useTrainingJobsPolling({
    jobs,
    refetch,
}: Props) {
    useEffect(() => {
        const running = jobs.some(
            (job) => job.status === "RUNNING"
        );

        if (!running) {
            return;
        }

        const timer = setInterval(() => {
            refetch();
        }, 300000);

        return () => clearInterval(timer);
    }, [jobs, refetch]);
}