import {
  Blocks,
  BookOpenText,
  BrainCircuit,
  ChartNoAxesCombined,
  DatabaseZap,
  FlaskConical,
  LockKeyhole,
  Network,
  Radar,
  Shield,
  Swords,
  TerminalSquare,
  type LucideIcon,
} from 'lucide-react'
import { features, type FeatureKey } from '../data'
import { Reveal, SectionHeading } from './Reveal'

const icons: Record<FeatureKey, LucideIcon> = {
  research: BrainCircuit,
  provider: Network,
  risk: Shield,
  trading: Swords,
  backtest: FlaskConical,
  security: LockKeyhole,
  commands: BookOpenText,
}

const workflow = [
  { step: '01', title: 'Research', text: 'Collect provider-aware market context.', icon: Radar },
  { step: '02', title: 'Verify', text: 'Separate evidence, inference, and gaps.', icon: DatabaseZap },
  { step: '03', title: 'Risk', text: 'Measure exposure before conviction.', icon: ChartNoAxesCombined },
  { step: '04', title: 'Execute', text: 'Act through explicit safety gates.', icon: TerminalSquare },
]

export function Capabilities() {
  return (
    <section className="section section-shell capabilities" id="features" aria-labelledby="features-heading">
      <SectionHeading
        eyebrow="The Imperium Stack"
        title="One command center. Seven disciplined systems."
        description="Ancient command principles meet modern financial infrastructure: observe clearly, verify evidence, control risk, and keep every action accountable."
      />
      <span id="features-heading" className="sr-only">FinCLI feature systems</span>

      <div className="workflow-ribbon" aria-label="FinCLI workflow">
        {workflow.map(({ step, title, text, icon: Icon }, index) => (
          <Reveal className="workflow-step" delay={index * 0.06} key={title}>
            <span className="workflow-number">{step}</span>
            <Icon size={19} aria-hidden="true" />
            <div><strong>{title}</strong><span>{text}</span></div>
          </Reveal>
        ))}
      </div>

      <div className="feature-grid">
        {features.map((feature, index) => {
          const Icon = icons[feature.key]
          return (
            <Reveal
              className={`feature-card feature-card--${feature.key}`}
              delay={(index % 3) * 0.07}
              key={feature.title}
              id={feature.key === 'security' ? 'security' : undefined}
            >
              <div className="feature-card-corners" aria-hidden="true"><i /><i /><i /><i /></div>
              <div className="feature-card-topline">
                <span className="feature-index">{feature.index}</span>
              <span className="feature-icon"><Icon size={22} strokeWidth={1.6} aria-hidden={true} /></span>
              </div>
              <div className="feature-card-copy">
                <p>{feature.subtitle}</p>
                <h3>{feature.title}</h3>
                <span>{feature.description}</span>
              </div>
              <div className="feature-meta">
                {feature.meta.map((item) => <span key={item}>{item}</span>)}
              </div>
              {feature.preview && <span className="preview-ribbon">Validated next-major preview</span>}
            </Reveal>
          )
        })}
      </div>

      <Reveal className="local-first-band">
        <div className="local-first-seal"><Blocks size={28} aria-hidden="true" /></div>
        <div>
          <span>Local-first by architecture</span>
          <strong>Your workstation. Your data. Your command.</strong>
        </div>
        <p>
          SQLite state, encrypted secrets, session recovery, local themes, watchlists, alerts, journals, and sandboxed plugins remain under your control.
        </p>
      </Reveal>
    </section>
  )
}
