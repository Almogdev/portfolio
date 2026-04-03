import { useState } from 'react'
import './App.css'
import almogLogo from './assets/almog/almog_logo.png'
import pythorLogo from './assets/pythor/pythor_logo.png'

const LOGOS = { almog: almogLogo, pythor: pythorLogo }

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const UI = {
  en: {
    nav:        ['About', 'Skills', 'Projects', 'Contact'],
    available:  '● Available for work',
    ctaPrimary: 'View Projects →',
    ctaSecond:  'Contact Me',
    s01label:   'About', s01title: 'Who I Am',
    timeline:   'Experience Timeline',
    s02label:   'Skills', s02title: 'What I Work With',
    s03label:   'Projects', s03title: "What I've Built",
    filter:     'Filter:', filterBtns: ['All', 'Web', 'Game', 'Tools'],
    viewProj:   'View Project', github: 'GitHub ↗',
    s04label:   'Case Study', s04title: 'Featured Project',
    eyebrow:    'Highlighted Work', keyFeatures: 'Key Features',
    liveDemo:   'Live Demo ↗', viewGH: 'View on GitHub',
    s05label:   'Contact', s05title: "Let's Work Together",
    s05sub:     "Have a project in mind? I'd love to hear about it.",
    fName:      'Name', fEmail: 'Email', fMsg: 'Message',
    fNamePh:    'Your name', fEmailPh: 'your@email.com',
    send:       'Send Message →', findMe: 'Find me on',
    rights:     'All rights reserved',
  },
  he: {
    nav:        ['אודות', 'כישורים', 'פרויקטים', 'צור קשר'],
    available:  '● פתוח להזדמנויות',
    ctaPrimary: 'לפרויקטים ←',
    ctaSecond:  'צור קשר',
    s01label:   'אודות', s01title: 'מי אני',
    timeline:   'ציר הזמן',
    s02label:   'כישורים', s02title: 'עם מה אני עובד',
    s03label:   'פרויקטים', s03title: 'מה בניתי',
    filter:     'סינון:', filterBtns: ['הכל', 'Web', 'משחק', 'כלים'],
    viewProj:   'צפה בפרויקט', github: 'GitHub ↗',
    s04label:   'תיק עבודות', s04title: 'פרויקט מוצג',
    eyebrow:    'עבודה נבחרת', keyFeatures: 'תכונות עיקריות',
    liveDemo:   'דמו חי ←', viewGH: 'צפה ב-GitHub',
    s05label:   'צור קשר', s05title: 'בואו נעבוד ביחד',
    s05sub:     'יש לך רעיון לפרויקט? אשמח לשמוע.',
    fName:      'שם', fEmail: 'אימייל', fMsg: 'הודעה',
    fNamePh:    'השם שלך', fEmailPh: 'your@email.com',
    send:       'שלח הודעה ←', findMe: 'מצא אותי ב',
    rights:     'כל הזכויות שמורות',
  },
}

