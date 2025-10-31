import clsx from 'clsx';

export default function AgentList({ agents, activeId, onSelect, onCreate }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-200">Tus agentes</h2>
        <button
          type="button"
          onClick={onCreate}
          className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500"
        >
          Nuevo agente
        </button>
      </div>
      <ul className="space-y-2">
        {agents.map((agent) => (
          <li key={agent.id}>
            <button
              type="button"
              onClick={() => onSelect(agent)}
              className={clsx(
                'w-full rounded-lg border border-slate-800 px-4 py-3 text-left transition hover:border-primary/60 hover:bg-slate-900',
                activeId === agent.id ? 'border-primary bg-slate-900' : 'bg-slate-950'
              )}
            >
              <p className="text-sm font-semibold text-slate-100">{agent.name}</p>
              <p className="text-xs text-slate-400">{agent.description || 'Sin descripción'}</p>
            </button>
          </li>
        ))}
        {agents.length === 0 && <p className="text-sm text-slate-500">Aún no tienes agentes creados.</p>}
      </ul>
    </div>
  );
}
