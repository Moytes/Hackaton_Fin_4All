import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, MailOutlined, IdcardOutlined, EnvironmentOutlined, ShoppingOutlined, DollarOutlined, BarChartOutlined, TeamOutlined, ShopOutlined, FileTextOutlined, HistoryOutlined, CarOutlined, GlobalOutlined, SafetyOutlined } from '@ant-design/icons';
import './Register.css';

/**
 * Vista: src/view/landing/auth/Register
 */
const Register: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string>('');

  const handleUserTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(event.target.value);
  };

  // Renderiza un formulario específico basado en el tipo de usuario
  const renderFormBasedOnUserType = () => {
    switch (userType) {
      case 'agricultor':
        return (
          <div className="form-section">
            <h2 className="form-title">Registro de Agricultor</h2>
            
            <div>
              <label htmlFor="nombreFiscal">Nombre Fiscal</label>
              <div className="input-with-icon">
                <UserOutlined className="input-icon" />
                <input id="nombreFiscal" type="text" placeholder="Ej. Juan Pérez" />
              </div>
            </div>

            <div>
              <label htmlFor="rfc">RFC</label>
              <div className="input-with-icon">
                <IdcardOutlined className="input-icon" />
                <input id="rfc" type="text" placeholder="Ej. PEJU800101ABC" />
              </div>
            </div>

            <div>
              <label htmlFor="infoTerreno">Información de Terreno/Parcela</label>
              <div className="input-with-icon">
                <EnvironmentOutlined className="input-icon textarea-icon" />
                <textarea id="infoTerreno" placeholder="Ej. Parcela 1, 10 hectáreas de maíz en Jalisco"></textarea>
              </div>
            </div>

            <div>
              <label htmlFor="productos">Productos que produce</label>
              <div className="input-with-icon">
                <select id="productos" multiple>
                  <option value="maiz">Maíz</option>
                  <option value="trigo">Trigo</option>
                  <option value="frijol">Frijol</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="costoProducto">Costo del producto a mostrar (ejemplo)</label>
              <div className="input-with-icon">
                <DollarOutlined className="input-icon" />
                <input id="costoProducto" type="text" placeholder="Ej. $5,000 por tonelada de maíz" />
              </div>
            </div>

            <div>
              <label htmlFor="ofertaEstimada">Estimado de oferta</label>
              <div className="input-with-icon">
                <BarChartOutlined className="input-icon" />
                <input id="ofertaEstimada" type="text" placeholder="Ej. 100 toneladas" />
              </div>
            </div>
          </div>
        );
      case 'distribuidor':
        return (
          <div className="form-section">
            <h2 className="form-title">Registro de Distribuidor</h2>
            
            <div>
              <label htmlFor="nombreEmpresario">Nombre del Empresario</label>
              <div className="input-with-icon">
                <TeamOutlined className="input-icon" />
                <input id="nombreEmpresario" type="text" placeholder="Ej. Ana García" />
              </div>
            </div>
            
            <div>
              <label htmlFor="nombreEmpresa">Nombre de la Empresa</label>
              <div className="input-with-icon">
                <ShopOutlined className="input-icon" />
                <input id="nombreEmpresa" type="text" placeholder="Ej. Distribuidores del Campo S.A. de C.V." />
              </div>
            </div>

            <div>
              <label htmlFor="documentosEmpresa">Documento de la empresa (Acta Constitutiva, etc.)</label>
              <div className="input-with-icon">
                <FileTextOutlined className="input-icon" />
                <input id="documentosEmpresa" type="file" />
              </div>
            </div>

            <div>
              <label htmlFor="historialCompras">Historial de compras (ejemplo)</label>
              <div className="input-with-icon">
                <HistoryOutlined className="input-icon textarea-icon" />
                <textarea id="historialCompras" placeholder="Ej. Compra de 50 toneladas de trigo en 2023."></textarea>
              </div>
            </div>
          </div>
        );
      case 'logistica':
        return (
          <div className="form-section">
            <h2 className="form-title">Registro de Empresa de Logística</h2>
            
            <div>
              <label htmlFor="nombreEmpresaLogistica">Nombre de la Empresa</label>
              <div className="input-with-icon">
                <CarOutlined className="input-icon" />
                <input id="nombreEmpresaLogistica" type="text" placeholder="Ej. Transportes Rápidos del Norte" />
              </div>
            </div>

            <div>
              <label htmlFor="tiposTransporte">Tipos y cantidad de transportes</label>
              <div className="input-with-icon">
                <CarOutlined className="input-icon textarea-icon" />
                <textarea id="tiposTransporte" placeholder="Ej. 5 trailers de 40 toneladas, 10 camiones de 10 toneladas"></textarea>
              </div>
            </div>

            <div>
              <label htmlFor="tiposViajes">Tipos de viajes que pueden tomar</label>
              <div className="input-with-icon">
                <select id="tiposViajes" multiple>
                    <option value="cercanas">Regiones Cercanas</option>
                    <option value="nacionales">Nacionales</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="costos">Definir costos (ejemplo)</label>
              <div className="input-with-icon">
                <DollarOutlined className="input-icon textarea-icon" />
                <textarea id="costos" placeholder="Ej. Costo por tonelada/km, se abre a negociación."></textarea>
              </div>
            </div>

            <div className="checkbox-container">
              <SafetyOutlined className="checkbox-icon" />
              <input id="seguro" type="checkbox" />
              <label htmlFor="seguro">Contamos con seguro de mercancía</label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="logo-container">
          <div className="logo">Logo</div>
        </div>
        
        <h1 className="main-title">¡Bienvenido!</h1>
        <p className="subtitle">Cree una nueva cuenta para acceder.</p>

        <form className="register-form" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="userType">Selecciona tu tipo de usuario</label>
            <div className="input-with-icon">
              <UserOutlined className="input-icon" />
              <select id="userType" onChange={handleUserTypeChange} value={userType}>
                <option value="" disabled>Selecciona un rol</option>
                <option value="agricultor">Agricultor</option>
                <option value="distribuidor">Distribuidor</option>
                <option value="logistica">Logística</option>
              </select>
            </div>
          </div>

          {renderFormBasedOnUserType()}

          {userType && (
            <button type="submit" className="submit-button">
              Registrarse
            </button>
          )}
        </form>
        
        <button className="login-link-button" onClick={() => navigate('/login')}>
          ¿Ya tienes cuenta? Inicia Sesión
        </button>

        <div className="back-link">
          <a href="/">Volver a Inicio</a>
        </div>
      </div>
    </div>
  );
};

export default Register;