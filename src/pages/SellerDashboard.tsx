import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { mockProjects } from '../services/mockData';
import { Landmark, CheckCircle2 } from 'lucide-react';

export const SellerDashboard: React.FC = () => {
  // Let's assume this developer manages a couple of projects
  const developerProjects = mockProjects.slice(0, 2);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Developer Portal"
        description="Manage carbon credit registration pipelines, monitoring, reporting, verification (MRV) reports, and sales dashboards."
        breadcrumbs={[{ label: 'Developer Dashboard' }]}
        action={
          <button className="inline-flex h-9 items-center justify-center rounded-lg bg-[#0F766E] px-4 py-2 text-sm font-semibold text-white shadow-soft hover:bg-[#0F766E]/95 transition-all">
            Register Project
          </button>
        }
      />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Managed Projects
          </span>
          <h3 className="text-2xl font-bold text-slate-900 mt-2 font-heading">
            {developerProjects.length} Active
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Across 2 methodology classes
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Total Issuance Capacity
          </span>
          <h3 className="text-2xl font-bold text-slate-900 mt-2 font-heading">
            135,000 tCO₂e
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Registered verifications
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Credits Liquidated
          </span>
          <h3 className="text-2xl font-bold text-emerald-600 mt-2 font-heading">
            81,500 tCO₂e
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Revenue settled in full
          </p>
        </div>
      </div>

      {/* Projects under development */}
      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
        <h3 className="text-lg font-bold text-slate-900 font-heading mb-4 flex items-center gap-2">
          <Landmark className="h-4.5 w-4.5 text-slate-400" />
          Active Registry Pipeline
        </h3>

        <div className="space-y-4">
          {developerProjects.map((project) => (
            <div key={project.id} className="rounded-lg border border-slate-100 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h4 className="font-bold text-slate-900">{project.name}</h4>
                  <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-xs text-slate-500 border border-slate-100">
                    {project.standard}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-light max-w-xl">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center gap-6 min-w-[200px] justify-between md:justify-end">
                <div className="text-right">
                  <span className="text-xs font-medium text-slate-400 block">MRV Status</span>
                  <span className="inline-flex items-center text-xs font-semibold text-emerald-600 gap-1 mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verified
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-slate-400 block">Sales Value</span>
                  <span className="text-sm font-bold text-slate-900 block mt-0.5">
                    ${project.pricePerCredit.toFixed(2)} / t
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
