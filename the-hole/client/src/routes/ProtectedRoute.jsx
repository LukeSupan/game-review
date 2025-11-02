import { Navigate } from "react-router-dom";

// make home safe
export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
