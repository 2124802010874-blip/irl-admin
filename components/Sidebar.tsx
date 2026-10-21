import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  ShieldAlert, 
  Users, 
  Crosshair, 
  Gift, 
  Settings, 
  Compass, 
  Radio, 
  ChevronRight,
  Activity
} from 'lucide-react';
import { ViewType } from '../types/admin';

interface SidebarProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
  pendingReportsCount: number;
  antiCheatAlertCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  pendingReportsCount,
  antiCheatAlertCount,
}) => {
  const mainNav = [
    {
      id: 'overview' as ViewType,
      label: 'Tổng quan & Live Ops',
      icon: LayoutDashboard,
      badge: 'Live',
      badgeColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: 'poi' as ViewType,
      label: 'Trạm Săn & POI Bản Đồ',
      icon: MapPin,
    },
    {
      id: 'safety' as ViewType,
      label: 'Trung Tâm An Toàn & SOS',
      icon: ShieldAlert,
      badge: pendingReportsCount > 0 ? `${pendingReportsCount} mới` : undefined,
      badgeColor: 'bg-rose-100 text-rose-700 font-bold',
    },
  ];

  const adminNav = [
    {
      id: 'users' as ViewType,
      label: 'Thành Viên & Điểm Uy Tín',
      icon: Users,
    },
    {
      id: 'anticheat' as ViewType,
      label: 'Radar Chống Fake GPS',
      icon: Crosshair,
      badge: antiCheatAlertCount > 0 ? `${antiCheatAlertCount}` : undefined,
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'rewards' as ViewType,
      label: 'Kho Mảnh Ghép & Đối Tác',
      icon: Gift,
    },
    {
      id: 'settings' as ViewType,
      label: 'Cấu Hình Matching & Radar',
      icon: Settings,
    },
  ];

  return (
    <aside className="w-68 bg-white border-r border-slate-200/80 flex flex-col h-screen select-none shrink-0 shadow-xs">
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
          <Compass className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-900 tracking-tight text-base">InRealLife</span>
            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200/60">
              Admin
            </span>
          </div>
          <p className="text-xs text-slate-600 font-medium">Trung tâm điều hành IRL</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <p className="px-3 text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-2">
            Giám sát thực tế
          </p>
          <div className="space-y-1">
            {mainNav.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-600'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <p className="px-3 text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-2">
            Quản trị & Kiểm duyệt
          </p>
          <div className="space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-600'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* System Health Status Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/70">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-700">Radar IRL Máy chủ</span>
          </div>
          <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/50">
            99.98% OK
          </span>
        </div>
        <div className="text-[11px] text-slate-600 flex justify-between">
          <span>GPS Geofence Engine</span>
          <span className="font-medium text-slate-700">Hoạt động</span>
        </div>
      </div>
    </aside>
  );
};
