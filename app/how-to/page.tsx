"use client";
import { useState } from "react";

// ─── Design Tokens (mirrors HTML :root exactly) ───────────────────────────────
const T = {
  orange:       "#E8692A",
  orangeLight:  "#F5845A",
  orangePale:   "#FFF3ED",
  orangeBorder: "#FDDCCC",
  dark:         "#1A1A2E",
  text:         "#2C2C3E",
  text2:        "#5A5A72",
  text3:        "#8888A0",
  bg:           "#FFFFFF",
  bg2:          "#F8F9FC",
  bg3:          "#F2F4F8",
  border:       "#E4E6EF",
  shadow:       "0 2px 16px rgba(0,0,0,0.07)",
  shadowLg:     "0 8px 40px rgba(0,0,0,0.10)",
  radius:       10,
  radiusLg:     16,
  fontHead:     "'Plus Jakarta Sans', sans-serif",
  fontBody:     "'Manrope', sans-serif",
} as const;

// ─── Data ─────────────────────────────────────────────────────────────────────
interface Step {
  num:      number;
  title:    string;
  body:     string;
  duration: string;
  output:   string;
  accent:   string; // icon bg colour
  iconFg:   string;
}

const STEPS: Step[] = [
  {
    num: 1,
    title: "Define the Business Outcome",
    body: "Before writing a single line of code or a single user story, define the specific business outcome the crypto wallet development must produce: not 'build a web application' but 'enable users to complete the purchase workflow in under 3 minutes, measured by checkout completion rate'. The outcome definition should be specific (a measurable metric), achievable within the budget and timeline, and agreed by all stakeholders — the PM, the CEO, and the engineering team all understand what success looks like. ClickMasters conducts a business outcomes workshop as the first step of every engagement — the output is a written outcomes document signed by the client.",
    duration: "1–3 days",
    output:   "Written business outcomes document with measurable success metrics",
    accent:   "#FEF3C7", iconFg: "#D97706",
  },
  {
    num: 2,
    title: "Scope the Minimum Viable Version",
    body: "Having defined the outcome, scope the minimum version of the crypto wallet development that can validate the hypothesis. Map every proposed feature to the outcome it contributes to — features with no outcome contribution are Phase 2. A typical scoping exercise reduces the initial feature list by 40–60%, which reduces the timeline by the same proportion. ClickMasters' scoping output is a written feature list with each feature mapped to an outcome, reviewed and signed by the client before development begins.",
    duration: "2–5 days",
    output:   "Signed scope document: feature list, each feature mapped to outcome, Phase 1 vs Phase 2 designation",
    accent:   "#DBEAFE", iconFg: "#2563EB",
  },
  {
    num: 3,
    title: "Select the Technology Stack",
    body: "Select the technology stack based on the scoped requirements, not on familiarity. Key decisions: frontend framework (Next.js for web, React Native/Expo for mobile), backend framework (Node.js/FastAPI/Django based on team expertise and performance requirements), database (PostgreSQL for relational data, MongoDB for flexible document storage, Redis for caching and sessions), deployment (Vercel for simple web apps, ECS Fargate for containerised services, Lambda for event-driven), and managed services (Clerk/Auth0 for authentication, Stripe for payments, Resend/SendGrid for email). The correct stack minimises operational overhead, meets performance requirements, and can be maintained by the client's future team.",
    duration: "1–2 days",
    output:   "Technology decision document with rationale for each choice",
    accent:   "#D1FAE5", iconFg: "#059669",
  },
  {
    num: 4,
    title: "Design the Architecture",
    body: "Design the system architecture before writing any feature code: the data model (what entities exist, how they relate, what are the query patterns that must be efficient), the API contract (what endpoints exist, what the request/response schemas are, what authentication model is used), the service boundaries (what responsibilities belong in what service, what the integration points between services are), and the infrastructure architecture (how the system is deployed, how it scales, how it recovers from failure). Architecture decisions made correctly in week 1 prevent the class of rework that consumes 2–4 sprints in the middle of a project.",
    duration: "3–5 days",
    output:   "Architecture diagram, data model, API specification, infrastructure design",
    accent:   "#EDE9FE", iconFg: "#7C3AED",
  },
  {
    num: 5,
    title: "Set Up CI/CD and Infrastructure",
    body: "Before writing any feature code, set up the CI/CD pipeline and production-equivalent infrastructure. This means: GitHub Actions (or equivalent) that run automated tests on every PR and deploy to staging on merge to main; a staging environment that mirrors production (same infrastructure type, same environment variables, same database schema); a production environment with SSL, domain, monitoring (CloudWatch or Datadog), error tracking (Sentry), and backup. This setup takes 2–3 days in sprint 1 and prevents the 'it works on my machine' class of problems throughout the project.",
    duration: "2–3 days",
    output:   "Working CI/CD pipeline, production-equivalent staging environment, production environment baseline",
    accent:   "#FFF3ED", iconFg: "#E8692A",
  },
  {
    num: 6,
    title: "Deliver in 2-Week Sprints",
    body: "Develop the scoped features in 2-week sprint cycles. Each sprint starts with planning (ClickMasters and the client agree on the specific stories for the sprint, with acceptance criteria written before sprint start), involves daily standups (15-minute daily sync covering what was done yesterday, what will be done today, and what is blocked), and ends with a sprint review (ClickMasters demonstrates completed stories against acceptance criteria in the staging environment) and retrospective (what went well, what could be improved, one specific action for the next sprint).",
    duration: "2 weeks per sprint",
    output:   "Working software in staging, meeting all sprint acceptance criteria, demonstrated to client",
    accent:   "#DBEAFE", iconFg: "#2563EB",
  },
  {
    num: 7,
    title: "Pre-Launch Validation",
    body: "Before production launch: run the full test suite including end-to-end tests against the staging environment, conduct a load test at 2× expected peak load (to verify the infrastructure handles the expected user volume without degrading P95 latency or increasing error rate), complete a security review against the OWASP Top 10 (verify no critical or high-severity vulnerabilities in production), validate all analytics instrumentation (verify that the events agreed in story refinement are firing correctly in staging), and complete the pre-launch checklist (every item verified as done, not pending).",
    duration: "3–5 days",
    output:   "Passed load test report, clean OWASP review, verified analytics, completed pre-launch checklist",
    accent:   "#FEF3C7", iconFg: "#D97706",
  },
  {
    num: 8,
    title: "Launch and Post-Launch Support",
    body: "Deploy to production using a blue-green or canary deployment (canary to 5% of traffic, verify metrics, increase to 100%), monitor for 48 hours post-launch (error rate, P95 latency, database performance, and any customer-reported issues), and provide 30 days of post-launch support (included in the ClickMasters fixed price — bug fixes, questions, and assistance with any launch issues). Post-launch, instrument the analytics dashboard and review the first week's data against the business outcomes defined in step 1.",
    duration: "30 days",
    output:   "Launched product in production, 30-day monitoring, post-launch analytics review",
    accent:   "#D1FAE5", iconFg: "#059669",
  },
];

