import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { FileText, Download, Calendar } from 'lucide-react';

export const Reports: React.FC = () => {
  const reportsList = [
    { id: 'rep-01', title: 'Q2 2026 ESG Offset Summary', date: '2026-07-01', size: '2.4 MB', format: 'PDF' },
    { id: 'rep-02', title: 'Registry Transaction Ledger - FY25', date: '2026-01-10', size: '12.8 MB', format: 'CSV' },
    { id: 'rep-03', title: 'Puro.earth Weathering Verification Report', date: '2026-06-15', size: '4.1 MB', format: 'PDF' },
    { id: 'rep-04', title: 'Andean Cloud Forest Conservation Audit', date: '2026-04-20', size: '8.7 MB', format: 'PDF' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit & Compliance Reports"
        description="Download cryptographically signed ledger transactions, verification certs, and official ESG disclosure summaries."
        breadcrumbs={[{ label: 'Reports' }]}
      />

      <div className="rounded-xl border border-slate-100 bg-white shadow-soft overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 font-heading">Compliance Library</h3>
          <p className="text-xs text-slate-400 font-light mt-0.5">Access official documents verified by registry nodes.</p>
        </div>

        <div className="divide-y divide-slate-100">
          {reportsList.map((doc) => (
            <div key={doc.id} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-400 shrink-0 border border-slate-100">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 leading-snug">{doc.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-light mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {doc.date}
                    </span>
                    <span>•</span>
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span className="font-semibold text-[#0F766E]">{doc.format}</span>
                  </div>
                </div>
              </div>

              <button className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-all self-start sm:self-center">
                <Download className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
                Download Document
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
