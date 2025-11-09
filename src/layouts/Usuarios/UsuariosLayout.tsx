import React from 'react';
// CORRECCIÓN 1: Importamos 'Outlet' y 'NavLink' (en lugar de 'Link' o 'a')
import { Outlet, NavLink } from 'react-router-dom';

/**
 * Layout para el panel de administración (Usuarios).
 */
const UsuariosLayout: React.FC = () => {

  // Función para definir las clases del NavLink
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive 
      ? "block p-2 rounded bg-blue-600 text-white" // Estilo si está activo
      : "block p-2 rounded hover:text-blue-300";   // Estilo si no está activo
  };

  return (
    <div className="flex min-h-screen bg-gray-200">
      
      {/* --- Barra Lateral (Sidebar) --- */}
      <aside className="w-64 bg-gray-900 text-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Panel Admin</h2>
        <nav>
          <ul>
            {/* CORRECCIÓN 2: Reemplazamos <a> por <NavLink> */}
            {/* CORRECCIÓN 3: Corregimos las rutas (href -> to) */}
            
            <li className="mb-2">
              <NavLink to="/admin" className={getNavLinkClass} end>
                Dashboard (Admin)
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/agricultor" className={getNavLinkClass}>
                Agricultores
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/auditor" className={getNavLinkClass}>
                Auditores
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/distribuidor" className={getNavLinkClass}>
                Distribuidores
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to="/logistica" className={getNavLinkClass}>
                Logística
              </NavLink>
            </li>
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
        <main className="flex-grow p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UsuariosLayout;