// src/components/CardFalla.jsx

/**
 * =====================================================
 * COMPONENTE: CardFalla
 * =====================================================
 *
 * Muestra información resumida
 * de una falla registrada.
 *
 * =====================================================
 */
import { Link } from "react-router-dom";

export default function CardFalla({

    id,

    patente,
    vehiculo,
    fallo,
    fecha,
    observacion,
    estado,

}) {

    /**
     * =====================================================
     * COLOR ESTADO
     * =====================================================
     */
    const badgeColor =
        estado === "SOLUCIONADO"
            ? "success"
            : "danger";

    return (

        <div className="card shadow-sm border-0 h-100">

            <div className="card-body p-4">

                {/* HEADER */}

                <div className="d-flex justify-content-between align-items-start mb-3">

                    <div>

                        <h4 className="fw-bold mb-1">
                            🚨 {fallo}
                        </h4>

                        <p className="text-muted mb-0">
                            {vehiculo}
                        </p>

                    </div>

                    <span
                        className={`badge bg-${badgeColor}`}
                    >
                        {estado}
                    </span>

                </div>

                {/* INFO */}

                <div className="mb-3">

                    <small className="text-muted d-block">
                        Patente
                    </small>

                    <span className="fw-semibold">
                        {patente}
                    </span>

                </div>

                <div className="mb-3">

                    <small className="text-muted d-block">
                        Observación
                    </small>

                    <span>
                        {observacion}
                    </span>

                </div>

                {/* FOOTER */}

                <hr />

                <div className="d-flex justify-content-between align-items-center">

                    <small className="text-muted">
                        📅 {fecha}
                    </small>

                    <Link
                        to={`/falla/${id}`}
                        className="btn btn-outline-dark btn-sm"
                    >
                        Ver detalle
                    </Link>
                </div>

            </div>

        </div>

    );
}