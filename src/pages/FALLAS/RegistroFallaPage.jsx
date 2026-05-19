// src/pages/RegistroFallaPage.jsx

import { useEffect, useState }
    from "react";

import {
    collection,
    getDocs,
}
    from "firebase/firestore";

import { db } from "../../services/firebase";

import RegistroFalla
    from "../../components/FALLAS/RegistroFalla";

import CardFalla
    from "../../components/FALLAS/CardFalla";

/**
 * =====================================================
 * PAGINA: RegistroFallaPage
 * =====================================================
 *
 * Página encargada de:
 * - Registrar fallas
 * - Mostrar listado fallas
 *
 * =====================================================
 */

export default function RegistroFallaPage() {

    /**
     * =====================================================
     * ESTADO FALLAS
     * =====================================================
     */
    const [fallas, setFallas] =
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
     * CARGAR FALLAS FIRESTORE
     * =====================================================
     */
    useEffect(() => {

        /**
         * Obtener fallas
         */
        const fetchFallas =
            async () => {

                try {

                    /**
                     * Referencia colección
                     */
                    const querySnapshot =
                        await getDocs(

                            collection(
                                db,
                                "fallas"
                            )

                        );

                    /**
                     * Convertir documentos
                     */
                    const data =
                        querySnapshot.docs.map(
                            (doc) => ({

                                id: doc.id,

                                ...doc.data(),

                            })
                        );

                    /**
                     * Guardar estado
                     */
                    setFallas(data);

                }
                catch (error) {

                    console.error(
                        "Error cargando fallas:",
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
         * Ejecutar carga
         */
        fetchFallas();

    }, []);

    return (

        <div className="container py-4">

            {/* ===================================================== */}
            {/* HEADER */}
            {/* ===================================================== */}

            <div className="mb-4">

                <h1 className="fw-bold">
                    🚨 Gestión de Fallas
                </h1>

                <p className="text-muted">
                    Registro y seguimiento
                    de incidencias mecánicas
                </p>

            </div>

            {/* ===================================================== */}
            {/* FORMULARIO */}
            {/* ===================================================== */}

            <div className="mb-5">

                <RegistroFalla />

            </div>

            {/* ===================================================== */}
            {/* LISTADO FALLAS */}
            {/* ===================================================== */}

            <div className="mb-3">

                <h3 className="fw-bold">
                    📋 Fallas registradas
                </h3>

            </div>

            {/* ===================================================== */}
            {/* LOADING */}
            {/* ===================================================== */}

            {
                loading && (

                    <div className="alert alert-info">

                        Cargando fallas...

                    </div>

                )
            }

            {/* ===================================================== */}
            {/* SIN FALLAS */}
            {/* ===================================================== */}

            {
                !loading &&
                fallas.length === 0 && (

                    <div className="alert alert-warning">

                        No existen fallas registradas

                    </div>

                )
            }

            {/* ===================================================== */}
            {/* GRID FALLAS */}
            {/* ===================================================== */}

            <div className="row">

                {
                    fallas.map((falla) => (

                        <div
                            key={falla.id}
                            className="col-12 col-md-6 mb-4"
                        >

                            <CardFalla

                                id={falla.id}

                                patente={
                                    falla.patente
                                }

                                vehiculo={
                                    falla.vehiculo
                                }

                                fallo={
                                    falla.fallo
                                }

                                fecha={
                                    falla.fecha
                                }

                                observacion={
                                    falla.observacion
                                }

                                estado={
                                    falla.estado
                                }

                            />

                        </div>

                    ))
                }

            </div>

        </div>

    );
}