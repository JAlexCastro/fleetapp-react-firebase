// src/components/ActualizacionKM.jsx

import { useState } from "react";

import {
    doc,
    updateDoc,
    collection,
    addDoc,
} from "firebase/firestore";

import { db } from "../services/firebase";

/**
 * =====================================================
 * COMPONENTE: ActualizacionKM
 * =====================================================
 *
 * Permite:
 * - Seleccionar vehículo
 * - Actualizar KM actual
 * - Calcular KM restante
 * - Mostrar estado mantenimiento
 * - Guardar actualización en Firebase
 * - Guardar historial KM
 *
 * Props:
 * - trucks
 *
 * =====================================================
 */

export default function ActualizacionKM({
    trucks,
}) {

    /**
     * =====================================================
     * ESTADOS
     * =====================================================
     */

    // Vehículo seleccionado
    const [selectedTruck, setSelectedTruck] =
        useState("");

    // KM ingresado
    const [kmInput, setKmInput] =
        useState("");

    // Resultado cálculo
    const [result, setResult] =
        useState(null);

    // Loading botón
    const [loading, setLoading] =
        useState(false);

    /**
     * =====================================================
     * CALCULAR ESTADO VEHICULO
     * =====================================================
     *
     * Calcula:
     * - KM restante
     * - Estado mantenimiento
     *
     * =====================================================
     */
    const handleCalculate = () => {

        /**
         * Buscar vehículo seleccionado
         */
        const truck = trucks.find(
            (t) => t.id === selectedTruck
        );

        /**
         * Validación básica
         */
        if (!truck || !kmInput) {

            alert(
                "Debe seleccionar vehículo e ingresar KM"
            );

            return;
        }

        /**
         * Convertir input a número
         */
        const kmActual =
            Number(kmInput);

        /**
         * Calcular KM restante
         */
        const kmRestante =
            truck.kmMantenimiento -
            kmActual;

        /**
         * Variables estado
         */
        let estado = "";
        let color = "";

        /**
         * Determinar estado mantenimiento
         */
        if (kmRestante <= 0) {

            estado = "VENCIDO";
            color = "danger";

        }
        else if (kmRestante <= 500) {

            estado = "PRÓXIMO";
            color = "warning";

        }
        else {

            estado = "OK";
            color = "success";

        }

        /**
         * =====================================================
         * GUARDAR RESULTADO
         * =====================================================
         */
        setResult({

            id:
                truck.id,

            vehiculo:
                truck.vehiculo,

            patente:
                truck.patente,

            conductor:
                truck.conductor,

            kmAnterior:
                truck.kmActual,

            kmActual,

            kmMantenimiento:
                truck.kmMantenimiento,

            kmRestante,

            estado,

            color,

            fecha:
                new Date()
                    .toLocaleDateString(),

        });
    };

    /**
     * =====================================================
     * GUARDAR ACTUALIZACION FIRESTORE
     * =====================================================
     *
     * Actualiza:
     * - kmActual
     * - fechaUltimaToma
     *
     * Guarda historial:
     * - km anterior
     * - km nuevo
     * - fecha
     *
     * =====================================================
     */
    const handleSave = async () => {

        try {

            /**
             * Loading ON
             */
            setLoading(true);

            /**
             * =====================================================
             * REFERENCIA DOCUMENTO
             * =====================================================
             */
            const vehiculoRef =
                doc(
                    db,
                    "vehiculos",
                    result.id
                );

            /**
             * =====================================================
             * ACTUALIZAR VEHICULO
             * =====================================================
             */
            await updateDoc(

                vehiculoRef,

                {

                    kmActual:
                        result.kmActual,

                    fechaUltimaToma:
                        result.fecha,

                }

            );

            /**
             * =====================================================
             * GUARDAR HISTORIAL KM
             * =====================================================
             */
            await addDoc(

                collection(

                    db,

                    "vehiculos",

                    result.id,

                    "historialKM"

                ),

                {

                    fecha:
                        result.fecha,

                    kmAnterior:
                        result.kmAnterior,

                    kmNuevo:
                        result.kmActual,

                    estado:
                        result.estado,

                    createdAt:
                        new Date(),

                }

            );

            /**
             * =====================================================
             * MENSAJE EXITO
             * =====================================================
             */
            alert(
                "KM actualizado correctamente"
            );

            /**
             * =====================================================
             * RESET FORMULARIO
             * =====================================================
             */
            setSelectedTruck("");

            setKmInput("");

            setResult(null);

        }
        catch (error) {

            console.error(
                "Error actualizando:",
                error
            );

            alert(
                "Error al actualizar KM"
            );
        }
        finally {

            /**
             * Loading OFF
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
                    🚛 Actualizar KM Vehículo
                </h3>

                {/* ===================================================== */}
                {/* SELECT VEHICULO */}
                {/* ===================================================== */}

                <div className="mb-3">

                    <label className="form-label">
                        Vehículo
                    </label>

                    <select
                        className="form-select"
                        value={selectedTruck}
                        onChange={(e) =>
                            setSelectedTruck(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            -- Seleccionar --
                        </option>

                        {
                            trucks.map((truck) => (

                                <option
                                    key={truck.id}
                                    value={truck.id}
                                >
                                    {truck.vehiculo}
                                    {" - "}
                                    {truck.patente}
                                </option>

                            ))
                        }

                    </select>

                </div>

                {/* ===================================================== */}
                {/* INPUT KM */}
                {/* ===================================================== */}

                <div className="mb-4">

                    <label className="form-label">
                        Nuevo KM Actual
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        placeholder="Ej: 145000"
                        value={kmInput}
                        onChange={(e) =>
                            setKmInput(
                                e.target.value
                            )
                        }
                    />

                </div>

                {/* ===================================================== */}
                {/* BOTON CALCULAR */}
                {/* ===================================================== */}

                <button
                    className="btn btn-dark w-100"
                    onClick={handleCalculate}
                >
                    Calcular Estado
                </button>

                {/* ===================================================== */}
                {/* RESULTADO */}
                {/* ===================================================== */}

                {
                    result && (

                        <div
                            className={`alert alert-${result.color} mt-4`}
                        >

                            <h5 className="fw-bold mb-3">
                                Resultado
                            </h5>

                            <div className="row">

                                <div className="col-md-6 mb-2">

                                    <strong>
                                        Vehículo:
                                    </strong>

                                    <br />

                                    {result.vehiculo}

                                </div>

                                <div className="col-md-6 mb-2">

                                    <strong>
                                        Patente:
                                    </strong>

                                    <br />

                                    {result.patente}

                                </div>

                                <div className="col-md-6 mb-2">

                                    <strong>
                                        Conductor:
                                    </strong>

                                    <br />

                                    {result.conductor}

                                </div>

                                <div className="col-md-6 mb-2">

                                    <strong>
                                        Fecha:
                                    </strong>

                                    <br />

                                    {result.fecha}

                                </div>

                                <div className="col-md-6 mb-2">

                                    <strong>
                                        KM Anterior:
                                    </strong>

                                    <br />

                                    {result.kmAnterior.toLocaleString()}

                                </div>

                                <div className="col-md-6 mb-2">

                                    <strong>
                                        Nuevo KM:
                                    </strong>

                                    <br />

                                    {result.kmActual.toLocaleString()}

                                </div>

                                <div className="col-md-6 mb-2">

                                    <strong>
                                        Próximo mantenimiento:
                                    </strong>

                                    <br />

                                    {result.kmMantenimiento.toLocaleString()}

                                </div>

                                <div className="col-md-6 mb-2">

                                    <strong>
                                        KM restante:
                                    </strong>

                                    <br />

                                    {result.kmRestante.toLocaleString()}

                                </div>

                                <div className="col-md-6 mb-2">

                                    <strong>
                                        Estado:
                                    </strong>

                                    <br />

                                    {result.estado}

                                </div>

                            </div>

                            {/* ===================================================== */}
                            {/* BOTON GUARDAR */}
                            {/* ===================================================== */}

                            <button
                                className="btn btn-primary mt-4 w-100"
                                onClick={handleSave}
                                disabled={loading}
                            >

                                {
                                    loading
                                        ? "Guardando..."
                                        : "Guardar Actualización"
                                }

                            </button>

                        </div>

                    )
                }

            </div>

        </div>

    );
}