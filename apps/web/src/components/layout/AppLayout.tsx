import React from 'react';
import { Outlet } from 'react-router-dom';
import { DemoModeBanner } from '../common/DemoModeBanner';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { SimulatePaymentModal } from '../home/SimulatePaymentModal';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-background dark:bg-brand-dark-bg text-brand-navy dark:text-slate-100 transition-colors">
      {/* 1. Global prominent Demo Mode Banner */}
      <DemoModeBanner />

      {/* 2. Top Header Navigation */}
      <Navbar />

      {/* 3. Main Body: Sidebar + Page Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <Sidebar />

        <main className="flex-1 w-full min-w-0 pb-20 lg:pb-8 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* 4. Mobile Bottom Navigation */}
      <BottomNav />

      {/* 5. Globally Accessible Payment Simulation Modal */}
      <SimulatePaymentModal />
    </div>
  );
};
