// src/components/ActualizarFalla.jsx

import { useState }
    from "react";

import {
    doc,
    updateDoc,
    collection,
    addDoc,
} from "firebase/firestore";

import { db }
    from "../services/firebase";

/**
 * =====================================================
 * COMPONENTE: ActualizarFalla
 * =====================================================
 *
 * Actualiza:
 * - Estado falla
 * - Comentario técnico
 * - Historial Firestore
 *
 * Props:
 * - fallaId
 * - estadoActual
 *
 * =====================================================
 */

export default function ActualizarFalla({

    fallaId,

    estadoActual,

}) {

    /**
     * =====================================================
     * ESTADOS
     * =====================================================
     */

    // Estado seleccionado
    const [estado, setEstado] =
        useState(
            estadoActual || "PENDIENTE"
        );

    // Comentario técnico
    const [comentario, setComentario] =
        useState("");

    // Loading botón
    const [loading, setLoading] =
        useState(false);

    /**
     * =====================================================
     * GUARDAR ACTUALIZACION
     * =====================================================
     *
     * Actualiza:
     * - estado documento principal
     *
     * Guarda:
     * - historial cambios
     *
     * =====================================================
     */
    const handleSubmit =
        async (e) => {

            e.preventDefault();

            /**
             * Validación comentario
             */
            if (!comentario) {

                alert(
                    "Debe ingresar comentario técnico"
                );

                return;
            }

            try {

                /**
                 * Loading ON
                 */
                setLoading(true);

                /**
                 * =====================================================
                 * REFERENCIA FALLA
                 * =====================================================
                 */
                const fallaRef =
                    doc(

                        db,

                        "fallas",

                        fallaId

                    );

                /**
                 * =====================================================
                 * ACTUALIZAR ESTADO PRINCIPAL
                 * =====================================================
                 */
                await updateDoc(

                    fallaRef,

                    {

                        estado,

                    }

                );

                /**
                 * =====================================================
                 * CREAR REGISTRO HISTORIAL
                 * =====================================================
                 */
                await addDoc(

                    collection(

                        db,

                        "fallas",

                        fallaId,

                        "historial"

                    ),

                    {

                        fecha:
                            new Date()
                                .toLocaleDateString(),

                        estado,

                        comentario,

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
                    "Estado actualizado correctamente"
                );

                /**
                 * =====================================================
                 * LIMPIAR COMENTARIO
                 * =====================================================
                 */
                setComentario("");

            }
            catch (error) {

                console.error(
                    "Error actualizando falla:",
                    error
                );

                alert(
                    "Error actualizando falla"
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
                    🔧 Actualizar Estado
                </h3>

                <form onSubmit={handleSubmit}>

                    {/* ===================================================== */}
                    {/* ESTADO */}
                    {/* ===================================================== */}

                    <div className="mb-3">

                        <label className="form-label">
                            Estado
                        </label>

                        <select
                            className="form-select"
                            value={estado}
                            onChange={(e) =>
                                setEstado(
                                    e.target.value
                                )
                            }
                        >

                            <option value="PENDIENTE">
                                PENDIENTE
                            </option>

                            <option value="EN REPARACION">
                                EN REPARACION
                            </option>

                            <option value="DETENIDO">
                                DETENIDO
                            </option>

                            <option value="SOLUCIONADO">
                                SOLUCIONADO
                            </option>

                        </select>

                    </div>

                    {/* ===================================================== */}
                    {/* COMENTARIO */}
                    {/* ===================================================== */}

                    <div className="mb-4">

                        <label className="form-label">
                            Comentario técnico
                        </label>

                        <textarea
                            className="form-control"
                            rows="4"
                            placeholder="Detalle reparación o diagnóstico..."
                            value={comentario}
                            onChange={(e) =>
                                setComentario(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    {/* ===================================================== */}
                    {/* BOTON */}
                    {/* ===================================================== */}

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Guardando..."
                                : "Guardar Actualización"
                        }

                    </button>

                </form>

            </div>

        </div>

    );
}