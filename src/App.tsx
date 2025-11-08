import React from 'react';
// Importa los componentes de react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- Importación de Vistas (Landing) ---
import Inicio from './view/landing/Inicio/Inicio';
import SobreNosotros from './view/landing/Sobrenosotros/SobreNosotros';
import Contactos from './view/landing/Contactos/Contactos';

// --- Importación de Vistas (Auth) ---
import Login from './view/landing/auth/login/Login';
import Register from './view/landing/auth/regiter/Register';

// --- Importación de Vistas (Usuarios) ---
// Asumiendo que 'Usurios' era 'Usuarios' y 'Adminitradores' era 'Administradores'
import Administradores from './view/Usurios/Adminitradores/Administradores';
import Agricultores from './view/Usurios/Agricultores/Agricultores';
import Auditores from './view/Usurios/Auditores/Auditores';
import Distribuidores from './view/Usurios/Distribuidores/Distribuidores';
import Logistica from './view/Usurios/Logistica/Logistica';

/**
 * Componente App: El corazón de la aplicación.
 * Contiene el enrutador principal (BrowserRouter) y define todas las rutas.
 */
const App: React.FC = () => {
  return (
    // BrowserRouter envuelve toda la aplicación para habilitar el enrutamiento
    <BrowserRouter>
      {/* Fondo gris claro para toda la app */}
      <div className="bg-gray-100 min-h-screen p-4 md:p-8 font-sans">
        
        {/* Cabecera simple (opcional, podría estar en un Layout) */}
        <nav className="bg-white p-4 rounded-xl shadow-md mb-8 max-w-4xl mx-auto border border-gray-200">
          <h1 className="text-2xl font-bold text-center text-blue-700">Mi Aplicación React (Rutas Reales)</h1>
        </nav>

        {/* El componente <Routes> define dónde se renderizarán las rutas */}
        <main>
          <Routes>
            {/* Rutas de Landing */}
            <Route path="/" element={<Inicio />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/contactos" element={<Contactos />} />

            {/* Rutas de Autenticación */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas de Paneles de Usuario (Rutas Protegidas en un futuro) */}
            <Route path="/admin" element={<Administradores />} />
            <Route path="/admin/agricultores" element={<Agricultores />} />
            <Route path="/admin/auditores" element={<Auditores />} />
            <Route path="/admin/distribuidores" element={<Distribuidores />} />
            <Route path="/admin/logistica" element={<Logistica />} />

            {/* Ruta por defecto (si no se encuentra, redirige a inicio) */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;