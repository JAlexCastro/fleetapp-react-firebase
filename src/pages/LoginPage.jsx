
import { useState }
    from "react";

import {
    signInWithEmailAndPassword,
}
    from "firebase/auth";

import {
    useNavigate,
}
    from "react-router-dom";

import { auth }
    from "../services/firebase";

/**
 * =====================================================
 * PAGINA LOGIN
 * =====================================================
 */

export default function LoginPage() {

    const navigate =
        useNavigate();

    /**
     * Estados
     */
    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    /**
     * LOGIN
     */
    const handleLogin =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                await signInWithEmailAndPassword(

                    auth,

                    email,

                    password

                );

                navigate("/");

            }
            catch (error) {

                console.error(error);

                alert(
                    "Credenciales incorrectas"
                );
            }
            finally {

                setLoading(false);
            }
        };

    return (

        <div className="container d-flex justify-content-center align-items-center vh-100">

            <div
                className="card shadow border-0"
                style={{
                    width: "400px",
                }}
            >

                <div className="card-body p-4">

                    <h2 className="fw-bold text-center mb-4">

                        🚛 FleetApp

                    </h2>

                    <form
                        onSubmit={
                            handleLogin
                        }
                    >

                        <div className="mb-3">

                            <label className="form-label">
                                Correo
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="mb-4">

                            <label className="form-label">
                                Contraseña
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <button
                            className="btn btn-dark w-100"
                            disabled={loading}
                        >

                            {
                                loading
                                    ? "Ingresando..."
                                    : "Ingresar"
                            }

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );
}