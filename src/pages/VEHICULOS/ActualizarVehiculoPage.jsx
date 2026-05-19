// src/pages/ActualizarVehiculoPage.jsx

import ModificarVehiculo
    from "../../components/VEHICULOS/ModificarVehiculo";

/**
 * =====================================================
 * PAGINA: ActualizarVehiculoPage
 * =====================================================
 *
 * Gestión:
 * - Modificar vehículos
 * - Eliminar vehículos
 *
 * =====================================================
 */

export default function ActualizarVehiculoPage() {

    return (

        <div className="container py-4">

            {/* HEADER */}

            <div className="mb-4">

                <h1 className="fw-bold">
                    🚛 Gestión Vehículos
                </h1>

                <p className="text-muted">
                    Modificar y eliminar camiones
                </p>

            </div>

            {/* COMPONENTE */}

            <ModificarVehiculo />

        </div>

    );
}