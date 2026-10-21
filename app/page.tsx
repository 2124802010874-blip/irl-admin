'use client';

import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { OverviewView } from '../components/views/OverviewView';
import { PointsOfInterestView } from '../components/views/PointsOfInterestView';
import { SafetyIncidentView } from '../components/views/SafetyIncidentView';
import { UserManagementView } from '../components/views/UserManagementView';
import { AntiCheatView } from '../components/views/AntiCheatView';
import { RewardsMarketView } from '../components/views/RewardsMarketView';
import { SettingsView } from '../components/views/SettingsView';
import { ViewType } from '../types/admin';
import { mockIncidents, mockAntiCheatAlerts } from '../data/mockData';

export default function AdminDashboardPage() {
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const pendingReportsCount = mockIncidents.filter((i) => i.status === 'pending').length;
  const urgentAlertsCount = mockIncidents.filter(
    (i) => i.severity === 'urgent' && i.status !== 'resolved'
  ).length;
  const antiCheatCount = mockAntiCheatAlerts.length;

  return (
    <div className="flex h-screen w-full bg-slate-50/60 overflow-hidden font-sans text-slate-900">
      {/* Enterprise Sidebar */}
      <Sidebar
        currentView={currentView}
        onSelectView={(view) => setCurrentView(view)}
        pendingReportsCount={pendingReportsCount}
        antiCheatAlertCount={antiCheatCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <Header
          selectedCity={selectedCity}
          onCityChange={(city) => setSelectedCity(city)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          urgentAlertsCount={urgentAlertsCount}
          onOpenSafetyModal={() => setCurrentView('safety')}
        />

        {/* Dynamic View Scrollable Container */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {currentView === 'overview' && (
              <OverviewView 
                onNavigate={(view) => setCurrentView(view)} 
                selectedCity={selectedCity} 
              />
            )}
            {currentView === 'poi' && (
              <PointsOfInterestView selectedCity={selectedCity} />
            )}
            {currentView === 'safety' && (
              <SafetyIncidentView />
            )}
            {currentView === 'users' && (
              <UserManagementView selectedCity={selectedCity} />
            )}
            {currentView === 'anticheat' && (
              <AntiCheatView />
            )}
            {currentView === 'rewards' && (
              <RewardsMarketView />
            )}
            {currentView === 'settings' && (
              <SettingsView />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
