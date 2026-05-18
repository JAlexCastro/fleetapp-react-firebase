export default function HistorialFalla({
    historial,
}) {

    return (

        <div className="card shadow-sm border-0 mt-4">

            <div className="card-body">

                <h4 className="fw-bold mb-4">
                    📋 Historial
                </h4>

                {
                    historial.map((item, index) => (

                        <div
                            key={index}
                            className="border-start border-3 ps-3 mb-4"
                        >

                            <h6 className="fw-bold">
                                {item.estado}
                            </h6>

                            <small className="text-muted">
                                {item.fecha}
                            </small>

                            <p className="mb-0 mt-2">
                                {item.comentario}
                            </p>

                        </div>

                    ))
                }

            </div>

        </div>

    );
}