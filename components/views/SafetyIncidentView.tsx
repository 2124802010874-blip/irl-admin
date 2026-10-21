import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  UserX, 
  ThumbsDown, 
  ShieldCheck, 
  Send, 
  Filter,
  Search,
  MessageSquare,
  AlertOctagon
} from 'lucide-react';
import { mockIncidents } from '../../data/mockData';
import { IncidentReport } from '../../types/admin';

export const SafetyIncidentView: React.FC = () => {
  const [incidents, setIncidents] = useState<IncidentReport[]>(mockIncidents);
  const [selectedIncident, setSelectedIncident] = useState<IncidentReport | null>(mockIncidents[0]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'investigating' | 'resolved'>('all');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const filteredIncidents = incidents.filter((inc) => {
    if (statusFilter === 'all') return true;
    return inc.status === statusFilter;
  });

  const showToast = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const handleApplyPenalty = (id: string, penaltyType: 'warn' | 'penalty_rep' | 'ban' | 'resolve') => {
    setIncidents((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: penaltyType === 'resolve' ? 'resolved' : 'resolved',
          };
        }
        return item;
      })
    );

    if (penaltyType === 'warn') {
      showToast('Đã gửi cảnh cáo chính thức qua thông báo đẩy và email của tài khoản.');
    } else if (penaltyType === 'penalty_rep') {
      showToast('Đã trừ 0.5 điểm uy tín (Reputation Score) của tài khoản vi phạm.');
    } else if (penaltyType === 'ban') {
      showToast('Đã khóa tài khoản và chặn thiết bị này tham gia các hoạt động IRL 7 ngày.');
    } else if (penaltyType === 'resolve') {
      showToast('Vụ việc đã được đánh dấu giải quyết thỏa đáng.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Feedback Toast */}
      {feedbackMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs border border-slate-700 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            Trung Tâm An Toàn & Phản Ứng Khẩn Cấp (Safety & Trust Center)
          </h1>
          <p className="text-xs text-slate-500">
            Tiếp nhận tín hiệu SOS thực địa, giải quyết bùng kèo (No-show), khiếu nại hành vi và gian lận gặp mặt
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
            {incidents.filter((i) => i.severity === 'urgent' && i.status !== 'resolved').length} Cảnh báo SOS Ưu tiên cao
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'all', label: 'Tất cả báo cáo' },
          { id: 'pending', label: 'Chờ tiếp nhận' },
          { id: 'investigating', label: 'Đang điều tra' },
          { id: 'resolved', label: 'Đã giải quyết' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              statusFilter === tab.id
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Grid: Queue on Left, Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Incident Queue List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredIncidents.map((inc) => {
            const isSelected = selectedIncident?.id === inc.id;
            return (
              <div
                key={inc.id}
                onClick={() => setSelectedIncident(inc)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white border-indigo-600 ring-2 ring-indigo-500/10 shadow-sm'
                    : 'bg-white border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] font-bold text-slate-500">
                    {inc.code}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        inc.severity === 'urgent'
                          ? 'bg-rose-100 text-rose-700 animate-pulse'
                          : inc.severity === 'high'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {inc.severity === 'urgent' ? 'SOS Khẩn Cấp' : inc.severity}
                    </span>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                        inc.status === 'resolved'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {inc.status === 'resolved' ? 'Đã xử lý' : 'Đang mở'}
                    </span>
                  </div>
                </div>

                <div className="font-bold text-slate-900 text-xs mb-1">{inc.type}</div>
                <p className="text-slate-600 text-xs line-clamp-2 mb-3">
                  {inc.description}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-600 pt-2 border-t border-slate-100 font-medium">
                  <span>Báo cáo: <span className="font-semibold text-slate-800">{inc.reporterName}</span></span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {inc.timestamp}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Incident Inspector / Resolution Panel */}
        <div className="lg:col-span-7">
          {selectedIncident ? (
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 space-y-6 sticky top-24">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      {selectedIncident.code}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold border border-rose-200">
                      {selectedIncident.type}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mt-1">
                    {selectedIncident.activityTitle}
                  </h2>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <span>Nhận lúc: </span>
                  <span className="font-semibold text-slate-800">{selectedIncident.timestamp}</span>
                </div>
              </div>

              {/* Profiles involved */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-xs">
                {/* Reporter */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Người gửi khiếu nại
                  </span>
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedIncident.reporterAvatar}
                      alt={selectedIncident.reporterName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                    />
                    <div>
                      <p className="font-bold text-slate-900">{selectedIncident.reporterName}</p>
                      <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold mt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Uy tín: {selectedIncident.reporterReputation}/5.0</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accused Target */}
                <div className="border-l border-slate-200 pl-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Đối tượng bị báo cáo
                  </span>
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedIncident.targetUserAvatar}
                      alt={selectedIncident.targetUserName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-200"
                    />
                    <div>
                      <p className="font-bold text-slate-900">{selectedIncident.targetUserName}</p>
                      <div className="flex items-center gap-1 text-[11px] text-amber-600 font-semibold mt-0.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Uy tín: {selectedIncident.targetUserReputation}/5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Incident Details & Location */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  <span>Địa điểm ghi nhận sự việc: </span>
                  <span className="font-semibold text-slate-900">{selectedIncident.location}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <p className="font-semibold text-slate-900 mb-1">Chi tiết mô tả sự việc:</p>
                  {selectedIncident.description}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-700 mb-3 uppercase tracking-wider">
                  Quyết định xử lý của Quản trị viên (Admin Action):
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <button
                    onClick={() => handleApplyPenalty(selectedIncident.id, 'warn')}
                    className="py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Cảnh Cáo</span>
                  </button>

                  <button
                    onClick={() => handleApplyPenalty(selectedIncident.id, 'penalty_rep')}
                    className="py-2 px-3 bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                    <span>Trừ 0.5 Tín Nhiệm</span>
                  </button>

                  <button
                    onClick={() => handleApplyPenalty(selectedIncident.id, 'ban')}
                    className="py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <UserX className="w-3.5 h-3.5" />
                    <span>Khóa 7 Ngày</span>
                  </button>

                  <button
                    onClick={() => handleApplyPenalty(selectedIncident.id, 'resolve')}
                    className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Đã Giải Quyết</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200/80 p-12 text-center text-slate-400 text-xs">
              Chọn một vụ việc bên trái để xem hồ sơ và giải quyết
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
