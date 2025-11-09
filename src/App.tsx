import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- Contexto ---
import { AuthProvider } from './context/AuthContext';

// --- Rutas protegidas ---
import { ProtectedRoute } from './components/view/landing/auth/login/ProtectedRoute';
import { RoleBasedRoute } from './components/view/landing/auth/login/RoleBasedRoute';
import { ROLES } from './types/user.types';

// --- Layouts ---
import LandingLayout from './layouts/Landing/LandingLayout';
import UsuariosLayout from './layouts/Usuarios/UsuariosLayout';
import AgricultorLayout from './layouts/Usuarios/Agricultores/AgricultorLayout';
import AuditorLayout from './layouts/Usuarios/Auditores/AuditorLayout';
import DistribuidorLayout from './layouts/Usuarios/Distribuidores/DistribuidorLayout';
import LogisticaLayout from './layouts/Usuarios/Logistica/LogisticaLayout';

// --- Vistas Landing ---
import Inicio from './view/landing/Inicio/Inicio';
import SobreNosotros from './view/landing/Sobrenosotros/SobreNosotros';
import Contactos from './view/landing/Contactos/Contactos';
import Login from './view/landing/auth/login/Login';
import Register from './view/landing/auth/regiter/Register';

// --- Vistas Usuarios ---
import Administradores from './view/Usurios/Adminitradores/Administradores';
import Agricultores from './view/Usurios/Agricultores/Agricultores';

// --- Vistas Agricultor (sub-rutas) ---
import CrearOferta from './view/Usurios/Agricultores/ofertasAgricultores/crearOferta';
import OfertasAgricultores from './view/Usurios/Agricultores/ofertasAgricultores/cargarMisVentas';
import AgricultorValidacion from './view/Usurios/Agricultores/validacion/agricultorValidacion';

// --- Otras vistas (Usuarios) ---
import Auditores from './view/Usurios/Auditores/Auditores';
import Distribuidores from './view/Usurios/Distribuidores/Distribuidores';
import Logistica from './view/Usurios/Logistica/Logistica';

// --- Vistas Distribuidor (sub-rutas) ---
// (Asumiendo que crearemos estos componentes en estas rutas)
import PedidosDistribuidor from './view/Usurios/Distribuidores/Distribuidores';
import InventarioDistribuidor from './view/Usurios/Distribuidores/Distribuidores';
// (Este ya existe según tu navegación)
import DistribuidorValidacion from './view/Usurios/Distribuidores/Distribuidores';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* === RUTAS PÚBLICAS (LANDING) === */}
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<Inicio />} />
            <Route path="sobre-nosotros" element={<SobreNosotros />} />
            <Route path="contactos" element={<Contactos />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* === RUTAS PRIVADAS === */}
          <Route element={<ProtectedRoute />}>

            {/* --- ADMIN --- */}
            <Route element={<RoleBasedRoute allowedRoles={[ROLES.ADMIN]} />}>
              <Route path="/admin" element={<UsuariosLayout />}>
                <Route index element={<Administradores />} />
              </Route>
            </Route>

            {/* --- AGRICULTOR (COMPLETO) --- */}
            <Route element={<RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.AGRICULTOR]} />}>
              <Route path="/agricultor" element={<AgricultorLayout />}>
                <Route index element={<Agricultores />} />
                
                {/* NUEVAS RUTAS */}
                <Route path="crear-oferta" element={<CrearOferta />} />
                <Route path="ofertas" element={<OfertasAgricultores />} />
                <Route path="validacion" element={<AgricultorValidacion />} />
              </Route>
            </Route>

            {/* --- AUDITOR --- */}
            <Route element={<RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.AUDITOR]} />}>
              <Route path="/auditor" element={<AuditorLayout />}>
                <Route index element={<Auditores />} />
              </Route>
            </Route>

            {/* --- DISTRIBUIDOR (ACTUALIZADO) --- */}
            <Route element={<RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.DISTRIBUIDOR]} />}>
              <Route path="/distribuidor" element={<DistribuidorLayout />}>
                <Route index element={<Distribuidores />} />
                <Route path="pedidos" element={<PedidosDistribuidor />} />
                <Route path="inventario" element={<InventarioDistribuidor />} />
                <Route path="validacion" element={<DistribuidorValidacion />} />
              </Route>
            </Route>

            {/* --- LOGÍSTICA --- */}
            <Route element={<RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.LOGISTICA]} />}>
              <Route path="/logistica" element={<LogisticaLayout />}>
                <Route index element={<Logistica />} />
              </Route>
            </Route>

          </Route>

          {/* === 404 === */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;