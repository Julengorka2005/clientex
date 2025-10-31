import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

export function useAgents() {
  const [agents, setAgents] = useState([]);
  const [activeAgent, setActiveAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAgents() {
      setLoading(true);
      setError('');
      try {
        const data = await api.getAgents();
        setAgents(data);
        setActiveAgent(data[0] ?? null);
      } catch (err) {
        setError(err.response?.data?.message || 'No se pudieron cargar los agentes');
      } finally {
        setLoading(false);
      }
    }

    fetchAgents();
  }, []);

  const handleSaved = (agent) => {
    setAgents((prev) => {
      const exists = prev.find((item) => item.id === agent.id);
      if (exists) {
        return prev.map((item) => (item.id === agent.id ? agent : item));
      }
      return [agent, ...prev];
    });
    setActiveAgent(agent);
  };

  const handleDeleted = (agentId) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== agentId));
    setActiveAgent((prev) => (prev?.id === agentId ? null : prev));
  };

  return {
    agents,
    activeAgent,
    setActiveAgent,
    loading,
    error,
    handleSaved,
    handleDeleted
  };
}
