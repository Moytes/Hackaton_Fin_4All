export interface RegistroUsuarioData {
  username: string;
  email: string;
  password: string;
  id_tipo_user: number;
}

const API_BASE_URL = ''; 

export const registerUserService = async (userData: RegistroUsuarioData): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/usuario/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Error al procesar el registro.');
    }
    return data;

  } catch (error: any) {
    console.error('Error en registerUserService:', error.message);
    throw new Error(error.message || 'No se pudo conectar con el servidor.');
  }
};