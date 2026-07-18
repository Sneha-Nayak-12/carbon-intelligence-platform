import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Building, BadgeCheck } from 'lucide-react';

export const Organizations: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization Settings"
        description="Manage subsidiaries, legal profiles, tax identifiers, and environmental compliance permissions."
        breadcrumbs={[{ label: 'Organization' }]}
      />

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 rounded-xl border border-slate-100 bg-white p-6 shadow-soft space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">Primary Legal Entity</h3>
            <p className="text-xs text-slate-400 font-light mt-0.5">Corporate registration detail used for carbon credit settlement documents.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Organization Name</label>
              <span className="text-sm font-semibold text-slate-800 mt-1 block">Acme Global Holdings Inc.</span>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Registry ID</label>
              <span className="text-sm font-mono text-slate-700 mt-1 block">US-REG-88290-ACME</span>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Headquarters</label>
              <span className="text-sm text-slate-700 mt-1 block">San Francisco, California</span>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Account Class</label>
              <span className="inline-flex items-center text-xs font-bold text-[#0F766E] gap-1 mt-1">
                <BadgeCheck className="h-4 w-4" />
                Enterprise Compliance Buyer
              </span>
            </div>
          </div>
        </div>

        {/* Security / verification card */}
        <div className="rounded-xl border border-[#0F766E]/15 bg-teal-50/20 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0F766E]/10 text-[#0F766E]">
              <Building className="h-5 w-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-heading">Verified Business Status</h4>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Acme Global Holdings has been verified as a compliant carbon purchaser on the public carbon network under KYC guidelines.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs text-emerald-600 font-semibold">
            <BadgeCheck className="h-4 w-4" />
            KYC/AML Approved 2026
          </div>
        </div>
      </div>
    </div>
  );
};
