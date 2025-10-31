import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function AuthForm({ mode }) {
  const isLogin = mode === 'login';
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = isLogin
        ? await api.login({ email: form.email, password: form.password })
        : await api.register({ name: form.name, email: form.email, password: form.password });
      login(payload);
    } catch (err) {
      setError(err.response?.data?.message || 'Ocurrió un error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl backdrop-blur">
        <h2 className="mb-2 text-center text-2xl font-semibold text-primary">
          {isLogin ? 'Inicia sesión' : 'Crea una cuenta'}
        </h2>
        <p className="mb-6 text-center text-sm text-slate-400">
          {isLogin
            ? 'Accede para gestionar tus agentes de IA personalizados.'
            : 'Regístrate para comenzar a construir agentes de IA.'}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-300" htmlFor="name">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Tu nombre"
                required
                value={form.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300" htmlFor="email">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tu@correo.com"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-sm text-rose-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary px-4 py-2 font-semibold text-white hover:bg-indigo-500"
          >
            {loading ? 'Procesando...' : isLogin ? 'Entrar' : 'Registrarme'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
          <Link to={isLogin ? '/register' : '/login'} className="font-medium text-primary hover:text-indigo-300">
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </Link>
        </p>
      </div>
    </div>
  );
}
