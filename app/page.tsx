"use client";

import { useMemo, useState } from "react";
import {
  ShieldCheck, LockKeyhole, BookOpen, LifeBuoy, Search, ArrowUpRight,
  Menu, X, ChevronRight, CheckCircle2, Smartphone, Eye, HeartHandshake,
  Fingerprint, MessageCircle, FileText, WifiOff, Volume2, Sun, ExternalLink,
  ShieldAlert, KeyRound, Globe2, CircleHelp, Check, Copy, AlertTriangle
} from "lucide-react";

type Guide = { title: string; category: string; time: string; summary: string; steps: string[] };
const guides: Guide[] = [
  { title: "Secure a social account", category: "Account security", time: "5 min", summary: "Reduce the chance of someone accessing or taking over your account.", steps: ["Use a unique password that you do not reuse elsewhere.", "Turn on two-factor authentication where available.", "Review active sessions and sign out devices you do not recognize.", "Check recovery email addresses, phone numbers, and connected apps."] },
  { title: "Respond to online harassment", category: "Online abuse", time: "4 min", summary: "Consider your safety before replying, blocking, or reporting abusive behaviour.", steps: ["Do not feel pressured to reply or confront the person.", "If safe, keep relevant evidence such as dates, usernames, and screenshots.", "Use the platform's block, restrict, and report tools when appropriate.", "Tell a trusted person or contact a verified support provider if you need help."] },
  { title: "Protect your personal information", category: "Privacy", time: "3 min", summary: "Review what strangers can learn about you from your accounts and posts.", steps: ["Review who can see your posts, contact details, and friend list.", "Avoid publishing live location, home details, or predictable routines.", "Check photo backgrounds for identifying details before sharing.", "Ask friends not to share your location or images without permission."] },
  { title: "Handle impersonation or a fake profile", category: "Online abuse", time: "5 min", summary: "Take practical steps if someone is pretending to be you online.", steps: ["Save the profile link and relevant evidence if it is safe to do so.", "Report the account using the platform's impersonation process.", "Warn close contacts through a channel you trust if needed.", "Secure your own account and review recovery options."] },
  { title: "If someone threatens to share intimate images", category: "Image-based abuse", time: "6 min", summary: "You are not to blame. Avoid rushed decisions and seek trusted support.", steps: ["Do not send money or more images because of a threat; consider getting support before responding.", "Preserve relevant messages and account details only if doing so is safe.", "Report the account or content to the platform.", "Contact a trusted, qualified support provider. If you are under 18, do not download, forward, or redistribute sexual images of yourself or another minor."] },
  { title: "Check a suspicious link or message", category: "Scams & manipulation", time: "3 min", summary: "Pause before clicking links or sharing passwords, codes, or money.", steps: ["Do not open unexpected links or attachments.", "Check the sender using a separate trusted channel.", "Never share one-time verification codes or passwords.", "If you already clicked, change affected passwords from a trusted device and review account sessions."] }
];

const topics = ["All topics", "Account security", "Online abuse", "Privacy", "Image-based abuse", "Scams & manipulation"];
const supportTypes = [
  { title: "Digital rights support", desc: "For online censorship, digital privacy concerns, and rights-related guidance.", icon: Globe2 },
  { title: "Legal aid", desc: "For information about legal options and qualified legal assistance.", icon: FileText },
  { title: "Psychosocial support", desc: "For confidential emotional support from a qualified provider.", icon: HeartHandshake },
  { title: "Child protection", desc: "For safeguarding support when a child may be at risk.", icon: ShieldCheck }
];

