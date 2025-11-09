import api from './api';
import { UserPayload, AppUser, UserRole, ROLES } from '../../../../../types/user.types';
import { jwtDecode } from 'jwt-decode';

interface LoginCredentials {
  email: string;
  contra: string;
}

interface BackendUser {
  id: number | string;
  username: string;
  email: string;
  status: number;
  id_tipo_user: any;
}

interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  user: BackendUser;
}

interface FullLoginResponse {
  statusCode: number;
  message: string;
  data: LoginResponseData;
}

const roleMap: Record<number, UserRole> = {
  1: ROLES.AGRICULTOR,
  2: ROLES.LOGISTICA,
  3: ROLES.DISTRIBUIDOR,
  4: ROLES.ADMIN,
  5: ROLES.AUDITOR,
  6: ROLES.MEDIADOR,
};

const mapBackendUserToAppUser = (user: BackendUser): AppUser => {
  const tipoUsuarioId = (typeof user.id_tipo_user === 'object' && user.id_tipo_user !== null)
    ? user.id_tipo_user.id
    : user.id_tipo_user;

  const role = roleMap[tipoUsuarioId] || ROLES.AGRICULTOR;
  
  return {
    id: user.id,
    username: user.username,
    role: role,
  };
};

export const loginRequest = async (
  credentials: LoginCredentials,
): Promise<{ accessToken: string; refreshToken: string; user: AppUser }> => {
  
  const response = await api.post<FullLoginResponse>('/auth/login', credentials);

  const { data } = response.data; // Accedemos al campo 'data'

  const user = mapBackendUserToAppUser(data.user);

  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    user: user,
  };
};


export const decodeToken = (token: string): AppUser => {
  const payload = jwtDecode<UserPayload>(token);
  
  const role = roleMap[payload.tipoUsuario] || ROLES.AGRICULTOR;
  
  return {
    id: payload.id,
    username: payload.username,
    role: role,
  };
};