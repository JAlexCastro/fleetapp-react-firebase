// src/pages/ListaFallasPage.jsx

import { useEffect, useState }
    from "react";

import {
    collection,
    getDocs,
}
    from "firebase/firestore";

import { db }
    from "../services/firebase";

import CardFalla
    from "../components/CardFalla";

/**
 * =====================================================
 * PAGINA: ListaFallasPage
 * =====================================================
 *
 * Visualiza todas las fallas
 * registradas en Firestore.
 *
 * =====================================================
 */

export default function ListaFallasPage() {

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
         * Ejecutar función
         */
        fetchFallas();

    }, []);

    return (

        <div className="container py-4">

            {/* ===================================================== */}
            {/* HEADER */}
            {/* ===================================================== */}

            <div className="d-flex justify-content-between align-items-center mb-5">

                <div>

                    <h1 className="fw-bold">
                        🚨 Lista de Fallas
                    </h1>

                    <p className="text-muted">
                        Gestión incidencias flota
                    </p>

                </div>

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