"use client";

import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { Alert, ArrowLeft, ArrowRight, Check, Play, Rotate } from "./icons";
import { opportunities, simulationSteps, validationItems, workflow } from "@/data/blueprint";

type Stage = "prioritise" | "model" | "simulate" | "build";
const stages: Array<{key:Stage; label:string; sub:string}> = [
  { key:"prioritise", label:"Prioritise", sub:"Choose the first thin slice" },
  { key:"model", label:"Model", sub:"Expose system + human boundaries" },
  { key:"simulate", label:"Simulate", sub:"Run the proposed workflow" },
  { key:"build", label:"Build readiness", sub:"Separate proof from unknowns" },
];

function Pill({children,tone="neutral"}:{children:React.ReactNode;tone?:"neutral"|"good"|"warn"|"accent"}) {
  return <span className={"pill "+tone}>{children}</span>;
}

function Header({stage,setStage}:{stage:Stage;setStage:(s:Stage)=>void}) {
  return <>
    <header className="topbar">
      <div className="brand"><span className="mark">∞</span><div><strong>INFINI.AI</strong><span>WORKING BLUEPRINT / 001</span></div></div>
      <div className="live"><span/>Concept prototype · representative data</div>
      <div className="case">Fleet operations & compliance</div>
    </header>
    <nav className="stage-nav">
      {stages.map((item,i)=><button key={item.key} onClick={()=>setStage(item.key)} className={stage===item.key?"active":""}>
        <span className="stage-num">{String(i+1).padStart(2,"0")}</span>
        <span><strong>{item.label}</strong><small>{item.sub}</small></span>
        {stage===item.key && <motion.i layoutId="active-stage" />}
      </button>)}
    </nav>
  </>;
}

function Frame({label,title,desc,children,aside,actions}:{label:string;title:string;desc:string;children:React.ReactNode;aside:React.ReactNode;actions:React.ReactNode}) {
  return <div className="frame">
    <section className="main-panel">
      <div className="intro"><span className="eyebrow">{label}</span><h1>{title}</h1><p>{desc}</p></div>
      {children}
      <div className="actions">{actions}</div>
    </section>
    <aside className="rail">{aside}</aside>
  </div>;
}

function Prioritise({next}:{next:()=>void}) {
  const [selected,setSelected]=useState(opportunities[0].id);
  const active=opportunities.find(o=>o.id===selected) ?? opportunities[0];
  return <Frame
    label="DISCOVERY OUTPUT · OPPORTUNITY MAP"
    title="Pick the smallest slice that proves the system."
    desc="Instead of leaving discovery with a list of possibilities, make the highest-value workflow concrete enough for stakeholders to challenge before engineering commits."
    actions={<><span/><button className="primary" onClick={next}>Model proposed workflow <ArrowRight size={14}/></button></>}
    aside={<>
      <div className="rail-top"><span>Selected opportunity</span><Pill tone="accent">Recommended</Pill></div>
      <h2>{active.title}</h2><p>{active.rationale}</p>
      <dl><div><dt>Intervention</dt><dd>{active.intervention}</dd></div><div><dt>Source</dt><dd>{active.source}</dd></div></dl>
      <div className="rule"/><div className="note"><Check size={14}/>The goal is not to prove production readiness. It is to prove that the problem, workflow and human boundary are worth building.</div>
    </>}
  >
    <div className="decision"><div><span>Proposed first slice</span><strong>Driver updates + compliance exceptions</strong></div><p>High-frequency operational signal, measurable outcome, limited initial surface area.</p></div>
    <div className="table">
      <div className="thead grid"><span>Opportunity</span><span>Impact</span><span>Feasibility</span><span>Risk</span><span/></div>
      {opportunities.map((o,i)=><button key={o.id} onClick={()=>setSelected(o.id)} className={"row grid "+(selected===o.id?"selected":"")}>
        <div><b>{String(i+1).padStart(2,"0")}</b><span><strong>{o.title}</strong><small>{o.problem}</small></span></div>
        <span><i className="dot good"/>{o.impact}</span><span><i className={"dot "+(o.feasibility==="High"?"good":"warn")}/>{o.feasibility}</span><span>{o.risk}</span><ArrowRight size={13}/>
      </button>)}
    </div>
    <p className="source">Public case-study context is separated from illustrative assumptions so the prototype does not imply access to client-confidential systems.</p>
  </Frame>;
}

