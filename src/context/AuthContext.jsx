import { createContext, useContext, useState, useEffect } from 'react';
import { USER_TYPES, AUTH_STATUS } from '@/types/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(AUTH_STATUS.LOADING);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setStatus(AUTH_STATUS.AUTHENTICATED);
    } else {
      setStatus(AUTH_STATUS.UNAUTHENTICATED);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setStatus(AUTH_STATUS.AUTHENTICATED);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setStatus(AUTH_STATUS.UNAUTHENTICATED);
  };

  return (
    <AuthContext.Provider value={{ user, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 