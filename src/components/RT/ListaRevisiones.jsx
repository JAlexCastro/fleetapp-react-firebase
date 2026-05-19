// src/components/ListaRevisiones.jsx

import {
    useEffect,
    useState,
} from "react";

import {
    collection,
    getDocs,
} from "firebase/firestore";

import { db } from "../../services/firebase";

/**
 * =====================================================
 * COMPONENTE: ListaRevisiones
 * =====================================================
 *
 * Visualiza:
 * - Revisiones técnicas
 * - Emisión gases
 * - Días restantes
 * - Estados vencimiento
 *
 * =====================================================
 */

export default function ListaRevisiones() {

    /**
     * =====================================================
     * ESTADOS
     * =====================================================
     */
    const [revisiones, setRevisiones] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    /**
     * =====================================================
     * OBTENER REVISIONES FIREBASE
     * =====================================================
     */
    useEffect(() => {

        const obtenerRevisiones =
            async () => {

                try {

                    const querySnapshot =
                        await getDocs(

                            collection(
                                db,
                                "revisionesTecnicas"
                            )

                        );

                    const lista =
                        querySnapshot.docs.map(
                            (doc) => ({

                                id:
                                    doc.id,

                                ...doc.data(),

                            })
                        );

                    setRevisiones(lista);

                }
                catch (error) {

                    console.error(
                        "Error obteniendo revisiones:",
                        error
                    );
                }
                finally {

                    setLoading(false);
                }
            };

        obtenerRevisiones();

    }, []);

    /**
     * =====================================================
     * CALCULAR DIAS RESTANTES
     * =====================================================
     *
     * Retorna:
     * - dias
     * - estado
     * - color
     *
     * =====================================================
     */
    const calcularDiasRestantes =
        (fechaInput) => {

            /**
             * VALIDACION
             */
            if (!fechaInput) {

                return {

                    dias: "-",
                    estado: "SIN FECHA",
                    color: "secondary",

                };
            }

            /**
             * FECHA ACTUAL
             */
            const hoy =
                new Date();

            /**
             * FECHA OBJETIVO
             */
            const fecha =
                new Date(fechaInput);

            /**
             * RESET HORAS
             */
            hoy.setHours(0, 0, 0, 0);

            fecha.setHours(0, 0, 0, 0);

            /**
             * DIFERENCIA
             */
            const diferencia =
                fecha - hoy;

            /**
             * DIAS
             */
            const dias =
                Math.ceil(

                    diferencia /

                    (
                        1000 *
                        60 *
                        60 *
                        24
                    )

                );

            /**
             * ESTADOS
             */
            if (dias < 0) {

                return {

                    dias:
                        Math.abs(dias),

                    estado:
                        "VENCIDO",

                    color:
                        "danger",

                };
            }

            if (dias <= 30) {

                return {

                    dias,
                    estado:
                        "PRÓXIMO",

                    color:
                        "warning",

                };
            }

            return {

                dias,
                estado:
                    "VIGENTE",

                color:
                    "success",

            };
        };

    /**
     * =====================================================
     * LOADING
     * =====================================================
     */
    if (loading) {

        return (

            <div className="text-center py-5">

                <div
                    className="spinner-border text-primary"
                />

                <p className="mt-3">
                    Cargando revisiones...
                </p>

            </div>

        );
    }

    /**
     * =====================================================
     * SIN DATOS
     * =====================================================
     */
    if (revisiones.length === 0) {

        return (

            <div className="alert alert-secondary">

                No existen revisiones registradas.

            </div>

        );
    }

    return (

        <div className="row">

            {
                revisiones.map(
                    (revision) => {

                        /**
                         * CALCULAR RT
                         */
                        const rt =
                            calcularDiasRestantes(
                                revision.fechaRevision
                            );

                        /**
                         * CALCULAR GASES
                         */
                        const gases =
                            calcularDiasRestantes(
                                revision.fechaGases
                            );

                        return (

                            <div
                                key={revision.id}
                                className="col-12 col-md-6 mb-4"
                            >

                                <div className="card shadow-sm border-0 h-100">

                                    <div className="card-body p-4">

                                        {/* ===================================================== */}
                                        {/* HEADER */}
                                        {/* ===================================================== */}

                                        <div className="d-flex justify-content-between align-items-start mb-4">

                                            <div>

                                                <h4 className="fw-bold mb-1">
                                                    🚛 {
                                                        revision.vehiculo
                                                    }
                                                </h4>

                                                <p className="text-muted mb-0">
                                                    {
                                                        revision.patente
                                                    }
                                                </p>

                                            </div>

                                        </div>

                                        {/* ===================================================== */}
                                        {/* REVISION TECNICA */}
                                        {/* ===================================================== */}

                                        <div
                                            className={`alert alert-${rt.color} mb-3`}
                                        >

                                            <div className="d-flex justify-content-between">

                                                <div>

                                                    <strong>
                                                        📋 Revisión Técnica
                                                    </strong>

                                                    <div>
                                                        {
                                                            revision.fechaRevision
                                                        }
                                                    </div>

                                                </div>

                                                <div className="text-end">

                                                    <h5 className="fw-bold mb-0">

                                                        {
                                                            rt.estado === "VENCIDO"
                                                                ? `${rt.dias} días`
                                                                : `${rt.dias} días`
                                                        }

                                                    </h5>

                                                    <small>

                                                        {
                                                            rt.estado === "VENCIDO"
                                                                ? "Vencido"
                                                                : "Restantes"
                                                        }

                                                    </small>

                                                </div>

                                            </div>

                                        </div>

                                        {/* ===================================================== */}
                                        {/* EMISION GASES */}
                                        {/* ===================================================== */}

                                        <div
                                            className={`alert alert-${gases.color} mb-3`}
                                        >

                                            <div className="d-flex justify-content-between">

                                                <div>

                                                    <strong>
                                                        ⛽ Emisión Gases
                                                    </strong>

                                                    <div>
                                                        {
                                                            revision.fechaGases
                                                        }
                                                    </div>

                                                </div>

                                                <div className="text-end">

                                                    <h5 className="fw-bold mb-0">

                                                        {
                                                            gases.estado === "VENCIDO"
                                                                ? `${gases.dias} días`
                                                                : `${gases.dias} días`
                                                        }

                                                    </h5>

                                                    <small>

                                                        {
                                                            gases.estado === "VENCIDO"
                                                                ? "Vencido"
                                                                : "Restantes"
                                                        }

                                                    </small>

                                                </div>

                                            </div>

                                        </div>

                                        {/* ===================================================== */}
                                        {/* OBSERVACION */}
                                        {/* ===================================================== */}

                                        <div>

                                            <small className="text-muted d-block">
                                                📝 Observación
                                            </small>

                                            <span>
                                                {
                                                    revision.observacion ||
                                                    "Sin observaciones"
                                                }
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        );
                    }
                )
            }

        </div>

    );
}