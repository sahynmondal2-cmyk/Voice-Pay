import React from 'react';
import { CheckCircle2, Clock, XCircle, RotateCcw } from 'lucide-react';
import { TransactionStatus } from '../../types';

export const TransactionStatusBadge: React.FC<{ status: TransactionStatus }> = ({ status }) => {
  switch (status) {
    case 'Demo Successful':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
          Demo Successful
        </span>
      );
    case 'Demo Pending':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
          <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" />
          Demo Pending
        </span>
      );
    case 'Demo Failed':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
          <XCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" />
          Demo Failed
        </span>
      );
    case 'Demo Reversed':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
          <RotateCcw className="w-3 h-3 text-purple-600 dark:text-purple-400" />
          Demo Reversed
        </span>
      );
    default:
      return null;
  }
};
