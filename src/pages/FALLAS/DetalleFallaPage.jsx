// src/pages/DetalleFallaPage.jsx

import {
    useEffect,
    useState,
}
    from "react";

import {
    useParams,
}
    from "react-router-dom";

import {
    doc,
    getDoc,
    collection,
    getDocs,
}
    from "firebase/firestore";

import { db }
    from "../../services/firebase";

import HistorialFalla
    from "../../components/FALLAS/HistorialFalla";

import ActualizarFalla
    from "../../components/FALLAS/ActualizarFalla";

/**
 * =====================================================
 * PAGINA: DetalleFallaPage
 * =====================================================
 *
 * Muestra:
 * - detalle falla
 * - historial
 * - actualización estado
 *
 * Datos obtenidos desde Firestore
 *
 * =====================================================
 */

export default function DetalleFallaPage() {

    /**
     * =====================================================
     * OBTENER ID URL
     * =====================================================
     */
    const { id } = useParams();

    /**
     * =====================================================
     * ESTADO FALLA
     * =====================================================
     */
    const [falla, setFalla] =
        useState(null);

    /**
     * =====================================================
     * ESTADO HISTORIAL
     * =====================================================
     */
    const [historial, setHistorial] =
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
     * CARGAR DETALLE FALLA
     * =====================================================
     */
    useEffect(() => {

        /**
         * Obtener detalle falla
         */
        const fetchDetalle =
            async () => {

                try {

                    /**
                     * =====================================================
                     * OBTENER FALLA PRINCIPAL
                     * =====================================================
                     */
                    const fallaRef =
                        doc(
                            db,
                            "fallas",
                            id
                        );

                    const fallaSnap =
                        await getDoc(
                            fallaRef
                        );

                    /**
                     * Validar existencia
                     */
                    if (
                        fallaSnap.exists()
                    ) {

                        /**
                         * Guardar falla
                         */
                        setFalla({

                            id:
                                fallaSnap.id,

                            ...fallaSnap.data(),

                        });
                    }

                    /**
                     * =====================================================
                     * OBTENER HISTORIAL
                     * =====================================================
                     */
                    const historialSnapshot =
                        await getDocs(

                            collection(

                                db,

                                "fallas",

                                id,

                                "historial"

                            )

                        );

                    /**
                     * Convertir historial
                     */
                    const historialData =
                        historialSnapshot.docs.map(
                            (doc) => ({

                                id:
                                    doc.id,

                                ...doc.data(),

                            })
                        );

                    /**
                     * Guardar historial
                     */
                    setHistorial(
                        historialData
                    );

                }
                catch (error) {

                    console.error(
                        "Error cargando detalle:",
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
        fetchDetalle();

    }, [id]);

    /**
     * =====================================================
     * LOADING UI
     * =====================================================
     */
    if (loading) {

        return (

            <div className="container py-4">

                <div className="alert alert-info">

                    Cargando detalle falla...

                </div>

            </div>

        );
    }

    /**
     * =====================================================
     * FALLA NO EXISTE
     * =====================================================
     */
    if (!falla) {

        return (

            <div className="container py-4">

                <div className="alert alert-danger">

                    Falla no encontrada

                </div>

            </div>

        );
    }

    return (

        <div className="container py-4">

            {/* ===================================================== */}
            {/* HEADER */}
            {/* ===================================================== */}

            <div className="mb-4">

                <h1 className="fw-bold">
                    🚨 Detalle Falla
                </h1>

                <p className="text-muted">
                    ID: {id}
                </p>

            </div>

            {/* ===================================================== */}
            {/* CARD PRINCIPAL */}
            {/* ===================================================== */}

            <div className="card shadow-sm border-0 mb-4">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-start mb-3">

                        <div>

                            <h3 className="fw-bold">
                                {falla.fallo}
                            </h3>

                            <p className="text-muted mb-0">
                                {falla.vehiculo}
                            </p>

                        </div>

                        <span
                            className={`badge bg-${falla.estado === "SOLUCIONADO"
                                ? "success"
                                : falla.estado === "EN REPARACION"
                                    ? "warning"
                                    : "danger"
                                }`}
                        >

                            {falla.estado}

                        </span>

                    </div>

                    <hr />

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <strong>
                                Patente
                            </strong>

                            <br />

                            {falla.patente}

                        </div>

                        <div className="col-md-6 mb-3">

                            <strong>
                                Fecha
                            </strong>

                            <br />

                            {falla.fecha}

                        </div>

                        <div className="col-12">

                            <strong>
                                Observación
                            </strong>

                            <br />

                            {falla.observacion}

                        </div>

                    </div>

                </div>

            </div>

            {/* ===================================================== */}
            {/* ACTUALIZAR FALLA */}
            {/* ===================================================== */}

            <div className="mb-4">

                <ActualizarFalla
                    fallaId={id}
                    estadoActual={falla.estado}
                />

            </div>

            {/* ===================================================== */}
            {/* HISTORIAL */}
            {/* ===================================================== */}

            <HistorialFalla
                historial={historial}
            />

        </div>

    );
}