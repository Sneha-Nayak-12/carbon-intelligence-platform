import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { mockMarketTrends } from '../services/mockData';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3, Info } from 'lucide-react';

export const Analytics: React.FC = () => {
  const data = mockMarketTrends;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Market Analytics"
        description="Historical carbon credit index prices, aggregate transaction volumes, and structural methodology allocations."
        breadcrumbs={[{ label: 'Analytics' }]}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Price Trend Chart */}
        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">Average Credit Index Price</h3>
              <p className="text-xs text-slate-400 font-light">Global index price per metric tonne (USD)</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E]">
              <TrendingUp className="h-4.5 w-4.5" />
            </div>
          </div>

          <div className="h-72 w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)',
                  }}
                  labelStyle={{ fontWeight: 'bold', color: '#1E293B' }}
                />
                <Line
                  type="monotone"
                  dataKey="averagePrice"
                  stroke="#0F766E"
                  strokeWidth={2.5}
                  dot={{ r: 4, stroke: '#0F766E', strokeWidth: 2, fill: '#FFFFFF' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Volume Traded Chart */}
        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">Traded Volume</h3>
              <p className="text-xs text-slate-400 font-light">Total monthly volume (thousands of tCO₂e)</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB]">
              <BarChart3 className="h-4.5 w-4.5" />
            </div>
          </div>

          <div className="h-72 w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)',
                  }}
                />
                <Bar dataKey="volumeTraded" fill="#2563EB" radius={[4, 4, 0, 0]} maxBarSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-soft flex items-start gap-3">
        <Info className="h-5 w-5 text-[#0F766E] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Carbon Methodology Note</h4>
          <p className="text-xs text-slate-500 font-light mt-1 leading-relaxed">
            Basaltic rock weathering and direct air capture (DACS) currently command premium prices ($300 - $600+) due to their high permanency scores (1000+ years). Nature-based solutions such as afforestation and mangrove restoration provide excellent immediate biodiverse credits at lower entry prices ($15 - $30).
          </p>
        </div>
      </div>
    </div>
  );
};
