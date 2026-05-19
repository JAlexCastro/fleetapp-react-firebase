// src/components/Navbar.jsx

import {
    Link,
    useNavigate,
} from "react-router-dom";

import {
    getAuth,
    signOut,
} from "firebase/auth";

/**
 * =====================================================
 * COMPONENTE: Navbar
 * =====================================================
 *
 * Navbar responsive:
 * - Desktop
 * - Mobile APK
 * - Usuario Firebase
 * - Logout
 *
 * =====================================================
 */

export default function Navbar() {

    /**
     * =====================================================
     * FIREBASE AUTH
     * =====================================================
     */
    const auth = getAuth();

    /**
     * =====================================================
     * USUARIO
     * =====================================================
     */
    const user =
        auth.currentUser;

    /**
     * =====================================================
     * NAVIGATION
     * =====================================================
     */
    const navigate =
        useNavigate();

    /**
     * =====================================================
     * LOGOUT
     * =====================================================
     */
    const handleLogout =
        async () => {

            try {

                await signOut(auth);

                navigate("/login");

            }
            catch (error) {

                console.error(
                    "Error logout:",
                    error
                );
            }
        };

    return (

        <nav
            className="
                navbar
                navbar-expand-lg
                navbar-dark
                shadow-sm
                sticky-top
            "
            style={{
                background:
                    "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            }}
        >

            <div className="container-fluid px-3">

                {/* ===================================================== */}
                {/* LOGO + VERSION */}
                {/* ===================================================== */}

                <div className="d-flex flex-column">

                    <Link
                        className="
                        navbar-brand
                        fw-bold
                        fs-4
                        mb-0
                        "
                        to="/"
                    >
                        🚛 FleetApp
                    </Link>

                    <small
                        className="text-light opacity-75"
                        style={{
                            fontSize: "0.75rem",
                            marginTop: "-5px",
                        }}
                    >
                        Version 2.1.0
                    </small>

                </div>

                {/* ===================================================== */}
                {/* BOTON MOBILE */}
                {/* ===================================================== */}

                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarFleet"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                {/* ===================================================== */}
                {/* CONTENIDO NAV */}
                {/* ===================================================== */}

                <div
                    className="
                        collapse
                        navbar-collapse
                        mt-3
                        mt-lg-0
                    "
                    id="navbarFleet"
                >

                    {/* ===================================================== */}
                    {/* LINKS */}
                    {/* ===================================================== */}

                    <div
                        className="
                            d-flex
                            flex-column
                            flex-lg-row
                            gap-2
                            w-100
                            align-items-stretch
                            align-items-lg-center
                        "
                    >

                        <Link
                            to="/"
                            className="
                                btn
                                btn-success
                                btn-sm
                                px-3
                            "
                        >
                            📊 Dashboard
                        </Link>

                        <Link
                            to="/fallas"
                            className="
                                btn
                                btn-warning
                                btn-sm
                                px-3
                            "
                        >
                            🚨 Lista Fallas
                        </Link>

                        <Link
                            to="/registro-falla"
                            className="
                                btn
                                btn-danger
                                btn-sm
                                px-3
                            "
                        >
                            🛠 Registrar Falla
                        </Link>

                        <Link
                            to="/revisiones"
                            className="
                                btn
                                btn-primary
                                btn-sm
                                px-3
                            "
                        >
                            📋 Rev. Técnica
                        </Link>

                        {/* ===================================================== */}
                        {/* USER SECTION */}
                        {/* ===================================================== */}

                        <div
                            className="
                                ms-lg-auto
                                mt-3
                                mt-lg-0
                            "
                        >

                            <div
                                className="
                                    d-flex
                                    flex-column
                                    flex-lg-row
                                    align-items-start
                                    align-items-lg-center
                                    gap-2
                                    px-3
                                    py-2
                                    rounded-4
                                "
                                style={{
                                    background:
                                        "rgba(255,255,255,0.08)",
                                    backdropFilter:
                                        "blur(10px)",
                                }}
                            >

                                {/* EMAIL */}

                                <span
                                    className="
                                        text-light
                                        small
                                        fw-semibold
                                        text-break
                                    "
                                >
                                    👤
                                    {" "}
                                    {
                                        user?.email ||
                                        "Usuario"
                                    }
                                </span>

                                {/* LOGOUT */}

                                <button
                                    onClick={handleLogout}
                                    className="
                                        btn
                                        btn-outline-light
                                        btn-sm
                                        w-100
                                        w-lg-auto
                                    "
                                >
                                    🚪 Salir
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </nav>

    );
}