import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FilePdfOutlined,
  SafetyCertificateOutlined,
  PlusOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Modal, Button, message } from 'antd';
import CrearOferta from '../ofertasAgricultores/crearOferta';
import './DocumentValidation.css';
import { useAuth } from '../../../../context/AuthContext';
import api from '../../../../services/view/landing/auth/login/api'; 

const AgricultorValidacion: React.FC = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    nameEmpresa: '' as string,
    constanciaFiscal: null as File | null,
    titulosPropiedad: null as File | null,
    nom: null as File | null,
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      console.log(`Archivo seleccionado para ${name}:`, files[0].name);
    }
  };

  const getBase64 = (file: File, docName: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(`Conversión a base64 exitosa para: ${docName} (${file.name})`);
        resolve(reader.result as string);
      };
      reader.onerror = error => {
        console.error(`Error en conversión a base64 para ${docName}:`, error);
        reject(error);
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Iniciando envío de documentos...');

    if (!user?.id) {
      console.error('Error: No hay ID de usuario');
      message.error('No se encontró el usuario. Inicia sesión nuevamente.');
      return;
    }

    const docsToUpload: { name: string; fileBase64: string }[] = [];

    if (formData.constanciaFiscal) {
      console.log('Procesando: Constancia de Situación Fiscal');
      const base64 = await getBase64(formData.constanciaFiscal, 'Constancia de Situación Fiscal');
      docsToUpload.push({ name: 'Constancia de Situación Fiscal', fileBase64: base64 });
      console.log('Constancia añadida al DTO');
    }

    if (formData.titulosPropiedad) {
      console.log('Procesando: Títulos de Propiedad de Cultivos');
      const base64 = await getBase64(formData.titulosPropiedad, 'Títulos de Propiedad de Cultivos');
      docsToUpload.push({ name: 'Títulos de Propiedad de Cultivos', fileBase64: base64 });
      console.log('Títulos añadidos al DTO');
    }

    if (formData.nom) {
      console.log('Procesando: NOM-037-FITO-1995');
      const base64 = await getBase64(formData.nom, 'NOM-037-FITO-1995');
      docsToUpload.push({ name: 'NOM-037-FITO-1995', fileBase64: base64 });
      console.log('NOM añadida al DTO');
    }

    if (docsToUpload.length === 0) {
      console.warn('No se seleccionó ningún documento');
      message.error('Por favor, selecciona al menos un documento.');
      return;
    }

    console.log(`Total de documentos a enviar: ${docsToUpload.length}`);

    const dto = {
      nameEmpresa: formData.nameEmpresa.trim() || 'Sin nombre de empresa',
      docs: docsToUpload,
      idUsuario: user.id,
    };

    try {
      console.log('Enviando petición al backend...');
      console.log('URL:', '/usuario/docsValidacion');

      const response = await api.post('/usuario/docsValidacion', dto);

      console.log('Envío al backend exitoso. Documentos enviados correctamente.');
      console.log('Código de estado:', response.status);
      console.log('Respuesta completa del backend:', response.data);

      message.success(response.data.message || 'Documentos enviados correctamente.');

      setFormData({
        nameEmpresa: '',
        constanciaFiscal: null,
        titulosPropiedad: null,
        nom: null,
      });

    } catch (error: any) {
      console.error('Error al enviar al backend. Se produjo un error.');
      console.error('Tipo de error:', error.name);
      console.error('Mensaje:', error.message);

      if (error.response) {
        console.error('Status HTTP:', error.response.status);
        console.error('Datos de error del backend:', error.response.data);
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor (request):', error.request);
      } else {
        console.error('Error de configuración:', error.message);
      }

      const errorMessage = error.response?.data?.message || error.message || 'Error al enviar documentos.';
      message.error(errorMessage);
    }
  };

  const abrirModal = () => setModalVisible(true);
  const cerrarModal = () => setModalVisible(false);

  const handleAddOferta = (ofertaData: any) => {
    Modal.confirm({
      title: '¿Confirmar creación de oferta?',
      icon: <ExclamationCircleOutlined />,
      content: 'Verifica que los datos ingresados sean correctos antes de continuar.',
      okText: 'Confirmar',
      cancelText: 'Cancelar',
      onOk() {
        console.log('Oferta creada:', ofertaData);
        message.success('Oferta creada exitosamente');
        setModalVisible(false);
        navigate('/agricultor/ofertas');
      },
    });
  };

  const FileInputField = ({
    name,
    label,
    file,
  }: {
    name: string;
    label: string;
    file: File | null;
  }) => (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="input-with-icon file-input-container">
        <FilePdfOutlined className="input-icon" />
        <input id={name} name={name} type="file" accept=".pdf" onChange={handleFileChange} />
        <span className={`file-input-text ${file ? 'selected' : ''}`}>
          {file ? file.name : 'Seleccionar PDF...'}
        </span>
      </div>
    </div>
  );

  return (
    <div className="validation-container">
      <div className="validation-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
      </div>

      <div className="validation-content">
        <div className="validation-card">
          <div className="logo-container">
            <div className="logo">
              <SafetyCertificateOutlined className="logo-icon" />
              <span className="logo-text">Verificación Agricultor</span>
            </div>
          </div>

          <h1 className="main-title">Envío de Documentos</h1>
          <p className="subtitle">Sube los documentos requeridos para validar tu cuenta de agricultor.</p>

          <form className="validation-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nameEmpresa">Nombre de la Empresa</label>
              <input
                id="nameEmpresa"
                name="nameEmpresa"
                type="text"
                value={formData.nameEmpresa}
                onChange={handleTextChange}
                placeholder="Ingresa el nombre de tu empresa (opcional)"
              />
            </div>

            <FileInputField
              name="constanciaFiscal"
              label="Constancia de Situación Fiscal"
              file={formData.constanciaFiscal}
            />
            <FileInputField
              name="titulosPropiedad"
              label="Títulos de Propiedad de Cultivos"
              file={formData.titulosPropiedad}
            />
            <FileInputField name="nom" label="NOM-037-FITO-1995" file={formData.nom} />

            <button type="submit" className="submit-button">
              Enviar para Verificación
            </button>
          </form>

          {/* BOTONES DE ACCIÓN - SIN BOTÓN VOLVER */}
          <div className="button-group">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="add-offer-button"
              onClick={abrirModal}
            >
              Agregar Oferta
            </Button>

            <Button
              type="default"
              icon={<EyeOutlined />}
              className="view-offer-button"
              onClick={() => navigate('/agricultor/ofertas')}
            >
              Ver Ofertas
            </Button>
          </div>
        </div>
      </div>

      {/* MODAL CREAR OFERTA */}
      <Modal
        title="Crear Nueva Oferta"
        open={modalVisible}
        onCancel={cerrarModal}
        destroyOnClose
        footer={null}
      >
        <CrearOferta onClose={cerrarModal} onAddOferta={handleAddOferta} />
      </Modal>
    </div>
  );
};

export default AgricultorValidacion;