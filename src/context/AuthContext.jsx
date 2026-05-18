// src/context/AuthContext.jsx

import {
    createContext,
    useContext,
    useEffect,
    useState,
}
    from "react";

import {
    onAuthStateChanged,
}
    from "firebase/auth";

import { auth }
    from "../services/firebase";

/**
 * =====================================================
 * CONTEXT
 * =====================================================
 */
const AuthContext =
    createContext();

/**
 * =====================================================
 * PROVIDER
 * =====================================================
 */
export function AuthProvider({

    children,

}) {

    /**
     * Usuario logeado
     */
    const [user, setUser] =
        useState(null);

    /**
     * Loading auth
     */
    const [loading, setLoading] =
        useState(true);

    /**
     * Detectar sesión
     */
    useEffect(() => {

        const unsubscribe =
            onAuthStateChanged(

                auth,

                (currentUser) => {

                    setUser(
                        currentUser
                    );

                    setLoading(false);
                }

            );

        return () =>
            unsubscribe();

    }, []);

    return (

        <AuthContext.Provider
            value={{
                user,
            }}
        >

            {
                !loading &&
                children
            }

        </AuthContext.Provider>

    );
}

/**
 * =====================================================
 * HOOK
 * =====================================================
 */
export function useAuth() {

    return useContext(
        AuthContext
    );
}