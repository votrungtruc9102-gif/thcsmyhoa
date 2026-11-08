import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Menu,
  GraduationCap,
  Sparkles,
  ChevronDown,
  User,
  LogIn,
  LogOut,
  Calendar,
  BookOpen,
  ArrowRight,
  X,
  ShieldCheck,
  ShieldAlert,
  Briefcase
} from 'lucide-react';
import { GradeLevel, SubjectId, SubjectMeta, UserAccount, Lesson, SchoolAnnouncement } from '../../types';

interface TopBarProps {
  onToggleMobileSidebar: () => void;
  grade: GradeLevel;
  subject: SubjectMeta;
  onOpenDrawer: () => void;
  currentUser: UserAccount | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  onOpenTeacherMode: () => void;
  announcements: SchoolAnnouncement[];
  lessons: Lesson[];
  onSelectLesson: (lesson: Lesson) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onToggleMobileSidebar,
  grade,
  subject,
  onOpenDrawer,
  currentUser,
  onOpenLogin,
  onLogout,
  onOpenTeacherMode,
  announcements,
  lessons,
  onSelectLesson
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showAccessDeniedModal, setShowAccessDeniedModal] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter lessons based on search query
  const filteredLessons = searchQuery.trim()
    ? lessons.filter(
        (l) =>
          l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.summary.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const isTeacher = currentUser?.role === 'teacher';
  const isStudent = currentUser?.role === 'student';

  const handleTeacherButtonClick = () => {
    if (!currentUser) {
      onOpenLogin();
      return;
    }
    if (currentUser.role === 'teacher') {
      onOpenTeacherMode();
    } else {
      // Role is student
      setShowAccessDeniedModal(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2EAF5] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-4">
            
            {/* Mobile Sidebar Toggle & Mobile Brand */}
            <div className="flex items-center gap-2 lg:hidden shrink-0">
              <button
                onClick={onToggleMobileSidebar}
                className="p-2 rounded-xl text-slate-600 hover:text-[#2684FF] hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Mở menu điều hướng"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                  MH
                </div>
                <span className="font-extrabold text-xs text-[#172B4D] hidden xs:inline">
                  THCS MỸ HÒA
                </span>
              </div>
            </div>

            {/* MANDATORY ORDER:
                1. Thanh tìm kiếm
                2. Nút Chọn lớp/môn
                3. Nút Chức năng giáo viên
                4. Nút Đăng nhập
                (Kèm chuông thông báo cạnh tài khoản)
            */}
            <div className="flex-1 flex items-center gap-2 sm:gap-3 min-w-0">
              
              {/* 1. THANH TÌM KIẾM */}
              <div ref={searchRef} className="relative flex-1 min-w-[140px] max-w-sm sm:max-w-md">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchOpen(true);
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                    placeholder="Tìm bài học, môn học, chủ đề..."
                    className="w-full pl-9 pr-7 py-2 rounded-2xl bg-slate-100/90 hover:bg-slate-100 border border-transparent focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 text-xs sm:text-sm text-[#172B4D] placeholder-slate-400 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Instant Search Results Dropdown */}
                {isSearchOpen && searchQuery.trim() && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fadeIn text-xs">
                    <div className="p-2.5 bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold flex items-center justify-between text-[11px]">
                      <span>Kết quả tìm kiếm cho "{searchQuery}"</span>
                      <span>{filteredLessons.length} bài học</span>
                    </div>
                    {filteredLessons.length > 0 ? (
                      <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                        {filteredLessons.map((les) => (
                          <div
                            key={les.id}
                            onClick={() => {
                              onSelectLesson(les);
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="p-3 hover:bg-blue-50/60 cursor-pointer transition-colors flex items-start gap-3"
                          >
                            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                              <BookOpen className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] text-blue-600 font-bold">
                                {les.chapter} · Khối {les.grade}
                              </div>
                              <div className="font-bold text-slate-800 truncate">
                                {les.title}
                              </div>
                              <div className="text-[11px] text-slate-500 truncate">
                                {les.summary}
                              </div>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 self-center" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-slate-400 text-xs">
                        Không tìm thấy bài học phù hợp với từ khóa này.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 2. NÚT CHỌN LỚP/MÔN (Nằm ngay bên phải thanh tìm kiếm) */}
              <button
                onClick={onOpenDrawer}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-2xl bg-blue-50/80 hover:bg-blue-100 border border-blue-200 text-[#2684FF] font-bold text-xs transition-all cursor-pointer shadow-2xs shrink-0"
                title="Chọn khối lớp và môn học"
              >
                <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
                <div className="text-left hidden md:block leading-tight">
                  <span className="block text-[9px] text-blue-500 font-semibold uppercase">Chọn lớp/môn</span>
                  <span className="text-xs text-[#172B4D] font-extrabold truncate max-w-[180px] inline-block">
                    Lớp {grade} • {subject.name}
                  </span>
                </div>
                <span className="md:hidden text-xs text-[#172B4D] font-extrabold truncate max-w-[130px]">
                  Lớp {grade} • {subject.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-0.5" />
              </button>

              {/* 3. NÚT CHỨC NĂNG GIÁO VIÊN (Nằm ngay bên phải nút Chọn lớp/môn, bên trái nút Đăng nhập) */}
              <button
                onClick={handleTeacherButtonClick}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-2xl font-bold text-xs transition-all cursor-pointer shadow-2xs shrink-0 border ${
                  isTeacher
                    ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600 shadow-amber-500/20'
                    : 'bg-blue-50 hover:bg-blue-100/90 text-blue-700 border-blue-200 hover:border-blue-300'
                }`}
                title="Chuyển sang Chế độ Giáo viên"
              >
                <Briefcase className={`w-4 h-4 shrink-0 ${isTeacher ? 'text-white' : 'text-blue-600'}`} />
                <span className="hidden sm:inline">Chức năng giáo viên</span>
                <span className="sm:hidden">Giáo viên</span>
                {isTeacher && (
                  <span className="hidden lg:inline-flex text-[9px] bg-white/20 text-white px-1.5 py-0.2 rounded-full font-bold ml-0.5">
                    Đang bật
                  </span>
                )}
              </button>

              {/* 4. NÚT ĐĂNG NHẬP / TÀI KHOẢN (Nằm ngay bên phải nút Chức năng giáo viên) */}
              <div ref={profileRef} className="relative shrink-0">
                {currentUser ? (
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:px-3 sm:py-2 rounded-2xl bg-slate-100/90 hover:bg-slate-200/90 transition-colors cursor-pointer border border-slate-200/60"
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0 ${
                        isTeacher ? 'bg-amber-500' : 'bg-blue-600'
                      }`}
                    >
                      {isTeacher ? 'GV' : 'HS'}
                    </div>
                    <div className="text-left hidden lg:block leading-tight">
                      <div className="font-bold text-xs text-[#172B4D] truncate max-w-[100px]">
                        {currentUser.displayName}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        {isTeacher ? 'Cán bộ/GV' : `Học sinh Lớp ${currentUser.grade || grade}`}
                      </div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block shrink-0" />
                  </button>
                ) : (
                  <button
                    onClick={onOpenLogin}
                    className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-2xl bg-[#2684FF] hover:bg-blue-600 text-white font-bold text-xs shadow-xs cursor-pointer transition-colors shrink-0"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Đăng nhập</span>
                  </button>
                )}

                {/* Profile Dropdown Menu */}
                {isProfileOpen && currentUser && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn text-xs">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-extrabold text-[#172B4D] truncate">{currentUser.displayName}</p>
                      <p className="text-[11px] text-slate-500">{currentUser.username}</p>
                      <span
                        className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isTeacher ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {isTeacher ? 'Tài khoản Giáo viên' : `Học sinh Khối ${currentUser.grade || grade}`}
                      </span>
                    </div>
                    {isTeacher && (
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          onOpenTeacherMode();
                        }}
                        className="w-full px-4 py-2 text-left text-blue-600 hover:bg-blue-50 font-bold flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <Briefcase className="w-4 h-4 text-blue-600" />
                        Mở Bàn làm việc GV
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onLogout();
                      }}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 font-bold flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>

              {/* BIỂU TƯỢNG THÔNG BÁO (Chuông thông báo đặt cạnh nhóm nút tài khoản) */}
              <div ref={notifRef} className="relative shrink-0">
                <button
                  onClick={() => setIsNotifOpen(!isNotifOpen)}
                  className="relative p-2 rounded-2xl text-slate-600 hover:text-[#2684FF] hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Thông báo nhà trường"
                  title="Thông báo nhà trường"
                >
                  <Bell className="w-4.5 h-4.5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
                </button>

                {/* Announcements Dropdown */}
                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-fadeIn">
                    <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                        <Bell className="w-4 h-4" />
                        Thông báo từ THCS Mỹ Hòa
                      </div>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                        {announcements.length} mới
                      </span>
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 text-xs">
                      {announcements.map((item) => (
                        <div key={item.id} className="p-3.5 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                            <span className="flex items-center gap-1 font-semibold text-blue-600">
                              <Calendar className="w-3 h-3" />
                              {item.date}
                            </span>
                            {item.priority && (
                              <span className="px-1.5 py-0.2 rounded-full bg-red-100 text-red-600 font-bold text-[9px]">
                                Ưu tiên
                              </span>
                            )}
                          </div>
                          <h5 className="font-bold text-[#172B4D] leading-snug">
                            {item.title}
                          </h5>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                            {item.content}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="p-2.5 bg-slate-50 text-center border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                      Hệ thống thông báo học vụ năm học 2026–2027
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* STUDENT ACCESS DENIAL MODAL (Bắt buộc theo Phần II.2) */}
      {showAccessDeniedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-red-200 overflow-hidden p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-base font-black text-[#172B4D]">
                Từ chối quyền truy cập Chế độ Giáo viên
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-amber-50 p-3 rounded-2xl border border-amber-200 text-amber-900 font-medium">
                "Tài khoản học sinh không có quyền truy cập khu vực giáo viên. Vui lòng đăng nhập bằng tài khoản giáo viên được cấp quyền."
              </p>
            </div>

            <div className="text-[11px] text-slate-500 text-left bg-slate-50 p-3 rounded-2xl space-y-1">
              <p className="font-bold text-slate-700">Tài khoản giáo viên thử nghiệm:</p>
              <p>• Tên đăng nhập: <code className="bg-white px-1.5 py-0.5 rounded border font-mono text-blue-600 font-bold">teacher</code></p>
              <p>• Mật khẩu: <code className="bg-white px-1.5 py-0.5 rounded border font-mono text-blue-600 font-bold">myhoa2026</code></p>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                onClick={() => setShowAccessDeniedModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer transition-colors"
              >
                Đóng thông báo
              </button>
              <button
                onClick={() => {
                  setShowAccessDeniedModal(false);
                  onOpenLogin();
                }}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
              >
                Đổi tài khoản Giáo viên
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
