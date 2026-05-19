// pages/Dashboard.jsx

import { Link } from "react-router-dom";

import CardVehiculo from "../../components/VEHICULOS/CardVehiculo";
import { useEffect, useState }
    from "react";

import {
    collection,
    getDocs,
}
    from "firebase/firestore";

import { db }
    from "../../services/firebase";
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

            <div className="card border-0 shadow-sm mb-5">

                <div className="card-body p-4">

                    <div className="row align-items-center">

                        {/* ===================================================== */}
                        {/* TITULO */}
                        {/* ===================================================== */}

                        <div className="col-12 col-lg-5 mb-4 mb-lg-0">

                            <h1 className="fw-bold mb-2">
                                🚛 Dashboard
                            </h1>

                            <p className="text-muted mb-0">
                                Control y gestión mantenimiento flota
                            </p>

                        </div>

                        {/* ===================================================== */}
                        {/* BOTONES */}
                        {/* ===================================================== */}

                        <div className="col-12 col-lg-7">

                            <div className="row g-3">

                                {/* ACTUALIZAR KM */}

                                <div className="col-12 col-md-4">

                                    <Link
                                        to="/update"
                                        className="btn btn-warning w-100 py-3 shadow-sm"
                                    >

                                        <div className="fw-semibold">
                                            🔧 Actualizar
                                        </div>

                                        <small>
                                            Kilometraje
                                        </small>

                                    </Link>

                                </div>

                                {/* NUEVO VEHICULO */}

                                <div className="col-12 col-md-4">

                                    <Link
                                        to="/register"
                                        className="btn btn-success w-100 py-3 shadow-sm"
                                    >

                                        <div className="fw-semibold">
                                            ➕ Registrar
                                        </div>

                                        <small>
                                            Nuevo Vehículo
                                        </small>

                                    </Link>

                                </div>

                                {/* MODIFICAR */}

                                <div className="col-12 col-md-4">

                                    <Link
                                        to="/modificar_vehiculo"
                                        className="btn btn-primary w-100 py-3 shadow-sm"
                                    >

                                        <div className="fw-semibold">
                                            🚛 Modificar
                                        </div>

                                        <small>
                                            Datos Vehículo
                                        </small>

                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

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