import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  Receipt,
  Calendar,
  Clock,
  ArrowUpRight,
  ShieldAlert,
  Percent,
  Download,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReportsPage: React.FC = () => {
  const { t, transactions, theme } = useApp();
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Simulated chart data
  const hourlyData = [
    { hour: '08:00', amount: 180, count: 3 },
    { hour: '10:00', amount: 520, count: 5 },
    { hour: '12:00', amount: 890, count: 8 },
    { hour: '14:00', amount: 340, count: 4 },
    { hour: '16:00', amount: 750, count: 6 },
    { hour: '18:00', amount: 1450, count: 12 },
    { hour: '20:00', amount: 1100, count: 9 },
  ];

  const weeklyData = [
    { day: 'Mon', amount: 3400, count: 32 },
    { day: 'Tue', amount: 4100, count: 40 },
    { day: 'Wed', amount: 3800, count: 35 },
    { day: 'Thu', amount: 4600, count: 44 },
    { day: 'Fri', amount: 5900, count: 52 },
    { day: 'Sat', amount: 7800, count: 70 },
    { day: 'Sun', amount: 8400, count: 78 },
  ];

  const monthlyData = [
    { week: 'Week 1', amount: 28400, count: 280 },
    { week: 'Week 2', amount: 31200, count: 305 },
    { week: 'Week 3', amount: 34800, count: 340 },
    { week: 'Week 4', amount: 39500, count: 385 },
  ];

  const paymentModesData = [
    { name: 'UPI QR (GPay/PhonePe)', value: 82, color: '#22C55E' },
    { name: 'Cards (RuPay/Visa)', value: 12, color: '#0F172A' },
    { name: 'Wallet / Other Demo', value: 6, color: '#64748B' },
  ];

  const chartData = period === 'daily' ? hourlyData : period === 'weekly' ? weeklyData : monthlyData;
  const xKey = period === 'daily' ? 'hour' : period === 'weekly' ? 'day' : 'week';

  const chartColor = '#22C55E';
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Page Title & Period Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white tracking-tight">
            {t.reports.title}
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted dark:text-slate-400">
            {t.reports.subtitle}
          </p>
        </div>

        {/* Period Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setPeriod('daily')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              period === 'daily'
                ? 'bg-white dark:bg-brand-dark-surface text-brand-primary dark:text-brand-accent shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-brand-navy'
            }`}
          >
            {t.reports.periodDaily}
          </button>
          <button
            type="button"
            onClick={() => setPeriod('weekly')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              period === 'weekly'
                ? 'bg-white dark:bg-brand-dark-surface text-brand-primary dark:text-brand-accent shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-brand-navy'
            }`}
          >
            {t.reports.periodWeekly}
          </button>
          <button
            type="button"
            onClick={() => setPeriod('monthly')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              period === 'monthly'
                ? 'bg-white dark:bg-brand-dark-surface text-brand-primary dark:text-brand-accent shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-brand-navy'
            }`}
          >
            {t.reports.periodMonthly}
          </button>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-center gap-2 text-xs text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          Every figure in this report represents simulated demo data. Real bookkeeping requires your audited bank statements.
        </span>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-brand-dark-surface border border-slate-200 dark:border-slate-800 shadow-subtle">
          <span className="text-xs font-medium text-brand-muted dark:text-slate-400">
            {t.reports.totalRevenue} ({period})
          </span>
          <div className="text-2xl font-black text-brand-navy dark:text-white mt-1">
            {period === 'daily' ? '₹5,230' : period === 'weekly' ? '₹38,000' : '₹1,33,900'}
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1 inline-block">
            +18.4% growth vs previous cycle (Demo)
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-brand-dark-surface border border-slate-200 dark:border-slate-800 shadow-subtle">
          <span className="text-xs font-medium text-brand-muted dark:text-slate-400">
            {t.reports.averageTicket}
          </span>
          <div className="text-2xl font-black text-brand-navy dark:text-white mt-1">
            ₹114.50
          </div>
          <span className="text-[11px] text-brand-muted dark:text-slate-400 mt-1 inline-block">
            Peak hours: 6:00 PM – 8:30 PM
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-brand-dark-surface border border-slate-200 dark:border-slate-800 shadow-subtle">
          <span className="text-xs font-medium text-brand-muted dark:text-slate-400">
            {t.reports.successRate}
          </span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
            96.8%
          </div>
          <span className="text-[11px] text-brand-muted dark:text-slate-400 mt-1 inline-block">
            Zero network timeouts reported today
          </span>
        </div>
      </div>

      {/* Primary Trend Chart */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-brand-navy dark:text-white">
              Revenue Volume Trend
            </h3>
            <p className="text-xs text-brand-muted dark:text-slate-400">
              Simulated payment velocity throughout the selected timeframe
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-brand-accent bg-brand-accent/10 px-2 py-1 rounded-md">
            Live Demo Engine
          </span>
        </div>

        <div className="h-64 sm:h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1E293B' : '#E2E8F0'} />
              <XAxis dataKey={xKey} stroke={isDark ? '#94A3B8' : '#64748B'} fontSize={11} />
              <YAxis stroke={isDark ? '#94A3B8' : '#64748B'} fontSize={11} tickFormatter={(v: any) => `₹${v}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#111827' : '#FFFFFF',
                  borderColor: isDark ? '#374151' : '#E2E8F0',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: isDark ? '#FFFFFF' : '#0F172A',
                }}
                formatter={(val: number) => [`₹${val.toLocaleString('en-IN')}`, 'Amount']}
              />
              <Area type="monotone" dataKey="amount" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Grid: Volume Bars & Mode Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Transaction Count Bars */}
        <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
          <h3 className="font-extrabold text-sm sm:text-base text-brand-navy dark:text-white">
            Transaction Count Distribution
          </h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1E293B' : '#E2E8F0'} />
                <XAxis dataKey={xKey} stroke={isDark ? '#94A3B8' : '#64748B'} fontSize={11} />
                <YAxis stroke={isDark ? '#94A3B8' : '#64748B'} fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#111827' : '#FFFFFF',
                    borderColor: isDark ? '#374151' : '#E2E8F0',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                  formatter={(val: number) => [val, 'Count']}
                />
                <Bar dataKey="count" fill="#14532D" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Modes Pie Breakdown */}
        <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
          <h3 className="font-extrabold text-sm sm:text-base text-brand-navy dark:text-white">
            Payment Mode Share (Demo)
          </h3>
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentModesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentModesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: number) => [`${val}%`, 'Share']} />
                <Legend
                  formatter={(value: any) => <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
