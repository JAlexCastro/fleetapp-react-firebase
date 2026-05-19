
import {
  Routes,
  Route,
}
  from "react-router-dom";

import ProtectedRoute
  from "./routes/ProtectedRoute";

import Navbar
  from "./components/Navbar";

import Dashboard
  from "./pages/Dashboard";

import LoginPage
  from "./pages/LoginPage";

import RegisterVehiculoPage
  from "./pages/RegisterVehiculoPage";

import ActualizacionKMPage
  from "./pages/ActualizacionKMPage";

import RegistroFallaPage
  from "./pages/RegistroFallaPage";

import ListaFallasPage
  from "./pages/ListaFallasPage";

import DetalleFallaPage
  from "./pages/DetalleFallaPage";

import ModificarVehiculo from "./components/ModificarVehiculo"

// App.jsx

import RevisionTecnicaPage from "./pages/RT/RevisionTecnicaPage";

export default function App() {

  return (

    <Routes>

      {/* LOGIN */}

      <Route
        path="/login"
        element={
          <LoginPage />
        }
      />

      {/* APP PRIVADA */}

      <Route
        path="/*"
        element={

          <ProtectedRoute>

            <Navbar />

            <Routes>

              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/register"
                element={
                  <RegisterVehiculoPage />
                }
              />

              <Route
                path="/modificar_vehiculo"
                element={
                  <ModificarVehiculo />
                }
              />

              <Route
                path="/update"
                element={
                  <ActualizacionKMPage />
                }
              />

              <Route
                path="/fallas"
                element={
                  <ListaFallasPage />
                }
              />

              <Route
                path="/registro-falla"
                element={
                  <RegistroFallaPage />
                }
              />

              <Route
                path="/falla/:id"
                element={
                  <DetalleFallaPage />
                }
              />
              <Route
                path="/revisiones"
                element={<RevisionTecnicaPage />}
              />

            </Routes>

          </ProtectedRoute>

        }
      />

    </Routes>

  );
}