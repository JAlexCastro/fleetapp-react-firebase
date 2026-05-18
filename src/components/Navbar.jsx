// components/Navbar.jsx

import { Link } from "react-router-dom";

/**
 * =====================================================
 * COMPONENTE: Navbar
 * =====================================================
 *
 * Barra navegación principal app
 *
 * =====================================================
 */

export default function Navbar() {

    return (

        <nav
            className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm"
        >

            <div className="container">

                {/* LOGO */}

                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                >
                    🚛 FleetApp
                </Link>

                {/* LINKS */}

                <div className="d-flex gap-2">

                    <Link
                        to="/"
                        className="btn btn-success btn-sm"
                    >
                        Dashboard
                    </Link>
                    {/* OCULTAR 
                    <Link
                        to="/update"
                        className="btn btn-warning btn-sm"
                    >
                        Actualizar KM
                    </Link>

                    <Link
                        to="/register"
                        className="btn btn-success btn-sm"
                    >
                        Registrar Vehículo
                    </Link>
                */}
                    <Link
                        to="/fallas"
                        className="btn btn-warning btn-sm"
                    >
                        Lista Fallas
                    </Link>
                    <Link
                        to="/registro-falla"
                        className="btn btn-danger btn-sm"
                    >
                        Registro De Fallas
                    </Link>



                </div>

            </div>

        </nav>

    );
}