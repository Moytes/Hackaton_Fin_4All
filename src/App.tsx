import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- Contexto de Autenticación ---
import { AuthProvider } from './context/AuthContext';

// --- Componentes de Rutas ---
// (Asegúrate que estas rutas de importación sean correctas)
import { ProtectedRoute } from './components/view/landing/auth/login/ProtectedRoute';
import { RoleBasedRoute } from './components/view/landing/auth/login/RoleBasedRoute';
import { ROLES } from './types/user.types';

// --- Layouts ---
import LandingLayout from './layouts/Landing/LandingLayout';

// --- LAYOUTS DE USUARIO ---
import UsuariosLayout from './layouts/Usuarios/UsuariosLayout'; // Para Admin
import AgricultorLayout from './layouts/Usuarios/Agricultores/AgricultorLayout';
import AuditorLayout from './layouts/Usuarios/Auditores/AuditorLayout';
import DistribuidorLayout from './layouts/Usuarios/Distribuidores/DistribuidorLayout';
import LogisticaLayout from './layouts/Usuarios/Logistica/LogisticaLayout';


// --- Vistas (Landing) ---
import Inicio from './view/landing/Inicio/Inicio';
import SobreNosotros from './view/landing/Sobrenosotros/SobreNosotros';
import Contactos from './view/landing/Contactos/Contactos';

// --- Vistas (Auth) ---
import Login from './view/landing/auth/login/Login';
import Register from './view/landing/auth/regiter/Register';

// --- Vistas (Usuarios) ---
import Administradores from './view/Usurios/Adminitradores/Administradores';
import Agricultores from './view/Usurios/Agricultores/Agricultores';
import Auditores from './view/Usurios/Auditores/Auditores';
import Distribuidores from './view/Usurios/Distribuidores/Distribuidores';
import Logistica from './view/Usurios/Logistica/Logistica';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* --- RUTAS PÚBLICAS (LANDING) --- */}
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<Inicio />} />
            <Route path="sobre-nosotros" element={<SobreNosotros />} />
            <Route path="contactos" element={<Contactos />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          {/* --- RUTAS PRIVADAS (PROTEGIDAS) ---
           * <ProtectedRoute> envuelve a TODOS los roles.
           * Si no estás logueado, te redirigirá a /login.
           */}
          <Route element={<ProtectedRoute />}>
            
            {/* --- Grupo del Administrador --- */}
            <Route element={<RoleBasedRoute allowedRoles={[ROLES.ADMIN]} />}>
              <Route path="/admin" element={<UsuariosLayout />}>
                <Route index element={<Administradores />} />
              </Route>
            </Route>

            {/* --- Grupo del Agricultor --- */}
            <Route element={<RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.AGRICULTOR]} />}>
              <Route path="/agricultor" element={<AgricultorLayout />}>
                <Route index element={<Agricultores />} />
              </Route>
            </Route>

            {/* --- Grupo del Auditor --- */}
            <Route element={<RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.AUDITOR]} />}>
              <Route path="/auditor" element={<AuditorLayout />}>
                <Route index element={<Auditores />} />
              </Route>
            </Route>

            {/* --- Grupo del Distribuidor --- */}
            <Route element={<RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.DISTRIBUIDOR]} />}>
              <Route path="/distribuidor" element={<DistribuidorLayout />}>
                <Route index element={<Distribuidores />} />
              </Route>
            </Route>

            {/* --- Grupo de Logística --- */}
            <Route element={<RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.LOGISTICA]} />}>
              <Route path="/logistica" element={<LogisticaLayout />}>
                <Route index element={<Logistica />} />
              </Route>
            </Route>

          </Route>

          {/* --- RUTA POR DEFECTO --- */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;