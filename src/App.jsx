import { useState } from 'react'
import './App.css'
import almogLogo from './assets/almog/almog_logo.png'
import pythorLogo from './assets/pythor/pythor_logo.png'

const LOGOS = { almog: almogLogo, pythor: pythorLogo }

// ─── IDENTITY DATA ────────────────────────────────────────────────────────────
const IDENTITIES = {
  almog: {
    id: 'almog',
    name: 'Almog',
    role: 'Full Stack Developer & Programming Instructor',
    tagline: 'Building scalable applications. Teaching the next generation of developers.',
    badge: 'A',
    skills: {
      Frontend:  ['React', 'HTML/CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
      Backend:   ['Node.js', 'Python', 'Express', 'REST APIs', 'PostgreSQL'],
      Tools:     ['Git', 'Docker', 'VS Code', 'Figma', 'Linux'],
      Teaching:  ['Curriculum Design', 'Code Review', 'Mentoring', 'Workshops'],
    },
    projects: [
      { title: 'Full Stack E-Commerce App',  desc: 'Complete shopping platform with auth, cart & payments.',       tech: ['React', 'Node.js', 'PostgreSQL'] },
      { title: 'Teaching Dashboard',         desc: 'Classroom management tool for coding bootcamps.',              tech: ['React', 'Firebase', 'Tailwind'] },
      { title: 'Portfolio Generator',        desc: 'Auto-generates developer portfolios from GitHub data.',        tech: ['Python', 'FastAPI', 'HTML'] },
      { title: 'REST API Boilerplate',       desc: 'Opinionated Node.js API starter with auth and testing.',      tech: ['Node.js', 'JWT', 'Jest'] },
    ],
    featured: {
      title: 'Teaching Dashboard',
      desc: 'A full-featured classroom management system designed for coding instructors. Tracks student progress, assignment submissions, and provides real-time feedback tools.',
      features: ['Student progress tracking', 'Assignment management', 'Code submission viewer', 'Real-time collaboration', 'Analytics dashboard'],
    },
    highlights: [
      { icon: '💻', title: 'Full Stack Development',   text: 'Building end-to-end web apps with modern frameworks and clean architecture.' },
      { icon: '🎓', title: 'Programming Instructor',   text: 'Teaching web dev fundamentals and advanced concepts to students of all levels.' },
      { icon: '🔧', title: 'Problem Solving',          text: 'Turning complex requirements into simple, maintainable solutions.' },
    ],
    timeline: [
      { year: '2021', label: 'Started self-learning web development' },
      { year: '2022', label: 'First freelance projects & open source contributions' },
      { year: '2023', label: 'Junior Developer position + began instructing' },
      { year: '2024', label: 'Full stack projects & expanded teaching curriculum' },
    ],
  },
  pythor: {
    id: 'pythor',
    name: 'Pythor',
    role: 'Game Systems & Creative Scripting Developer',
    tagline: 'Designing game mechanics. Scripting interactive worlds. Building immersive experiences.',
    badge: 'P',
    skills: {
      'Game Dev':       ['Unity', 'Godot', 'C#', 'GDScript', 'Lua'],
      'Systems Design': ['Game Mechanics', 'Economy Systems', 'Progression', 'AI Behavior'],
      Scripting:        ['Python', 'Automation', 'CLI Tools', 'Build Pipelines'],
      Creative:         ['Level Design', 'Narrative Systems', 'Prototyping', 'Game Jams'],
    },
    projects: [
      { title: 'Rogue-like RPG Engine',    desc: 'Procedurally generated dungeon crawler with modular systems.',   tech: ['Unity', 'C#', 'ScriptableObjects'] },
      { title: 'Inventory & Crafting',     desc: 'Flexible drag-and-drop inventory with crafting recipes.',        tech: ['Godot', 'GDScript'] },
      { title: 'NPC Behavior Toolkit',     desc: 'FSM toolkit for NPC AI and branching dialogue trees.',           tech: ['C#', 'Unity', 'XML'] },
      { title: 'Game Jam: Gravity Flip',   desc: '48-hour jam entry — physics platformer with gravity inversion.', tech: ['Unity', 'C#', 'Aseprite'] },
    ],
    featured: {
      title: 'Rogue-like RPG Engine',
      desc: 'A fully modular rogue-like game engine built in Unity. Features procedural dungeon generation, data-driven item systems, and a flexible combat framework designed for easy extension.',
      features: ['Procedural dungeon generation', 'Data-driven item & skill system', 'Modular combat framework', 'Save/load serialization', 'Custom Unity editor tools'],
    },
    highlights: [
      { icon: '🎮', title: 'Game Systems Architect', text: 'Designing modular, extensible game systems that power interactive experiences.' },
      { icon: '✍️', title: 'Creative Scripting',     text: 'Bringing game worlds to life with intelligent NPC behavior and dynamic narratives.' },
      { icon: '⚙️', title: 'Tools & Pipelines',     text: 'Building custom editors, automation tools, and dev pipelines for efficient game dev.' },
    ],
    timeline: [
      { year: '2020', label: 'First Unity projects & game jam entries' },
      { year: '2021', label: 'Developed first complete game prototype' },
      { year: '2022', label: 'Published open-source game systems toolkit' },
      { year: '2023', label: 'Shipped indie project, expanded engine work' },
    ],
  },
}

// ─── WIREFRAME PRIMITIVES ─────────────────────────────────────────────────────
const WireBox = ({ w = '100%', h = 120, label, radius = 6, style = {}, inline = false }) => (
  <div
    className="wire-box"
    style={{ width: w, height: h, borderRadius: radius, display: inline ? 'inline-flex' : 'flex', ...style }}
  >
    <span className="wire-box-label">{label}</span>
  </div>
)

const WireLine = ({ w = '100%' }) => (
  <div className="wire-line" style={{ width: w }} />
)

const IdentityTag = ({ label = '⟳ identity-sensitive' }) => (
  <span className="identity-tag">{label}</span>
)

const SectionHeader = ({ num, label, title, sub, center = false }) => (
  <div className={`section-header ${center ? 'center' : ''}`}>
    <span className="section-label">{num} — {label}</span>
    <h2 className="section-title">{title}</h2>
    {sub && <p className="section-sub">{sub}</p>}
  </div>
)

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ identity, onToggle }) {
  return (
    <nav className="navbar">
      <div className="nav-inner">

        {/* Logo */}
        <div className="nav-logo">
          <div className="logo-mark">{identity.badge}</div>
          <span className="logo-name">{identity.name}</span>
          <IdentityTag label="⟳ name" />
        </div>

        {/* Links */}
        <ul className="nav-links">
          {['About', 'Skills', 'Projects', 'Contact'].map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`} className="nav-link">{l}</a></li>
          ))}
        </ul>

        {/* Identity Toggle */}
        <button className="identity-toggle" onClick={onToggle} aria-label="Switch identity">
          <span className={`toggle-label ${identity.id === 'almog' ? 'active' : ''}`}>Almog</span>
          <div className="toggle-track">
            <div className={`toggle-thumb ${identity.id === 'pythor' ? 'right' : ''}`} />
          </div>
          <span className={`toggle-label ${identity.id === 'pythor' ? 'active' : ''}`}>Pythor</span>
        </button>

      </div>
    </nav>
  )
}

// ─── TRANSITION OVERLAY ───────────────────────────────────────────────────────
function TransitionOverlay({ active }) {
  return (
    <div className={`transition-overlay ${active ? 'active' : ''}`}>
      <div className="transition-content">
        <div className="transition-ring" />
        <p className="transition-title">[ IDENTITY TRANSITION ANIMATION ]</p>
        <p className="transition-hint">Full-screen morph / wipe animation fires here on toggle</p>
      </div>
    </div>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ identity }) {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-inner container">

        <div className="hero-content">
          <div className="hero-eyebrow">
            <IdentityTag />
            <span className="avail-badge">● Available for work</span>
          </div>

          <h1 className="hero-name">{identity.name}</h1>
          <h2 className="hero-role">{identity.role}</h2>
          <p className="hero-tagline">{identity.tagline}</p>

          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary">View Projects →</a>
            <a href="#contact"  className="btn btn-secondary">Contact Me</a>
          </div>

          <div className="hero-socials">
            {['GH', 'LI', '✉'].map(s => (
              <WireBox key={s} w={36} h={36} label={s} radius={50} inline style={{ marginRight: 8 }} />
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <img
            src={LOGOS[identity.id]}
            alt={`${identity.name} logo`}
            style={{ width: '100%', borderRadius: 16, objectFit: 'contain', maxHeight: 440 }}
          />
          <div className="scroll-hint">↓  scroll to explore</div>
        </div>

      </div>
    </section>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About({ identity }) {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <SectionHeader num="01" label="About" title="Who I Am" />

        <div className="about-grid">

          {/* Text + Timeline */}
          <div className="about-left">
            <IdentityTag label="⟳ bio text changes per identity" />
            <div className="wire-text-block">
              <WireLine w="100%" /><WireLine w="92%" /><WireLine w="97%" /><WireLine w="85%" /><WireLine w="90%" />
            </div>
            <div className="wire-text-block">
              <WireLine w="100%" /><WireLine w="72%" />
            </div>

            <div className="timeline">
              <h3 className="timeline-heading">Experience Timeline</h3>
              {identity.timeline.map((t, i) => (
                <div key={i} className="timeline-row">
                  <div className="timeline-spine">
                    <div className="timeline-dot" />
                    {i < identity.timeline.length - 1 && <div className="timeline-line" />}
                  </div>
                  <div className="timeline-body">
                    <span className="timeline-year">{t.year}</span>
                    <span className="timeline-event">{t.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights + Avatar */}
          <div className="about-right">
            {identity.highlights.map((h, i) => (
              <div key={i} className="highlight-card">
                <div className="highlight-icon">{h.icon}</div>
                <div className="highlight-text-group">
                  <h3 className="highlight-title">{h.title}</h3>
                  <p className="highlight-text">{h.text}</p>
                </div>
              </div>
            ))}
            <WireBox w="100%" h={180} label="[ Profile photo / Avatar ]" radius={12} style={{ marginTop: 24 }} />
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
function Skills({ identity }) {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <SectionHeader num="02" label="Skills" title="What I Work With" />
        <IdentityTag label="⟳ skill categories & tags change per identity" />

        <div className="skills-grid">
          {Object.entries(identity.skills).map(([cat, skills]) => (
            <div key={cat} className="skill-category">
              <h3 className="skill-cat-title">{cat}</h3>
              <div className="skill-tags">
                {skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
              </div>
            </div>
          ))}
        </div>

        <WireBox w="100%" h={72} label="[ Optional: skill proficiency bars or radar chart ]" style={{ marginTop: 40 }} />
      </div>
    </section>
  )
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects({ identity }) {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <SectionHeader num="03" label="Projects" title="What I've Built" />
        <IdentityTag label="⟳ project cards change per identity" />

        <div className="filter-bar">
          <span className="filter-label">Filter:</span>
          {['All', 'Web', 'Game', 'Tools'].map((f, i) => (
            <button key={f} className={`filter-btn ${i === 0 ? 'active' : ''}`}>{f}</button>
          ))}
        </div>

        <div className="projects-grid">
          {identity.projects.map((p, i) => (
            <article key={i} className="project-card">
              <WireBox w="100%" h={150} label="[ Screenshot / thumbnail ]" radius={8} />
              <div className="project-card-body">
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tech">
                  {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                <div className="project-actions">
                  <button className="btn btn-sm btn-primary">View Project</button>
                  <button className="btn btn-sm btn-outline">GitHub ↗</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FEATURED PROJECT ─────────────────────────────────────────────────────────
function FeaturedProject({ identity }) {
  const fp = identity.featured
  return (
    <section className="section featured-section">
      <div className="container">
        <SectionHeader num="04" label="Case Study" title="Featured Project" />
        <IdentityTag label="⟳ featured project changes per identity" />

        <div className="featured-grid">

          <div className="featured-media">
            <WireBox w="100%" h={360} label="[ Featured project screenshots / demo GIF / video embed ]" radius={12} />
            <div className="featured-media-thumbs">
              {[1, 2, 3].map(n => (
                <WireBox key={n} w={90} h={60} label={`[${n}]`} radius={6} inline />
              ))}
            </div>
          </div>

          <div className="featured-content">
            <span className="featured-eyebrow">Highlighted Work</span>
            <h3 className="featured-title">{fp.title}</h3>
            <p className="featured-desc">{fp.desc}</p>

            <div className="featured-features">
              <h4>Key Features</h4>
              <ul className="feature-list">
                {fp.features.map((f, i) => (
                  <li key={i} className="feature-item">
                    <span className="feature-bullet">▸</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="featured-actions">
              <button className="btn btn-primary">Live Demo ↗</button>
              <button className="btn btn-outline">View on GitHub</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <SectionHeader num="05" label="Contact" title="Let's Work Together" sub="Have a project in mind? I'd love to hear about it." center />

        <div className="contact-grid">

          <form className="contact-form" onSubmit={e => e.preventDefault()}>
            {[
              { label: 'Name',    type: 'text',  ph: 'Your name' },
              { label: 'Email',   type: 'email', ph: 'your@email.com' },
            ].map(f => (
              <div key={f.label} className="form-group">
                <label className="form-label">{f.label}</label>
                <div className="wire-input" title={f.ph} />
              </div>
            ))}
            <div className="form-group">
              <label className="form-label">Message</label>
              <div className="wire-input wire-textarea" />
            </div>
            <button type="submit" className="btn btn-primary btn-full">Send Message →</button>
          </form>

          <div className="contact-sidebar">
            <h3 className="contact-sidebar-title">Find me on</h3>
            {[
              { label: 'GitHub',   abbr: 'GH' },
              { label: 'LinkedIn', abbr: 'LI' },
              { label: 'Email',    abbr: '✉' },
            ].map(s => (
              <div key={s.label} className="social-item">
                <WireBox w={44} h={44} label={s.abbr} radius={10} inline />
                <div className="social-item-text">
                  <div className="social-item-label">{s.label}</div>
                  <WireLine w={120} />
                </div>
              </div>
            ))}

            <WireBox
              w="100%"
              h={80}
              label="[ Open-to-work status / availability badge ]"
              radius={10}
              style={{ marginTop: 32 }}
            />
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ identity }) {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-left">
          <span className="footer-name">{identity.name}</span>
          <span className="footer-copy">© {new Date().getFullYear()} All rights reserved</span>
        </div>
        <ul className="footer-links">
          {['About', 'Skills', 'Projects', 'Contact'].map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`} className="footer-link">{l}</a></li>
          ))}
        </ul>
        <div className="footer-socials">
          {['GH', 'LI'].map(s => (
            <WireBox key={s} w={32} h={32} label={s} radius={50} inline />
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeId,       setActiveId]       = useState('almog')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const identity = IDENTITIES[activeId]

  const handleToggle = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveId(prev => prev === 'almog' ? 'pythor' : 'almog')
      setTimeout(() => setIsTransitioning(false), 500)
    }, 350)
  }

  return (
    <div className={`app identity-${activeId}`}>
      <TransitionOverlay active={isTransitioning} />
      <Navbar identity={identity} onToggle={handleToggle} />
      <main>
        <Hero           identity={identity} />
        <About          identity={identity} />
        <Skills         identity={identity} />
        <Projects       identity={identity} />
        <FeaturedProject identity={identity} />
        <Contact />
      </main>
      <Footer identity={identity} />
    </div>
  )
}
