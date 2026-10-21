import React from 'react';
import { 
  Search, 
  Bell, 
  MapPin, 
  ShieldAlert, 
  User, 
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  urgentAlertsCount: number;
  onOpenSafetyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCity,
  onCityChange,
  searchQuery,
  onSearchChange,
  urgentAlertsCount,
  onOpenSafetyModal,
}) => {
  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search Bar & City Selector */}
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm trạm săn, người dùng, mã SOS (ví dụ: Đức Bà, SOS-202610...)"
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* City Filter */}
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700">
          <MapPin className="w-3.5 h-3.5 text-indigo-600" />
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            aria-label="Lọc theo khu vực"
            className="bg-transparent border-none text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="all">Toàn quốc (3 khu vực)</option>
            <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
          </select>
        </div>
      </div>

      {/* Right Action Icons & Profile */}
      <div className="flex items-center gap-4">
        {/* Urgent Alert Banner Button */}
        {urgentAlertsCount > 0 && (
          <button
            onClick={onOpenSafetyModal}
            className="flex items-center gap-2 px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-lg text-xs font-semibold transition-colors animate-pulse"
          >
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>{urgentAlertsCount} Cảnh báo SOS khẩn cấp!</span>
          </button>
        )}

        {/* Notifications */}
        <button 
          aria-label="Thông báo hệ thống"
          className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white"></span>
        </button>

        <div className="h-6 w-px bg-slate-200"></div>

        {/* Admin User Info */}
        <div className="flex items-center gap-3 pl-1">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Admin Avatar"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
          </div>
          <div className="hidden sm:block text-left">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-slate-800">Nguyễn Văn Thơm</p>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-1 py-0.2 rounded font-semibold">
                SuperAdmin
              </span>
            </div>
            <p className="text-[11px] text-slate-600">thom.irl@antigravity.io</p>
          </div>
        </div>
      </div>
    </header>
  );
};
