export type Opportunity = {
  id: string;
  title: string;
  problem: string;
  intervention: string;
  rationale: string;
  impact: "High" | "Medium";
  feasibility: "High" | "Medium";
  risk: "Low" | "Medium";
  source: "Public case study" | "Illustrative assumption";
};

export const opportunities: Opportunity[] = [
  {
    id: "driver-updates",
    title: "Driver update automation",
    problem: "Operational updates arrive through calls and messages, leaving dispatch to interpret and re-key the same information.",
    intervention: "Capture free-text driver updates, structure the operational signal, and update the journey record automatically.",
    rationale: "High-frequency workflow with a narrow initial integration surface and immediate operational visibility.",
    impact: "High",
    feasibility: "High",
    risk: "Low",
    source: "Illustrative assumption",
  },
  {
    id: "compliance",
    title: "Compliance exception detection",
    problem: "Vehicle and driver obligations can remain buried until someone manually checks the record or an audit is due.",
    intervention: "Run deterministic compliance rules whenever a relevant journey, driver, or vehicle event changes.",
    rationale: "Directly supports the public case-study goal of keeping fleets audit-ready without adding autonomous decision risk.",
    impact: "High",
    feasibility: "High",
    risk: "Low",
    source: "Public case study",
  },
  {
    id: "route",
    title: "Route optimisation",
    problem: "Route changes and delays create downstream planning work that can be difficult to re-coordinate manually.",
    intervention: "Recommend route or schedule adjustments from live journey context while keeping dispatch in control.",
    rationale: "Potentially valuable, but data quality and optimisation constraints should be validated after the core operational loop.",
    impact: "High",
    feasibility: "Medium",
    risk: "Medium",
    source: "Illustrative assumption",
  },
];

export const workflow = [
  {
    id: "update",
    label: "Driver update",
    description: "A driver sends a short operational update from the field.",
    owner: "Driver",
    system: "Mobile / messaging input",
    human: "Creates the signal",
    certainty: "Illustrative",
  },
  {
    id: "parse",
    label: "Structure signal",
    description: "Extract delay, cause, route change and vehicle-status fields from the update.",
    owner: "Workflow service",
    system: "Structured event model",
    human: "No action unless confidence is low",
    certainty: "Proposed",
  },
  {
    id: "record",
    label: "Update journey",
    description: "Write the validated event back to the active journey record and recalculate the current ETA.",
    owner: "Fleet platform",
    system: "Journey API",
    human: "Visible to operations",
    certainty: "Proposed",
  },
  {
    id: "rules",
    label: "Check compliance",
    description: "Evaluate deterministic vehicle and driver rules against the changed operational state.",
    owner: "Rules engine",
    system: "Compliance policy layer",
    human: "Defines and approves rules",
    certainty: "Proposed",
  },
  {
    id: "review",
    label: "Route exceptions",
    description: "Only exceptions that require judgement are queued for an operations reviewer.",
    owner: "Operations",
    system: "Exception queue",
    human: "Reviews and resolves",
    certainty: "Proposed",
  },
];

export const simulationSteps = [
  { key: "parse", label: "Structuring driver update", detail: "Delay, cause and vehicle status extracted" },
  { key: "journey", label: "Updating active journey", detail: "ETA adjusted from 14:20 to 14:55" },
  { key: "compliance", label: "Running compliance rules", detail: "Driver clear · vehicle inspection due soon" },
  { key: "route", label: "Creating review item", detail: "Inspection window routed to Operations" },
] as const;

export const validationItems = [
  { label: "Core operational loop", status: "validated", note: "The workflow can be represented end to end." },
  { label: "Human decision points", status: "validated", note: "Judgement remains with Operations on exceptions." },
  { label: "Primary user interaction", status: "validated", note: "Operations sees structured context instead of raw updates." },
  { label: "Existing fleet APIs", status: "unknown", note: "Requires client-system access during technical discovery." },
  { label: "Actual compliance rules", status: "unknown", note: "Policy source and jurisdiction must be confirmed." },
  { label: "Data quality and permissions", status: "unknown", note: "Production readiness depends on source-system controls." },
];
