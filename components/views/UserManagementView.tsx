import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  BadgeCheck, 
  ShieldCheck, 
  AlertTriangle, 
  UserCheck, 
  Lock, 
  Unlock, 
  Star,
  Award,
  Calendar,
  Sparkles
} from 'lucide-react';
import { mockUsers } from '../../data/mockData';
import { IRLUser } from '../../types/admin';

interface UserManagementViewProps {
  selectedCity: string;
}

export const UserManagementView: React.FC<UserManagementViewProps> = ({ selectedCity }) => {
  const [users, setUsers] = useState<IRLUser[]>(mockUsers);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'warning' | 'banned'>('all');

  const filteredUsers = users.filter((u) => {
    const matchCity = selectedCity === 'all' || u.city === selectedCity;
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    const matchSearch =
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase());
    return matchCity && matchStatus && matchSearch;
  });

  const toggleVerify = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, isIdentityVerified: !u.isIdentityVerified } : u))
    );
  };

  const toggleBan = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          return {
            ...u,
            status: u.status === 'banned' ? 'active' : 'banned',
          };
        }
        return u;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            Quản Lý Thành Viên & Chỉ Số Tín Nhiệm (Reputation System)
          </h1>
          <p className="text-xs text-slate-500">
            Giám sát hồ sơ gặp mặt thực tế, tỷ lệ bùng hẹn (No-show), cấp tích xanh xác thực danh tính
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
            {users.filter((u) => u.isIdentityVerified).length} Thành viên có tích xanh xác thực
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo username hoặc họ tên..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'active', label: 'Đang hoạt động' },
            { id: 'warning', label: 'Cảnh cáo' },
            { id: 'banned', label: 'Đã khóa' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                statusFilter === st.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Thành Viên</th>
                <th className="py-3.5 px-4">Khu Vực</th>
                <th className="py-3.5 px-4">Điểm Tín Nhiệm (Rep)</th>
                <th className="py-3.5 px-4">Cấp Độ Hunter</th>
                <th className="py-3.5 px-4">Gặp IRL / Tỷ Lệ No-Show</th>
                <th className="py-3.5 px-4">Tích Xanh IRL</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.fullName}
                        className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{user.fullName}</span>
                          {user.isIdentityVerified && (
                            <span className="text-[10px] bg-indigo-100 text-indigo-700 font-bold px-1.5 py-0.2 rounded-full">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-600">@{user.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-700">{user.city}</span>
                    <div className="text-[10px] text-slate-600">Tham gia: {user.joinedDate}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 font-bold">
                      <Star
                        className={`w-3.5 h-3.5 ${
                          user.reputationScore >= 4.5
                            ? 'text-amber-500 fill-amber-500'
                            : user.reputationScore >= 3.0
                            ? 'text-amber-400'
                            : 'text-rose-500 fill-rose-500'
                        }`}
                      />
                      <span
                        className={`${
                          user.reputationScore >= 4.5
                            ? 'text-emerald-600 font-bold'
                            : user.reputationScore >= 3.0
                            ? 'text-amber-600'
                            : 'text-rose-600 font-bold'
                        }`}
                      >
                        {user.reputationScore.toFixed(1)} / 5.0
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/50">
                      <Award className="w-3 h-3 text-indigo-600" />
                      Lv. {user.hunterLevel}
                    </span>
                    <div className="text-[10px] text-slate-600 mt-0.5">{user.experience} XP</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">
                      {user.completedMeetsCount} cuộc gặp thành công
                    </div>
                    <div className="text-[11px] mt-0.5">
                      Bùng kèo:{' '}
                      <span
                        className={`font-bold ${
                          user.noShowRate > 20 ? 'text-rose-600' : 'text-slate-600'
                        }`}
                      >
                        {user.noShowRate}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleVerify(user.id)}
                      className={`text-xs px-2.5 py-1 rounded-md font-semibold border transition-colors ${
                        user.isIdentityVerified
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                          : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {user.isIdentityVerified ? 'Đã cấp' : 'Chưa cấp'}
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        user.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : user.status === 'warning'
                          ? 'bg-amber-50 text-amber-800'
                          : user.status === 'investigating'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {user.status === 'active'
                        ? 'Hoạt động'
                        : user.status === 'warning'
                        ? 'Cảnh cáo'
                        : user.status === 'investigating'
                        ? 'Đang kiểm tra'
                        : 'Đã khóa'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => toggleBan(user.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                        user.status === 'banned'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                      }`}
                    >
                      {user.status === 'banned' ? 'Mở Khóa' : 'Khóa'}
                    </button>
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
