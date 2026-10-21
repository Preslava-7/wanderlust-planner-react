import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ user, requireAdmin = false }) {
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const isAdmin = user.user_metadata?.role === "admin";

    if(requireAdmin && !isAdmin) {
        return <Navigate to="/tours" replace />
    }

    return <Outlet />;
}