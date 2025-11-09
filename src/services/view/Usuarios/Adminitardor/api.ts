import axios from 'axios';
import { RegistroUsuarioDto, ValidateUserDto } from './api.dto';

// Creamos una instancia de axios
const api = axios.create({
  baseURL: '/', // El proxy se encarga del resto
});

// Interceptor para añadir el token de Auth (si lo tienes)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const registerUser = (data: RegistroUsuarioDto) => {
  // Esta ruta es la correcta según tu 'registerService.ts'
  const url = '/usuario/registro'; 

  console.log(`%c[API CALL] %cPOST ${url}`, 'color: #7B1FA2; font-weight: bold;', 'color: #000;', data);
  return api.post(url, data);
};