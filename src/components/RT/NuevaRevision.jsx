// src/components/NuevaRevision.jsx

import { useEffect, useState }
    from "react";

import {
    collection,
    addDoc,
    getDocs,
}
    from "firebase/firestore";

import { db } from "../../services/firebase";

/**
 * =====================================================
 * COMPONENTE: NuevaRevision
 * =====================================================
 *
 * Permite:
 * - Seleccionar patente registrada
 * - Obtener vehículo automáticamente
 * - Registrar revisión técnica
 * - Registrar emisión gases
 * - Guardar en Firebase Firestore
 *
 * =====================================================
 */

export default function NuevaRevision() {

    /**
     * =====================================================
     * ESTADO VEHICULOS
     * =====================================================
     */
    const [vehiculos, setVehiculos] =
        useState([]);

    /**
     * =====================================================
     * ESTADO LOADING
     * =====================================================
     */
    const [loading, setLoading] =
        useState(false);

    /**
     * =====================================================
     * ESTADO FORMULARIO
     * =====================================================
     */
    const [formData, setFormData] =
        useState({

            patente: "",

            vehiculo: "",

            fechaRevision: "",

            fechaGases: "",

            observacion: "",

            estado: "VIGENTE",

        });

    /**
     * =====================================================
     * OBTENER VEHICULOS FIREBASE
     * =====================================================
     */
    useEffect(() => {

        const obtenerVehiculos =
            async () => {

                try {

                    /**
                     * REFERENCIA COLECCION
                     */
                    const querySnapshot =
                        await getDocs(

                            collection(
                                db,
                                "vehiculos"
                            )

                        );

                    /**
                     * MAPEAR DOCUMENTOS
                     */
                    const listaVehiculos =
                        querySnapshot.docs.map(
                            (doc) => ({

                                id:
                                    doc.id,

                                ...doc.data(),

                            })
                        );

                    /**
                     * GUARDAR ESTADO
                     */
                    setVehiculos(
                        listaVehiculos
                    );

                }
                catch (error) {

                    console.error(
                        "Error obteniendo vehículos:",
                        error
                    );
                }
            };

        obtenerVehiculos();

    }, []);

    /**
     * =====================================================
     * CAMBIO PATENTE
     * =====================================================
     *
     * Obtiene automáticamente
     * el nombre vehículo
     *
     * =====================================================
     */
    const handlePatenteChange = (e) => {

        const patente =
            e.target.value;

        /**
         * BUSCAR VEHICULO
         */
        const vehiculoSeleccionado =
            vehiculos.find(
                (v) =>
                    v.patente === patente
            );

        /**
         * ACTUALIZAR FORM
         */
        setFormData({

            ...formData,

            patente,

            vehiculo:
                vehiculoSeleccionado
                    ?.vehiculo || "",

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
     * GUARDAR REVISION FIREBASE
     * =====================================================
     */
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            /**
             * LOADING ON
             */
            setLoading(true);

            /**
             * =====================================================
             * GUARDAR EN FIRESTORE
             * =====================================================
             */
            await addDoc(

                collection(
                    db,
                    "revisionesTecnicas"
                ),

                {

                    patente:
                        formData.patente,

                    vehiculo:
                        formData.vehiculo,

                    fechaRevision:
                        formData.fechaRevision,

                    fechaGases:
                        formData.fechaGases,

                    observacion:
                        formData.observacion,

                    estado:
                        formData.estado,

                    createdAt:
                        new Date(),

                }

            );

            /**
             * =====================================================
             * RESET FORM
             * =====================================================
             */
            setFormData({

                patente: "",

                vehiculo: "",

                fechaRevision: "",

                fechaGases: "",

                observacion: "",

                estado: "VIGENTE",

            });

            /**
             * ALERT EXITO
             */
            alert(
                "Revisión registrada correctamente"
            );

        }
        catch (error) {

            console.error(
                "Error registrando revisión:",
                error
            );

            alert(
                "Error registrando revisión"
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

                {/* TITULO */}

                <h3 className="fw-bold mb-4">
                    ➕ Nueva Revisión Técnica
                </h3>

                <form onSubmit={handleSubmit}>

                    {/* PATENTE */}

                    <div className="mb-3">

                        <label className="form-label">
                            Patente
                        </label>

                        <select
                            className="form-select"
                            value={formData.patente}
                            onChange={handlePatenteChange}
                        >

                            <option value="">
                                -- Seleccionar patente --
                            </option>

                            {
                                vehiculos.map(
                                    (vehiculo) => (

                                        <option
                                            key={vehiculo.id}
                                            value={vehiculo.patente}
                                        >
                                            {
                                                vehiculo.patente
                                            }
                                        </option>

                                    )
                                )
                            }

                        </select>

                    </div>

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

                    {/* FECHA REVISION */}

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

                    {/* FECHA GASES */}

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
                            placeholder="Detalle revisión..."
                            value={formData.observacion}
                            onChange={handleChange}
                        />

                    </div>

                    {/* BOTON */}

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Guardando..."
                                : "Guardar Revisión"
                        }

                    </button>

                </form>

            </div>

        </div>

    );
}