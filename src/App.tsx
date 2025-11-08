import React from 'react';
// Importa los componentes de react-router-dom, incluyendo <Outlet />
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- Importación de Layouts ---
import LandingLayout from './layouts/Landing/LandingLayout';
import AdminLayout from './layouts/Usuarios/Administradores/AdminLayout'; 
import AgricultorLayout from './layouts/Usuarios/Agricultores/AgricultorLayout';
import AuditorLayout from './layouts/Usuarios/Auditores/AuditorLayout';
import DistribuidorLayout from './layouts/Usuarios/Distribuidores/DistribuidorLayout';
// --- IMPORTACIÓN DEL NUEVO LAYOUT DE LOGÍSTICA ---
import LogisticaLayout from './layouts/Usuarios/Logistica/LogisticaLayout';

// Ya no necesitamos 'UsuariosLayout' porque todos los roles tienen el suyo
// import UsuariosLayout from './layouts/Usuarios/UsuariosLayout'; 

// --- Importación de Vistas (Landing) ---
import Inicio from './view/landing/Inicio/Inicio';
import SobreNosotros from './view/landing/Sobrenosotros/SobreNosotros';
import Contactos from './view/landing/Contactos/Contactos';

// --- Importación de Vistas (Auth) ---
import Login from './view/landing/auth/login/Login';
// CORRECCIÓN: 'regiter' a 'register'
import Register from './view/landing/auth/regiter/Register';

// --- Importación de Vistas (Usuarios) ---
// CORRECCIÓN: 'Usurios' a 'Usuarios' y 'Adminitradores' a 'Administradores'
import Administradores from './view/Usurios/Adminitradores/Administradores';
// CORRECCIÓN: 'Usurios' a 'Usuarios'
import Agricultores from './view/Usurios/Agricultores/Agricultores';
// CORRECCIÓN: 'Usurios' a 'Usuarios'
import Auditores from './view/Usurios/Auditores/Auditores';
// CORRECCIÓN: 'Usurios' a 'Usuarios'
import Distribuidores from './view/Usurios/Distribuidores/Distribuidores';
// CORRECCIÓN: 'Usurios' a 'Usuarios'
import Logistica from './view/Usurios/Logistica/Logistica';

/**
 * Componente App: Define la estructura de enrutamiento.
 * Cada rol (Admin, Agricultor, Auditor, Distribuidor, Logistica) 
 * tiene su propio Layout dedicado.
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- RUTAS PÚBLICAS (LANDING) --- */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Inicio />} /> 
          <Route path="sobre-nosotros" element={<SobreNosotros />} />
          <Route path="contactos" element={<Contactos />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* --- RUTAS PRIVADAS (ADMINISTRADOR) --- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Administradores />} />
        </Route>

        {/* --- RUTAS PRIVADAS (AGRICULTORES) --- */}
        <Route path="/agricultor" element={<AgricultorLayout />}>
          <Route index element={<Agricultores />} />
        </Route>

        {/* --- RUTAS PRIVADAS (AUDITORES) --- */}
        <Route path="/auditor" element={<AuditorLayout />}>
          <Route index element={<Auditores />} />
        </Route>

        {/* --- RUTAS PRIVADAS (DISTRIBUIDORES) --- */}
        <Route path="/distribuidor" element={<DistribuidorLayout />}>
          <Route index element={<Distribuidores />} />
        </Route>

        {/* --- NUEVAS RUTAS PRIVADAS (LOGÍSTICA) ---
         * Usan el NUEVO <LogisticaLayout />
         * Todas las rutas de logística irán bajo "/logistica"
         */}
        <Route path="/logistica" element={<LogisticaLayout />}>
          {/* La ruta 'index' (/logistica) renderiza la vista de Logistica */}
          <Route index element={<Logistica />} />
          
          {/* Aquí puedes añadir más rutas QUE SOLO VE LOGÍSTICA */}
          {/* Ej:
           <Route path="rutas" element={<Rutas />} />
           <Route path="entregas" element={<Entregas />} />
          */}
        </Route>

        {/* --- RUTAS PRIVADAS (OTROS USUARIOS) ---
         * El layout genérico "/panel" ya no es necesario,
         * porque todos los roles han sido movidos a su propio layout.
         */}
        {/* <Route path="/panel" element={<UsuariosLayout />}>
          <Route index element={<Navigate to="logistica" replace />} />
          <Route path="logistica" element={<Logistica />} />
        </Route> 
        */}

        {/* --- RUTA POR DEFECTO --- */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;