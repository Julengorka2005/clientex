import { useEffect, useRef, useState } from 'react';
import { api } from '../services/api.js';

export default function ChatPanel({ agent }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    async function fetchHistory() {
      if (!agent?.id) {
        setHistory([]);
        return;
      }
      try {
        const messages = await api.fetchHistory(agent.id);
        setHistory(messages);
      } catch (err) {
        setError(err.response?.data?.message || 'No se pudo cargar el historial');
      }
    }

    fetchHistory();
  }, [agent]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, loading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim() || !agent?.id) return;

    const newMessage = { id: Date.now().toString(), role: 'user', content: input, createdAt: new Date().toISOString() };
    setHistory((prev) => [...prev, newMessage]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const response = await api.sendMessage(agent.id, newMessage.content);
      setHistory((prev) => [
        ...prev,
        { id: `${newMessage.id}-reply`, role: 'assistant', content: response.reply, createdAt: new Date().toISOString() }
      ]);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al enviar el mensaje');
    } finally {
      setLoading(false);
    }
  };

  if (!agent) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-900/40">
        <p className="text-sm text-slate-400">Selecciona o crea un agente para iniciar una conversación.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/60">
      <div className="border-b border-slate-800 px-6 py-4">
        <h3 className="text-lg font-semibold text-slate-100">Chat con {agent.name}</h3>
        <p className="text-sm text-slate-400">Modelo: {agent.model} · Temperatura: {agent.temperature}</p>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
        {history.map((message) => (
          <div key={message.id} className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wide text-slate-500">
              {message.role === 'assistant' ? 'Agente' : message.role === 'system' ? 'Sistema' : 'Tú'}
            </span>
            <p
              className={`whitespace-pre-wrap rounded-lg border border-slate-800 bg-slate-950/80 p-3 text-sm text-slate-200 ${
                message.role === 'assistant' ? 'border-primary/40' : 'border-slate-800'
              }`}
            >
              {message.content}
            </p>
          </div>
        ))}
        {loading && <p className="text-sm text-slate-400">El agente está pensando...</p>}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="border-t border-slate-800 p-4">
        <div className="flex items-end gap-2">
          <textarea
            className="min-h-[80px] flex-1"
            placeholder="Escribe un mensaje para el agente"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="h-[52px] rounded-md bg-primary px-4 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Enviar
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
      </form>
    </div>
  );
}
