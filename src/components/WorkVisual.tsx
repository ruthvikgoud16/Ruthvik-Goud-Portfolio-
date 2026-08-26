interface WorkVisualProps {
  id: string;
  category: 'ai' | 'web' | 'hardware' | 'concept';
}

export default function WorkVisual({ id, category }: WorkVisualProps) {
  if (id === 'pramana') {
    return (
      <div className="work-visual work-visual--pramana" aria-hidden>
        <svg viewBox="0 0 360 160" className="h-full w-full">
          <defs>
            <linearGradient id="pm-line" x1="0" x2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <path
            className="pm-path"
            d="M24 80 H88 C110 80 118 40 148 40 H212 C236 40 248 80 272 80 H336"
            fill="none"
            stroke="url(#pm-line)"
            strokeWidth="1.5"
          />
          <circle className="pm-token" r="4.5" fill="#f3efe6">
            <animateMotion
              dur="4.2s"
              repeatCount="indefinite"
              path="M24 80 H88 C110 80 118 40 148 40 H212 C236 40 248 80 272 80 H336"
            />
          </circle>
          {[
            [24, 80, 'IN'],
            [88, 80, 'AUTH'],
            [148, 40, 'RAG'],
            [212, 40, 'VERIFY'],
            [272, 80, 'GATE'],
            [336, 80, 'OUT'],
          ].map(([x, y, label]) => (
            <g key={String(label)} transform={`translate(${x},${y})`}>
              <circle r="9" fill="#0b0d10" stroke="#22d3ee" strokeWidth="1.2" />
              <text y="28" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="ui-sans-serif">
                {label}
              </text>
            </g>
          ))}
          <rect className="pm-refuse" x="252" y="62" width="40" height="36" rx="4" fill="none" stroke="#f59e0b" strokeWidth="1.4" />
        </svg>
      </div>
    );
  }

  if (id === 'nimblize') {
    return (
      <div className="work-visual work-visual--mesh" aria-hidden>
        <svg viewBox="0 0 360 160" className="h-full w-full">
          <g className="mesh-lines" stroke="#22d3ee" strokeOpacity="0.35" fill="none">
            <path d="M60 80 L180 40 L300 80" />
            <path d="M60 80 L180 120 L300 80" />
            <path d="M180 40 L180 120" />
          </g>
          <circle className="mesh-core" cx="180" cy="80" r="14" fill="#a78bfa" />
          <circle className="mesh-sat s1" cx="60" cy="80" r="8" fill="#22d3ee" />
          <circle className="mesh-sat s2" cx="300" cy="80" r="8" fill="#34d399" />
          <circle className="mesh-sat s3" cx="180" cy="40" r="8" fill="#f472b6" />
          <circle className="mesh-sat s4" cx="180" cy="120" r="8" fill="#fbbf24" />
          <circle className="mesh-pkt" r="3.5" fill="#f3efe6">
            <animateMotion dur="2.8s" repeatCount="indefinite" path="M60 80 L180 40 L300 80 L180 120 Z" />
          </circle>
        </svg>
      </div>
    );
  }

  if (id === 'autoops') {
    return (
      <div className="work-visual work-visual--autoops" aria-hidden>
        <svg viewBox="0 0 360 160" className="h-full w-full">
          <text x="24" y="28" fill="#64748b" fontSize="9" fontFamily="ui-sans-serif" letterSpacing="1.5">
            AUTONOMOUS ENTERPRISE LOOP
          </text>
          {[
            { x: 28, label: 'PLAN', delay: '0s' },
            { x: 108, label: 'RETRIEVE', delay: '0.35s' },
            { x: 188, label: 'EXECUTE', delay: '0.7s' },
            { x: 268, label: 'VALIDATE', delay: '1.05s' },
          ].map((step) => (
            <g key={step.label}>
              <rect
                className="ops-card"
                style={{ animationDelay: step.delay }}
                x={step.x}
                y="48"
                width="64"
                height="72"
                rx="10"
                fill="#111827"
                stroke="#334155"
              />
              <text x={step.x + 32} y="88" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontFamily="ui-sans-serif">
                {step.label}
              </text>
              <circle cx={step.x + 32} cy="64" r="4" fill="#22d3ee">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin={step.delay} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
          <path
            className="ops-flow"
            d="M92 84 H108 M172 84 H188 M252 84 H268"
            stroke="#22d3ee"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            className="ops-supervisor"
            d="M60 130 H300"
            stroke="#a78bfa"
            strokeWidth="1"
            strokeDasharray="4 4"
            fill="none"
          />
          <text x="180" y="146" textAnchor="middle" fill="#a78bfa" fontSize="8" fontFamily="ui-sans-serif">
            SUPERVISOR · HITL
          </text>
        </svg>
      </div>
    );
  }

  if (id === 'aero-dot' || category === 'hardware') {
    return (
      <div className="work-visual work-visual--gyro" aria-hidden>
        <svg viewBox="0 0 360 160" className="h-full w-full">
          <g transform="translate(180 80)">
            <ellipse className="gyro-ring r1" rx="70" ry="22" fill="none" stroke="#22d3ee" strokeWidth="1.2" />
            <ellipse className="gyro-ring r2" rx="48" ry="48" fill="none" stroke="#67e8f9" strokeWidth="1" />
            <circle r="6" fill="#f3efe6" />
            <line className="tof-beam" x1="0" y1="0" x2="0" y2="-62" stroke="#f59e0b" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    );
  }

  if (id === 'talentlens-x') {
    return (
      <div className="work-visual work-visual--talent" aria-hidden>
        <div className="talent-ui">
          <div className="talent-top">
            <span>TalentLens X</span>
            <span className="talent-live">LIVE RANK</span>
          </div>
          {[
            { name: 'Career fit', w: '35%', score: '35' },
            { name: 'Recruitability', w: '25%', score: '25' },
            { name: 'Skills', w: '25%', score: '25' },
            { name: 'Semantic', w: '15%', score: '15' },
          ].map((row, i) => (
            <div key={row.name} className="talent-row" style={{ animationDelay: `${i * 0.2}s` }}>
              <span>{row.name}</span>
              <div className="talent-track">
                <i style={{ width: row.w }} />
              </div>
              <b>{row.score}</b>
            </div>
          ))}
          <div className="talent-shortlist">
            <span className="chip">Candidate A · 92</span>
            <span className="chip">Candidate B · 87</span>
            <span className="chip">Candidate C · 81</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'redrob-truth-engine') {
    return (
      <div className="work-visual work-visual--truth" aria-hidden>
        <div className="truth-ui">
          <div className="truth-top">
            <span>Redrob Truth Engine</span>
            <span className="truth-scan">VERIFYING</span>
          </div>
          <div className="truth-claim">
            “Led GraphRAG pipeline in production…”
            <i className="truth-beam" />
          </div>
          <div className="truth-grid">
            <div>
              <p>Trust</p>
              <strong className="ok">0.91</strong>
            </div>
            <div>
              <p>Conflicts</p>
              <strong className="warn">02</strong>
            </div>
            <div>
              <p>Evidence</p>
              <strong className="ok">14</strong>
            </div>
          </div>
          <ul className="truth-log">
            <li>Claim mapped → evidence graph</li>
            <li>Contradiction check complete</li>
            <li>Unified trust score published</li>
          </ul>
        </div>
      </div>
    );
  }

  if (id === 'resilience-graph') {
    return (
      <div className="work-visual work-visual--cascade" aria-hidden>
        <svg viewBox="0 0 360 160" className="h-full w-full">
          <path className="cascade-line" d="M40 120 L110 70 L180 95 L250 40 L320 60" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
          {[
            [40, 120],
            [110, 70],
            [180, 95],
            [250, 40],
            [320, 60],
          ].map(([x, y], i) => (
            <circle key={i} className={`cascade-node n${i}`} cx={x} cy={y} r="7" fill="#f3efe6" />
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div className="work-visual work-visual--grid" aria-hidden>
      <span className="scan" />
    </div>
  );
}
