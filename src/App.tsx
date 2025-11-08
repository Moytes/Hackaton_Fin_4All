import React from 'react';
// Importa los componentes de react-router-dom, incluyendo <Outlet />
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- Importación de Layouts ---
// Estos componentes envolverán tus páginas
import LandingLayout from './layouts/Landing/LandingLayout';
import UsuariosLayout from './layouts/Usuarios/UsuariosLayout';

// --- Importación de Vistas (Landing) ---
import Inicio from './view/landing/Inicio/Inicio';
import SobreNosotros from './view/landing/Sobrenosotros/SobreNosotros';
import Contactos from './view/landing/Contactos/Contactos';

// --- Importación de Vistas (Auth) ---
import Login from './view/landing/auth/login/Login';
import Register from './view/landing/auth/regiter/Register';

// --- Importación de Vistas (Usuarios) ---
// Corregí los nombres de 'Usurios' a 'Usuarios' y 'Adminitradores' a 'Administradores' en la importación
import Administradores from './view/Usurios/Adminitradores/Administradores';
import Agricultores from './view/Usurios/Agricultores/Agricultores';
import Auditores from './view/Usurios/Auditores/Auditores';
import Distribuidores from './view/Usurios/Distribuidores/Distribuidores';
import Logistica from './view/Usurios/Logistica/Logistica';

/**
 * Componente App: El corazón de la aplicación.
 * Define la estructura de enrutamiento principal usando Layouts.
 * Ya no contiene HTML de presentación, solo la lógica de rutas.
 */
const App: React.FC = () => {
  return (
    // BrowserRouter envuelve toda la aplicación para habilitar el enrutamiento
    <BrowserRouter>
      {/* Routes define el área donde las rutas se renderizarán */}
      <Routes>
        
        {/* --- RUTAS PÚBLICAS (LANDING) --- 
         * Todas las rutas anidadas aquí usarán <LandingLayout />
         * El <LandingLayout> contendrá el Header y Footer.
         * El componente de la ruta (Ej: <Inicio />) se renderizará
         * donde pongas <Outlet /> en tu LandingLayout.
        */}
        <Route path="/" element={<LandingLayout />}>
          {/* La ruta 'index' (/) renderiza Inicio */}
          <Route index element={<Inicio />} /> 
          
          {/* Rutas hijas de Landing */}
          <Route path="sobre-nosotros" element={<SobreNosotros />} />
          <Route path="contactos" element={<Contactos />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* --- RUTAS PRIVADAS (PANEL DE USUARIOS) ---
         * Todas las rutas anidadas aquí usarán <UsuariosLayout />
         * Este layout tendrá su propio menú (ej. una barra lateral).
         * Todas las rutas aquí dentro estarán prefijadas por "/admin"
        */}
        <Route path="/admin" element={<UsuariosLayout />}>
          {/* La ruta 'index' (/admin) renderiza Administradores */}
          <Route index element={<Administradores />} />

          {/* Rutas hijas de Usuarios (ej. /admin/agricultores) */}
          <Route path="agricultores" element={<Agricultores />} />
          <Route path="auditores" element={<Auditores />} />
          <Route path="distribuidores" element={<Distribuidores />} />
          <Route path="logistica" element={<Logistica />} />
        </Route>

        {/* --- RUTA POR DEFECTO ---
         * Si no se encuentra ninguna ruta, redirige a la raíz (/).
        */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;