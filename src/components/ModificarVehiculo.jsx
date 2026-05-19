// src/components/ModificarVehiculo.jsx

import {
    useEffect,
    useState,
} from "react";

import {
    collection,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

import { db }
    from "../services/firebase";

/**
 * =====================================================
 * COMPONENTE: ModificarVehiculo
 * =====================================================
 *
 * Permite:
 * - Seleccionar vehículo
 * - Modificar datos
 * - Eliminar vehículo
 *
 * =====================================================
 */

export default function ModificarVehiculo() {

    /**
     * =====================================================
     * ESTADOS
     * =====================================================
     */

    // Vehículos
    const [trucks, setTrucks] =
        useState([]);

    // Vehículo seleccionado
    const [selectedTruck, setSelectedTruck] =
        useState("");

    // Loading
    const [loading, setLoading] =
        useState(false);

    // Datos formulario
    const [formData, setFormData] =
        useState({

            vehiculo: "",

            patente: "",

            conductor: "",

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
                     * QUERY FIREBASE
                     */
                    const querySnapshot =
                        await getDocs(

                            collection(
                                db,
                                "vehiculos"
                            )

                        );

                    /**
                     * MAP DOCUMENTOS
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
                     * GUARDAR ESTADO
                     */
                    setTrucks(lista);

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
     * SELECCIONAR VEHICULO
     * =====================================================
     */
    const handleSelectTruck =
        (e) => {

            /**
             * ID VEHICULO
             */
            const truckId =
                e.target.value;

            /**
             * SET SELECT
             */
            setSelectedTruck(
                truckId
            );

            /**
             * BUSCAR VEHICULO
             */
            const truck =
                trucks.find(
                    (t) =>
                        t.id === truckId
                );

            /**
             * VALIDACION
             */
            if (!truck) return;

            /**
             * CARGAR FORM
             */
            setFormData({

                vehiculo:
                    truck.vehiculo,

                patente:
                    truck.patente,

                conductor:
                    truck.conductor,

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
     * ACTUALIZAR VEHICULO
     * =====================================================
     */
    const handleUpdate =
        async (e) => {

            e.preventDefault();

            /**
             * VALIDACION
             */
            if (!selectedTruck) {

                alert(
                    "Debe seleccionar vehículo"
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
                const vehiculoRef =
                    doc(

                        db,

                        "vehiculos",

                        selectedTruck

                    );

                /**
                 * UPDATE FIREBASE
                 */
                await updateDoc(

                    vehiculoRef,

                    {

                        vehiculo:
                            formData.vehiculo,

                        conductor:
                            formData.conductor,

                        updatedAt:
                            new Date(),

                    }

                );

                /**
                 * ALERT
                 */
                alert(
                    "Vehículo actualizado correctamente"
                );

            }
            catch (error) {

                console.error(
                    "Error actualizando vehículo:",
                    error
                );

                alert(
                    "Error actualizando vehículo"
                );
            }
            finally {

                /**
                 * LOADING OFF
                 */
                setLoading(false);
            }
        };

    /**
     * =====================================================
     * ELIMINAR VEHICULO
     * =====================================================
     */
    const handleDelete =
        async () => {

            /**
             * VALIDACION
             */
            if (!selectedTruck) {

                alert(
                    "Debe seleccionar vehículo"
                );

                return;
            }

            /**
             * CONFIRMACION
             */
            const confirmar =
                window.confirm(

                    "¿Eliminar vehículo?"

                );

            /**
             * CANCELAR
             */
            if (!confirmar) return;

            try {

                /**
                 * LOADING ON
                 */
                setLoading(true);

                /**
                 * DELETE FIREBASE
                 */
                await deleteDoc(

                    doc(
                        db,
                        "vehiculos",
                        selectedTruck
                    )

                );

                /**
                 * FILTRAR LISTA
                 */
                const nuevaLista =
                    trucks.filter(
                        (truck) =>
                            truck.id !==
                            selectedTruck
                    );

                /**
                 * ACTUALIZAR ESTADO
                 */
                setTrucks(
                    nuevaLista
                );

                /**
                 * RESET FORM
                 */
                setSelectedTruck("");

                setFormData({

                    vehiculo: "",

                    patente: "",

                    conductor: "",

                });

                /**
                 * ALERT
                 */
                alert(
                    "Vehículo eliminado"
                );

            }
            catch (error) {

                console.error(
                    "Error eliminando vehículo:",
                    error
                );

                alert(
                    "Error eliminando vehículo"
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
                    🚛 Modificar Vehículo
                </h3>

                {/* ===================================================== */}
                {/* SELECT */}
                {/* ===================================================== */}

                <div className="mb-4">

                    <label className="form-label">
                        Seleccionar vehículo
                    </label>

                    <select
                        className="form-select"
                        value={selectedTruck}
                        onChange={handleSelectTruck}
                    >

                        <option value="">
                            -- Seleccionar --
                        </option>

                        {
                            trucks.map(
                                (truck) => (

                                    <option
                                        key={truck.id}
                                        value={truck.id}
                                    >
                                        {
                                            truck.patente
                                        }
                                        {" - "}
                                        {
                                            truck.vehiculo
                                        }
                                    </option>

                                )
                            )
                        }

                    </select>

                </div>

                {/* ===================================================== */}
                {/* FORM */}
                {/* ===================================================== */}

                {
                    selectedTruck && (

                        <form onSubmit={handleUpdate}>

                            {/* VEHICULO */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Nombre Camión
                                </label>

                                <input
                                    type="text"
                                    name="vehiculo"
                                    className="form-control"
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
                                    className="form-control"
                                    value={formData.patente}
                                    readOnly
                                />

                            </div>

                            {/* CONDUCTOR */}

                            <div className="mb-4">

                                <label className="form-label">
                                    Conductor
                                </label>

                                <input
                                    type="text"
                                    name="conductor"
                                    className="form-control"
                                    value={formData.conductor}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* BOTONES */}

                            <div className="d-flex gap-2">

                                <button
                                    type="submit"
                                    className="btn btn-warning w-100"
                                    disabled={loading}
                                >

                                    {
                                        loading
                                            ? "Actualizando..."
                                            : "Actualizar"
                                    }

                                </button>

                                <button
                                    type="button"
                                    className="btn btn-danger w-100"
                                    onClick={handleDelete}
                                    disabled={loading}
                                >
                                    Eliminar
                                </button>

                            </div>

                        </form>

                    )
                }

            </div>

        </div>

    );
}