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

        <div
            className="
        card
        border-0
        shadow-sm
        h-100
        overflow-hidden
    "
            style={{
                background:
                    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                borderRadius: "18px",
            }}
        >

            {/* HEADER COLOR */}

            <div
                className="p-3"
                style={{
                    background:
                        "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                }}
            >

                <div className="d-flex justify-content-between align-items-start">

                    <div>

                        <h4 className="fw-bold text-white mb-1">
                            🚛 {vehiculo}
                        </h4>

                        <p className="text-light mb-0">
                            {patente}
                        </p>

                    </div>

                    <span
                        className={`badge bg-${badgeColor} px-3 py-2`}
                    >
                        {estado}
                    </span>

                </div>

            </div>

            {/* BODY */}

            <div className="card-body p-4">

                {/* INFORMACION */}

                <div className="row g-3">

                    {/* KM ACTUAL */}

                    <div className="col-6">

                        <div
                            className="p-3 rounded-4 h-100"
                            style={{
                                background: "#f1f5f9",
                            }}
                        >

                            <small className="text-muted d-block mb-1">
                                KM Actual
                            </small>

                            <span className="fw-bold fs-5">
                                {kmActual.toLocaleString()}
                            </span>

                        </div>

                    </div>

                    {/* MANTENCION */}

                    <div className="col-6">

                        <div
                            className="p-3 rounded-4 h-100"
                            style={{
                                background: "#fef3c7",
                            }}
                        >

                            <small className="text-muted d-block mb-1">
                                Mantención
                            </small>

                            <span className="fw-bold fs-5">
                                {kmMantenimiento.toLocaleString()}
                            </span>

                        </div>

                    </div>

                    {/* KM RESTANTE */}

                    <div className="col-6">

                        <div
                            className="p-3 rounded-4 h-100"
                            style={{
                                background: "#dcfce7",
                            }}
                        >

                            <small className="text-muted d-block mb-1">
                                KM Restante
                            </small>

                            <span className="fw-bold fs-5">
                                {kmRestante.toLocaleString()}
                            </span>

                        </div>

                    </div>

                    {/* CONDUCTOR */}

                    <div className="col-6">

                        <div
                            className="p-3 rounded-4 h-100"
                            style={{
                                background: "#e0f2fe",
                            }}
                        >

                            <small className="text-muted d-block mb-1">
                                Conductor
                            </small>

                            <span className="fw-bold">
                                {conductor}
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* FOOTER */}

            <div
                className="px-4 py-3 border-top"
                style={{
                    background: "#f8fafc",
                }}
            >

                <div className="d-flex justify-content-between align-items-center">

                    <small className="text-muted fw-semibold">
                        📅 Última actualización
                    </small>

                    <small className="fw-bold text-secondary">
                        {fechaUltimaToma}
                    </small>

                </div>

            </div>

        </div>

    );
}