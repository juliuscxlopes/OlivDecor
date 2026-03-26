import { createContext, useState, useContext, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { authService } from '../services/serviceapi';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Lazy Initializer: O estado já nasce com o valor do Cookie/LocalStorage
  // Isso evita o erro de Calling setState synchronously within an effect
  const [user, setUser] = useState<User | null>(() => {
    const token = Cookies.get('web_appliance_token');
    const savedUser = localStorage.getItem('web_appliance_user');

    if (token && savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }
    return null;
  });

async function login(email: string, password: string) { // use password aqui também por clareza
  setLoading(true);
  try {
    const data = await authService.login(email, password);
      
      // Salvando o JWT nos Cookies
      Cookies.set('web_appliance_token', data.token, { 
        expires: 7, 
        secure: true, 
        sameSite: 'strict' 
      });
      
      // Salvando dados básicos do user
      localStorage.setItem('web_appliance_user', JSON.stringify(data.user));
      
      setUser(data.user);
      navigate('/app');
    } catch (error) {
      console.error(error);
      alert("Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    Cookies.remove('web_appliance_token');
    localStorage.removeItem('web_appliance_user');
    setUser(null);
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}