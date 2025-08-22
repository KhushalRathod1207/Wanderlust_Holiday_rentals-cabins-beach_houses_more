// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, currUser }) => {
    if (!currUser) {
        // Redirect to login if user is not logged in
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;
