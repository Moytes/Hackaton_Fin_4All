// src/components/view/Usuarios/Adminitrador/CrearUsuarioForm.tsx (Ajustado)
import React, { useState } from 'react';
import { Form, Input, Button, Select, message, Card } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
// ¡IMPORTAMOS EL SERVICIO DE API REAL!
import { registerUser } from '../../../../services/view/Usuarios/Adminitardor/api';
// ¡IMPORTAMOS EL DTO!
import { RegistroUsuarioDto } from '../../../../services/view/Usuarios/Adminitardor/api.dto';

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

// Asumiendo estos IDs de la base de datos
const roles = [
  { id: 1, nombre: 'Pendiente' },
  { id: 2, nombre: 'Administrador' },
  { id: 3, nombre: 'Agricultor' },
  { id: 4, nombre: 'Auditor' },
  { id: 5, nombre: 'Logística' },
  { id: 6, nombre: 'Distribuidor' },
];

const CrearUsuarioForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: RegistroUsuarioDto) => {
    setLoading(true);
    try {
      // ¡Llamada real a la API!
      await registerUser(values);
      message.success(`Usuario ${values.username} creado exitosamente!`);
      form.resetFields();
    } catch (error: any) {
      console.error('Error al crear usuario:', error);
      // El backend (ConflictException) nos da un mensaje claro
      message.error(error.response?.data?.message || 'Error al crear el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Formulario de Registro de Nuevo Usuario" style={{ maxWidth: 600, margin: 'auto' }}>
      <Form
        {...layout}
        form={form}
        name="crear-usuario"
        onFinish={onFinish}
        initialValues={{ id_tipo_user: 1 }} // Default a 'Pendiente'
      >
        <Form.Item
          name="username"
          label="Nombre de Usuario"
          rules={[{ required: true, message: 'Por favor ingrese el nombre de usuario!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email', message: 'Por favor ingrese un email válido!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Contraseña"
          rules={[{ required: true, min: 6, message: 'La contraseña debe tener al menos 6 caracteres!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="id_tipo_user"
          label="Tipo de Usuario (Rol)"
          rules={[{ required: true, message: 'Por favor seleccione un rol!' }]}
        >
          <Select placeholder="Seleccione un rol">
            {roles.map(rol => (
              <Option key={rol.id} value={rol.id}>{rol.nombre}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" icon={<UserAddOutlined />} loading={loading}>
            Crear Usuario
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CrearUsuarioForm;