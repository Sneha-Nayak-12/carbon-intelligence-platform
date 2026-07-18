import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Users, Shield, Terminal, CheckSquare } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Registry Control Center"
        description="System administration, registry audits, user permission management, and compliance log oversight."
        breadcrumbs={[{ label: 'Registry Admin' }]}
      />

      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Registries</span>
            <Shield className="h-4.5 w-4.5" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2 font-heading">4 Connected</h3>
          <p className="text-xs text-emerald-600 mt-1 font-medium">All synchronizations online</p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Verification Audits</span>
            <CheckSquare className="h-4.5 w-4.5" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2 font-heading">12 Pending</h3>
          <p className="text-xs text-amber-600 mt-1 font-medium">Require developer audit review</p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Organizations</span>
            <Users className="h-4.5 w-4.5" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2 font-heading">142 Accounts</h3>
          <p className="text-xs text-slate-400 mt-1">29 new this quarter</p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">API Gateways</span>
            <Terminal className="h-4.5 w-4.5" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mt-2 font-heading">99.98%</h3>
          <p className="text-xs text-emerald-600 mt-1 font-medium">Operational response SLA</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
        <h3 className="text-lg font-bold text-slate-900 font-heading mb-4">Verification Audit Queue</h3>
        <div className="divide-y divide-slate-100">
          <div className="py-4 flex items-center justify-between first:pt-0">
            <div>
              <h4 className="font-semibold text-slate-800">basaltic-weathering-scot-02</h4>
              <p className="text-xs text-slate-400 font-light mt-0.5">Puro.earth methodology audit • Initiated by LithoOffset Labs</p>
            </div>
            <button className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-all">
              Initiate Review
            </button>
          </div>
          <div className="py-4 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-slate-800">kenya-pyro-biochar-2024</h4>
              <p className="text-xs text-slate-400 font-light mt-0.5">Gold Standard registry link • Initiated by PyraCarbon Group</p>
            </div>
            <button className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#0F766E] hover:bg-[#0F766E] hover:text-white transition-all">
              Initiate Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
