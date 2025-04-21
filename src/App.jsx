// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "./context/UserContext";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import LandingPage from "./pages/LandingPage";
import Suporte from "./pages/Suporte";
import ServicosCliente from "./pages/ServicosCliente";
import DashboardEmpreendedor from "./pages/DashboardEmpreendedor";
import Endereco from "./pages/Endereco";
import MeusServicos from "./pages/MeusServicos";


const RotaPrivada = ({ children, tipo }) => {
  const { usuario } = useUser();
  if (!usuario) return <Navigate to="/login" />;
  if (tipo && usuario.tipo !== tipo) return <Navigate to="/" />;
  return children;
};

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/suporte" element={<Suporte />} />
          <Route path="/endereco" element={<Endereco />} />
        
<Route path="/meus-servicos" element={<MeusServicos />} />
          <Route
            path="/cliente"
            element={
              <RotaPrivada tipo="cliente">
                <ServicosCliente />
              </RotaPrivada>
            }
          />
          <Route
            path="/empreendedor"
            element={
              <RotaPrivada tipo="empreendedor">
                <DashboardEmpreendedor />
              </RotaPrivada>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}
