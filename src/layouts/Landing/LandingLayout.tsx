import React from 'react';
// Importa Outlet para renderizar las rutas hijas
import { Outlet } from 'react-router-dom';

// (Opcional) Importa tus componentes de Header y Footer
// import Header from '../../components/Header'; 
// import Footer from '../../components/Footer';

/**
 * Layout para las páginas públicas (Landing).
 * Contiene el Header y Footer que se mostrarán en todas estas páginas.
 */
const LandingLayout: React.FC = () => {
  return (
    // Fondo gris claro para toda la app
    <div className="bg-gray-100 min-h-screen font-sans flex flex-col">
      
      {/* --- Cabecera (Header) --- */}
      {/* Aquí puedes importar tu componente <Header /> */}
      <nav className="bg-white p-4 rounded-xl shadow-md my-4 mx-4 md:my-8 md:mx-auto max-w-5xl w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-blue-700">
          Mi Aplicación (Header Público)
        </h1>
        {/* Aquí irían tus enlaces de navegación: Inicio, Contactos, Login... */}
      </nav>

      {/* --- Contenido Principal --- */}
      {/* <Outlet /> renderizará el componente de la ruta activa */}
      {/* (Ej: <Inicio />, <Contactos />, <Login />, etc.) */}
      <main className="flex-grow max-w-5xl w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] mx-auto">
        <Outlet />
      </main>

      {/* --- Pie de Página (Footer) --- */}
      {/* Aquí puedes importar tu componente <Footer /> */}
      <footer className="bg-gray-800 text-white p-4 mt-8 text-center rounded-t-xl shadow-md max-w-5xl mx-auto w-[calc(100%-2rem)] md:w-[calc(100%-4rem)]">
        <p>© 2025 Mi Aplicación - Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingLayout;