import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ requireAdmin = false, guestOnly = false }) {
    const {user, isAdmin} = useAuth();

    if (guestOnly && user) {
        return <Navigate to="/" replace />;
    }

    if(!guestOnly && !user){
        return <Navigate to="/login" replace/>
    }

    if(requireAdmin && !isAdmin) {
        return <Navigate to="/tours" replace />
    }

    return <Outlet />;
}