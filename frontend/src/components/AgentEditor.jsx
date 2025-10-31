import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

const DEFAULT_AGENT = {
  name: '',
  role: '',
  description: '',
  model: 'gpt-4-turbo',
  temperature: 1,
  basePrompt: ''
};

export default function AgentEditor({ agent, onSaved, onDeleted }) {
  const [form, setForm] = useState(DEFAULT_AGENT);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (agent) {
      setForm(agent);
    } else {
      setForm(DEFAULT_AGENT);
    }
  }, [agent]);

  const handleChange = (event) => {
    const value = event.target.name === 'temperature' ? Number(event.target.value) : event.target.value;
    setForm((prev) => ({ ...prev, [event.target.name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      if (agent?.id) {
        const updated = await api.updateAgent(agent.id, form);
        onSaved(updated);
        setMessage('Agente actualizado correctamente.');
      } else {
        const created = await api.createAgent(form);
        onSaved(created);
        setForm(DEFAULT_AGENT);
        setMessage('Agente creado correctamente.');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error al guardar el agente');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!agent?.id) return;
    if (!window.confirm('¿Seguro que deseas eliminar este agente?')) return;

    setLoading(true);
    setMessage('');
    try {
      await api.deleteAgent(agent.id);
      onDeleted(agent.id);
      setForm(DEFAULT_AGENT);
      setMessage('Agente eliminado.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error al eliminar el agente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-100">{agent ? 'Editar agente' : 'Nuevo agente'}</h3>
        {agent?.id && (
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-md border border-rose-500/40 px-3 py-2 text-sm font-medium text-rose-300 hover:bg-rose-500/10"
          >
            Eliminar
          </button>
        )}
      </div>
      <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <div className="md:col-span-1">
          <label className="mb-1 block text-sm font-medium text-slate-300" htmlFor="name">
            Nombre del agente
          </label>
          <input id="name" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="md:col-span-1">
          <label className="mb-1 block text-sm font-medium text-slate-300" htmlFor="role">
            Rol
          </label>
          <input id="role" name="role" value={form.role} onChange={handleChange} required />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-300" htmlFor="description">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Describe la personalidad y objetivo del agente"
          />
        </div>
        <div className="md:col-span-1">
          <label className="mb-1 block text-sm font-medium text-slate-300" htmlFor="model">
            Modelo
          </label>
          <select id="model" name="model" value={form.model} onChange={handleChange}>
            <option value="gpt-4-turbo">gpt-4-turbo</option>
            <option value="gpt-4o">gpt-4o</option>
            <option value="gpt-4">gpt-4</option>
            <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
          </select>
        </div>
        <div className="md:col-span-1">
          <label className="mb-1 block text-sm font-medium text-slate-300" htmlFor="temperature">
            Temperatura
          </label>
          <input
            id="temperature"
            name="temperature"
            type="number"
            step="0.1"
            min="0"
            max="2"
            value={form.temperature}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-300" htmlFor="basePrompt">
            Prompt base
          </label>
          <textarea
            id="basePrompt"
            name="basePrompt"
            value={form.basePrompt}
            onChange={handleChange}
            rows={4}
            placeholder="Instrucciones generales para el agente"
          />
        </div>
        {message && <p className="md:col-span-2 text-sm text-emerald-400">{message}</p>}
        <div className="md:col-span-2 flex justify-end gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}
