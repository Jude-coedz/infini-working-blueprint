"use client";

import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Alert, ArrowLeft, ArrowRight, Check, Play, Rotate } from "./icons";
import { simulationSteps } from "@/data/blueprint";

type View = "intro" | "demo" | "handoff";

function StepDots({ view }: { view: View }) {
  const current = view === "intro" ? 0 : view === "demo" ? 1 : 2;
  return (
    <div className="step-dots" aria-label={`Step ${current + 1} of 3`}>
      {[0, 1, 2].map((index) => (
        <span key={index} className={index <= current ? "on" : ""} />
      ))}
    </div>
  );
}

function Shell({
  view,
  children,
}: {
  view: View;
  children: React.ReactNode;
}) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="identity">
          <span className="logo-mark">∞</span>
          <div>
            <strong>Infini Working Blueprint</strong>
            <span>Speculative Discovery Sprint concept</span>
          </div>
        </div>

        <div className="header-meta">
          <span>Fleet operations example</span>
          <StepDots view={view} />
        </div>
      </header>

      <main className="page-wrap">{children}</main>

      <footer className="site-footer">
        <span>Built from public case-study context + representative assumptions</span>
        <span>Concept only · no client-confidential data</span>
      </footer>
    </div>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="intro-layout">
      <section className="intro-copy">
        <span className="kicker">THE IDEA</span>
        <h1>What if discovery ended with something the client could actually use?</h1>
        <p className="lede">
          Infini already helps clients decide what is worth building. This concept adds one
          lightweight step before the full Build Partnership: a thin interactive slice of the
          highest-value workflow.
        </p>

        <div className="intro-points">
          <div>
            <span>01</span>
            <p><strong>Make the idea concrete.</strong> Let stakeholders react to behaviour, not just a roadmap.</p>
          </div>
          <div>
            <span>02</span>
            <p><strong>Expose weak assumptions early.</strong> See where data, integrations or policy still need proof.</p>
          </div>
          <div>
            <span>03</span>
            <p><strong>Hand engineering a clearer starting point.</strong> Carry validated workflow decisions into the build.</p>
          </div>
        </div>

        <button className="primary-cta" onClick={onStart}>
          Walk through the example <ArrowRight size={16} />
        </button>
        <p className="cta-note">Takes about 60 seconds.</p>
      </section>

      <aside className="concept-card">
        <div className="concept-label">DISCOVERY → BUILD</div>
        <div className="concept-flow">
          <div className="concept-step">
            <span>Today</span>
            <strong>Discovery Sprint</strong>
            <small>Opportunity map + roadmap</small>
          </div>
          <ArrowRight size={18} />
          <div className="concept-step highlight">
            <span>Added layer</span>
            <strong>Working Blueprint</strong>
            <small>Thin interactive workflow</small>
          </div>
          <ArrowRight size={18} />
          <div className="concept-step">
            <span>Then</span>
            <strong>Build Partnership</strong>
            <small>Production engineering</small>
          </div>
        </div>

        <div className="concept-caption">
          <span className="pulse" />
          <p>
            The prototype does <strong>not</strong> try to prove production readiness. It gives
            everyone something tangible enough to challenge before deeper engineering starts.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Demo({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(0);
  const [assigned, setAssigned] = useState(false);

  async function runDemo() {
    if (running) return;
    setRunning(true);
    setDone(0);
    setAssigned(false);

    for (let i = 1; i <= simulationSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 650));
      setDone(i);
    }

    setRunning(false);
  }

  const finished = done === simulationSteps.length;

  return (
    <div className="guided">
      <section className="guided-head">
        <div>
          <span className="kicker">STEP 2 OF 3 · EXPERIENCE THE THIN SLICE</span>
          <h1>One real workflow is enough to make discovery tangible.</h1>
          <p>
            Imagine the sprint identified driver updates and compliance exceptions as the best
            first slice. Instead of stopping at a recommendation, the client gets to interact
            with the proposed behaviour.
          </p>
        </div>

        <div className="instruction">
          <span>YOUR NEXT ACTION</span>
          <strong>Press “Process update” below.</strong>
          <small>Watch how one field update becomes an operational event and then a human review item.</small>
        </div>
      </section>

      <div className="demo-stage">
        <section className="message-panel">
          <div className="panel-title">
            <div>
              <span>Incoming driver update</span>
              <strong>Daniel Carter · FL-204</strong>
            </div>
            <span className="status-chip">Birmingham → Manchester</span>
          </div>

          <div className="message-bubble">
            “Running about 35 mins late. Had to reroute around M6 traffic. Vehicle is fine.”
          </div>

          <div className="before-state">
            <span>Before processing</span>
            <div>
              <p><small>ETA</small><strong>14:20</strong></p>
              <p><small>Vehicle status</small><strong>Unknown</strong></p>
              <p><small>Review queue</small><strong>0 items</strong></p>
            </div>
          </div>

          <button className="process-button" onClick={runDemo} disabled={running}>
            {running ? (
              <>
                <span className="spinner" /> Processing update
              </>
            ) : finished ? (
              <>
                <Rotate size={15} /> Run again
              </>
            ) : (
              <>
                <Play size={15} /> Process update
              </>
            )}
          </button>
        </section>

        <section className="result-panel">
          <div className="panel-title">
            <div>
              <span>What the proposed system does</span>
              <strong>{finished ? "Operational state updated" : "Waiting for input"}</strong>
            </div>
            <span className={`status-chip ${finished ? "success" : ""}`}>
              {finished ? "Complete" : `${done}/${simulationSteps.length}`}
            </span>
          </div>

          <div className="timeline">
            {simulationSteps.map((step, index) => {
              const complete = done > index;
              const active = running && done === index;

              return (
                <div key={step.key} className={`timeline-row ${complete ? "complete" : ""} ${active ? "active" : ""}`}>
                  <span className="timeline-icon">
                    {complete ? <Check size={13} /> : String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <strong>{step.label}</strong>
                    <small>{step.detail}</small>
                  </div>
                </div>
              );
            })}
          </div>

          <AnimatePresence>
            {finished && (
              <motion.div
                className="exception-card"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="exception-top">
                  <Alert size={17} />
                  <div>
                    <span>HUMAN REVIEW REQUIRED</span>
                    <strong>Vehicle inspection due within 48 hours</strong>
                  </div>
                </div>
                <p>
                  The system can surface the condition and context. Operations still owns the decision.
                </p>
                <button
                  className={assigned ? "assigned" : ""}
                  onClick={() => setAssigned(true)}
                >
                  {assigned ? (
                    <>
                      <Check size={14} /> Assigned to Operations
                    </>
                  ) : (
                    "Assign to Operations"
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>

      {finished && (
        <motion.div
          className="after-strip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div><span>ETA</span><strong>14:55</strong><small>updated from the driver signal</small></div>
          <div><span>Vehicle status</span><strong>Operational</strong><small>structured from the update</small></div>
          <div><span>Review queue</span><strong>1 item</strong><small>human judgement preserved</small></div>
        </motion.div>
      )}

      <div className="page-actions">
        <button className="secondary-cta" onClick={onBack}><ArrowLeft size={15} /> Back</button>
        <button className="primary-cta" onClick={onNext} disabled={!finished}>
          See what this changes for the build <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

function Handoff({ onBack, onRestart }: { onBack: () => void; onRestart: () => void }) {
  return (
    <div className="handoff-layout">
      <section className="handoff-head">
        <span className="kicker">STEP 3 OF 3 · DISCOVERY HANDOFF</span>
        <h1>The client leaves discovery knowing what is real, and what is still unknown.</h1>
        <p>
          That is the whole point of the Working Blueprint. It is not another deliverable to
          admire. It gives the Build Partnership a more concrete starting point.
        </p>
      </section>

      <div className="proof-grid">
        <section className="proof-block good">
          <div className="proof-title">
            <Check size={17} />
            <div>
              <span>VALIDATED BY THE THIN SLICE</span>
              <strong>What we can now discuss with confidence</strong>
            </div>
          </div>

          <ul>
            <li><strong>The operating loop</strong><span>A driver signal can become a structured operational event.</span></li>
            <li><strong>The human boundary</strong><span>Automation surfaces context; Operations owns the exception decision.</span></li>
            <li><strong>The primary interaction</strong><span>The team sees structured state and an actionable review item.</span></li>
          </ul>
        </section>

        <section className="proof-block open">
          <div className="proof-title">
            <Alert size={17} />
            <div>
              <span>STILL NEEDS PRODUCTION DISCOVERY</span>
              <strong>What the build must prove next</strong>
            </div>
          </div>

          <ul>
            <li><strong>Real fleet-system APIs</strong><span>Actual integration surface and write permissions.</span></li>
            <li><strong>Compliance policy</strong><span>Rules, jurisdiction, evidence source and audit requirements.</span></li>
            <li><strong>Data + security</strong><span>Quality, identity, roles, access and retention controls.</span></li>
          </ul>
        </section>
      </div>

      <section className="handoff-summary">
        <div>
          <span className="kicker">THE PROPOSED CHANGE</span>
          <h2>Discovery Sprint → Working Blueprint → Build Partnership</h2>
        </div>
        <p>
          Stakeholders react to behaviour before committing more engineering time. Bad assumptions
          surface earlier. The build starts from an agreed workflow shape instead of a blank page.
        </p>
      </section>

      <section className="final-note">
        <span>WHY I BUILT THIS</span>
        <p>
          This is the kind of product-to-build gap I enjoy working in: taking a loose commercial
          requirement, making the workflow concrete quickly, then separating what is actually
          validated from what still needs production engineering.
        </p>
      </section>

      <div className="page-actions">
        <button className="secondary-cta" onClick={onBack}><ArrowLeft size={15} /> Back</button>
        <button className="primary-cta" onClick={onRestart}><Rotate size={15} /> Restart walkthrough</button>
      </div>
    </div>
  );
}

export function WorkingBlueprint() {
  const reducedMotion = useReducedMotion();
  const [view, setView] = useState<View>("intro");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  }, [view, reducedMotion]);

  return (
    <MotionConfig reducedMotion="user">
      <Shell view={view}>
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -5 }}
            transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {view === "intro" && <Intro onStart={() => setView("demo")} />}
            {view === "demo" && <Demo onBack={() => setView("intro")} onNext={() => setView("handoff")} />}
            {view === "handoff" && <Handoff onBack={() => setView("demo")} onRestart={() => setView("intro")} />}
          </motion.div>
        </AnimatePresence>
      </Shell>
    </MotionConfig>
  );
}