function Model({next,back}:{next:()=>void;back:()=>void}) {
  const [selected,setSelected]=useState(workflow[0].id);
  const node=workflow.find(w=>w.id===selected) ?? workflow[0];
  return <Frame
    label="SYSTEM MODEL · PROPOSED FLOW"
    title="Make the handoffs inspectable."
    desc="A discovery artifact becomes more useful when everyone can see where software acts, where a person stays in control, and which dependencies still need proof."
    actions={<><button className="secondary" onClick={back}><ArrowLeft size={14}/>Back</button><button className="primary" onClick={next}>Run thin simulation <ArrowRight size={14}/></button></>}
    aside={<><div className="rail-top"><span>Node detail</span><Pill>{node.certainty}</Pill></div><h2>{node.label}</h2><p>{node.description}</p>
      <dl><div><dt>Owner</dt><dd>{node.owner}</dd></div><div><dt>System</dt><dd>{node.system}</dd></div><div><dt>Human role</dt><dd>{node.human}</dd></div></dl>
      <div className="rule"/><p className="micro">Each node is deliberately framed as proposed or illustrative until client evidence confirms it.</p></>}
  >
    <div className="flow">
      {workflow.map((w,i)=><div className="flow-wrap" key={w.id}>
        <button onClick={()=>setSelected(w.id)} className={"flow-node "+(selected===w.id?"selected":"")}>
          <span>{String(i+1).padStart(2,"0")}</span><strong>{w.label}</strong><small>{w.owner}</small>
        </button>{i<workflow.length-1 && <ArrowRight size={16}/>}
      </div>)}
    </div>
    <div className="boundary">
      <div><span className="eyebrow">AUTOMATION BOUNDARY</span><p>Structure data, update the journey record and evaluate deterministic rules.</p></div>
      <div><span className="eyebrow">HUMAN BOUNDARY</span><p>Define policy, review low-confidence events and resolve compliance exceptions.</p></div>
    </div>
  </Frame>;
}

function Simulate({next,back}:{next:()=>void;back:()=>void}) {
  const [running,setRunning]=useState(false);
  const [done,setDone]=useState(0);
  const [reviewed,setReviewed]=useState(false);
  async function run(){
    if(running)return; setRunning(true); setDone(0); setReviewed(false);
    for(let i=1;i<=simulationSteps.length;i++){ await new Promise(r=>setTimeout(r,700)); setDone(i); }
    setRunning(false);
  }
  const finished=done===simulationSteps.length;
  return <Frame
    label="THIN FUNCTIONAL SLICE · REPRESENTATIVE DATA"
    title="Let the client react to behaviour, not just a specification."
    desc="This is intentionally deterministic. It demonstrates the operating loop and exception path without pretending that production integrations or policy rules have already been validated."
    actions={<><button className="secondary" onClick={back}><ArrowLeft size={14}/>Back</button><button className="primary" disabled={!finished} onClick={next}>Review build readiness <ArrowRight size={14}/></button></>}
    aside={<><div className="rail-top"><span>Run status</span><Pill tone={finished?"good":running?"accent":"neutral"}>{finished?"Complete":running?"Processing":"Ready"}</Pill></div>
      <h2>What this run proves</h2><div className="mini-list"><span className={done>=1?"on":""}><Check/>Unstructured update can become a structured event.</span><span className={done>=2?"on":""}><Check/>Operational state can react to that event.</span><span className={done>=3?"on":""}><Check/>Rules can create a reviewable exception.</span><span className={reviewed?"on":""}><Check/>A human can remain accountable for resolution.</span></div>
      <div className="rule"/><p className="micro">It does not validate real APIs, real compliance policy, model accuracy or production security.</p></>}
  >
    <div className="sim-grid">
      <section className="driver-card"><div className="card-head"><span>Incoming update</span><Pill>Driver · DC-042</Pill></div><h3>Daniel Carter</h3><p className="route">Birmingham → Manchester · FL-204</p>
        <blockquote>“Running about 35 mins late. Had to reroute around M6 traffic. Vehicle is fine.”</blockquote>
        <button className="run" onClick={run} disabled={running}>{running?<><span className="spinner"/>Processing update</>:finished?<><Rotate size={14}/>Run again</>:<><Play size={14}/>Process update</>}</button>
      </section>
      <section className="trace"><div className="card-head"><span>Operational trace</span><span>{done}/{simulationSteps.length}</span></div>
        {simulationSteps.map((s,i)=><motion.div key={s.key} className={"trace-row "+(done>i?"done":running&&done===i?"active":"")} animate={done>i?{opacity:1}:{}}>
          <span className="trace-icon">{done>i?<Check size={12}/>:String(i+1).padStart(2,"0")}</span><div><strong>{s.label}</strong><small>{s.detail}</small></div>
        </motion.div>)}
      </section>
    </div>
    <AnimatePresence>{finished && <motion.section className="exception" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
      <div className="exception-icon"><Alert size={17}/></div><div><span className="eyebrow">HUMAN REVIEW REQUIRED</span><h3>Vehicle FL-204 inspection due within 48 hours.</h3><p>The system can surface the condition and context. Operations still owns the decision.</p></div>
      <button className={reviewed?"reviewed":""} onClick={()=>setReviewed(true)}>{reviewed?<><Check size={13}/>Assigned to Operations</>:"Assign to Operations"}</button>
    </motion.section>}</AnimatePresence>
  </Frame>;
}

