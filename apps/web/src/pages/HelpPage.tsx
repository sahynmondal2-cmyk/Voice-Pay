import React, { useState } from 'react';
import {
  HelpCircle,
  MessageSquare,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Plus,
  Send,
  CheckCircle2,
  PhoneCall,
  Volume2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HelpPage: React.FC = () => {
  const { supportTickets, addSupportTicket, t } = useApp();

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'sound' | 'transaction' | 'hardware' | 'billing' | 'other'>('sound');
  const [message, setMessage] = useState('');
  const [ticketToast, setTicketToast] = useState(false);

  const faqs = [
    {
      q: 'Why did my browser not speak the payment alert on initial load?',
      a: 'Modern browsers enforce strict audio autoplay protection. You must tap the screen once (e.g., clicking "Test Voice Alert") so the Web Audio context transitions to active. Once unlocked, all subsequent alerts play immediately.',
    },
    {
      q: 'Will payment alerts work if I lock my smartphone or close Chrome?',
      a: 'Web PWAs cannot wake device speakers when completely killed by the OS task killer. For true 24/7 background audio alerts while your screen is off, you should use the companion Android native app with background foreground service permission.',
    },
    {
      q: 'Are these transactions real money?',
      a: 'No! PayVoice is in full Frontend DEMO MODE. No actual bank, UPI, NPCI, or financial accounts are connected. All balances and references are artificial.',
    },
    {
      q: 'Can I add multiple counters in my shop?',
      a: 'Yes, with PayVoice Business Premium (proposed ₹49/month demo tier), you can pair multiple shop terminals and invite counter staff devices to receive audio alerts simultaneously.',
    },
    {
      q: 'How does PayVoice monetize its free tier?',
      a: 'The free tier is supported by transparent, merchant-relevant partner sponsorships (e.g. wholesale suppliers, packaging). Ads are strictly forbidden from interrupting payment alerts, voice announcements, or active mini-game rounds.',
    },
  ];

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    addSupportTicket(subject.trim(), category, message.trim());
    setSubject('');
    setMessage('');
    setShowNewTicketModal(false);
    setTicketToast(true);
    setTimeout(() => setTicketToast(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white tracking-tight">
          Help, FAQ & Support Desk
        </h1>
        <p className="text-xs sm:text-sm text-brand-muted dark:text-slate-400">
          Audio troubleshooting guides, common questions, and merchant support tickets.
        </p>
      </div>

      {ticketToast && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Support inquiry submitted (Demo)! Our simulated staff has added a response.</span>
        </div>
      )}

      {/* 1. Frequently Asked Questions */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
        <h3 className="font-extrabold text-sm sm:text-base text-brand-navy dark:text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-brand-accent" />
          <span>Frequently Asked Questions</span>
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {faqs.map((faq, idx) => (
            <div key={idx} className="py-3">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-brand-navy dark:text-white gap-3"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-1 animate-in fade-in-50">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Customer Support Tickets Desk (Persisted Locally) */}
      <div className="bg-white dark:bg-brand-dark-surface rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base text-brand-navy dark:text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-brand-accent" />
              <span>Merchant Support Inquiries</span>
            </h3>
            <p className="text-xs text-brand-muted dark:text-slate-400">
              Demo ticket system with simulated automated response.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowNewTicketModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-primary hover:bg-brand-primary-light text-white text-xs font-bold shadow-subtle"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Open Ticket</span>
          </button>
        </div>

        <div className="space-y-3">
          {supportTickets.map((t) => (
            <div
              key={t.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-brand-dark-card text-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-slate-400">{t.id}</span>
                  <h4 className="font-bold text-xs sm:text-sm text-brand-navy dark:text-white">
                    {t.subject}
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  {t.status}
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-300 italic">
                "{t.message}"
              </p>

              {/* Staff Reply */}
              {t.replies.map((r, rIdx) => (
                <div
                  key={rIdx}
                  className="pl-3 border-l-2 border-brand-accent text-[11px] text-slate-700 dark:text-slate-300 bg-brand-accent/5 p-2 rounded-r-lg space-y-0.5"
                >
                  <div className="font-bold text-brand-primary dark:text-brand-accent">
                    {r.author}
                  </div>
                  <p>{r.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="bg-white dark:bg-brand-dark-surface max-w-md w-full rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="font-extrabold text-base text-brand-navy dark:text-white">
              Submit Merchant Support Ticket (Demo)
            </h3>

            <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Topic / Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Soundbox volume query"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-brand-navy dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-brand-navy dark:text-white"
                >
                  <option value="sound">Voice & Soundbox Issue</option>
                  <option value="transaction">Transaction Verification</option>
                  <option value="hardware">Hardware / Battery</option>
                  <option value="billing">Business Premium Billing</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Message Details
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue or question..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-brand-navy dark:text-white"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowNewTicketModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary-light"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
