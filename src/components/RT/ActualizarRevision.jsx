// src/components/ActualizarRevision.jsx

import {
    useEffect,
    useState,
} from "react";

import {
    collection,
    getDocs,
    doc,
    updateDoc,
} from "firebase/firestore";

import { db } from "../../services/firebase";

/**
 * =====================================================
 * COMPONENTE: ActualizarRevision
 * =====================================================
 *
 * Permite:
 * - Buscar revisión por patente
 * - Actualizar revisión técnica
 * - Actualizar emisión gases
 * - Actualizar observación
 *
 * =====================================================
 */

export default function ActualizarRevision() {

    /**
     * =====================================================
     * ESTADOS
     * =====================================================
     */

    // Revisiones
    const [revisiones, setRevisiones] =
        useState([]);

    // Revisión seleccionada
    const [selectedRevision, setSelectedRevision] =
        useState("");

    // Loading
    const [loading, setLoading] =
        useState(false);

    // Datos formulario
    const [formData, setFormData] =
        useState({

            vehiculo: "",

            patente: "",

            fechaRevision: "",

            fechaGases: "",

            observacion: "",

        });

    /**
     * =====================================================
     * OBTENER REVISIONES FIREBASE
     * =====================================================
     */
    useEffect(() => {

        const obtenerRevisiones =
            async () => {

                try {

                    /**
                     * QUERY
                     */
                    const querySnapshot =
                        await getDocs(

                            collection(
                                db,
                                "revisionesTecnicas"
                            )

                        );

                    /**
                     * MAP DATA
                     */
                    const lista =
                        querySnapshot.docs.map(
                            (doc) => ({

                                id:
                                    doc.id,

                                ...doc.data(),

                            })
                        );

                    /**
                     * GUARDAR
                     */
                    setRevisiones(lista);

                }
                catch (error) {

                    console.error(
                        "Error obteniendo revisiones:",
                        error
                    );
                }
            };

        obtenerRevisiones();

    }, []);

    /**
     * =====================================================
     * SELECCIONAR REVISION
     * =====================================================
     *
     * Carga datos automáticamente
     *
     * =====================================================
     */
    const handleSelectRevision =
        (e) => {

            /**
             * ID REVISION
             */
            const revisionId =
                e.target.value;

            /**
             * GUARDAR SELECT
             */
            setSelectedRevision(
                revisionId
            );

            /**
             * BUSCAR REVISION
             */
            const revision =
                revisiones.find(
                    (r) =>
                        r.id === revisionId
                );

            /**
             * VALIDACION
             */
            if (!revision) return;

            /**
             * CARGAR FORMULARIO
             */
            setFormData({

                vehiculo:
                    revision.vehiculo,

                patente:
                    revision.patente,

                fechaRevision:
                    revision.fechaRevision,

                fechaGases:
                    revision.fechaGases,

                observacion:
                    revision.observacion,

            });
        };

    /**
     * =====================================================
     * HANDLE INPUTS
     * =====================================================
     */
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });
    };

    /**
     * =====================================================
     * ACTUALIZAR REVISION FIREBASE
     * =====================================================
     */
    const handleSubmit = async (e) => {

        e.preventDefault();

        /**
         * VALIDACION
         */
        if (!selectedRevision) {

            alert(
                "Debe seleccionar revisión"
            );

            return;
        }

        try {

            /**
             * LOADING ON
             */
            setLoading(true);

            /**
             * REFERENCIA DOC
             */
            const revisionRef =
                doc(

                    db,

                    "revisionesTecnicas",

                    selectedRevision

                );

            /**
             * UPDATE FIREBASE
             */
            await updateDoc(

                revisionRef,

                {

                    fechaRevision:
                        formData.fechaRevision,

                    fechaGases:
                        formData.fechaGases,

                    observacion:
                        formData.observacion,

                    updatedAt:
                        new Date(),

                }

            );

            /**
             * ALERT
             */
            alert(
                "Revisión actualizada correctamente"
            );

        }
        catch (error) {

            console.error(
                "Error actualizando revisión:",
                error
            );

            alert(
                "Error actualizando revisión"
            );
        }
        finally {

            /**
             * LOADING OFF
             */
            setLoading(false);
        }
    };

    return (

        <div className="card shadow-sm border-0">

            <div className="card-body p-4">

                {/* ===================================================== */}
                {/* TITULO */}
                {/* ===================================================== */}

                <h3 className="fw-bold mb-4">
                    🔧 Actualizar Revisión
                </h3>

                {/* ===================================================== */}
                {/* SELECT REVISION */}
                {/* ===================================================== */}

                <div className="mb-4">

                    <label className="form-label">
                        Seleccionar patente
                    </label>

                    <select
                        className="form-select"
                        value={selectedRevision}
                        onChange={handleSelectRevision}
                    >

                        <option value="">
                            -- Seleccionar --
                        </option>

                        {
                            revisiones.map(
                                (revision) => (

                                    <option
                                        key={revision.id}
                                        value={revision.id}
                                    >
                                        {
                                            revision.patente
                                        }
                                        {" - "}
                                        {
                                            revision.vehiculo
                                        }
                                    </option>

                                )
                            )
                        }

                    </select>

                </div>

                {/* ===================================================== */}
                {/* FORMULARIO */}
                {/* ===================================================== */}

                {
                    selectedRevision && (

                        <form onSubmit={handleSubmit}>

                            {/* VEHICULO */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Vehículo
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.vehiculo}
                                    readOnly
                                />

                            </div>

                            {/* PATENTE */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Patente
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={formData.patente}
                                    readOnly
                                />

                            </div>

                            {/* REVISION */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Fecha revisión técnica
                                </label>

                                <input
                                    type="date"
                                    name="fechaRevision"
                                    className="form-control"
                                    value={formData.fechaRevision}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* GASES */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Fecha emisión gases
                                </label>

                                <input
                                    type="date"
                                    name="fechaGases"
                                    className="form-control"
                                    value={formData.fechaGases}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* OBSERVACION */}

                            <div className="mb-4">

                                <label className="form-label">
                                    Observación
                                </label>

                                <textarea
                                    name="observacion"
                                    className="form-control"
                                    rows="4"
                                    value={formData.observacion}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* BOTON */}

                            <button
                                type="submit"
                                className="btn btn-warning w-100"
                                disabled={loading}
                            >

                                {
                                    loading
                                        ? "Actualizando..."
                                        : "Actualizar Revisión"
                                }

                            </button>

                        </form>

                    )
                }

            </div>

        </div>

    );
}