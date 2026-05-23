import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  Calculator,
  CheckCircle2,
  Code2,
  FileCheck2,
  FileText,
  HandCoins,
  Layers3,
  MessageSquareText,
  Route,
  ShieldCheck,
  SlidersHorizontal,
  UploadCloud,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { RobotPreview } from './RobotPreview'
import { LiquidLogoMark, ShaderBackdrop } from './VisualEffects'
import { codeSample, generatedOutputs, sourceArtifacts } from './projectData'
import type { Concept, ProjectData, WorkspaceTab } from './types'

gsap.registerPlugin(ScrollTrigger)

type LandingPageProps = {
  project: ProjectData
  selected: Concept
  selectedConcept: number
  setSelectedConcept: (index: number) => void
  total: number
  activeAccordion: number
  setActiveAccordion: (index: number) => void
  openWorkspace: (tab?: WorkspaceTab) => void
}

const pitchScenes = [
  'Hook',
  'Problem',
  'Solution',
  'Workspace',
  'Proof',
  'Demo',
  'Close',
]

const workspaceTabs = [
  { name: 'Inputs', icon: UploadCloud, copy: 'Manual, team profile, budget, inventory, tools, timeline, priorities.' },
  { name: 'Rules', icon: FileCheck2, copy: 'Citations stay attached to legality-sensitive output instead of becoming AI vibes.' },
  { name: 'BOM', icon: Boxes, copy: 'REV-first cost, stock caveats, owned parts, missing parts, and buy-first ranking.' },
  { name: 'CAD', icon: Layers3, copy: 'Conceptual starter assembly with explicit verification warnings before manufacturing.' },
  { name: 'Code', icon: Code2, copy: 'FTC SDK Java scaffold aligned to generated hardware names and mechanism limits.' },
]

const problemCards = [
  'A 188-page manual becomes a weekend of uncertainty.',
  'Rookie teams need strategy, CAD, code, budget, and rules at once.',
  'Mentor time is scarce exactly when decisions are most expensive.',
  'A chatbot answer is not enough; teams need a packet they can inspect.',
]

const proofCards = [
  { title: 'Cited legality', icon: ShieldCheck, body: 'Every rule-sensitive answer carries section, version, confidence, and a verify-with-officials caveat.' },
  { title: 'Visible math', icon: Calculator, body: 'Torque, RPM, gear ratio, current, lift load, and driver speed limits are shown as formulas.' },
  { title: 'Buildable budget', icon: Boxes, body: 'The BOM knows what the team owns, what to buy, what to skip, and where risk enters.' },
  { title: 'Real artifacts', icon: Route, body: 'The workspace generates CAD starters, FTC Java, build checks, grant drafts, and driver log advice.' },
]

