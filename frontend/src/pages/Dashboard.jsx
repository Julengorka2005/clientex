import Layout from '../components/Layout.jsx';
import AgentList from '../components/AgentList.jsx';
import AgentEditor from '../components/AgentEditor.jsx';
import ChatPanel from '../components/ChatPanel.jsx';
import { useAgents } from '../hooks/useAgents.js';

export default function Dashboard() {
  const { agents, activeAgent, setActiveAgent, loading, error, handleSaved, handleDeleted } = useAgents();

  return (
    <Layout>
      {loading && <p className="mb-4 text-sm text-slate-400">Cargando agentes...</p>}
      {error && <p className="mb-4 text-sm text-rose-400">{error}</p>}
      <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div>
          <AgentList
            agents={agents}
            activeId={activeAgent?.id}
            onSelect={setActiveAgent}
            onCreate={() => setActiveAgent(null)}
          />
        </div>
        <div className="flex flex-col gap-6">
          <AgentEditor agent={activeAgent} onSaved={handleSaved} onDeleted={handleDeleted} />
          <ChatPanel agent={activeAgent} />
        </div>
      </div>
    </Layout>
  );
}
