import React from 'react';
// Importa los componentes de react-router-dom, incluyendo <Outlet />
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- Importación de Layouts ---
import LandingLayout from './layouts/Landing/LandingLayout';
// IMPORTAMOS EL NUEVO LAYOUT DE ADMIN
import AdminLayout from './layouts/Usuarios/Administradores/AdminLayout'; 
// Mantenemos el layout de usuarios para los otros roles
import UsuariosLayout from './layouts/Usuarios/UsuariosLayout'; 

// --- Importación de Vistas (Landing) ---
import Inicio from './view/landing/Inicio/Inicio';
import SobreNosotros from './view/landing/Sobrenosotros/SobreNosotros';
import Contactos from './view/landing/Contactos/Contactos';

// --- Importación de Vistas (Auth) ---
import Login from './view/landing/auth/login/Login';
import Register from './view/landing/auth/regiter/Register';

// --- Importación de Vistas (Usuarios) ---
// Corregí las rutas de importación de 'Usurios' a 'Usuarios' (asumiendo que es 'Usuarios')
import Administradores from './view/Usurios/Adminitradores/Administradores';
import Agricultores from './view/Usurios/Agricultores/Agricultores';
import Auditores from './view/Usurios/Auditores/Auditores';
import Distribuidores from './view/Usurios/Distribuidores/Distribuidores';
import Logistica from './view/Usurios/Logistica/Logistica';

/**
 * Componente App: Define la estructura de enrutamiento.
 * Hemos separado las rutas de "/admin" (que usan AdminLayout)
 * de las rutas de "/panel" (que usan UsuariosLayout para los demás roles).
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- RUTAS PÚBLICAS (LANDING) --- 
         * Usan <LandingLayout />
         */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Inicio />} /> 
          <Route path="sobre-nosotros" element={<SobreNosotros />} />
          <Route path="contactos" element={<Contactos />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* --- RUTAS PRIVADAS (ADMINISTRADOR) ---
         * Usan el NUEVO <AdminLayout />
         * Solo las rutas que empiecen por /admin usarán este layout.
         */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* La ruta 'index' (/admin) renderiza Administradores */}
          <Route index element={<Administradores />} />
          
          {/* Aquí puedes añadir más rutas QUE SOLO VE EL ADMIN */}
          {/* Ej:
          <Route path="gestionar-usuarios" element={<GestionarUsuarios />} />
          <Route path="reportes" element={<ReportesAdmin />} />
          <Route path="configuracion" element={<ConfigAdmin />} />
          */}
        </Route>

        {/* --- RUTAS PRIVADAS (OTROS USUARIOS) ---
         * Usan el <UsuariosLayout /> original.
         * Movimos estas rutas a "/panel" para separarlas de "/admin".
         */}
        <Route path="/panel" element={<UsuariosLayout />}>
          {/* Redirigimos /panel a la primera página, ej /panel/agricultores */}
          <Route index element={<Navigate to="agricultores" replace />} />
          <Route path="agricultores" element={<Agricultores />} />
          <Route path="auditores" element={<Auditores />} />
          <Route path="distribuidores" element={<Distribuidores />} />
          <Route path="logistica" element={<Logistica />} />
        </Route>

        {/* --- RUTA POR DEFECTO --- */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;