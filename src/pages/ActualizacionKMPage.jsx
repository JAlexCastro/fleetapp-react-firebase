// src/pages/ActualizacionKMPage.jsx

import { useEffect, useState }
    from "react";

import {
    collection,
    getDocs,
}
    from "firebase/firestore";

import { db } from "../services/firebase";

import ActualizacionKM
    from "../components/ActualizacionKM";

/**
 * =====================================================
 * PAGINA: ActualizacionKMPage
 * =====================================================
 *
 * Página encargada de:
 * - Obtener vehículos Firestore
 * - Mostrar componente actualización KM
 *
 * =====================================================
 */

export default function ActualizacionKMPage() {

    /**
     * =====================================================
     * ESTADO VEHICULOS
     * =====================================================
     */
    const [trucks, setTrucks] =
        useState([]);

    /**
     * =====================================================
     * LOADING
     * =====================================================
     */
    const [loading, setLoading] =
        useState(true);

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

                    /**
                     * Guardar estado
                     */
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
                finally {

                    /**
                     * Loading OFF
                     */
                    setLoading(false);
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

            <div className="mb-4">

                <h1 className="fw-bold">
                    🔧 Actualización KM
                </h1>

                <p className="text-muted">
                    Registro y control de kilometraje
                </p>

            </div>

            {/* ===================================================== */}
            {/* LOADING */}
            {/* ===================================================== */}

            {
                loading && (

                    <div className="alert alert-info">

                        Cargando vehículos...

                    </div>

                )
            }

            {/* ===================================================== */}
            {/* SIN VEHICULOS */}
            {/* ===================================================== */}

            {
                !loading &&
                trucks.length === 0 && (

                    <div className="alert alert-warning">

                        No existen vehículos registrados

                    </div>

                )
            }

            {/* ===================================================== */}
            {/* COMPONENTE */}
            {/* ===================================================== */}

            {
                !loading &&
                trucks.length > 0 && (

                    <ActualizacionKM
                        trucks={trucks}
                    />

                )
            }

        </div>

    );
}