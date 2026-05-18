// src/components/NuevoVehiculo.jsx

import { useState } from "react";
import { db } from "../services/firebase";

import {
    collection,
    addDoc,
}
    from "firebase/firestore";

/**
 * =====================================================
 * COMPONENTE: NuevoVehiculo
 * =====================================================
 *
 * Permite registrar nuevos vehículos
 * dentro de la flota.
 *
 * Retorna:
 * Formulario de creación vehículo
 *
 * =====================================================
 */

export default function NuevoVehiculo() {

    /**
     * Estado formulario
     */
    const [formData, setFormData] =
        useState({
            vehiculo: "",
            patente: "",
            kmActual: "",
            kmMantenimiento: "",
            conductor: "",
        });

    /**
     * =====================================================
     * ACTUALIZAR INPUTS
     * =====================================================
     *
     * Actualiza los valores del formulario
     *
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
     * GUARDAR VEHICULO
     * =====================================================
     *
     * Luego esto se conectará
     * con Firebase Firestore.
     *
     * =====================================================
     */
    const handleSubmit = async (e) => {

        /**
         * Evita recarga formulario
         */
        e.preventDefault();

        try {

            /**
             * =====================================================
             * GUARDAR EN FIRESTORE
             * =====================================================
             */
            await addDoc(

                collection(db, "vehiculos"),

                {

                    vehiculo:
                        formData.vehiculo,

                    patente:
                        formData.patente,

                    kmActual:
                        Number(formData.kmActual),

                    kmMantenimiento:
                        Number(formData.kmMantenimiento),

                    conductor:
                        formData.conductor,

                    fechaUltimaToma:
                        new Date()
                            .toLocaleDateString(),

                    createdAt:
                        new Date(),

                }

            );

            /**
             * =====================================================
             * RESET FORMULARIO
             * =====================================================
             */
            setFormData({

                vehiculo: "",
                patente: "",
                kmActual: "",
                kmMantenimiento: "",
                conductor: "",

            });

            alert(
                "Vehículo registrado correctamente"
            );

        }
        catch (error) {

            console.error(
                "Error Firebase:",
                error
            );

            alert(
                "Error registrando vehículo"
            );
        }
    };

    return (

        <div className="card shadow-sm border-0">

            <div className="card-body p-4">

                <h3 className="fw-bold mb-4">
                    ➕ Nuevo Vehículo
                </h3>

                <form onSubmit={handleSubmit}>

                    {/* VEHICULO */}

                    <div className="mb-3">

                        <label className="form-label">
                            Vehículo
                        </label>

                        <input
                            type="text"
                            name="vehiculo"
                            className="form-control"
                            placeholder="Ej: Volvo FH16"
                            value={formData.vehiculo}
                            onChange={handleChange}
                        />

                    </div>

                    {/* PATENTE */}

                    <div className="mb-3">

                        <label className="form-label">
                            Patente
                        </label>

                        <input
                            type="text"
                            name="patente"
                            className="form-control"
                            placeholder="AB-CD-12"
                            value={formData.patente}
                            onChange={handleChange}
                        />

                    </div>

                    {/* KM ACTUAL */}

                    <div className="mb-3">

                        <label className="form-label">
                            KM Actual
                        </label>

                        <input
                            type="number"
                            name="kmActual"
                            className="form-control"
                            value={formData.kmActual}
                            onChange={handleChange}
                        />

                    </div>

                    {/* KM MANTENIMIENTO */}

                    <div className="mb-3">

                        <label className="form-label">
                            KM Mantenimiento
                        </label>

                        <input
                            type="number"
                            name="kmMantenimiento"
                            className="form-control"
                            value={formData.kmMantenimiento}
                            onChange={handleChange}
                        />

                    </div>

                    {/* CONDUCTOR */}

                    <div className="mb-4">

                        <label className="form-label">
                            Conductor asignado
                        </label>

                        <input
                            type="text"
                            name="conductor"
                            className="form-control"
                            placeholder="Juan Pérez"
                            value={formData.conductor}
                            onChange={handleChange}
                        />

                    </div>

                    {/* BOTON */}

                    <button
                        type="submit"
                        className="btn btn-success w-100"
                    >
                        Guardar Vehículo
                    </button>

                </form>

            </div>

        </div>

    );
}