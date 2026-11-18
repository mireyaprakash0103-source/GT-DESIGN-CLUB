import { useState } from 'react';
import {
  ArrowRight, Menu, X, Target, Eye, Cog, Gauge, Wind, Flame, Fan,
  Boxes, Layers3, Cpu, Zap, Wrench, Activity, CalendarDays, Mail,
  Instagram, Linkedin, Youtube, MapPin, ChevronRight, Send, CheckCircle2
} from 'lucide-react';

const domains = [
  { name: 'Performance Cycle', detail: 'Thermodynamic cycle analysis and engine performance modelling.', icon: Gauge },
  { name: 'Systems Engineering', detail: 'Requirements, interfaces, integration planning and risk management.', icon: Target },
  { name: 'Compressor & Intake', detail: 'Compressor configuration, inlet and diffuser design.', icon: Wind },
  { name: 'Combustion System', detail: 'Combustor architecture, zone planning and ignition concepts.', icon: Flame },
  { name: 'Turbine & Exhaust', detail: 'Turbine staging, energy extraction and exhaust design.', icon: Fan },
  { name: 'CFD / Aerodynamics', detail: 'Internal-flow simulations, meshing and solver validation.', icon: Activity },
  { name: 'Mechanical Design & Rotordynamics', detail: 'Shaft stability, bearings, seals and vibration analysis.', icon: Cog },
  { name: 'CAD & Engine Integration', detail: 'Parametric CAD standards and subsystem packaging.', icon: Boxes },
  { name: 'Materials & Thermal Management', detail: 'High-temperature materials, coatings and cooling concepts.', icon: Layers3 },
  { name: 'Controls & Instrumentation', detail: 'Sensor mapping, DAQ architecture and telemetry.', icon: Cpu },
  { name: 'Electrical Generator & Power', detail: 'Auxiliary loads, starter-generator and power electronics.', icon: Zap },
  { name: 'Manufacturing', detail: 'DFMA, fabrication planning and manufacturing processes.', icon: Wrench },
];

const milestones = [
  ['01', 'Conceptual design', 'CURRENT PHASE'],
  ['02', 'Detailed design', 'NEXT'],
  ['03', 'Fabrication', 'PLANNED'],
  ['04', 'Assembly & integration', 'PLANNED'],
  ['05', 'Testing & evaluation', 'PLANNED'],
];

