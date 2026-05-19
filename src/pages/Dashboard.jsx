// pages/Dashboard.jsx

import { Link } from "react-router-dom";

import CardVehiculo from "../components/CardVehiculo";
import { useEffect, useState }
    from "react";

import {
    collection,
    getDocs,
}
    from "firebase/firestore";

import { db }
    from "../services/firebase";
/**
 * =====================================================
 * PAGINA: Dashboard
 * =====================================================
 *
 * Muestra:
 * - Vehículos
 * - Estado mantenimiento
 * - Accesos rápidos
 *
 * =====================================================
 */

export default function Dashboard() {


    /**
     * =====================================================
     * ESTADO VEHICULOS
     * =====================================================
     */
    const [trucks, setTrucks] =
        useState([]);

    /**
     * =====================================================
     * CARGAR VEHICULOS FIRESTORE
     * =====================================================
     */
    useEffect(() => {

        /**
         * Obtener vehículos
         */
        const fetchVehiculos =
            async () => {

                try {

                    /**
                     * Referencia colección
                     */
                    const querySnapshot =
                        await getDocs(
                            collection(
                                db,
                                "vehiculos"
                            )
                        );

                    /**
                     * Convertir documentos
                     */
                    const vehiculos =
                        querySnapshot.docs.map(
                            (doc) => ({

                                id: doc.id,

                                ...doc.data(),

                            })
                        );

                    /** Guardar estado */
                    setTrucks(
                        vehiculos
                    );

                }
                catch (error) {

                    console.error(
                        "Error cargando vehículos:",
                        error
                    );
                }
            };

        /**
         * Ejecutar función
         */
        fetchVehiculos();

    }, []);

    return (

        <div className="container py-4">

            {/* ===================================================== */}
            {/* HEADER */}
            {/* ===================================================== */}

            <div className="d-flex justify-content-between align-items-center mb-5">

                <div>

                    <h1 className="fw-bold">
                        🚛 Dashboard
                    </h1>

                    <p className="text-muted mb-0">
                        Control de mantenimiento flota
                    </p>

                </div>

                {/* BOTONES ACCESO */}

                <div className="d-flex gap-2">

                    <Link
                        to="/update"
                        className="btn btn-warning"
                    >
                        🔧 Actualizar KM
                    </Link>

                    <Link
                        to="/register"
                        className="btn btn-success"
                    >
                        ➕ Nuevo Vehículo
                    </Link>

                    <Link
                        to="/modificar_vehiculo"
                        className="btn btn-success"
                    >
                        ➕ Modificar Vehículo
                    </Link>

                </div>

            </div>

            {/* ===================================================== */}
            {/* GRID VEHICULOS */}
            {/* ===================================================== */}

            <div className="row">

                {
                    trucks.map((truck) => (

                        <div
                            key={truck.id}
                            className="col-12 col-md-6 mb-4"
                        >

                            <CardVehiculo
                                vehiculo={truck.vehiculo}
                                patente={truck.patente}
                                kmActual={truck.kmActual}
                                kmMantenimiento={truck.kmMantenimiento}
                                fechaUltimaToma={truck.fechaUltimaToma}
                                conductor={truck.conductor}
                            />

                        </div>

                    ))
                }

            </div>

        </div>

    );
}