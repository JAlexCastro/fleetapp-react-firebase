
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
  from "./pages/KILOMETRAJES/Dashboard";

import LoginPage
  from "./pages/LoginPage";

import RegisterVehiculoPage
  from "./pages/VEHICULOS/RegisterVehiculoPage";

import ActualizacionKMPage
  from "./pages/KILOMETRAJES/ActualizacionKMPage";

import RegistroFallaPage
  from "./pages/FALLAS/RegistroFallaPage";

import ListaFallasPage
  from "./pages/FALLAS/ListaFallasPage";

import DetalleFallaPage
  from "./pages/FALLAS/DetalleFallaPage";

import ModificarVehiculo from "./components/VEHICULOS/ModificarVehiculo"

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