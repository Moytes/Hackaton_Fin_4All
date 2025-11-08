import React from 'react';
// Importa Outlet para renderizar las rutas hijas
import { Outlet } from 'react-router-dom';

/**
 * Layout para el panel de administración (Usuarios).
 * Contiene un menú lateral (Sidebar) y un área de contenido.
 * NOTA: Este archivo debe llamarse 'index.tsx' dentro de 'src/layouts/Usuarios/'
 */
const UsuariosLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-200">
      
      {/* --- Barra Lateral (Sidebar) --- */}
      <aside className="w-64 bg-gray-900 text-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Panel Admin</h2>
        <nav>
          <ul>
            {/* Aquí irían tus <Link> o <NavLink> de react-router-dom */}
            <li className="mb-2"><a href="/admin" className="hover:text-blue-300">Dashboard</a></li>
            <li className="mb-2"><a href="/admin/agricultores" className="hover:text-blue-300">Agricultores</a></li>
            <li className="mb-2"><a href="/admin/auditores" className="hover:text-blue-300">Auditores</a></li>
            <li className="mb-2"><a href="/admin/distribuidores" className="hover:text-blue-300">Distribuidores</a></li>
            {/* ...etc. */}
          </ul>
        </nav>
      </aside>

      {/* --- Contenido Principal del Panel --- */}
      <div className="flex-1 flex flex-col">
        
        {/* Header simple del panel */}
        <header className="bg-white p-4 shadow-md">
          <h1 className="text-xl font-semibold">Bienvenido, Administrador</h1>
        </header>

        {/* <Outlet /> renderizará el componente de la ruta activa */}
        {/* (Ej: <Administradores />, <Agricultores />, etc.) */}
        <main className="flex-grow p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UsuariosLayout;