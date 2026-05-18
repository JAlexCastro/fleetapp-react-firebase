
import {
    Navigate,
}
    from "react-router-dom";

import {
    useAuth,
}
    from "../context/AuthContext";

/**
 * =====================================================
 * PROTECTED ROUTE
 * =====================================================
 */

export default function ProtectedRoute({

    children,

}) {

    const { user } =
        useAuth();

    /**
     * Si NO existe usuario
     */
    if (!user) {

        return (
            <Navigate
                to="/login"
            />
        );
    }

    /**
     * Usuario autenticado
     */
    return children;
}