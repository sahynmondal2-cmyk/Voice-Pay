import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { VoiceSettingsPage } from './pages/VoiceSettingsPage';
import { BusinessPage } from './pages/BusinessPage';
import { ReportsPage } from './pages/ReportsPage';
import { PlayHubPage } from './pages/PlayHubPage';
import { DailyBrainSparkPage } from './pages/play/DailyBrainSparkPage';
import { MemoryMatchPage } from './pages/play/MemoryMatchPage';
import { WordPuzzlePage } from './pages/play/WordPuzzlePage';
import { QuickTapPage } from './pages/play/QuickTapPage';
import { PremiumPage } from './pages/PremiumPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { HelpPage } from './pages/HelpPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminDemoPage } from './pages/AdminDemoPage';
import { TransactionDetailDrawer } from './components/transactions/TransactionDetailDrawer';

// Helper component for /transactions/:id
const SingleTransactionView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { transactions } = useApp();
  const txn = transactions.find((t) => t.id === id) || null;

  return (
    <div>
      <TransactionsPage />
      {txn && <TransactionDetailDrawer transaction={txn} onClose={() => window.history.back()} />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Main App Layout Wrapper */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/transactions/:id" element={<SingleTransactionView />} />
            <Route path="/voice-settings" element={<VoiceSettingsPage />} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/play" element={<PlayHubPage />} />
            <Route path="/play/daily-challenge" element={<DailyBrainSparkPage />} />
            <Route path="/play/memory-match" element={<MemoryMatchPage />} />
            <Route path="/play/word-puzzle" element={<WordPuzzlePage />} />
            <Route path="/play/quick-tap" element={<QuickTapPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/admin-demo" element={<AdminDemoPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