function Build({back,reset}:{back:()=>void;reset:()=>void}) {
  const validated=validationItems.filter(v=>v.status==="validated");
  const unknown=validationItems.filter(v=>v.status==="unknown");
  return <Frame
    label="BUILD READINESS · DISCOVERY HANDOFF"
    title="Separate what was learned from what still needs evidence."
    desc="The prototype should make the Build Partnership easier to scope, not create false confidence. The handoff keeps validated behaviour and unresolved production dependencies visibly separate."
    actions={<><button className="secondary" onClick={back}><ArrowLeft size={14}/>Back</button><button className="primary" onClick={reset}><Rotate size={14}/>Restart walkthrough</button></>}
    aside={<><div className="rail-top"><span>Concept outcome</span><Pill tone="good">Ready to discuss</Pill></div><h2>A more tangible discovery handoff.</h2>
      <p>Stakeholders react to behaviour. Engineers inherit clearer assumptions. Commercial scope starts from an agreed system shape rather than a blank page.</p>
      <div className="rule"/><p className="micro">Speculative process concept for Infini AI Solutions. Not presented as an existing Infini service.</p></>}
  >
    <div className="readiness">
      <section><div className="card-head"><span>Validated by thin slice</span><Pill tone="good">{validated.length} items</Pill></div>{validated.map(v=><div className="read-row" key={v.label}><Check size={14}/><div><strong>{v.label}</strong><small>{v.note}</small></div></div>)}</section>
      <section><div className="card-head"><span>Still requires discovery</span><Pill tone="warn">{unknown.length} items</Pill></div>{unknown.map(v=><div className="read-row unknown" key={v.label}><Alert size={14}/><div><strong>{v.label}</strong><small>{v.note}</small></div></div>)}</section>
    </div>
    <div className="architecture"><span className="eyebrow">PROPOSED PRODUCTION SHAPE</span><div className="arch-line"><b>Driver / Operations</b><ArrowRight/><b>Interface</b><ArrowRight/><b>Workflow service</b><ArrowRight/><b>Fleet API + rules</b><ArrowRight/><b>Audit + alerts</b></div></div>
    <div className="phases"><div><span>01</span><strong>Core workflow</strong><small>Integrations + structured event model</small></div><div><span>02</span><strong>Exception operations</strong><small>Permissions + audit trail + review queue</small></div><div><span>03</span><strong>Optimisation</strong><small>Analytics + route intelligence once data is proven</small></div></div>
  </Frame>;
}

export function WorkingBlueprint(){
  const reduced=useReducedMotion();
  const [stage,setStage]=useState<Stage>("prioritise");
  const index=useMemo(()=>stages.findIndex(s=>s.key===stage),[stage]);
  const next=()=>setStage(stages[Math.min(index+1,stages.length-1)].key);
  const back=()=>setStage(stages[Math.max(index-1,0)].key);
  useEffect(()=>{window.scrollTo({top:0,behavior:reduced?"auto":"smooth"})},[stage,reduced]);
  return <MotionConfig reducedMotion="user"><div className="shell"><Header stage={stage} setStage={setStage}/><main>
    <AnimatePresence mode="wait"><motion.div key={stage} initial={reduced?false:{opacity:0,y:8,filter:"blur(3px)"}} animate={{opacity:1,y:0,filter:"blur(0)"}} exit={reduced?undefined:{opacity:0,y:-4}} transition={{duration:reduced?0:.22,ease:[.16,1,.3,1]}}>
      {stage==="prioritise"&&<Prioritise next={next}/>}
      {stage==="model"&&<Model next={next} back={back}/>}
      {stage==="simulate"&&<Simulate next={next} back={back}/>}
      {stage==="build"&&<Build back={back} reset={()=>setStage("prioritise")}/>}
    </motion.div></AnimatePresence>
  </main><footer><span>INFINI WORKING BLUEPRINT · CONCEPT PROTOTYPE</span><span>Public context · representative assumptions</span></footer></div></MotionConfig>
}
