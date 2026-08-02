export interface LifecycleStep {
  id: number;
  label: string;
  title: string;
  sub: string;
  description: string;
}

export const stepsData: LifecycleStep[] = [
  {
    id: 1,
    label: "01 / Identify",
    title: "Project Discovery",
    sub: "Targeting high-capacity carbon removal sinks.",
    description: "Sovereign land assessments, agricultural residue supplies, and basaltic deposit layouts are cataloged. OCEAN analytics select high-yield locations for maximum permanence stability."
  },
  {
    id: 2,
    label: "02 / Develop",
    title: "Methodology Alignment",
    sub: "Registering baseline carbon project blueprints.",
    description: "Project developers build the technical baseline parameters, logging kiln architectures, processing capacities, and baseline soil metrics to fit registry protocols (GS/Puro/Verra)."
  },
  {
    id: 3,
    label: "03 / Monitor",
    title: "Real-Time Telemetry Sync",
    sub: "Gathering continuous sensor feeds and canopy logs.",
    description: "IoT monitors track temperatures and gas ratios on-site, while satellite canopy mapping and core soil sample deltas establish permanent physical verification data."
  },
  {
    id: 4,
    label: "04 / Verify",
    title: "MRV Auditor Sign-Off",
    sub: "Validating carbon captures via third-party validators.",
    description: "Auditors verify sensor logs and delivery manifests against methodology protocols. Cryptographic compliance stamps are signed upon successful MRV audits."
  },
  {
    id: 5,
    label: "05 / Issue",
    title: "Registry Minting",
    sub: "Securing credits on blockchain-backed registries.",
    description: "Upon audit approval, carbon removal certificates are minted. Each credit represents exactly 1 metric ton of CO₂e captured, tagged with a unique registry block address."
  },
  {
    id: 6,
    label: "06 / Trade",
    title: "B2B Escrow Clearing",
    sub: "Clearing transactions in the institutional marketplace.",
    description: "Corporates buy and trade verified batches held in registry escrow. The clearinghouse automates funding settlements directly to clean tech developers."
  },
  {
    id: 7,
    label: "07 / Retire & Impact",
    title: "Permanent Lock & Seal",
    sub: "Permanently retiring assets to offset liability scopes.",
    description: "Credits are retired to reconcile enterprise scope logs. Retired blocks are locked in the public ledger forever, preventing double-claiming."
  }
];
