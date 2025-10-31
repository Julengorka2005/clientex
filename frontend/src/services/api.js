import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

function setToken(token) {
  if (token) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common.Authorization;
  }
}

export const api = {
  instance,
  setToken,
  async login(credentials) {
    const { data } = await instance.post('/auth/login', credentials);
    setToken(data.token);
    return data;
  },
  async register(payload) {
    const { data } = await instance.post('/auth/register', payload);
    setToken(data.token);
    return data;
  },
  async getAgents() {
    const { data } = await instance.get('/agents');
    return data;
  },
  async createAgent(payload) {
    const { data } = await instance.post('/agents', payload);
    return data;
  },
  async updateAgent(id, payload) {
    const { data } = await instance.put(`/agents/${id}`, payload);
    return data;
  },
  async deleteAgent(id) {
    await instance.delete(`/agents/${id}`);
  },
  async fetchHistory(agentId) {
    const { data } = await instance.get(`/chat/${agentId}`);
    return data;
  },
  async sendMessage(agentId, message) {
    const { data } = await instance.post(`/chat/${agentId}`, { message });
    return data;
  }
};
