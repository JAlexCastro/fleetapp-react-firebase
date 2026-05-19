import { useState }
    from "react";

import ListaRevisiones
    from "../../components/RT/ListaRevisiones";

import NuevaRevision
    from "../../components/RT/NuevaRevision";

import ActualizarRevision
    from "../../components/RT/ActualizarRevision";

export default function RevisionTecnicaPage() {

    /**
     * TAB ACTIVO
     */
    const [activeTab, setActiveTab] =
        useState("lista");

    return (

        <div className="container py-4">

            {/* HEADER */}

            <div className="mb-4">

                <h1 className="fw-bold">
                    📋 Gestión Revisiones Técnicas
                </h1>

                <p className="text-muted">
                    Control revisión técnica y gases
                </p>

            </div>

            {/* SUBMENU */}

            <div className="d-flex gap-2 mb-4 flex-wrap">

                <button
                    className={`btn ${activeTab === "lista"
                        ? "btn-dark"
                        : "btn-outline-dark"
                        }`}
                    onClick={() =>
                        setActiveTab("lista")
                    }
                >
                    Ver Vencimientos
                </button>

                <button
                    className={`btn ${activeTab === "nuevo"
                        ? "btn-primary"
                        : "btn-outline-primary"
                        }`}
                    onClick={() =>
                        setActiveTab("nuevo")
                    }
                >
                    Ingresar
                </button>

                <button
                    className={`btn ${activeTab === "actualizar"
                        ? "btn-warning"
                        : "btn-outline-warning"
                        }`}
                    onClick={() =>
                        setActiveTab("actualizar")
                    }
                >
                    Actualizar
                </button>

            </div>

            {/* CONTENIDO */}

            {
                activeTab === "lista" &&
                <ListaRevisiones />
            }

            {
                activeTab === "nuevo" &&
                <NuevaRevision />
            }

            {
                activeTab === "actualizar" &&
                <ActualizarRevision />
            }

        </div>

    );
}