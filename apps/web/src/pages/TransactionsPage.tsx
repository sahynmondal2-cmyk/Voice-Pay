import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Calendar,
  Volume2,
  FileSpreadsheet,
  AlertCircle,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TransactionStatusBadge } from '../components/transactions/TransactionStatusBadge';
import { TransactionDetailDrawer } from '../components/transactions/TransactionDetailDrawer';
import { DemoTransaction, TransactionStatus } from '../types';

export const TransactionsPage: React.FC = () => {
  const { transactions, t, replayTransactionVoice, isSpeaking } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [amountFilter, setAmountFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [selectedTxn, setSelectedTxn] = useState<DemoTransaction | null>(null);

  // Pagination state (pagination-ready UI)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter and sort logic
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((txn) => {
        // Search filter
        const matchesSearch =
          txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          txn.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          txn.customerVpa.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (txn.notes && txn.notes.toLowerCase().includes(searchQuery.toLowerCase()));

        if (!matchesSearch) return false;

        // Status filter
        if (statusFilter !== 'all' && txn.status !== statusFilter) {
          return false;
        }

        // Amount filter
        if (amountFilter === 'under100' && txn.amount >= 100) return false;
        if (amountFilter === '100to500' && (txn.amount < 100 || txn.amount > 500)) return false;
        if (amountFilter === 'over500' && txn.amount <= 500) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        }
        if (sortBy === 'oldest') {
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        }
        if (sortBy === 'highest') {
          return b.amount - a.amount;
        }
        if (sortBy === 'lowest') {
          return a.amount - b.amount;
        }
        return 0;
      });
  }, [transactions, searchQuery, statusFilter, amountFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / itemsPerPage));
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExportCsv = () => {
    const headers = ['Demo Reference ID', 'Date & Time', 'Amount (INR)', 'Status', 'Customer Name', 'VPA', 'Method', 'Notes'];
    const rows = filteredTransactions.map((t: any) => [
      t.id,
      t.timestamp,
      t.amount,
      t.status,
      `"${t.customerName}"`,
      t.customerVpa,
      t.method,
      `"${t.notes || ''}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r: any) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PayVoice_Demo_Transactions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Page Title & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white tracking-tight">
            {t.transactions.title}
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted dark:text-slate-400">
            {t.transactions.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCsv}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-brand-dark-card text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-subtle shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{t.transactions.exportCsv}</span>
        </button>
      </div>

      {/* Safety Notice */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-center gap-2 text-xs text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
        <p>
          All transaction references shown here are artificial demo numbers. Real merchant payment records are processed via licensed banking gateways.
        </p>
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-subtle space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={t.transactions.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-brand-navy dark:text-white focus:border-brand-accent focus:bg-white dark:focus:bg-slate-800"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter transactions by status"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-brand-navy dark:text-white font-medium"
            >
              <option value="all">{t.transactions.filterAll}</option>
              <option value="Demo Successful">Demo Successful</option>
              <option value="Demo Pending">Demo Pending</option>
              <option value="Demo Failed">Demo Failed</option>
              <option value="Demo Reversed">Demo Reversed</option>
            </select>
          </div>

          {/* Amount Filter */}
          <div>
            <select
              value={amountFilter}
              onChange={(e) => {
                setAmountFilter(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Filter transactions by amount"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-brand-navy dark:text-white font-medium"
            >
              <option value="all">All Amounts</option>
              <option value="under100">Under ₹100</option>
              <option value="100to500">₹100 to ₹500</option>
              <option value="over500">Above ₹500</option>
            </select>
          </div>

          {/* Sorting */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort transactions"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-brand-navy dark:text-white font-medium"
            >
              <option value="newest">{t.transactions.sortNewest}</option>
              <option value="oldest">{t.transactions.sortOldest}</option>
              <option value="highest">{t.transactions.sortHighest}</option>
              <option value="lowest">{t.transactions.sortLowest}</option>
            </select>
          </div>
        </div>

        {/* Filter Summary */}
        <div className="flex items-center justify-between text-xs text-brand-muted dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
          <span>
            Showing <strong>{filteredTransactions.length}</strong> matching transactions
          </span>
          {(searchQuery || statusFilter !== 'all' || amountFilter !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setAmountFilter('all');
                setCurrentPage(1);
              }}
              className="text-brand-accent hover:underline font-semibold text-[11px]"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Transactions Table / List */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle overflow-hidden">
        {paginatedTransactions.length === 0 ? (
          <div className="text-center py-12 p-4 text-xs text-brand-muted dark:text-slate-400">
            No transactions match your current filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-brand-dark-card border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="py-3 px-4">Customer & VPA</th>
                  <th className="py-3 px-4">Demo Reference</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Mode</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-center">Voice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {paginatedTransactions.map((txn) => (
                  <tr
                    key={txn.id}
                    onClick={() => setSelectedTxn(txn)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-semibold text-brand-navy dark:text-white">
                      <div>{txn.customerName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{txn.customerVpa}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      {txn.id}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 text-[11px]">
                      {new Date(txn.timestamp).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {txn.method}
                    </td>
                    <td className="py-3 px-4">
                      <TransactionStatusBadge status={txn.status} />
                    </td>
                    <td className="py-3 px-4 text-right font-extrabold text-sm text-brand-navy dark:text-white">
                      ₹{txn.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          replayTransactionVoice(txn.id);
                        }}
                        disabled={isSpeaking}
                        title="Replay Voice Announcement"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-brand-accent hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Ready Footer */}
        {totalPages > 1 && (
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-brand-dark-card/50 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-700 disabled:opacity-40 font-medium"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1 rounded-lg border border-slate-300 dark:border-slate-700 disabled:opacity-40 font-medium"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Detail Drawer */}
      <TransactionDetailDrawer
        transaction={selectedTxn}
        onClose={() => setSelectedTxn(null)}
      />
    </div>
  );
};
