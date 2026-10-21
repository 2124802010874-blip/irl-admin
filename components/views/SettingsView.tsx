import React, { useState } from 'react';
import { 
  Settings, 
  Sliders, 
  MapPin, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  Database,
  Save
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [radarRadius, setRadarRadius] = useState(3000); // 3000m
  const [maxTeamSize, setMaxTeamSize] = useState(6);
  const [noShowThreshold, setNoShowThreshold] = useState(2);
  const [autoBanBot, setAutoBanBot] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Đã lưu thành công cấu hình hệ sinh thái IRL. Các máy khách sẽ nhận cấu hình mới sau 60s.</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-600" />
          Cấu Hình Thuật Toán Ghép Đội & Bán Kính Radar IRL
        </h1>
        <p className="text-xs text-slate-500">
          Điều chỉnh các tham số kết nối không gian thực tế và ngưỡng bảo mật tự động
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Radar Settings */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-600" />
            Tham số Radar & Geofence
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Bán kính Radar tìm bạn & sự kiện mặc định (mét)
              </label>
              <input
                type="number"
                step="500"
                min="500"
                max="10000"
                value={radarRadius}
                onChange={(e) => setRadarRadius(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Hiện tại: {(radarRadius / 1000).toFixed(1)} km xung quanh vị trí thực tế của người dùng.
              </p>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Giới hạn thành viên tối đa trong 1 đội săn kho báu
              </label>
              <input
                type="number"
                min="2"
                max="12"
                value={maxTeamSize}
                onChange={(e) => setMaxTeamSize(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Khuyến nghị: 4 - 6 người để đảm bảo an toàn và tương tác cao.
              </p>
            </div>
          </div>
        </div>

        {/* Safety & Auto-penalty Rules */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            Quy tắc Phạt Tự Động & Chống Bùng Hẹn (No-Show Guard)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Số lần bùng hẹn tối đa trước khi hạn chế Radar
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={noShowThreshold}
                onChange={(e) => setNoShowThreshold(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Vượt quá {noShowThreshold} lần bùng hẹn: Tự động khóa tính năng tạo phòng meetup 14 ngày.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <input
                type="checkbox"
                id="autoBan"
                checked={autoBanBot}
                onChange={(e) => setAutoBanBot(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
              <label htmlFor="autoBan" className="font-semibold text-slate-700 cursor-pointer">
                Tự động kích hoạt cơ chế Shadowban khi phát hiện Fake GPS tốc độ &gt; 150km/h
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Cấu Hình Toàn Hệ Thống</span>
          </button>
        </div>
      </form>
    </div>
  );
};
