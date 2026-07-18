import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { User, Key } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Account Preferences"
        description="Configure your personal notification thresholds, profile metadata, and security settings."
        breadcrumbs={[{ label: 'Settings' }]}
      />

      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft space-y-8">
        {/* Profile Details */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="h-4.5 w-4.5 text-slate-400" />
            <h3 className="text-base font-bold text-slate-900 font-heading">User Profile</h3>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 max-w-2xl">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Full Name</label>
              <input
                type="text"
                defaultValue="Sarah Jenkins"
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#0F766E] focus:outline-none focus:ring-1 focus:ring-[#0F766E] transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Email Address</label>
              <input
                type="email"
                defaultValue="s.jenkins@acme-global.com"
                disabled
                className="mt-1.5 w-full rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-400"
              />
            </div>
          </div>
        </section>

        {/* API Credentials */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Key className="h-4.5 w-4.5 text-slate-400" />
            <h3 className="text-base font-bold text-slate-900 font-heading">API & Integrations</h3>
          </div>
          <div className="max-w-2xl">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Platform Live Token</label>
            <div className="mt-1.5 flex gap-3">
              <input
                type="password"
                value="sk_live_51P8...y782"
                readOnly
                className="flex-1 rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-500 font-mono"
              />
              <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all">
                Copy
              </button>
            </div>
            <p className="mt-1.5 text-xs text-slate-400">Never share your API token in public repositories.</p>
          </div>
        </section>
      </div>
    </div>
  );
};
