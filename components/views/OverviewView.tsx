import React from 'react';
import { 
  Radio, 
  CheckCircle2, 
  Compass, 
  ShieldAlert, 
  ArrowUpRight, 
  ArrowDownRight, 
  MapPin, 
  Users, 
  AlertTriangle,
  Clock,
  Sparkles,
  Zap,
  ChevronRight
} from 'lucide-react';
import { mockKPIs, mockPOIs, mockLiveActivities, mockIncidents } from '../../data/mockData';
import { ViewType } from '../../types/admin';

interface OverviewViewProps {
  onNavigate: (view: ViewType) => void;
  selectedCity: string;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigate, selectedCity }) => {
  const filteredPOIs = selectedCity === 'all' 
    ? mockPOIs 
    : mockPOIs.filter((p) => p.city === selectedCity);

  const filteredActivities = selectedCity === 'all'
    ? mockLiveActivities
    : mockLiveActivities.filter((a) => a.city === selectedCity);

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-600 rounded-2xl p-5 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Radar Vận Hành Thực Địa (Live Ops Online)</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            Mạng xã hội InRealLife đang có 4,892 người kết nối ngoài đời thực
          </h1>
          <p className="text-xs text-indigo-100 max-w-2xl">
            Tất cả các trạm Geofence và thuật toán ghép đội săn kho báu đang hoạt động ổn định. Tỷ lệ check-in thực tế hôm nay đạt 93.8%.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button 
            onClick={() => onNavigate('poi')}
            className="px-4 py-2 bg-white text-indigo-700 hover:bg-indigo-50 font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>Thêm Trạm Săn Mới</span>
          </button>
          <button 
            onClick={() => onNavigate('safety')}
            className="px-4 py-2 bg-indigo-700/60 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl border border-white/20 transition-colors flex items-center gap-1.5"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Hàng Đợi SOS ({mockIncidents.filter(i => i.status === 'pending').length})</span>
          </button>
        </div>
      </div>

      {/* 4 Core KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockKPIs.map((kpi, idx) => {
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs hover:border-indigo-200 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {kpi.label}
                </span>
                <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  {idx === 0 && <Radio className="w-4 h-4 text-indigo-600" />}
                  {idx === 1 && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {idx === 2 && <Compass className="w-4 h-4 text-blue-600" />}
                  {idx === 3 && <ShieldAlert className="w-4 h-4 text-rose-600" />}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
                  {kpi.value}
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <span
                    className={`inline-flex items-center font-bold ${
                      kpi.isPositive ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {kpi.isPositive ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    {kpi.change}
                  </span>
                  <span className="text-slate-600">{kpi.subtext}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Map Distribution & Live IRL Activities Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Bản đồ nhiệt không gian thực tế */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                Mật Độ Thợ Săn & Cụm Geofence Theo Khu Vực
              </h2>
              <p className="text-xs text-slate-600">
                Hiển thị bán kính thực tế và số lượng người đang kết nối trong vùng Geofence
              </p>
            </div>
            <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-semibold border border-indigo-200/50">
              {filteredPOIs.length} Điểm săn kích hoạt
            </span>
          </div>

          {/* Simulated Interactive Radar Heatmap Box */}
          <div className="relative h-72 bg-slate-950 rounded-xl overflow-hidden border border-slate-200 p-4 flex flex-col justify-between">
            {/* Background grid pattern simulating map coordinates */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px]"></div>
            
            {/* Overlay Simulated Radar Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-indigo-500/20 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-indigo-500/30 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-indigo-500/40 pointer-events-none animate-ping"></div>

            {/* POI Hotspots on map */}
            <div className="relative z-10 flex flex-wrap gap-3">
              {filteredPOIs.slice(0, 4).map((poi) => (
                <div
                  key={poi.id}
                  className="bg-slate-900/90 backdrop-blur-md border border-slate-700 hover:border-indigo-400 p-2.5 rounded-lg text-white shadow-lg transition-all text-xs"
                >
                  <div className="flex items-center gap-1.5 font-bold text-slate-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>{poi.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1 flex items-center justify-between gap-3">
                    <span>{poi.city} ({poi.district})</span>
                    <span className="font-semibold text-indigo-300">
                      {poi.activeHuntersNow} thợ săn
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">
                    Geofence: R = {poi.radiusMeters}m
                  </div>
                </div>
              ))}
            </div>

            <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Tín hiệu GPS Realtime vệ tinh: Khóa vị trí chuẩn xác ± 2.5m
              </span>
              <button
                onClick={() => onNavigate('poi')}
                className="text-indigo-300 hover:text-white font-medium flex items-center gap-1"
              >
                <span>Xem chi tiết danh sách trạm</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Stats below map */}
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100 text-center">
            <div>
              <p className="text-xs text-slate-600 font-medium">TP. Hồ Chí Minh</p>
              <p className="text-base font-bold text-slate-800 mt-0.5">2,640 người</p>
              <p className="text-[11px] text-emerald-600 font-semibold">+18% so với tuần trước</p>
            </div>
            <div className="border-x border-slate-100">
              <p className="text-xs text-slate-600 font-medium">Hà Nội</p>
              <p className="text-base font-bold text-slate-800 mt-0.5">1,580 người</p>
              <p className="text-[11px] text-emerald-600 font-semibold">+12% so với tuần trước</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-medium">Đà Nẵng</p>
              <p className="text-base font-bold text-slate-800 mt-0.5">672 người</p>
              <p className="text-[11px] text-emerald-600 font-semibold">+8% so với tuần trước</p>
            </div>
          </div>
        </div>

        {/* Right: Luồng Hoạt Động Trực Tiếp (Live Stream Feed) */}
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Dòng Hoạt Động IRL Trực Tiếp
            </h2>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto">
            {filteredActivities.map((act) => (
              <div
                key={act.id}
                className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 hover:bg-indigo-50/40 hover:border-indigo-200 transition-all text-xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-800">{act.teamName}</span>
                  <span className="text-[10px] text-slate-600 flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {act.time}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] mb-1.5">
                  Địa điểm: <span className="font-semibold text-slate-700">{act.poiTitle}</span> ({act.city})
                </p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    <Users className="w-3 h-3" />
                    {act.membersCount} thành viên
                  </span>
                  <span className="text-[11px] font-medium text-emerald-600">
                    {act.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Button to Safety */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => onNavigate('safety')}
              className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Xem Báo Cáo & Khiếu Nại Đang Mở ({mockIncidents.length})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
