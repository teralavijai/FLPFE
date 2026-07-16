import {
    Box,
    Stack,
    Typography,
} from "@mui/material";

import PageContainer from "../../../shared/components/PageContainer";
import PageTitle from "../../../shared/components/PageTitle";

import RuntimeConnectionChip from "../components/RuntimeConnectionChip";
import RuntimeSummaryCards from "../components/RuntimeSummaryCards";
import RunningJobsTable from "../components/RunningJobsTable";
import ConnectedClientsTable from "../components/ConnectedClientsTable";
import RecentEventsTable from "../components/RecentEventsTable";

import { useTrainingJobs } from "../../training-jobs/hooks/useTrainingJobs";

export default function RuntimeMonitoringPage() {

    //------------------------------------------------------------------
    // Running Jobs
    //------------------------------------------------------------------

    const {

        data: jobs = [],

        isLoading,

    } = useTrainingJobs();

    const activeJobs = jobs.filter(

        job =>

            job.status === "RUNNING" ||

            job.status === "STARTING",

    ).length;

    //------------------------------------------------------------------

    return (

        <PageContainer>

            <Stack spacing={3}>

                {/*------------------------------------------------------
                    Page Header
                -------------------------------------------------------*/}

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    mb={4}
                >
                    <Box>

                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 700,
                                letterSpacing: "-0.5px",
                            }}
                        >
                            Runtime Monitoring
                        </Typography>

                        <Typography
                            sx={{
                                mt: 1,
                                fontSize: "1.05rem",
                                fontWeight: 600,
                                color: "text.primary",
                                opacity: 0.82,
                                maxWidth: 900,
                            }}
                        >
                            Monitor federated learning jobs, connected agents,
                            training progress and platform health in real time.
                        </Typography>

                    </Box>

                    <RuntimeConnectionChip />
                </Box>

                {/*------------------------------------------------------
                    Summary Cards
                -------------------------------------------------------*/}

                <RuntimeSummaryCards
                    activeJobs={activeJobs}
                />

                {/*------------------------------------------------------
                    Running Jobs
                -------------------------------------------------------*/}

                <RunningJobsTable />

                {/*------------------------------------------------------
                    Connected Clients
                -------------------------------------------------------*/}

                <ConnectedClientsTable />

                {/*------------------------------------------------------
                    Recent Events
                -------------------------------------------------------*/}

                <RecentEventsTable />

            </Stack>

        </PageContainer>

    );

}