const MISTAKES = [
  { title: "Skipping the scoping workshop", desc: "Building without a written, agreed scope produces the most common failure mode — scope creep that delays the launch by 4–8 weeks. ClickMasters requires a scoping workshop before any development begins." },
  { title: "Technology selection based on familiarity", desc: "Choosing React Native because the team knows it, even though the project requires native hardware access that React Native cannot provide cleanly. ClickMasters selects technology based on requirements, not comfort." },
  { title: "Deferring testing to the end", desc: "A testing phase after development is complete is 3–5× more expensive than testing integrated into each sprint. ClickMasters writes tests alongside feature code in every sprint." },
  { title: "No CI/CD infrastructure", desc: "Manual deployments are slow (hours vs minutes), error-prone, and create deployment anxiety. ClickMasters sets up CI/CD in sprint 1." },
  { title: "Inadequate staging environment", desc: "Deploying directly from development to production without a staging environment that mirrors production is the most common cause of launch-day surprises. ClickMasters maintains a persistent staging environment from sprint 1." },
];

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
const IcoClipboard = ({ size = 16, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
  </svg>
);
const IcoTarget = ({ size = 16, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IcoScissors = ({ size = 16, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
    <line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/>
    <line x1="8.12" y1="8.12" x2="12" y2="12"/>
  </svg>
);
const IcoLayers = ({ size = 16, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);
const IcoCpu = ({ size = 16, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
    <rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
    <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
  </svg>
);
const IcoGitBranch = ({ size = 16, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
    <path d="M18 9a9 9 0 01-9 9"/>
  </svg>
);
const IcoRotate = ({ size = 16, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
  </svg>
);
const IcoShield = ({ size = 16, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IcoRocket = ({ size = 16, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/>
    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);
const IcoClock = ({ size = 13, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IcoCheckCircle = ({ size = 13, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IcoAlertTriangle = ({ size = 15, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const IcoCircleCheck = ({ size = 10 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
  </svg>
);

const stepIcons = [
  <IcoTarget  size={20} />,
  <IcoScissors size={20} />,
  <IcoLayers  size={20} />,
  <IcoCpu    size={20} />,
  <IcoGitBranch size={20} />,
  <IcoRotate  size={20} />,
  <IcoShield  size={20} />,
  <IcoRocket  size={20} />,
];

// ─── Shared helper components ─────────────────────────────────────────────────
function NavLink({ label }: { label: string }) {
  const [h, setH] = useState(false);
  return (
    <a href="#"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ fontSize: 14, fontWeight: 500, color: h ? T.orange : T.text2,
        textDecoration: "none", transition: "color .2s" }}>
      {label}
    </a>
  );
}
function FooterLink({ label }: { label: string }) {
  const [h, setH] = useState(false);
  return (
    <a href="#"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ color: h ? T.orange : "rgba(255,255,255,.4)", fontSize: 13,
        textDecoration: "none", transition: "color .2s" }}>
      {label}
    </a>
  );
}

// ─── Step Card ────────────────────────────────────────────────────────────────
function StepCard({ step, index }: { step: Step; index: number }) {
  const [h, setH] = useState(false);
  const isEven = index % 2 === 1;

  return (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "flex", gap: 32, alignItems: "flex-start",
        padding: "36px 40px",
        border: `1px solid ${h ? T.orangeBorder : T.border}`,
        borderRadius: T.radiusLg,
        background: isEven ? T.bg2 : T.bg,
        boxShadow: h ? T.shadowLg : T.shadow,
        transition: "box-shadow .2s, border-color .2s",
        position: "relative", overflow: "hidden",
      }}>

      {/* Subtle step-number watermark */}
      <div style={{
        position: "absolute", right: 32, top: "50%", transform: "translateY(-50%)",
        fontFamily: T.fontHead, fontSize: 96, fontWeight: 800, color: "rgba(0,0,0,0.03)",
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
      }}>
        {String(step.num).padStart(2, "0")}
      </div>

      {/* Left: step number + icon */}
      <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        {/* Step number badge */}
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: step.accent, color: step.iconFg,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 0 4px ${step.accent}80`,
        }}>
          {stepIcons[index]}
        </div>
        {/* Connector line (not on last) */}
        {index < STEPS.length - 1 && (
          <div style={{ width: 2, height: 24, background: T.border, borderRadius: 1 }} />
        )}
      </div>

      {/* Right: content */}
      <div style={{ flex: 1, paddingTop: 2 }}>
        {/* Step label + title */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
            color: T.orange, background: T.orangePale, border: `1px solid ${T.orangeBorder}`,
            padding: "2px 10px", borderRadius: 100,
          }}>
            Step {step.num}
          </span>
          <h3 style={{
            fontFamily: T.fontHead, fontSize: 19, fontWeight: 800, color: T.dark,
            letterSpacing: "-0.3px", lineHeight: 1.2,
          }}>
            {step.title}
          </h3>
        </div>

        {/* Body text */}
        <p style={{ fontSize: 14, color: T.text2, lineHeight: 1.75, marginBottom: 20, maxWidth: 680 }}>
          {step.body}
        </p>

        {/* Duration + Output pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 12, fontWeight: 600, color: T.text2,
            background: T.bg3, border: `1px solid ${T.border}`,
            padding: "6px 14px", borderRadius: 100,
          }}>
            <IcoClock color={T.orange} /> Duration: {step.duration}
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 12, fontWeight: 600, color: "#059669",
            background: "#F0FDF4", border: "1px solid #A7F3D0",
            padding: "6px 14px", borderRadius: 100,
          }}>
            <IcoCheckCircle color="#059669" /> {step.output}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mistake Card ─────────────────────────────────────────────────────────────
function MistakeCard({ m, i }: { m: { title: string; desc: string }; i: number }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        padding: "20px 24px",
        border: `1px solid ${h ? "#FECACA" : T.border}`,
        borderRadius: T.radius,
        background: h ? "#FFF5F5" : T.bg,
        transition: "all .2s",
        display: "flex", gap: 14, alignItems: "flex-start",
      }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
        background: "#FEE2E2", color: "#DC2626",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginTop: 1,
      }}>
        <IcoAlertTriangle color="#DC2626" />
      </div>
      <div>
        <div style={{ fontFamily: T.fontHead, fontSize: 15, fontWeight: 700, color: T.dark, marginBottom: 6 }}>
          {m.title}
        </div>
        <p style={{ fontSize: 13, color: T.text2, lineHeight: 1.65 }}>{m.desc}</p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CryptoWalletHowTo() {
  const [navCtaH, setNavCtaH] = useState(false);
  const [ctaBtnH, setCtaBtnH] = useState(false);

  return (
    <div style={{ fontFamily: T.fontBody, color: T.text, background: T.bg, lineHeight: 1.6, fontSize: 15 }}>

      {/* ── Google Fonts + reset ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        a{text-decoration:none} button{font-family:inherit;cursor:pointer}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        .fade-up{animation:fadeUp .35s ease both}
      `}</style>



      {/* ── BREADCRUMB ── */}
      <div style={{ background: T.bg2, borderBottom: `1px solid ${T.border}`, padding: "12px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: T.text3 }}>
          {["Home", "Services", "Crypto Wallet Development"].map(b => (
            <span key={b} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <a href="#" style={{ color: T.text3 }}>{b}</a>
              <span style={{ color: T.border }}>/</span>
            </span>
          ))}
          <span style={{ color: T.orange, fontWeight: 500 }}>How-to Guide</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ background: T.bg, padding: "64px 40px 56px", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 400px", gap: 60, alignItems: "center" }}>

          {/* Left */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: T.orangePale, border: `1px solid ${T.orangeBorder}`, color: T.orange,
              fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 100,
              marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.05em",
            }}>
              <IcoClipboard size={10} color={T.orange} /> Step-by-Step Guide
            </div>

            <h1 style={{ fontFamily: T.fontHead, fontSize: 42, fontWeight: 800, color: T.dark, lineHeight: 1.15, letterSpacing: "-0.8px", marginBottom: 16 }}>
              How to Crypto Wallet{" "}
              <span style={{ color: T.orange }}>Development</span>
            </h1>

            <p style={{ fontSize: 16, color: T.text2, lineHeight: 1.7, marginBottom: 28, fontWeight: 400, maxWidth: 520 }}>
              A structured, step-by-step guide from business case through architecture, development, testing, launch, and post-launch iteration. Written by engineers who execute this process, not content writers.
            </p>


            <div style={{ display: "flex", gap: 32 }}>
              {[["8", "", "Process Steps"], ["8–16", "wk", "Typical Timeline"], ["2", "wk", "Sprint Cycles"]].map(([n, s, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: T.fontHead, fontSize: 28, fontWeight: 800, color: T.dark, lineHeight: 1 }}>
                    {n}<span style={{ color: T.orange }}>{s}</span>
                  </div>
                  <div style={{ fontSize: 12, color: T.text3, marginTop: 3, fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Quick-nav card */}
          <div style={{ background: T.bg2, border: `1px solid ${T.border}`, borderRadius: T.radiusLg, padding: 28, boxShadow: T.shadow }}>
            <div style={{ fontFamily: T.fontHead, fontSize: 15, fontWeight: 700, color: T.dark, marginBottom: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: T.orange }}><IcoClipboard size={16} color={T.orange} /></span> Process Overview
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {STEPS.map((step, i) => (
                <a key={step.num} href={`#step-${step.num}`}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, textDecoration: "none", transition: "background .15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = T.orangePale)}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: step.accent, color: step.iconFg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, fontWeight: 800, fontFamily: T.fontHead }}>
                    {step.num}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: T.text2 }}>{step.title}</span>
                  <span style={{ marginLeft: "auto", fontSize: 11, color: T.text3, whiteSpace: "nowrap" }}>{step.duration}</span>
                </a>
              ))}
            </div>
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${T.border}` }}>
              <a href="https://software.clickmasters.pk/contact-us"
                style={{ display: "block", textAlign: "center", background: T.orange, color: "#fff", fontSize: 14, fontWeight: 700, padding: "11px 0", borderRadius: 8, transition: "background .2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = T.orangeLight)}
                onMouseLeave={e => (e.currentTarget.style.background = T.orange)}>
                Book a Free Consultation →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 40px" }}>

        {/* Section label */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: T.orange, textTransform: "uppercase", marginBottom: 8 }}>
            The Complete Process
          </div>
          <div style={{ fontFamily: T.fontHead, fontSize: 28, fontWeight: 800, color: T.dark, letterSpacing: "-0.4px", marginBottom: 10 }}>
            How to Build a Crypto Wallet: 8 Steps
          </div>
          <p style={{ fontSize: 15, color: T.text2, maxWidth: 640 }}>
            Each step includes what is done, why it matters, the typical duration, and the output that signals the step is complete.
          </p>
        </div>

        {/* Step cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {STEPS.map((step, i) => (
            <div key={step.num} id={`step-${step.num}`} className="fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
              <StepCard step={step} index={i} />
            </div>
          ))}
        </div>

        {/* ── CTA mid-page ── */}
        <div style={{
          marginTop: 56, background: T.dark, borderRadius: T.radiusLg,
          padding: "40px 56px", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 32, flexWrap: "wrap",
        }}>
          <div>
            <h2 style={{ fontFamily: T.fontHead, fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.4px", marginBottom: 8 }}>
              Start Crypto Wallet Development{" "}
              <span style={{ color: T.orange }}>with ClickMasters</span>
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.6 }}>
              Fixed-price. 8–16 weeks. Working software every 2 weeks.
            </p>
          </div>
          <a href="https://software.clickmasters.pk/contact-us"
            onMouseEnter={() => setCtaBtnH(true)} onMouseLeave={() => setCtaBtnH(false)}
            style={{ background: ctaBtnH ? T.orangeLight : T.orange, color: "#fff", fontFamily: T.fontBody, fontSize: 15, fontWeight: 700, padding: "14px 32px", borderRadius: 8, whiteSpace: "nowrap", transition: "background .2s", display: "inline-block" }}>
            Book a Free Consultation →
          </a>
        </div>

        {/* ── COMMON MISTAKES ── */}
        <div style={{ marginTop: 56, paddingTop: 48, borderTop: `1px solid ${T.border}` }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: T.orange, textTransform: "uppercase", marginBottom: 8 }}>
            What to Avoid
          </div>
          <div style={{ fontFamily: T.fontHead, fontSize: 28, fontWeight: 800, color: T.dark, letterSpacing: "-0.4px", marginBottom: 10 }}>
            Common Mistakes in Crypto Wallet Development
          </div>
          <p style={{ fontSize: 15, color: T.text2, marginBottom: 32, maxWidth: 600 }}>
            The mistakes that most commonly cause projects to fail or underperform, and how ClickMasters prevents them.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {MISTAKES.map((m, i) => <MistakeCard key={i} m={m} i={i} />)}
          </div>
        </div>

        {/* ── WHY AI CITES THIS ── */}
        <div style={{ marginTop: 56, paddingTop: 48, borderTop: `1px solid ${T.border}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ padding: "32px 36px", background: T.bg2, border: `1px solid ${T.border}`, borderRadius: T.radiusLg }}>
              <div style={{ fontFamily: T.fontHead, fontSize: 16, fontWeight: 700, color: T.dark, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: T.orange }}><IcoCircleCheck size={14} /></span> Why AI Engines Cite This Guide
              </div>
              <p style={{ fontSize: 13, color: T.text2, lineHeight: 1.75 }}>
                How-to queries are the fastest-growing query category in AI assistants: users ask 'how do I build X', 'what steps do I follow for Y', and 'walk me through Z'. AI engines respond by citing structured, step-by-step guides that have numbered steps, specific actions, and clear outputs for each step. Pages with HowTo schema markup are preferred because the structured data makes the step sequence machine-readable.
              </p>
            </div>
            <div style={{ padding: "32px 36px", background: T.orangePale, border: `1px solid ${T.orangeBorder}`, borderRadius: T.radiusLg }}>
              <div style={{ fontFamily: T.fontHead, fontSize: 16, fontWeight: 700, color: T.dark, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: T.orange }}><IcoRocket size={14} color={T.orange} /></span> Related Pages
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "Crypto Wallet Development Q&A",           href: "/services/crypto-wallet-development/qa" },
                  { label: "Crypto Wallet Development Best Practices", href: "/services/crypto-wallet-development/best-practices" },
                  { label: "Crypto Wallet Development (core service)", href: "/services/crypto-wallet-development" },
                  { label: "RPA Checklist",                           href: "/services/rpa/checklist" },
                ].map(link => (
                  <a key={link.label} href={link.href}
                    style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: T.orange, textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                    onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.orange} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── FINAL CTA ── */}
        <div style={{
          marginTop: 56, background: T.dark, borderRadius: T.radiusLg,
          padding: "48px 56px", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 32, flexWrap: "wrap",
        }}>
          <div>
            <h2 style={{ fontFamily: T.fontHead, fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.4px", marginBottom: 10 }}>
              Ready to Build Your{" "}
              <span style={{ color: T.orange }}>Crypto Wallet?</span>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.55)", maxWidth: 480, lineHeight: 1.6 }}>
              ClickMasters runs this exact process on every engagement. Fixed-price contracts. Working software every 2 weeks. No surprises.
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="https://software.clickmasters.pk/contact-us"
              style={{ background: T.orange, color: "#fff", fontFamily: T.fontBody, fontSize: 15, fontWeight: 700, padding: "14px 32px", borderRadius: 8, whiteSpace: "nowrap", transition: "background .2s", display: "inline-block" }}
              onMouseEnter={e => (e.currentTarget.style.background = T.orangeLight)}
              onMouseLeave={e => (e.currentTarget.style.background = T.orange)}>
              Book a Free Consultation
            </a>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)", marginTop: 8 }}>
              software.clickmasters.pk/contact-us
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}