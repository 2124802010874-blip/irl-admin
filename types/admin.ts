export type ViewType = 
  | 'overview' 
  | 'poi' 
  | 'safety' 
  | 'users' 
  | 'anticheat' 
  | 'rewards' 
  | 'settings';

export interface KPIData {
  label: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  subtext: string;
  icon: string;
}

export interface POICheckpoint {
  id: string;
  title: string;
  category: 'Treasure' | 'Walking Tour' | 'Sports' | 'Coffee Meetup' | 'Secret Clue';
  city: 'Hồ Chí Minh' | 'Hà Nội' | 'Đà Nẵng';
  district: string;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  difficulty: 'Dễ' | 'Trung bình' | 'Khó' | 'Chuyên gia';
  rewardType: 'Mảnh Thần Thoại' | 'Mảnh Hiếm' | 'Voucher Cafe 50k' | 'Huy Hiệu IRL';
  status: 'active' | 'maintenance' | 'paused';
  activeHuntersNow: number;
  totalCheckins: number;
  createdAt: string;
}

export interface IncidentReport {
  id: string;
  code: string;
  reporterName: string;
  reporterAvatar: string;
  reporterReputation: number;
  targetUserName: string;
  targetUserAvatar: string;
  targetUserReputation: number;
  type: 'No-show (Bùng hẹn)' | 'Quấy rối' | 'Địa điểm không an toàn' | 'Fake GPS / Gian lận' | 'Thái độ xấu';
  severity: 'urgent' | 'high' | 'medium' | 'low';
  location: string;
  activityTitle: string;
  description: string;
  timestamp: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
}

export interface IRLUser {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  city: string;
  reputationScore: number; // 0.0 to 5.0
  hunterLevel: number;
  experience: number;
  completedMeetsCount: number;
  noShowRate: number; // e.g. 1.2%
  isIdentityVerified: boolean; // Tích xanh gặp mặt
  status: 'active' | 'warning' | 'banned' | 'investigating';
  joinedDate: string;
}

export interface AntiCheatAlert {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  anomalyType: 'Tốc độ phi thực tế (>150km/h)' | 'Sử dụng Mock GPS App' | 'Chuyển mảnh ghép số lượng lớn' | 'Check-in tức thời 3 trạm cách xa nhau';
  details: string;
  timestamp: string;
  riskScore: number; // 0 - 100
  actionTaken: 'Chặn tạm thời' | 'Đang gắn cờ' | 'Đã đóng băng kho đồ' | 'Chờ thẩm định';
}

export interface RewardPartnerItem {
  id: string;
  title: string;
  partnerBrand: string;
  category: 'F&B' | 'Giải trí ngoài trời' | 'Thời trang' | 'Workshop';
  dropRatePercent: number;
  totalIssued: number;
  redeemedCount: number;
  remainingCount: number;
  status: 'available' | 'low_stock' | 'expired';
}
