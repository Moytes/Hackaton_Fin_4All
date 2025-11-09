import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, MailOutlined, LockOutlined, ArrowLeftOutlined, TeamOutlined } from '@ant-design/icons';
import './Register.css';
import { registerUserService, RegistroUsuarioData } from '../../../../services/view/landing/auth/regiter/registerService';


const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    id_tipo_user: '', 
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const idTipoUserNum = parseInt(formData.id_tipo_user, 10);
    if (isNaN(idTipoUserNum)) {
      setError('Por favor, selecciona un tipo de usuario.');
      setIsLoading(false);
      return;
    }
    
    const userData: RegistroUsuarioData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      id_tipo_user: idTipoUserNum,
    };

    console.log('Datos a registrar:', userData);

    try {
      const data = await registerUserService(userData);
      setSuccess(data.message); 
      console.log('Registro exitoso:', data);

      setFormData({
        username: '',
        email: '',
        password: '',
        id_tipo_user: '',
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err: any) {
      console.error('Error en el registro:', err);
      setError(err.message || 'Ocurrió un error inesperado.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>

      <div className="register-content">
        <div className="register-card">
          <div className="logo-container">
            <div className="logo">
              <span className="logo-icon">🌾</span>
              <span className="logo-text">AgroConnect</span>
            </div>
          </div>

          <h1 className="main-title">¡Bienvenido!</h1>
          <p className="subtitle">Crea una nueva cuenta para comenzar</p>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="id_tipo_user">Tipo de Usuario</label>
              <div className="input-with-icon">
                <TeamOutlined className="input-icon" />
                <select
                  id="id_tipo_user"
                  name="id_tipo_user"
                  value={formData.id_tipo_user}
                  onChange={handleChange}
                  required
                  disabled={isLoading} 
                >
                  <option value="" disabled>Selecciona tu rol...</option>
                  <option value="1">Agricultor</option>
                  <option value="2">Logística</option>
                  <option value="3">Distribuidor</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username">Nombre de usuario</label>
              <div className="input-with-icon">
                <UserOutlined className="input-icon" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <div className="input-with-icon">
                <MailOutlined className="input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Ej. juan.perez@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading} 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-with-icon">
                <LockOutlined className="input-icon" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading} 
                />
              </div>
            </div>
            {error && <div className="form-message error-message">{error}</div>}
            {success && <div className="form-message success-message">{success}</div>}

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>

          <div className="divider">
            <span>o</span>
          </div>

          <button className="login-link-button" onClick={() => navigate('/login')} disabled={isLoading}>
            ¿Ya tienes cuenta? <strong>Inicia Sesión</strong>
          </button>

          <div className="back-link">
            <button onClick={() => navigate('/')} className="back-button" disabled={isLoading}>
              <ArrowLeftOutlined /> Volver a Inicio
            </button>
          </div>
        </div>

        <div className="info-panel">
          <div className="info-content">
            <h2 className="info-title">Únete a Nuestra Comunidad</h2>
            <p className="info-text">
              Conecta directamente con agricultores y consumidores. 
              Sin intermediarios, mejores precios, productos frescos.
            </p>
            
            <div className="info-features">
              <div className="info-feature">
                <span className="feature-icon">✓</span>
                <span>Registro 100% Gratis</span>
              </div>
              <div className="info-feature">
                <span className="feature-icon">✓</span>
                <span>Sin Comisiones</span>
              </div>
              <div className="info-feature">
                <span className="feature-icon">✓</span>
                <span>Comunidad Verificada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;