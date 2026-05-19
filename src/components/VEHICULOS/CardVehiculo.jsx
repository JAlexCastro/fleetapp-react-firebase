import { Link } from "react-router-dom";

/**
 * =====================================================
 * COMPONENTE: CardVehiculo
 * =====================================================
 */

export default function CardVehiculo({
    id,
    vehiculo,
    patente,
    kmActual,
    kmMantenimiento,
    fechaUltimaToma,
    conductor,
}) {

    /**
     * =====================================================
     * CALCULAR KM RESTANTE
     * =====================================================
     */
    const kmRestante =
        kmMantenimiento - kmActual;

    /**
     * =====================================================
     * ESTADO VEHICULO
     * =====================================================
     */
    let estado = "";
    let badgeColor = "";

    if (kmRestante <= 0) {

        estado = "VENCIDO";
        badgeColor = "danger";

    }
    else if (kmRestante <= 2000) {

        estado = "POR VENCER";
        badgeColor = "warning";

    }
    else {

        estado = "OK";
        badgeColor = "success";

    }

    return (

        <div className="card shadow-sm border-0 h-100">

            <div className="card-body p-4">

                {/* HEADER */}

                <div className="d-flex justify-content-between align-items-start mb-3">

                    <div>

                        <h4 className="fw-bold mb-1">
                            🚛 {vehiculo}
                        </h4>

                        <p className="text-muted mb-0">
                            {patente}
                        </p>

                    </div>

                    <span
                        className={`badge bg-${badgeColor}`}
                    >
                        {estado}
                    </span>

                </div>

                {/* INFORMACION */}

                <div className="row">

                    <div className="col-6 mb-3">

                        <small className="text-muted d-block">
                            KM Actual
                        </small>

                        <span className="fw-semibold">
                            {kmActual.toLocaleString()}
                        </span>

                    </div>

                    <div className="col-6 mb-3">

                        <small className="text-muted d-block">
                            Mantención
                        </small>

                        <span className="fw-semibold">
                            {kmMantenimiento.toLocaleString()}
                        </span>

                    </div>

                    <div className="col-6">

                        <small className="text-muted d-block">
                            KM Restante
                        </small>

                        <span className="fw-semibold">
                            {kmRestante.toLocaleString()}
                        </span>

                    </div>

                    <div className="col-6">

                        <small className="text-muted d-block">
                            Conductor
                        </small>

                        <span className="fw-semibold">
                            {conductor}
                        </span>

                    </div>

                </div>

                <hr />

                {/* FOOTER */}

                <div className="d-flex justify-content-between align-items-center">

                    <small className="text-muted">
                        📅 {fechaUltimaToma}
                    </small>


                </div>

            </div>

        </div>

    );
}