// src/services/api.dto.ts

// Para el formulario de 'CrearUsuarioForm'
// Coincide con RegistroUsuarioDto del backend
export interface RegistroUsuarioDto {
  username: string;
  email: string;
  password: string;
  id_tipo_user: number;
}

// Para el botón 'Aprobar' en la tabla
// Coincide con ValidateUser del backend
export interface ValidateUserDto {
  idUser: number;
}