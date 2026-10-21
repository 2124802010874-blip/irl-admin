import React, { useState } from 'react';
import { 
  Crosshair, 
  AlertOctagon, 
  ShieldAlert, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Zap, 
  Clock,
  Compass
} from 'lucide-react';
import { mockAntiCheatAlerts } from '../../data/mockData';
import { AntiCheatAlert } from '../../types/admin';

export const AntiCheatView: React.FC = () => {
  const [alerts, setAlerts] = useState<AntiCheatAlert[]>(mockAntiCheatAlerts);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleAction = (id: string, action: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, actionTaken: action as any } : a))
    );
    setStatusMsg(`Đã thực hiện: ${action} cho tài khoản.`);
    setTimeout(() => setStatusMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      {statusMsg && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Crosshair className="w-5 h-5 text-indigo-600" />
          Radar Giám Sát Gian Lận Vị Trí (Anti-GPS Spoofing & Teleport Detection)
        </h1>
        <p className="text-xs text-slate-500">
          Thuật toán tự động phát hiện giả lập vị trí GPS, di chuyển phi thực tế giữa các trạm săn và bot cày mảnh ghép
        </p>
      </div>

      {/* Top Threat Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase">Cảnh Báo Độ Nguy Hiểm Cao</div>
          <div className="text-2xl font-bold text-rose-600 mt-1">3 Tài Khoản</div>
          <p className="text-[11px] text-slate-500 mt-1">Điểm rủi ro (Risk Score) &gt; 80/100</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase">Bộ Lọc Teleportation</div>
          <div className="text-2xl font-bold text-amber-600 mt-1">V &gt; 150 km/h</div>
          <p className="text-[11px] text-slate-500 mt-1">Tự động gắn cờ check-in 2 điểm quá nhanh</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase">Cơ Chế Khóa Tự Động</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">Đang Kích Hoạt</div>
          <p className="text-[11px] text-slate-500 mt-1">Đóng băng giao dịch vật phẩm khi nghi vấn</p>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Danh Sách Vi Phạm Nghi Vấn Thời Gian Thực</h2>
          <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2 py-1 rounded">
            Bộ lọc AI Sentinel V2.4
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Tài Khoản Nghi Vấn</th>
                <th className="py-3.5 px-4">Loại Bất Thường</th>
                <th className="py-3.5 px-4">Chi Tiết Hành Vi</th>
                <th className="py-3.5 px-4">Điểm Rủi Ro</th>
                <th className="py-3.5 px-4">Trạng Thái Xử Lý</th>
                <th className="py-3.5 px-4 text-right">Hành Động Khẩn</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {alerts.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.userAvatar}
                        alt={item.userName}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{item.userName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">ID: {item.userId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-semibold border border-rose-200">
                      {item.anomalyType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="text-slate-700 text-xs">{item.details}</p>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1 font-medium">
                      <Clock className="w-3 h-3" />
                      {item.timestamp}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-rose-500 h-full rounded-full"
                          style={{ width: `${item.riskScore}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-rose-600">{item.riskScore}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      {item.actionTaken}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleAction(item.id, 'Đã đóng băng kho đồ')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold text-[11px] transition-colors"
                      >
                        Khóa Nhận Thưởng
                      </button>
                      <button
                        onClick={() => handleAction(item.id, 'Chặn tạm thời')}
                        className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-md font-semibold text-[11px] transition-colors"
                      >
                        Khóa Tài Khoản
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