export function LandingPage({
  project,
  selected,
  selectedConcept,
  setSelectedConcept,
  total,
}: LandingPageProps) {
  const [currentScene, setCurrentScene] = useState(0)
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState(0)
  const [revealedOutput, setRevealedOutput] = useState(4)
  const revealRef = useRef<HTMLParagraphElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  const selectedWorkspaceTab = workspaceTabs[activeWorkspaceTab]
  const scenes = useMemo(() => pitchScenes, [])

  const goToScene = useCallback((direction: 1 | -1) => {
    const slides = Array.from(document.querySelectorAll<HTMLElement>('[data-pitch-scene]'))
    if (!slides.length) return
    const nextIndex = Math.min(slides.length - 1, Math.max(0, currentScene + direction))
    slides[nextIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setCurrentScene(nextIndex)
  }, [currentScene])

  useEffect(() => {
    const slides = Array.from(document.querySelectorAll<HTMLElement>('[data-pitch-scene]'))
    if (!slides.length) return

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (!visible) return
      const index = slides.indexOf(visible.target as HTMLElement)
      if (index >= 0) setCurrentScene(index)
    }, { threshold: [0.38, 0.56, 0.72] })

    slides.forEach((slide) => observer.observe(slide))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const tagName = target?.tagName?.toLowerCase()
      if (tagName === 'input' || tagName === 'textarea' || tagName === 'select' || target?.isContentEditable) return
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault()
        goToScene(1)
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        goToScene(-1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToScene])

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        '.pitch-copy > *, .spatial-workspace',
        { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.11, ease: 'power3.out' },
      )

      gsap.utils.toArray<HTMLElement>('.stack-card').forEach((card, index) => {
        gsap.fromTo(card, {
          y: 90 + index * 24,
          rotateX: 10,
          opacity: 0.18,
        }, {
          y: index * -18,
          rotateX: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 86%',
            end: 'top 42%',
            scrub: true,
          },
        })
      })

      if (revealRef.current) {
        const words = revealRef.current.querySelectorAll('span')
        gsap.fromTo(words, { opacity: 0.14 }, {
          opacity: 1,
          stagger: 0.04,
          scrollTrigger: {
            trigger: revealRef.current,
            start: 'top 76%',
            end: 'bottom 38%',
            scrub: true,
          },
        })
      }
    }, stageRef)

    return () => context.revert()
  }, [])

  return (
    <main className="pitch-shell overflow-x-hidden w-full max-w-full" ref={stageRef}>
      <ShaderBackdrop />

      <header className="pitch-brand liquid-glass" aria-label="Blueprint presentation">
        <span className="brand-mark">
          <LiquidLogoMark size={34} />
        </span>
        <strong>Blueprint</strong>
        <small>Metal Magic MVP demo</small>
      </header>

      <section className="pitch-scene pitch-hero" data-pitch-scene>
        <div className="pitch-copy">
          <p className="pitch-kicker">Hook</p>
          <h1>
            From manual to first robot plan.
          </h1>
          <p>
            This is not the product homepage. It is the pitch: a spatial demo of the workspace Blueprint should become.
          </p>
        </div>
        <div className="spatial-workspace hero-workspace liquid-glass">
          <div className="workspace-chrome">
            <span>Metal Magic FTC</span>
            <strong>DECODE TU32 indexed</strong>
          </div>
          <div className="workspace-map">
            <div>
              <FileText size={20} />
              <span>Manual</span>
            </div>
            <div>
              <Boxes size={20} />
              <span>Inventory</span>
            </div>
            <div>
              <SlidersHorizontal size={20} />
              <span>Driver logs</span>
            </div>
          </div>
          <RobotPreview />
          <div className="workspace-result">
            <span>Generated packet</span>
            <strong>{selected.name}</strong>
          </div>
        </div>
      </section>

      <section className="pitch-scene problem-scene" data-pitch-scene>
        <div className="pitch-copy">
          <p className="pitch-kicker">Problem</p>
          <h2>
            Build week asks students to solve five jobs at once.
          </h2>
        </div>
        <div className="problem-wall">
          {problemCards.map((card, index) => (
            <article className="problem-card liquid-glass stack-card" key={card}>
              <span aria-hidden="true">{problemCards.length - index}</span>
              <p>{card}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pitch-scene solution-scene" data-pitch-scene>
        <div className="pitch-copy solution-copy">
          <p className="pitch-kicker">Solution</p>
          <h2>
            Blueprint turns official inputs into an editable engineering packet.
          </h2>
          <p>
            Students stay in control. The AI proposes, cites, calculates, and packages; the team reviews, changes, and builds.
          </p>
        </div>
        <div className="input-output-stage liquid-glass image-scale">
          <div className="source-column">
            {sourceArtifacts.map((artifact, index) => (
              <a
                href={artifact.href}
                className="source-token"
                key={artifact.title}
                style={{ '--delay': `${index * 0.26}s` } as CSSProperties}
                target="_blank"
                rel="noreferrer"
              >
                <FileText size={18} />
                <strong>{artifact.title}</strong>
                <small>{artifact.kind}</small>
              </a>
            ))}
          </div>
          <div className="processing-core">
            <LiquidLogoMark size={88} />
            <span>Rules, parts, math, CAD, code</span>
          </div>
          <div className="output-column">
            {generatedOutputs.slice(0, revealedOutput).map((output) => (
              <span key={output}>{output}</span>
            ))}
            <button type="button" onClick={() => setRevealedOutput((count) => Math.min(generatedOutputs.length, count + 1))}>
              reveal output
            </button>
          </div>
        </div>
      </section>

      <section className="pitch-scene workspace-scene" data-pitch-scene>
        <div className="workspace-demo liquid-glass">
          <aside className="demo-sidebar">
            <strong>{project.team.name}</strong>
            <span>${project.team.budget.toLocaleString()} budget</span>
            <span>{project.team.experience} mode</span>
            <span>{project.team.timelineWeeks} week lane</span>
          </aside>
          <section className="demo-main">
            <div className="demo-tabs">
              {workspaceTabs.map((tab, index) => {
                const Icon = tab.icon
                return (
                  <button
                    className={activeWorkspaceTab === index ? 'active' : ''}
                    type="button"
                    key={tab.name}
                    onClick={() => setActiveWorkspaceTab(index)}
                  >
                    <Icon size={18} />
                    {tab.name}
                  </button>
                )
              })}
            </div>
            <div className="demo-panel">
              <div>
                <p className="pitch-kicker">Workspace interaction</p>
                <h2>{selectedWorkspaceTab.name}</h2>
                <p>{selectedWorkspaceTab.copy}</p>
              </div>
              <div className="demo-inspector">
                {activeWorkspaceTab === 0 && sourceArtifacts.map((source) => (
                  <span key={source.title}><CheckCircle2 size={15} /> {source.title}</span>
                ))}
                {activeWorkspaceTab === 1 && project.rules.map((rule) => (
                  <span key={rule.rule}><ShieldCheck size={15} /> {rule.rule}: {rule.status}</span>
                ))}
                {activeWorkspaceTab === 2 && project.bom.slice(0, 5).map((item) => (
                  <span key={`${item.sku}-${item.part}`}><Boxes size={15} /> {item.part} · ${item.price}</span>
                ))}
                {activeWorkspaceTab === 3 && (
                  <div className="mini-cad"><RobotPreview /></div>
                )}
                {activeWorkspaceTab === 4 && (
                  <pre><code>{codeSample}</code></pre>
                )}
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="pitch-scene proof-scene" data-pitch-scene>
        <div className="pitch-copy">
          <p className="pitch-kicker">Unique value</p>
          <h2>
            The difference is not that Blueprint answers. It leaves evidence behind.
          </h2>
        </div>
        <div className="proof-grid">
          {proofCards.map((card) => {
            const Icon = card.icon
            return (
              <article className="proof-card liquid-glass stack-card" key={card.title}>
                <Icon size={24} />
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="pitch-scene demo-scene" data-pitch-scene>
        <div className="pitch-copy">
          <p className="pitch-kicker">Demo</p>
          <h2>
            Pick a concept. Watch the workspace reframe cost, risk, and build path.
          </h2>
        </div>
        <div className="concept-console">
          {project.concepts.map((concept, index) => (
            <button
              className={selectedConcept === index ? 'selected' : ''}
              type="button"
              key={concept.name}
              onClick={() => setSelectedConcept(index)}
            >
              <span>{concept.difficulty}</span>
              <strong>{concept.name}</strong>
              <small>${concept.cost.toLocaleString()} · {concept.buildTime}</small>
              <p>{concept.fit}</p>
            </button>
          ))}
        </div>
        <div className="artifact-strip liquid-glass">
          <span><Calculator size={16} /> {project.physics[0]?.result}</span>
          <span><Boxes size={16} /> ${total.toLocaleString()} selected BOM</span>
          <span><HandCoins size={16} /> Sponsor draft ready</span>
          <span><MessageSquareText size={16} /> Driver log advice baked in</span>
        </div>
      </section>

      <section className="pitch-scene close-scene" data-pitch-scene>
        <p ref={revealRef}>
          {'Blueprint is a complete first usable version: strategy, rules, budget, supply, math, CAD, code, build guide, grants, chatbot iteration, and driver optimization in one student-readable workspace.'.split(' ').map((word, index) => (
            <span key={`${word}-${index}`}>{word} </span>
          ))}
        </p>
        <div className="close-panel liquid-glass">
          <LiquidLogoMark size={54} />
          <strong>Not a slideshow of screenshots.</strong>
          <span>A spatial pitch demo of what Blueprint can do.</span>
        </div>
      </section>

      <div className="pitch-controls liquid-glass" aria-label="Presentation controls">
        <button
          type="button"
          aria-label="Previous scene"
          onClick={() => goToScene(-1)}
          disabled={currentScene === 0}
        >
          <ArrowLeft size={20} />
        </button>
        <button
          type="button"
          aria-label="Next scene"
          onClick={() => goToScene(1)}
          disabled={currentScene >= scenes.length - 1}
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </main>
  )
}
