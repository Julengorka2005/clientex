import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      api.setToken(token);
    } else {
      localStorage.removeItem('token');
      api.setToken(null);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    const stored = localStorage.getItem('token');
    if (stored) {
      api.setToken(stored);
    }
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      login: ({ token: newToken, user: newUser }) => {
        setToken(newToken);
        setUser(newUser);
        navigate('/dashboard');
      },
      logout: () => {
        setToken(null);
        setUser(null);
        navigate('/login');
      }
    }),
    [token, user, navigate]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
