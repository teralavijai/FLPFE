import { Route, Routes } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardPage from "../features/dashboard/pages/DashboardPage";
import PlaceholderPage from "../features/common/pages/PlaceholderPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<DashboardLayout />}>
                <Route
                    index
                    element={<DashboardPage />}
                />

                <Route
                    path="federated-learning"
                    element={
                        <PlaceholderPage title="Federated Learning" />
                    }
                />

                <Route
                    path="training-jobs"
                    element={
                        <PlaceholderPage title="Training Jobs" />
                    }
                />

                <Route
                    path="ml-models"
                    element={
                        <PlaceholderPage title="ML Models" />
                    }
                />

                <Route
                    path="runtime"
                    element={
                        <PlaceholderPage title="Runtime Monitoring" />
                    }
                />

                <Route
                    path="agents"
                    element={<PlaceholderPage title="Agents" />}
                />

                <Route
                    path="datasets"
                    element={<PlaceholderPage title="Datasets" />}
                />

                <Route
                    path="users"
                    element={<PlaceholderPage title="Users" />}
                />

                <Route
                    path="settings"
                    element={<PlaceholderPage title="Settings" />}
                />
            </Route>
        </Routes>
    );
}