// ─── IDENTITY DATA ────────────────────────────────────────────────────────────
const IDENTITIES = {
  almog: {
    id: 'almog',
    name: 'Almog',
    badge: 'A',
    en: {
      role:     'Full Stack Developer & Programming Instructor',
      tagline:  'Building scalable applications. Teaching the next generation of developers.',
      skills: {
        Frontend: ['React', 'HTML/CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
        Backend:  ['Node.js', 'Python', 'Express', 'REST APIs', 'PostgreSQL'],
        Tools:    ['Git', 'Docker', 'VS Code', 'Figma', 'Linux'],
        Teaching: ['Curriculum Design', 'Code Review', 'Mentoring', 'Workshops'],
      },
      projects: [
        { title: 'Full Stack E-Commerce App', desc: 'Complete shopping platform with auth, cart & payments.',    tech: ['React', 'Node.js', 'PostgreSQL'] },
        { title: 'Teaching Dashboard',        desc: 'Classroom management tool for coding bootcamps.',           tech: ['React', 'Firebase', 'Tailwind'] },
        { title: 'Portfolio Generator',       desc: 'Auto-generates developer portfolios from GitHub data.',     tech: ['Python', 'FastAPI', 'HTML'] },
        { title: 'REST API Boilerplate',      desc: 'Opinionated Node.js API starter with auth and testing.',   tech: ['Node.js', 'JWT', 'Jest'] },
      ],
      featured: {
        title: 'Teaching Dashboard',
        desc: 'A full-featured classroom management system designed for coding instructors. Tracks student progress, assignment submissions, and provides real-time feedback tools.',
        features: ['Student progress tracking', 'Assignment management', 'Code submission viewer', 'Real-time collaboration', 'Analytics dashboard'],
      },
      highlights: [
        { icon: '💻', title: 'Full Stack Development', text: 'Building end-to-end web apps with modern frameworks and clean architecture.' },
        { icon: '🎓', title: 'Programming Instructor',  text: 'Teaching web dev fundamentals and advanced concepts to students of all levels.' },
        { icon: '🔧', title: 'Problem Solving',         text: 'Turning complex requirements into simple, maintainable solutions.' },
      ],
      timeline: [
        { year: '2021', label: 'Started self-learning web development' },
        { year: '2022', label: 'First freelance projects & open source contributions' },
        { year: '2023', label: 'Junior Developer position + began instructing' },
        { year: '2024', label: 'Full stack projects & expanded teaching curriculum' },
      ],
    },
    he: {
      role:    'מפתח Full Stack ומדריך תכנות',
      tagline: 'בונה אפליקציות מדרגיות. מלמד את הדור הבא של המפתחים.',
      skills: {
        'פרונטאנד': ['React', 'HTML/CSS', 'JavaScript', 'TypeScript', 'Tailwind CSS'],
        'בקאנד':    ['Node.js', 'Python', 'Express', 'REST APIs', 'PostgreSQL'],
        'כלים':     ['Git', 'Docker', 'VS Code', 'Figma', 'Linux'],
        'הוראה':    ['עיצוב קורסים', 'Code Review', 'מנטורינג', 'סדנאות'],
      },
      projects: [
        { title: 'אפליקציית E-Commerce', desc: 'פלטפורמת קניות מלאה עם אימות, עגלה ותשלומים.', tech: ['React', 'Node.js', 'PostgreSQL'] },
        { title: 'דשבורד הוראה',         desc: 'כלי ניהול כיתה למחנות קידוד.',                  tech: ['React', 'Firebase', 'Tailwind'] },
        { title: 'מחולל תיקי עבודות',   desc: 'יוצר פורטפוליו אוטומטית מנתוני GitHub.',        tech: ['Python', 'FastAPI', 'HTML'] },
        { title: 'תבנית REST API',        desc: 'סטארטר Node.js עם אימות ובדיקות.',              tech: ['Node.js', 'JWT', 'Jest'] },
      ],
      featured: {
        title: 'דשבורד הוראה',
        desc: 'מערכת ניהול כיתה מלאה למדריכי קידוד. עוקבת אחר התקדמות תלמידים, הגשות ומספקת כלי משוב בזמן אמת.',
        features: ['מעקב התקדמות תלמידים', 'ניהול משימות', 'צפייה בהגשות קוד', 'שיתוף פעולה בזמן אמת', 'דשבורד אנליטיקס'],
      },
      highlights: [
        { icon: '💻', title: 'פיתוח Full Stack', text: 'בניית אפליקציות web מקצה לקצה עם ארכיטקטורה נקייה.' },
        { icon: '🎓', title: 'מדריך תכנות',      text: 'מלמד יסודות ומושגים מתקדמים בפיתוח web לסטודנטים בכל הרמות.' },
        { icon: '🔧', title: 'פתרון בעיות',       text: 'הופך דרישות מורכבות לפתרונות פשוטים וניתנים לתחזוקה.' },
      ],
      timeline: [
        { year: '2021', label: 'התחלת לימוד עצמי של פיתוח web' },
        { year: '2022', label: 'פרויקטים ראשונים כפרילנסר ותרומות לקוד פתוח' },
        { year: '2023', label: 'משרת מפתח Junior + תחילת הוראה' },
        { year: '2024', label: 'פרויקטים full stack והרחבת תכנית הלימודים' },
      ],
    },
  },
  pythor: {
    id: 'pythor',
    name: 'Pythor',
    badge: 'P',
    en: {
      role:    'Game Systems & Creative Scripting Developer',
      tagline: 'Designing game mechanics. Scripting interactive worlds. Building immersive experiences.',
      skills: {
        'Game Dev':       ['Unity', 'Godot', 'C#', 'GDScript', 'Lua'],
        'Systems Design': ['Game Mechanics', 'Economy Systems', 'Progression', 'AI Behavior'],
        Scripting:        ['Python', 'Automation', 'CLI Tools', 'Build Pipelines'],
        Creative:         ['Level Design', 'Narrative Systems', 'Prototyping', 'Game Jams'],
      },
      projects: [
        { title: 'Rogue-like RPG Engine',  desc: 'Procedurally generated dungeon crawler with modular systems.',   tech: ['Unity', 'C#', 'ScriptableObjects'] },
        { title: 'Inventory & Crafting',   desc: 'Flexible drag-and-drop inventory with crafting recipes.',        tech: ['Godot', 'GDScript'] },
        { title: 'NPC Behavior Toolkit',   desc: 'FSM toolkit for NPC AI and branching dialogue trees.',           tech: ['C#', 'Unity', 'XML'] },
        { title: 'Game Jam: Gravity Flip', desc: '48-hour jam entry — physics platformer with gravity inversion.', tech: ['Unity', 'C#', 'Aseprite'] },
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
    he: {
      role:    'מפתח מערכות משחק ויצירתיות',
      tagline: 'מעצב מכניקות משחק. כותב סקריפטים לעולמות אינטראקטיביים. בונה חוויות מרתקות.',
      skills: {
        'פיתוח משחקים': ['Unity', 'Godot', 'C#', 'GDScript', 'Lua'],
        'עיצוב מערכות': ['מכניקות משחק', 'מערכות כלכלה', 'התקדמות', 'התנהגות AI'],
        'סקריפטינג':    ['Python', 'אוטומציה', 'כלי CLI', 'Build Pipelines'],
        'יצירתי':       ['עיצוב שלבים', 'מערכות נרטיב', 'פרוטוטייפינג', 'Game Jams'],
      },
      projects: [
        { title: 'מנוע RPG Rogue-like',   desc: 'מנוע דנג\'ן קראולר פרוצדורלי עם מערכות מודולריות.',    tech: ['Unity', 'C#', 'ScriptableObjects'] },
        { title: 'מלאי ויצירת פריטים',    desc: 'מלאי גמיש עם גרירה ושחרור ומתכוני יצירה.',              tech: ['Godot', 'GDScript'] },
        { title: 'ערכת NPC Behavior',     desc: 'ערכת FSM ל-AI של NPCים ועצי דיאלוג מסועפים.',          tech: ['C#', 'Unity', 'XML'] },
        { title: 'Game Jam: Gravity Flip', desc: 'פרויקט 48 שעות — פלטפורמר פיזיקה עם היפוך כבידה.',    tech: ['Unity', 'C#', 'Aseprite'] },
      ],
      featured: {
        title: 'מנוע RPG Rogue-like',
        desc: 'מנוע משחק rogue-like מודולרי לחלוטין שנבנה ב-Unity. כולל יצירת מבוכים פרוצדורלית, מערכות פריטים מונעות-נתונים ומסגרת קרב גמישה.',
        features: ['יצירת מבוכים פרוצדורלית', 'מערכת פריטים וכישורים מונעת-נתונים', 'מסגרת קרב מודולרית', 'שמירה וטעינה', 'כלי Unity editor מותאמים'],
      },
      highlights: [
        { icon: '🎮', title: 'אדריכל מערכות משחק', text: 'מעצב מערכות משחק מודולריות ומורחבות שמניעות חוויות אינטראקטיביות.' },
        { icon: '✍️', title: 'סקריפטינג יצירתי',   text: 'מחיה עולמות משחק עם התנהגות NPC חכמה ונרטיבים דינמיים.' },
        { icon: '⚙️', title: 'כלים ו-Pipelines',   text: 'בניית עורכים מותאמים, כלי אוטומציה ו-pipelines לפיתוח משחקים יעיל.' },
      ],
      timeline: [
        { year: '2020', label: 'פרויקטי Unity ראשונים וכניסות ל-Game Jams' },
        { year: '2021', label: 'פיתוח פרוטוטייפ משחק ראשון שלם' },
        { year: '2022', label: 'פרסום ערכת מערכות משחק בקוד פתוח' },
        { year: '2023', label: 'שחרור פרויקט אינדי והרחבת עבודת המנוע' },
      ],
    },
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
function Navbar({ identity, onToggle, lang, onLangToggle, t }) {
  const anchors = ['about', 'skills', 'projects', 'contact']
  return (
    <nav className="navbar">
      <div className="nav-inner">

        {/* Logo */}
        <div className="nav-logo">
          <div className="logo-mark">{identity.badge}</div>
          <span className="logo-name">{identity.name}</span>
        </div>

        {/* Links */}
        <ul className="nav-links">
          {t.nav.map((label, i) => (
            <li key={label}><a href={`#${anchors[i]}`} className="nav-link">{label}</a></li>
          ))}
        </ul>

        <div className="nav-controls">
          {/* Identity Toggle */}
          <button className="identity-toggle" onClick={onToggle} aria-label="Switch identity">
            <span className={`toggle-label ${identity.id === 'almog' ? 'active' : ''}`}>Almog</span>
            <div className="toggle-track">
              <div className={`toggle-thumb ${identity.id === 'pythor' ? 'right' : ''}`} />
            </div>
            <span className={`toggle-label ${identity.id === 'pythor' ? 'active' : ''}`}>Pythor</span>
          </button>

          {/* Language Toggle */}
          <button className="lang-toggle" onClick={onLangToggle} aria-label="Switch language">
            <span className={`toggle-label ${lang === 'en' ? 'active' : ''}`}>EN</span>
            <div className="toggle-track">
              <div className={`toggle-thumb ${lang === 'he' ? 'right' : ''}`} />
            </div>
            <span className={`toggle-label ${lang === 'he' ? 'active' : ''}`}>HE</span>
          </button>
        </div>

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
function Hero({ identity, t }) {
  const d = identity[t === UI.he ? 'he' : 'en']
  return (
    <section id="hero" className="hero-section">
      <div className="hero-inner container">

        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="avail-badge">{t.available}</span>
          </div>

          <h1 className="hero-name">{identity.name}</h1>
          <h2 className="hero-role">{d.role}</h2>
          <p className="hero-tagline">{d.tagline}</p>

          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary">{t.ctaPrimary}</a>
            <a href="#contact"  className="btn btn-secondary">{t.ctaSecond}</a>
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
function About({ identity, t }) {
  const d = identity[t === UI.he ? 'he' : 'en']
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <SectionHeader num="01" label={t.s01label} title={t.s01title} />

        <div className="about-grid">

          {/* Text + Timeline */}
          <div className="about-left">
            <div className="wire-text-block">
              <WireLine w="100%" /><WireLine w="92%" /><WireLine w="97%" /><WireLine w="85%" /><WireLine w="90%" />
            </div>
            <div className="wire-text-block">
              <WireLine w="100%" /><WireLine w="72%" />
            </div>

            <div className="timeline">
              <h3 className="timeline-heading">{t.timeline}</h3>
              {d.timeline.map((item, i) => (
                <div key={i} className="timeline-row">
                  <div className="timeline-spine">
                    <div className="timeline-dot" />
                    {i < d.timeline.length - 1 && <div className="timeline-line" />}
                  </div>
                  <div className="timeline-body">
                    <span className="timeline-year">{item.year}</span>
                    <span className="timeline-event">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights + Avatar */}
          <div className="about-right">
            {d.highlights.map((h, i) => (
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
function Skills({ identity, t }) {
  const d = identity[t === UI.he ? 'he' : 'en']
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <SectionHeader num="02" label={t.s02label} title={t.s02title} />

        <div className="skills-grid">
          {Object.entries(d.skills).map(([cat, skills]) => (
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
function Projects({ identity, t }) {
  const d = identity[t === UI.he ? 'he' : 'en']
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <SectionHeader num="03" label={t.s03label} title={t.s03title} />

        <div className="filter-bar">
          <span className="filter-label">{t.filter}</span>
          {t.filterBtns.map((f, i) => (
            <button key={f} className={`filter-btn ${i === 0 ? 'active' : ''}`}>{f}</button>
          ))}
        </div>

        <div className="projects-grid">
          {d.projects.map((p, i) => (
            <article key={i} className="project-card">
              <WireBox w="100%" h={150} label="[ Screenshot / thumbnail ]" radius={8} />
              <div className="project-card-body">
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tech">
                  {p.tech.map(tech => <span key={tech} className="tech-tag">{tech}</span>)}
                </div>
                <div className="project-actions">
                  <button className="btn btn-sm btn-primary">{t.viewProj}</button>
                  <button className="btn btn-sm btn-outline">{t.github}</button>
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
function FeaturedProject({ identity, t }) {
  const d = identity[t === UI.he ? 'he' : 'en']
  const fp = d.featured
  return (
    <section className="section featured-section">
      <div className="container">
        <SectionHeader num="04" label={t.s04label} title={t.s04title} />

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
            <span className="featured-eyebrow">{t.eyebrow}</span>
            <h3 className="featured-title">{fp.title}</h3>
            <p className="featured-desc">{fp.desc}</p>

            <div className="featured-features">
              <h4>{t.keyFeatures}</h4>
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
              <button className="btn btn-primary">{t.liveDemo}</button>
              <button className="btn btn-outline">{t.viewGH}</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact({ t }) {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <SectionHeader num="05" label={t.s05label} title={t.s05title} sub={t.s05sub} center />

        <div className="contact-grid">

          <form className="contact-form" onSubmit={e => e.preventDefault()}>
            {[
              { label: t.fName,  ph: t.fNamePh },
              { label: t.fEmail, ph: t.fEmailPh },
            ].map(f => (
              <div key={f.label} className="form-group">
                <label className="form-label">{f.label}</label>
                <div className="wire-input" title={f.ph} />
              </div>
            ))}
            <div className="form-group">
              <label className="form-label">{t.fMsg}</label>
              <div className="wire-input wire-textarea" />
            </div>
            <button type="submit" className="btn btn-primary btn-full">{t.send}</button>
          </form>

          <div className="contact-sidebar">
            <h3 className="contact-sidebar-title">{t.findMe}</h3>
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
function Footer({ identity, t }) {
  const anchors = ['about', 'skills', 'projects', 'contact']
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-left">
          <span className="footer-name">{identity.name}</span>
          <span className="footer-copy">© {new Date().getFullYear()} {t.rights}</span>
        </div>
        <ul className="footer-links">
          {t.nav.map((label, i) => (
            <li key={label}><a href={`#${anchors[i]}`} className="footer-link">{label}</a></li>
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
  const [activeId,        setActiveId]        = useState('almog')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [lang,            setLang]            = useState('en')

  const identity = IDENTITIES[activeId]
  const t        = UI[lang]

  const handleToggle = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveId(prev => prev === 'almog' ? 'pythor' : 'almog')
      setTimeout(() => setIsTransitioning(false), 500)
    }, 350)
  }

  const handleLangToggle = () => setLang(prev => prev === 'en' ? 'he' : 'en')

  return (
    <div className={`app identity-${activeId}`} dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <TransitionOverlay active={isTransitioning} />
      <Navbar identity={identity} onToggle={handleToggle} lang={lang} onLangToggle={handleLangToggle} t={t} />
      <main>
        <Hero            identity={identity} t={t} />
        <About           identity={identity} t={t} />
        <Skills          identity={identity} t={t} />
        <Projects        identity={identity} t={t} />
        <FeaturedProject identity={identity} t={t} />
        <Contact         t={t} />
      </main>
      <Footer identity={identity} t={t} />
    </div>
  )
}
