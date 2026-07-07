import { useMemo, useState } from "react";

import type {
    TrainingJob,
} from "../types/trainingJob";

export default function useTrainingJobsFilters(
    jobs: TrainingJob[] = []
) {
    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("");

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const matchesSearch =
                search.trim() === "" ||
                job.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                job.strategy
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesStatus =
                status === "" ||
                job.status === status;

            return (
                matchesSearch &&
                matchesStatus
            );
        });
    }, [jobs, search, status]);

    return {
        search,
        status,
        filteredJobs,
        setSearch,
        setStatus,
    };
}