function ClubMark({ small = false }: { small?: boolean }) {
  return <div className={`club-mark ${small ? 'small' : ''}`} aria-label="SRM GT Design Club turbine emblem">
    <svg viewBox="0 0 100 100" role="img" aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.4"/>
      <circle cx="50" cy="50" r="39" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3"/>
      {Array.from({length: 9}).map((_, i) => <path key={i} d="M50 50 C44 34 48 20 58 12 C60 27 58 39 50 50Z" fill="currentColor" transform={`rotate(${i*40} 50 50)`}/>)}
      <circle cx="50" cy="50" r="11" fill="#07162c" stroke="currentColor" strokeWidth="2"/>
      <circle cx="50" cy="50" r="4" fill="currentColor"/>
    </svg>
  </div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', department: '', year: '', interest: '' });
  const nav = ['Home', 'About', 'Team', 'Projects', 'Achievements', 'Events', 'Sponsors', 'Contact'];
  const closeMenu = () => setMenuOpen(false);

  const submitInterest = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return <div className="site-shell">
    <header className="topbar">
      <a className="brand" href="#home" onClick={closeMenu}>
        <ClubMark small />
        <span className="brand-copy"><strong>SRM GT DESIGN CLUB</strong><em>From Theory to Thrust</em></span>
      </a>
      <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? 'nav open' : 'nav'}>
        {nav.map(n => <a key={n} href={`#${n.toLowerCase()}`} onClick={closeMenu}>{n}</a>)}
        <a className="nav-cta" href="#join" onClick={closeMenu}>Join Us <ArrowRight size={15}/></a>
      </nav>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-grid"></div>
        <div className="hero-copy">
          <div className="institution">
            <div className="srm-placeholder">SRM</div>
            <div><b>SRM INSTITUTE OF SCIENCE<br/>AND TECHNOLOGY</b><span>Kattankulathur, Tamil Nadu</span></div>
          </div>
          <p className="eyebrow">STUDENT-LED PROPULSION ENGINEERING</p>
          <h1>SRM GT<br/><span>DESIGN CLUB</span></h1>
          <h2>FROM THEORY TO THRUST</h2>
          <p className="hero-description">A student engineering initiative dedicated to gas turbine design, propulsion research and practical aerospace innovation.</p>
          <div className="hero-actions">
            <a className="btn gold" href="#projects">Explore Our Work <ArrowRight size={17}/></a>
            <a className="btn outline" href="#about">Discover the Club</a>
          </div>
          <div className="hero-meta"><span><i/> CONCEPTUAL DESIGN PHASE</span><span>SRMIST · KATTANKULATHUR</span></div>
        </div>
        <div className="hero-visual" aria-label="Turbojet engine visual">
          <div className="visual-ring"></div>
          <div className="engine-caption"><span>FLAGSHIP DEVELOPMENT</span><strong>500 N</strong><b>TURBOJET ENGINE</b><small>DESIGN · DEVELOP · INNOVATE</small></div>
        </div>
      </section>

      <section className="intro section-wrap" id="about">
        <div className="section-heading"><p className="eyebrow">WHO WE ARE</p><h2>Engineering curiosity into capability.</h2></div>
        <div className="intro-grid">
          <div className="intro-main">
            <p>SRM GT Design Club is a student-led engineering initiative at SRM Institute of Science and Technology, Kattankulathur. We bring together curious minds to explore gas turbine technology, collaborate across engineering disciplines and build a strong foundation in propulsion systems.</p>
            <p>Our first flagship initiative is the conceptual development of a <strong>500 N turbojet engine</strong>, taking the team from theoretical understanding and preliminary design towards an integrated engineering solution.</p>
            <a className="text-link" href="#projects">Explore the flagship project <ArrowRight size={16}/></a>
          </div>
          <div className="principle-card"><Eye/><h3>Our Vision</h3><p>To become a collaborative student platform for aerospace propulsion innovation, technical excellence and hands-on engineering learning.</p></div>
          <div className="principle-card"><Target/><h3>Our Mission</h3><p>To study, design and advance gas turbine technology through interdisciplinary teamwork, research and responsible engineering practice.</p></div>
          <div className="principle-card"><Cog/><h3>Our Objectives</h3><ul><li>Build a strong foundation in gas turbine design.</li><li>Develop practical engineering and analysis skills.</li><li>Encourage research, teamwork and innovation.</li></ul></div>
        </div>
      </section>

      <section className="project-band" id="projects">
        <div className="project-inner">
          <div><p className="eyebrow">FLAGSHIP PROJECT · CONCEPTUAL DESIGN</p><h2>500 <span>N</span></h2><h3>TURBOJET ENGINE</h3><p>A multidisciplinary effort spanning thermodynamic cycle analysis, component design, aerodynamics, materials, controls and manufacturing planning.</p><a className="text-link" href="#domains">Explore engineering domains <ArrowRight size={16}/></a></div>
          <div className="project-specs">
            <div><span>PROJECT CLASS</span><b>Small turbojet</b></div>
            <div><span>TARGET THRUST</span><b>500 N</b></div>
            <div><span>CURRENT STAGE</span><b>Conceptual design</b></div>
            <div><span>APPROACH</span><b>Interdisciplinary</b></div>
          </div>
        </div>
      </section>

      <section className="domains section-wrap" id="domains">
        <div className="section-heading centered"><p className="eyebrow">ONE ENGINEERING TEAM · TWELVE DOMAINS</p><h2>Built across disciplines.</h2><p>Every subsystem contributes to one integrated propulsion system.</p></div>
        <div className="domain-grid">{domains.map((d, i) => {const Icon = d.icon; return <article className="domain-card" key={d.name}><div className="domain-top"><span>{String(i+1).padStart(2,'0')}</span><Icon/></div><h3>{d.name}</h3><p>{d.detail}</p></article>})}</div>
      </section>

      <section className="journey section-wrap">
        <div className="section-heading"><p className="eyebrow">THE DEVELOPMENT ROADMAP</p><h2>From concept to test.</h2></div>
        <div className="timeline">{milestones.map((m, i) => <div className={`milestone ${i===0?'current':''}`} key={m[0]}><div className="milestone-dot"></div><span>{m[0]} · {m[2]}</span><h3>{m[1]}</h3></div>)}</div>
        <p className="disclaimer">The roadmap represents the intended project journey. Future phases are planned and are not presented as completed achievements.</p>
      </section>

      <section className="events section-wrap" id="events">
        <div className="section-heading"><p className="eyebrow">STAY CONNECTED</p><h2>Upcoming events.</h2></div>
        <div className="empty-event"><CalendarDays/><div><b>No upcoming events scheduled.</b><span>Check back soon for club activities, workshops and announcements.</span></div></div>
      </section>

      <section className="team-sponsors section-wrap">
        <div id="team"><p className="eyebrow">THE PEOPLE BEHIND THE PROPULSION</p><h2>Built by collaboration.</h2><p>Our team brings together students across engineering disciplines, guided by faculty mentorship. Member profiles and faculty details will be added as the club structure is finalised.</p><span className="status-note">TEAM PROFILES · UPDATING SOON</span></div>
        <div id="achievements"><p className="eyebrow">OUR PROGRESS</p><h2>Every milestone begins somewhere.</h2><p>SRM GT Design Club is at the beginning of its journey. This section will grow with verified project milestones, technical presentations, competitions and research outcomes.</p><span className="status-note">ACHIEVEMENTS · UPDATING SOON</span></div>
        <div id="sponsors"><p className="eyebrow">PARTNER WITH US</p><h2>Power the next idea.</h2><p>We welcome conversations with organisations, technical partners and mentors interested in supporting student-led propulsion engineering.</p><a className="text-link" href="#contact">Discuss a partnership <ArrowRight size={16}/></a></div>
      </section>

      <section className="join-section" id="join">
        <div><p className="eyebrow">BE PART OF THE JOURNEY</p><h2>Curiosity is the first component.</h2><p>Share your interest in SRM GT Design Club. Membership applications are currently closed; the interest form helps us connect with prospective members when recruitment opens.</p><span className="closed-pill">RECRUITMENT APPLICATIONS · CLOSED</span></div>
        <form className="interest-form" onSubmit={submitInterest}>
          {submitted ? <div className="success-state"><CheckCircle2/><h3>Interest recorded in this preview.</h3><p>Connect a form service or backend before publishing to collect responses securely.</p></div> : <>
            <h3>Express your interest</h3>
            <label>Full name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name"/></label>
            <label>College email<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="name@..."/></label>
            <div className="form-row"><label>Department<input value={form.department} onChange={e=>setForm({...form,department:e.target.value})} placeholder="Department"/></label><label>Year<select required value={form.year} onChange={e=>setForm({...form,year:e.target.value})}><option value="">Select</option><option>1st year</option><option>2nd year</option><option>3rd year</option><option>4th year</option><option>Other</option></select></label></div>
            <label>Area of interest<textarea value={form.interest} onChange={e=>setForm({...form,interest:e.target.value})} placeholder="Tell us what interests you about propulsion engineering."/></label>
            <button className="btn gold full" type="submit">Submit interest <Send size={15}/></button>
            <small className="form-note">Preview only — form submissions are not stored until connected to the backend.</small>
          </>}
        </form>
      </section>

      <section className="contact section-wrap" id="contact">
        <div><p className="eyebrow">GET IN TOUCH</p><h2>Let's engineer what comes next.</h2><p>For faculty mentorship, technical collaboration, partnerships or club enquiries, connect with SRM GT Design Club.</p></div>
        <div className="contact-details"><div><MapPin/><span>SRM Institute of Science and Technology<br/>Kattankulathur, Tamil Nadu, India</span></div><div><Mail/><span>Club contact email to be added</span></div></div>
      </section>
    </main>

    <footer className="footer">
      <a className="brand" href="#home"><ClubMark small/><span className="brand-copy"><strong>SRM GT DESIGN CLUB</strong><em>From Theory to Thrust</em></span></a>
      <p>ENGINEERING <i>·</i> INNOVATION <i>·</i> EXCELLENCE</p>
      <div className="socials"><a href="#contact" aria-label="LinkedIn"><Linkedin/></a><a href="#contact" aria-label="Instagram"><Instagram/></a><a href="#contact" aria-label="YouTube"><Youtube/></a></div>
      <small>© {new Date().getFullYear()} SRM GT Design Club. Club identity and project information subject to institutional approval.</small>
    </footer>
  </div>;
}

export default App;
