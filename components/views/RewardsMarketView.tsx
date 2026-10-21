import React, { useState } from 'react';
import { 
  Gift, 
  Sparkles, 
  Plus, 
  TrendingUp, 
  Sliders, 
  Store, 
  Ticket,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { mockRewards } from '../../data/mockData';
import { RewardPartnerItem } from '../../types/admin';

export const RewardsMarketView: React.FC = () => {
  const [rewards, setRewards] = useState<RewardPartnerItem[]>(mockRewards);
  const [selectedReward, setSelectedReward] = useState<RewardPartnerItem | null>(null);
  const [rateInput, setRateInput] = useState<number>(5.0);

  const handleUpdateDropRate = (id: string, newRate: number) => {
    setRewards((prev) =>
      prev.map((r) => (r.id === id ? { ...r, dropRatePercent: newRate } : r))
    );
    setSelectedReward(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Gift className="w-5 h-5 text-indigo-600" />
            Kho Mảnh Ghép, Vật Phẩm & Voucher Đối Tác Offline (O2O Rewards)
          </h1>
          <p className="text-xs text-slate-500">
            Quản trị tỷ lệ rơi mảnh kho báu (Drop Rate), kho voucher cafe, thể thao từ các thương hiệu đối tác
          </p>
        </div>

        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Thêm Voucher Đối Tác</span>
        </button>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {rewards.map((rew) => {
          const redemptionRate = Math.round((rew.redeemedCount / rew.totalIssued) * 100);
          return (
            <div
              key={rew.id}
              className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                    {rew.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      rew.status === 'available'
                        ? 'bg-emerald-50 text-emerald-700'
                        : rew.status === 'low_stock'
                        ? 'bg-amber-50 text-amber-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {rew.status === 'available'
                      ? 'Còn hàng'
                      : rew.status === 'low_stock'
                      ? 'Sắp hết'
                      : 'Hết hạn'}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm mb-1">{rew.title}</h3>
                <p className="text-xs text-slate-600 flex items-center gap-1 font-medium mb-3">
                  <Store className="w-3.5 h-3.5 text-slate-400" />
                  Đối tác: <span className="font-semibold text-slate-800">{rew.partnerBrand}</span>
                </p>

                <div className="space-y-2 py-3 border-y border-slate-100 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">Tỷ lệ rơi tại trạm:</span>
                    <span className="font-bold text-indigo-600">{rew.dropRatePercent}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">Đã quy đổi ngoài đời:</span>
                    <span className="font-semibold text-slate-800">
                      {rew.redeemedCount} / {rew.totalIssued}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">Kho còn lại:</span>
                    <span className="font-bold text-emerald-600">{rew.remainingCount} mã</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-slate-600 mb-1 font-medium">
                    <span>Tiến độ đổi quà O2O</span>
                    <span className="font-bold text-slate-700">{redemptionRate}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: `${redemptionRate}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedReward(rew);
                    setRateInput(rew.dropRatePercent);
                  }}
                  className="w-full py-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border border-slate-200/80 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Chỉnh Tỷ Lệ Rơi</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal chỉnh sửa Drop Rate */}
      {selectedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full border border-slate-200 shadow-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Điều Chỉnh Tỷ Lệ Rơi Thưởng</h3>
              <button
                onClick={() => setSelectedReward(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-800">{selectedReward.title}</p>
              <p className="text-[11px] text-slate-600 mb-3">{selectedReward.partnerBrand}</p>

              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tỷ lệ xuất hiện khi check-in trạm (%):
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="100"
                value={rateInput}
                onChange={(e) => setRateInput(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[11px] text-slate-600 mt-1">
                Khuyến nghị: 1% - 10% tùy thuộc độ hiếm của voucher.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedReward(null)}
                className="px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
              >
                Hủy
              </button>
              <button
                onClick={() => handleUpdateDropRate(selectedReward.id, rateInput)}
                className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-xs"
              >
                Cập Nhật Ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
