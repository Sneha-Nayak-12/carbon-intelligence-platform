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
    label: "01 / Capture & Conversion",
    title: "Biomass to Biochar",
    sub: "Permanently sealing carbon inside structured solid carbon.",
    description: "Agricultural crop residues that would otherwise rot or be burned are subjected to oxygen-free heating (pyrolysis). Instead of releasing CO₂ back into the atmosphere, the carbon is converted into biochar—a stable, porous charcoal-like material that locks carbon away for over 1,000 years."
  },
  {
    id: 2,
    label: "02 / Verification",
    title: "The Digital MRV Audit",
    sub: "Third-party validation of ecological physical existence.",
    description: "Before any credit can be generated, remote sensing, soil sampling, and kiln sensor telemetry are audited. Verification bodies (like Puro.earth and Verra) review documentation to prove the physical biochar was buried or mixed into soil, guaranteeing carbon permanence."
  },
  {
    id: 3,
    label: "03 / Credit Minting",
    title: "Cryptographic Issuance",
    sub: "Minting audited tons into digital registry ledgers.",
    description: "Once verification is complete, the registry mints carbon credits directly. Each credit represents exactly 1 metric ton of CO₂ permanently removed. Stamped with its specific project ID, batch number, verifier signature, and country coordinate details."
  },
  {
    id: 4,
    label: "04 / Marketplace Listing",
    title: "Ecosystem Indexing",
    sub: "Integrating removal batches into corporate catalogues.",
    description: "The newly minted batch is indexed on the Carbon Intelligence Platform. Corporate buyers can search and filter batches based on project methodology, geographic area, co-benefits rating, and exact pricing/permanence scores."
  },
  {
    id: 5,
    label: "05 / Corporate Purchase",
    title: "The Procurement Settlement",
    sub: "Bridging capital to clean technology developers.",
    description: "Enterprises purchase the credits to cover audited Scope 1, 2, or 3 emissions liabilities. Funds are transferred securely, locking the batch and sending capital directly to carbon removal developers to finance further project capacity."
  },
  {
    id: 6,
    label: "06 / Permanent Retirement",
    title: "Locked & Retired",
    sub: "Permanently taking the credit out of circulation.",
    description: "To officially claim carbon removal against sustainability goals, the credits are retired. This cryptographically locks the credit in the public registry forever. Once retired, it cannot be resold, moved, or double-counted."
  }
];
