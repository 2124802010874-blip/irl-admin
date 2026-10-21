import React, { useState } from 'react';
import { 
  Plus, 
  MapPin, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  Sliders, 
  CheckCircle, 
  AlertCircle,
  X,
  Compass,
  Sparkles
} from 'lucide-react';
import { mockPOIs } from '../../data/mockData';
import { POICheckpoint } from '../../types/admin';

interface PointsOfInterestViewProps {
  selectedCity: string;
}

export const PointsOfInterestView: React.FC<PointsOfInterestViewProps> = ({ selectedCity }) => {
  const [pois, setPois] = useState<POICheckpoint[]>(mockPOIs);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // New POI Form state
  const [newTitle, setNewTitle] = useState('');
  const [newCity, setNewCity] = useState<'Hồ Chí Minh' | 'Hà Nội' | 'Đà Nẵng'>('Hồ Chí Minh');
  const [newDistrict, setNewDistrict] = useState('Quận 1');
  const [newCategory, setNewCategory] = useState<POICheckpoint['category']>('Treasure');
  const [newRadius, setNewRadius] = useState<number>(30);
  const [newDifficulty, setNewDifficulty] = useState<POICheckpoint['difficulty']>('Trung bình');
  const [newReward, setNewReward] = useState<POICheckpoint['rewardType']>('Mảnh Hiếm');

  const filteredPois = pois.filter((poi) => {
    const matchCity = selectedCity === 'all' || poi.city === selectedCity;
    const matchCategory = categoryFilter === 'all' || poi.category === categoryFilter;
    const matchSearch = poi.title.toLowerCase().includes(search.toLowerCase()) || 
                        poi.district.toLowerCase().includes(search.toLowerCase());
    return matchCity && matchCategory && matchSearch;
  });

  const toggleStatus = (id: string) => {
    setPois((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            status: p.status === 'active' ? 'maintenance' : 'active',
          };
        }
        return p;
      })
    );
  };

  const handleCreatePOI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newCheckpoint: POICheckpoint = {
      id: `poi-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      city: newCity,
      district: newDistrict,
      latitude: newCity === 'Hồ Chí Minh' ? 10.7769 : newCity === 'Hà Nội' ? 21.0285 : 16.0544,
      longitude: newCity === 'Hồ Chí Minh' ? 106.7009 : newCity === 'Hà Nội' ? 105.8542 : 108.2022,
      radiusMeters: Number(newRadius),
      difficulty: newDifficulty,
      rewardType: newReward,
      status: 'active',
      activeHuntersNow: 0,
      totalCheckins: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setPois([newCheckpoint, ...pois]);
    setIsModalOpen(false);
    setNewTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-600" />
            Quản Lý Trạm Săn, POI & Tọa Độ Geofence
          </h1>
          <p className="text-xs text-slate-500">
            Cấu hình bán kính quét GPS (Geofence Radius), cơ chế check-in và quà thưởng ngoài thực tế
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Trạm Săn Mới</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Lọc theo tên trạm săn hoặc quận/huyện..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'Treasure', label: 'Săn Kho Báu' },
            { id: 'Sports', label: 'Thể Thao / Chạy Bộ' },
            { id: 'Coffee Meetup', label: 'Cà Phê Ghép Đội' },
            { id: 'Walking Tour', label: 'Khám Phá' },
            { id: 'Secret Clue', label: 'Giải Mật Mã' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                categoryFilter === cat.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* POI Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Tên Trạm / Điểm Đến</th>
                <th className="py-3.5 px-4">Khu Vực & Tọa Độ</th>
                <th className="py-3.5 px-4">Bán Kính Geofence</th>
                <th className="py-3.5 px-4">Loại & Độ Khó</th>
                <th className="py-3.5 px-4">Phần Thưởng IRL</th>
                <th className="py-3.5 px-4">Đang Săn / Tổng</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPois.map((poi) => (
                <tr key={poi.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{poi.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      Mã: {poi.id} • Tạo ngày {poi.createdAt}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{poi.city}</div>
                    <div className="text-[11px] text-slate-500">{poi.district}</div>
                    <div className="text-[10px] text-indigo-600 font-mono mt-0.5">
                      {poi.latitude.toFixed(4)}, {poi.longitude.toFixed(4)}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/50">
                      R = {poi.radiusMeters} mét
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold mb-1">
                      {poi.category}
                    </span>
                    <div className="text-[11px] text-slate-500 font-medium">
                      Độ khó: <span className="text-slate-800 font-semibold">{poi.difficulty}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-bold border border-amber-200">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      {poi.rewardType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-indigo-600">
                      {poi.activeHuntersNow} thợ săn
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {poi.totalCheckins.toLocaleString()} lần check-in
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleStatus(poi.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                        poi.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${poi.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                      {poi.status === 'active' ? 'Hoạt động' : 'Tạm dừng / Sửa'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        aria-label="Chỉnh sửa trạm săn"
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        aria-label="Xóa trạm săn"
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Thêm Trạm Săn Mới */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Thêm Điểm Săn Mới / Thiết Lập Tọa Độ Geofence
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePOI} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tên trạm / Hoạt động IRL *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Kho báu Thảo Cầm Viên Sài Gòn"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Thành phố</label>
                  <select
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Quận / Huyện</label>
                  <input
                    type="text"
                    value={newDistrict}
                    onChange={(e) => setNewDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Loại hoạt động</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Treasure">Săn Kho Báu</option>
                    <option value="Sports">Thể Thao Ngoài Trời</option>
                    <option value="Coffee Meetup">Cà Phê Gặp Gỡ</option>
                    <option value="Walking Tour">Đi Bộ Khám Phá</option>
                    <option value="Secret Clue">Giải Mật Mã</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Bán kính Geofence hợp lệ (mét)
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={150}
                    value={newRadius}
                    onChange={(e) => setNewRadius(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Độ khó</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Dễ">Dễ</option>
                    <option value="Trung bình">Trung bình</option>
                    <option value="Khó">Khó</option>
                    <option value="Chuyên gia">Chuyên gia</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phần thưởng rơi</label>
                  <select
                    value={newReward}
                    onChange={(e) => setNewReward(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Mảnh Thần Thoại">Mảnh Thần Thoại</option>
                    <option value="Mảnh Hiếm">Mảnh Hiếm</option>
                    <option value="Voucher Cafe 50k">Voucher Cafe 50k</option>
                    <option value="Huy Hiệu IRL">Huy Hiệu IRL</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-xs"
                >
                  Kích hoạt Trạm Ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
