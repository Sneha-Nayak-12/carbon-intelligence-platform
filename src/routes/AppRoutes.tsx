import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';

// Import Pages
import { Landing } from '../pages/Landing';
import { Home } from '../pages/Home';
import { Marketplace } from '../pages/Marketplace';
import { BuyerDashboard } from '../pages/BuyerDashboard';
import { SellerDashboard } from '../pages/SellerDashboard';
import { AdminDashboard } from '../pages/AdminDashboard';
import { Analytics } from '../pages/Analytics';
import { Reports } from '../pages/Reports';
import { Organizations } from '../pages/Organizations';
import { Settings } from '../pages/Settings';
import { Login } from '../pages/Login';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Marketing Landing Website */}
      <Route path="/" element={<Landing />} />

      {/* Auth Route */}
      <Route path="/login" element={<Login />} />

      {/* Main Dashboard Layout Shell */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="marketplace" element={<Marketplace />} />
        <Route path="buyer" element={<BuyerDashboard />} />
        <Route path="seller" element={<SellerDashboard />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="reports" element={<Reports />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Catch-all Redirect back to public site */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
