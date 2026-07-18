import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { mockOrganizationStats, mockTransactions } from '../services/mockData';
import { CreditCard, Download, ExternalLink } from 'lucide-react';

export const BuyerDashboard: React.FC = () => {
  const stats = mockOrganizationStats;
  const purchases = mockTransactions.filter(t => t.type === 'buy');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Buyer Portal"
        description="Monitor carbon emissions offsets, purchase receipts, and retirement certificates."
        breadcrumbs={[{ label: 'Buyer Dashboard' }]}
        action={
          <button className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-700 shadow-soft hover:bg-slate-50 transition-colors">
            <Download className="mr-1.5 h-4 w-4 text-slate-400" />
            Export Portfolio
          </button>
        }
      />

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Current Holdings
          </span>
          <h3 className="text-2xl font-bold text-slate-900 mt-2 font-heading">
            {stats.creditsHeld.toLocaleString()} credits
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Total active un-retired assets
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Total Carbon Offset
          </span>
          <h3 className="text-2xl font-bold text-[#0F766E] mt-2 font-heading">
            {stats.creditsRetired.toLocaleString()} tCO₂e
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Credits permanently retired
          </p>
        </div>

        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Capital Deployed
          </span>
          <h3 className="text-2xl font-bold text-slate-900 mt-2 font-heading">
            ${stats.totalSpend.toLocaleString()}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Across 5 verified project classes
          </p>
        </div>
      </div>

      {/* Active Inventory List */}
      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
        <h3 className="text-lg font-bold text-slate-900 font-heading mb-4 flex items-center gap-2">
          <CreditCard className="h-4.5 w-4.5 text-slate-400" />
          Acquisition History
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-500">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3">Project</th>
                <th className="px-6 py-3">Transaction Date</th>
                <th className="px-6 py-3 text-right">Volume</th>
                <th className="px-6 py-3 text-right">Price</th>
                <th className="px-6 py-3 text-right">Value</th>
                <th className="px-6 py-3 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {purchases.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">{tx.projectName}</td>
                  <td className="px-6 py-4">{tx.date}</td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">
                    {tx.credits.toLocaleString()} t
                  </td>
                  <td className="px-6 py-4 text-right">${tx.pricePerCredit.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">
                    ${tx.totalValue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="inline-flex items-center text-[#0F766E] hover:underline font-semibold text-xs gap-1">
                      PDF <ExternalLink className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
