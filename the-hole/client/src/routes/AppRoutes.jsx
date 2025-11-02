import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../pages/Auth/AuthPage";
import HomePage from "../pages/Home/HomePage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Default route, goes to Auth*/}
                <Route path="/" element={<AuthPage />} />

                {/* Home page once logged in (protected) */}
                <Route 
                    path="/home" 
                    element={
                        <ProtectedRoute >
                            <HomePage />
                        </ProtectedRoute>
                    } 
                />

                {/* All other routes just go to auth for safety */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}
