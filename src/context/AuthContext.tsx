import React, {createContext,useContext,useState,useEffect,ReactNode,} from 'react';
import { AppUser } from '../types/user.types';
import { loginRequest, decodeToken } from '../services/view/landing/auth/login/authService';

interface AuthContextType {
  user: AppUser | null;
  accessToken: string | null; 
  refreshToken: string | null; 
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, contra: string) => Promise<void>; 
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Buscamos 'accessToken' al cargar
        const storedToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        
        if (storedToken) {
          const decodedUser = decodeToken(storedToken);
          setUser(decodedUser);
          setAccessToken(storedToken);
          setRefreshToken(storedRefreshToken);
        }
      } catch (error) {
        console.error('Token inválido o expirado', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (email: string, contra: string) => { // Acepta 'contra'
    const { accessToken, refreshToken, user } = await loginRequest({ email, contra });
    
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(user);
    
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const value = {
    user,
    accessToken,
    refreshToken,
    isAuthenticated: !!user, 
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};