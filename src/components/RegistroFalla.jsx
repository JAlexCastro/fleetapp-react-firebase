// src/components/RegistroFalla.jsx

import {
    useEffect,
    useState,
}
    from "react";

import {
    collection,
    addDoc,
    getDocs,
} from "firebase/firestore";

import { db }
    from "../services/firebase";

/**
 * =====================================================
 * COMPONENTE: RegistroFalla
 * =====================================================
 *
 * Permite registrar fallas:
 * - Seleccionando patente
 * - Obteniendo vehículo automáticamente
 *
 * Guarda:
 * - Falla principal
 * - Historial inicial
 *
 * =====================================================
 */

export default function RegistroFalla() {

    /**
     * =====================================================
     * ESTADO VEHICULOS
     * =====================================================
     */
    const [vehiculos, setVehiculos] =
        useState([]);

    /**
     * =====================================================
     * ESTADO FORMULARIO
     * =====================================================
     */
    const [formData, setFormData] =
        useState({

            patente: "",
            vehiculo: "",
            fallo: "",
            fecha: "",
            observacion: "",
            estado: "PENDIENTE",

        });

    /**
     * =====================================================
     * LOADING
     * =====================================================
     */
    const [loading, setLoading] =
        useState(false);

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
                    setVehiculos(data);

                }
                catch (error) {

                    console.error(
                        "Error cargando vehículos:",
                        error
                    );
                }
            };

        fetchVehiculos();

    }, []);

    /**
     * =====================================================
     * CAMBIO PATENTE
     * =====================================================
     *
     * Busca vehículo automáticamente
     * según patente seleccionada
     *
     * =====================================================
     */
    const handlePatenteChange =
        (e) => {

            const patente =
                e.target.value;

            /**
             * Buscar vehículo
             */
            const vehiculoEncontrado =
                vehiculos.find(

                    (v) =>
                        v.patente === patente

                );

            /**
             * Actualizar formulario
             */
            setFormData({

                ...formData,

                patente,

                vehiculo:
                    vehiculoEncontrado
                        ?.vehiculo || "",

            });
        };

    /**
     * =====================================================
     * ACTUALIZAR INPUTS
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
     * GUARDAR FALLA FIRESTORE
     * =====================================================
     */
    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                /**
                 * Loading ON
                 */
                setLoading(true);

                /**
                 * =====================================================
                 * GUARDAR FALLA PRINCIPAL
                 * =====================================================
                 */
                const fallaRef =
                    await addDoc(

                        collection(
                            db,
                            "fallas"
                        ),

                        {

                            patente:
                                formData.patente,

                            vehiculo:
                                formData.vehiculo,

                            fallo:
                                formData.fallo,

                            fecha:
                                formData.fecha,

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
                 * CREAR HISTORIAL INICIAL
                 * =====================================================
                 */
                await addDoc(

                    collection(

                        db,

                        "fallas",

                        fallaRef.id,

                        "historial"

                    ),

                    {

                        fecha:
                            formData.fecha,

                        estado:
                            formData.estado,

                        comentario:
                            "Falla registrada",

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

                    patente: "",
                    vehiculo: "",
                    fallo: "",
                    fecha: "",
                    observacion: "",
                    estado: "PENDIENTE",

                });

                /**
                 * =====================================================
                 * ALERT EXITO
                 * =====================================================
                 */
                alert(
                    "Falla registrada correctamente"
                );

            }
            catch (error) {

                console.error(
                    "Error registrando falla:",
                    error
                );

                alert(
                    "Error registrando falla"
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
                    🚨 Registro de Fallas
                </h3>

                <form onSubmit={handleSubmit}>

                    {/* ===================================================== */}
                    {/* PATENTE */}
                    {/* ===================================================== */}

                    <div className="mb-3">

                        <label className="form-label">
                            Patente
                        </label>

                        <select
                            className="form-select"
                            value={formData.patente}
                            onChange={
                                handlePatenteChange
                            }
                        >

                            <option value="">
                                -- Seleccionar patente --
                            </option>

                            {
                                vehiculos.map(
                                    (vehiculo) => (

                                        <option
                                            key={vehiculo.id}
                                            value={
                                                vehiculo.patente
                                            }
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

                    {/* ===================================================== */}
                    {/* VEHICULO AUTO */}
                    {/* ===================================================== */}

                    <div className="mb-3">

                        <label className="form-label">
                            Vehículo
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={formData.vehiculo}
                            disabled
                        />

                    </div>

                    {/* ===================================================== */}
                    {/* FALLO */}
                    {/* ===================================================== */}

                    <div className="mb-3">

                        <label className="form-label">
                            Fallo detectado
                        </label>

                        <input
                            type="text"
                            name="fallo"
                            className="form-control"
                            placeholder="Fuga aceite hidráulico"
                            value={formData.fallo}
                            onChange={handleChange}
                        />

                    </div>

                    {/* ===================================================== */}
                    {/* FECHA */}
                    {/* ===================================================== */}

                    <div className="mb-3">

                        <label className="form-label">
                            Fecha
                        </label>

                        <input
                            type="date"
                            name="fecha"
                            className="form-control"
                            value={formData.fecha}
                            onChange={handleChange}
                        />

                    </div>

                    {/* ===================================================== */}
                    {/* OBSERVACION */}
                    {/* ===================================================== */}

                    <div className="mb-3">

                        <label className="form-label">
                            Observación
                        </label>

                        <textarea
                            name="observacion"
                            className="form-control"
                            rows="4"
                            placeholder="Detalle del problema..."
                            value={formData.observacion}
                            onChange={handleChange}
                        />

                    </div>

                    {/* ===================================================== */}
                    {/* ESTADO */}
                    {/* ===================================================== */}

                    <div className="mb-4">

                        <label className="form-label">
                            Estado
                        </label>

                        <select
                            name="estado"
                            className="form-select"
                            value={formData.estado}
                            onChange={handleChange}
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
                    {/* BOTON */}
                    {/* ===================================================== */}

                    <button
                        type="submit"
                        className="btn btn-danger w-100"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Registrando..."
                                : "Registrar Falla"
                        }

                    </button>

                </form>

            </div>

        </div>

    );
}