// Basado en el RolesGuard de tu backend
export const ROLES = {
  // CORRECCIÓN: Cambiado de 'agricultos' a 'agricultor' para coincidir con el backend
  AGRICULTOR: 'agricultor', 
  LOGISTICA: 'logistica',
  DISTRIBUIDOR: 'distribuidor',
  ADMIN: 'admin',
  AUDITOR: 'auditor',
  MEDIADOR: 'mediador',
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

// Este es el payload que está dentro del token JWT
// (basado en tu 'tokens.service.ts')
export interface UserPayload {
  id: string | number;
  // CORRECCIÓN: El token contiene 'username', no 'email'
  username: string; 
  tipoUsuario: number; // El backend nos da un número
}

// Esta es la interfaz del objeto 'user' que usaremos en el frontend
export interface AppUser {
  id: string | number;
  // CORRECCIÓN: Usaremos 'username' en nuestra app
  username: string; 
  role: UserRole; // Nosotros lo usaremos como un string amigable
}