export default function Home() {
  const [active, setActive] = useState("Home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("All topics");
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [checked, setChecked] = useState<string[]>([]);
  const [showChecklist, setShowChecklist] = useState(false);
  const [fontLarge, setFontLarge] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [copied, setCopied] = useState(false);

  const filteredGuides = useMemo(() => guides.filter(g =>
    (topic === "All topics" || g.category === topic) &&
    (g.title + " " + g.summary + " " + g.category).toLowerCase().includes(search.toLowerCase())
  ), [search, topic]);

  function navigate(section: string) {
    setActive(section);
    setMobileMenu(false);
    setSelectedGuide(null);
    document.getElementById(section.toLowerCase().replaceAll(" ", "-"))?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function copyChecklist() {
    const text = ["SafeNet Africa personal digital safety checklist", ...checklist.map((item) => `${checked.includes(item) ? "[x]" : "[ ]"} ${item}`)].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
      window.prompt("Copy your checklist below", text);
    }
  }

  const checklist = [
    "I use unique passwords for important accounts.",
    "I have enabled two-factor authentication where possible.",
    "I reviewed active sessions and recovery details.",
    "I checked who can see my posts and personal details.",
    "I know how to report abuse on the platforms I use."
  ];

  return (
    <main className={`${fontLarge ? "large-type" : ""} ${highContrast ? "high-contrast" : ""}`}>
      <div className="utility-bar">
        <div className="container utility-inner">
          <span><ShieldCheck size={14} aria-hidden="true" /> Practical digital safety for everyone</span>
          <div className="access-tools">
            <button onClick={() => setFontLarge(v => !v)} aria-pressed={fontLarge} aria-label="Toggle larger text">A+</button>
            <button onClick={() => setHighContrast(v => !v)} aria-pressed={highContrast} aria-label="Toggle high contrast"><Sun size={15} /></button>
            <span className="utility-label">Accessibility tools</span>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" onClick={() => setActive("Home")} aria-label="SafeNet Africa home">
            <span className="brand-mark"><ShieldCheck size={25} strokeWidth={2.2} /></span>
            <span className="brand-copy"><strong>SafeNet<span>Africa</span></strong><small>SAFER DIGITAL SPACES</small></span>
          </a>
          <nav className={mobileMenu ? "nav nav-open" : "nav"} aria-label="Main navigation">
            {["Home", "Safety Guides", "Checklist", "Get Support"].map(item => <button key={item} className={active === item ? "nav-link active" : "nav-link"} onClick={() => navigate(item)}>{item}</button>)}
            <button className="nav-cta" onClick={() => navigate("Safety Guides")}>Explore resources <ArrowUpRight size={16} /></button>
          </nav>
          <button className="mobile-toggle" aria-label={mobileMenu ? "Close menu" : "Open menu"} onClick={() => setMobileMenu(v => !v)}>{mobileMenu ? <X /> : <Menu />}</button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> YOUR DIGITAL SAFETY COMPANION</div>
            <h1>Your voice belongs online.<br /><em>Your safety does too.</em></h1>
            <p className="hero-lead">Practical tools to protect your accounts, respond to online abuse, and find your next safe step — without judgment.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => navigate("Safety Guides")}>Explore safety guides <ChevronRight size={18} /></button>
              <button className="button button-ghost" onClick={() => navigate("Get Support")}><LifeBuoy size={18} /> Find support</button>
            </div>
            <div className="hero-note"><LockKeyhole size={15} /> Privacy-minded by design <span /> <WifiOff size={15} /> Selected resources work offline after saving</div>
          </div>
          <div className="hero-visual" aria-label="Illustration of a protected digital space">
            <div className="orbit orbit-a" /><div className="orbit orbit-b" />
            <div className="visual-card card-top"><span className="mini-icon mint"><LockKeyhole size={17} /></span><div><strong>Your privacy matters</strong><small>Share only what feels safe</small></div><CheckCircle2 className="check-icon" size={19} /></div>
            <div className="shield-illustration"><div className="shield-inner"><ShieldCheck size={78} strokeWidth={1.25} /></div><div className="shield-ring ring-one" /><div className="shield-ring ring-two" /></div>
            <div className="visual-card card-bottom"><span className="mini-icon peach"><HeartHandshake size={18} /></span><div><strong>Support without judgment</strong><small>Your next step, at your pace</small></div></div>
            <div className="floating-dot dot-one" /><div className="floating-dot dot-two" /><div className="floating-dot dot-three" />
          </div>
        </div>
        <div className="container hero-foot"><span>DESIGNED FOR REAL-LIFE CONNECTIONS</span><div className="hero-foot-line" /><span>BUILT AROUND YOUR CHOICES</span></div>
      </section>

      <section className="trust-strip" aria-label="Platform principles">
        <div className="container trust-grid">
          <div><LockKeyhole /><span><strong>Privacy first</strong><small>Less data. More control.</small></span></div>
          <div><Smartphone /><span><strong>Mobile friendly</strong><small>Lightweight by design.</small></span></div>
          <div><BookOpen /><span><strong>Practical guidance</strong><small>Clear steps, not judgment.</small></span></div>
          <div><HeartHandshake /><span><strong>People centred</strong><small>Support at your pace.</small></span></div>
        </div>
      </section>

      <section className="section quick-section" id="quick-help">
        <div className="container">
          <div className="section-heading"><div><span className="section-kicker">START WHERE YOU ARE</span><h2>What do you need help with?</h2></div><p>Choose a situation to find clear, practical steps. You decide what to do next.</p></div>
          <div className="need-grid">
            {[
              { icon: KeyRound, title: "Secure my account", desc: "Passwords, login alerts, and account recovery", guide: guides[0] },
              { icon: MessageCircle, title: "Deal with harassment", desc: "Boundaries, evidence, blocking, and reporting", guide: guides[1] },
              { icon: Eye, title: "Protect my privacy", desc: "Personal information, posts, and location", guide: guides[2] },
              { icon: ShieldAlert, title: "Someone is threatening me", desc: "Safer steps when you are being threatened", guide: guides[4] }
            ].map(item => <button className="need-card" key={item.title} onClick={() => { setSelectedGuide(item.guide); navigate("Safety Guides"); }}>
              <span className="need-icon"><item.icon size={22} /></span><span className="need-title">{item.title}<ArrowUpRight size={16} /></span><span className="need-desc">{item.desc}</span><span className="need-link">View guidance <ChevronRight size={15} /></span>
            </button>)}
          </div>
        </div>
      </section>

      <section className="section guides-section" id="safety-guides">
        <div className="container">
          <div className="section-heading"><div><span className="section-kicker">LEARN AT YOUR OWN PACE</span><h2>Small steps. Stronger safety.</h2></div><p>Short, actionable guides for common online situations.</p></div>
          <div className="guide-controls">
            <label className="search-box"><Search size={18} /><span className="sr-only">Search safety guides</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search safety topics..." /></label>
            <label className="select-wrap"><span className="sr-only">Filter by topic</span><select value={topic} onChange={e => setTopic(e.target.value)}>{topics.map(t => <option key={t}>{t}</option>)}</select></label>
          </div>
          <div className="guide-layout">
            <div className="guide-list">
              {filteredGuides.length ? filteredGuides.map((g, i) => <button key={g.title} className={selectedGuide?.title === g.title ? "guide-row selected" : "guide-row"} onClick={() => setSelectedGuide(g)}>
                <span className="guide-number">{String(i + 1).padStart(2, "0")}</span><span className="guide-row-copy"><strong>{g.title}</strong><small>{g.category} <span>·</span> {g.time}</small></span><ChevronRight size={18} />
              </button>) : <div className="empty-state">No guides match that search. Try another word or topic.</div>}
            </div>
            <article className="guide-detail">
              {selectedGuide ? <><div className="detail-top"><span className="detail-icon"><BookOpen size={21} /></span><span className="detail-time">{selectedGuide.time} read</span></div><span className="section-kicker">{selectedGuide.category.toUpperCase()}</span><h3>{selectedGuide.title}</h3><p>{selectedGuide.summary}</p><ol className="steps-list">{selectedGuide.steps.map(step => <li key={step}><span><Check size={14} /></span>{step}</li>)}</ol><div className="detail-note"><LockKeyhole size={17} /><span><strong>Your safety comes first.</strong> Choose only steps that feel safe in your circumstances.</span></div></> : <><div className="detail-placeholder"><span className="detail-icon"><BookOpen size={24} /></span><span className="section-kicker">YOUR PRACTICAL GUIDE</span><h3>Choose a topic to get started</h3><p>Pick a guide on the left to see a simple set of steps you can follow at your own pace.</p><div className="placeholder-lines"><i /><i /><i /></div><div className="detail-note"><LockKeyhole size={17} /><span><strong>No pressure, no judgment.</strong> You are in control of your next step.</span></div></div></>}
            </article>
          </div>
        </div>
      </section>

      <section className="checklist-section section" id="checklist">
        <div className="container checklist-grid">
          <div className="checklist-copy"><span className="section-kicker">YOUR PERSONAL CHECK-IN</span><h2>A little preparation<br /><em>goes a long way.</em></h2><p>Use this private checklist to review a few important safety settings. Your selections stay in this page session and are not sent to SafeNet.</p><div className="checklist-badges"><span><LockKeyhole size={15} /> No account needed</span><span><Fingerprint size={15} /> No profile created</span></div><button className="button button-light" onClick={() => setShowChecklist(v => !v)}>{showChecklist ? "Hide checklist" : "Open my checklist"} <ChevronRight size={17} /></button></div>
          <div className="checklist-card"><div className="checklist-card-head"><div><span className="section-kicker">DIGITAL SAFETY BASICS</span><h3>My safety checklist</h3></div><span className="progress-count">{checked.length}/{checklist.length}</span></div><div className="progress-track"><div style={{ width: `${checked.length / checklist.length * 100}%` }} /></div><div className="check-items">{checklist.map(item => <label key={item} className={checked.includes(item) ? "check-item is-checked" : "check-item"}><input type="checkbox" checked={checked.includes(item)} onChange={() => setChecked(old => old.includes(item) ? old.filter(x => x !== item) : [...old, item])} /><span className="fake-check">{checked.includes(item) && <Check size={13} />}</span><span>{item}</span></label>)}</div><div className="checklist-footer"><span>{checked.length === checklist.length ? "Great work — review these settings regularly." : "One step at a time. Every check helps."}</span><button onClick={copyChecklist} className="text-button">{copied ? <CheckCircle2 size={15} /> : <Copy size={15} />}{copied ? "Copied" : "Copy list"}</button></div><p className="privacy-micro"><LockKeyhole size={13} /> Checklist selections are not uploaded or saved to an account.</p></div>
        </div>
      </section>

      <section className="section support-section" id="get-support">
        <div className="container">
          <div className="support-banner"><div className="support-art"><div className="support-orbit" /><div className="support-symbol"><LifeBuoy size={49} strokeWidth={1.4} /></div><span className="support-star star-a">✳</span><span className="support-star star-b">✦</span></div><div className="support-copy"><span className="section-kicker">YOU DON'T HAVE TO FIGURE IT OUT ALONE</span><h2>Finding support is a sign of strength.</h2><p>If something is happening to you, consider reaching out to a trusted person or a qualified service. You deserve to be treated with respect and care.</p><button className="button button-primary" onClick={() => setShowChecklist(true)}>Prepare my safety steps <ChevronRight size={17} /></button></div></div>
          <div className="support-heading"><div><span className="section-kicker">PATHWAYS TO HELP</span><h2>Find the right kind of support</h2></div><p>These are support categories, not a verified directory of providers. We will publish named services only after checking their details and safe contact procedures.</p></div>
          <div className="support-types">{supportTypes.map(s => <div className="support-type" key={s.title}><span className="support-type-icon"><s.icon size={21} /></span><h3>{s.title}</h3><p>{s.desc}</p><span className="support-status"><CircleHelp size={14} /> Provider directory being verified</span></div>)}</div>
          <div className="safety-notice"><AlertTriangle size={20} /><div><strong>If you are in immediate danger</strong><p>Use a locally trusted emergency service or go to a safer place if you can do so safely. SafeNet Africa is an educational platform, not an emergency response service, and does not currently monitor reports.</p></div></div>
        </div>
      </section>

      <section className="privacy-section">
        <div className="container privacy-grid"><div className="privacy-icon"><LockKeyhole size={28} /></div><div><span className="section-kicker">DESIGNED WITH CARE</span><h2>Your privacy is part of your safety.</h2><p>This version does not have user accounts, does not send incident reports, and does not store your checklist on a server. Avoid using a device or browser that someone monitoring you can access. Clearing browser history may not remove all traces of activity.</p></div><div className="privacy-points"><span><CheckCircle2 size={16} /> No incident-report database</span><span><CheckCircle2 size={16} /> No account required</span><span><CheckCircle2 size={16} /> No tracking analytics added</span></div></div>
      </section>

      <footer className="footer">
        <div className="container footer-main"><a className="brand footer-brand" href="#home"><span className="brand-mark"><ShieldCheck size={24} /></span><span className="brand-copy"><strong>SafeNet<span>Africa</span></strong><small>SAFER DIGITAL SPACES</small></span></a><p>Safer digital spaces. Stronger voices.<br />Built around dignity, choice, and practical support.</p><div className="footer-links"><button onClick={() => navigate("Safety Guides")}>Safety guides</button><button onClick={() => navigate("Checklist")}>Checklist</button><button onClick={() => navigate("Get Support")}>Get support</button></div></div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} SafeNet Africa. A youth-led digital safety initiative.</span><span>Educational information only · Not emergency services</span></div>
      </footer>
      <button className="back-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>
    </main>
  );
}