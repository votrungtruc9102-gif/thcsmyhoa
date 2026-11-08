import React, { useState } from 'react';
import {
  GraduationCap,
  Home,
  BookOpen,
  CheckSquare,
  Gamepad2,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  Sparkles,
  BarChart2,
  LogIn,
  UserCheck,
  User
} from 'lucide-react';
import { GradeLevel, SubjectId, UserAccount } from '../../types';
import { SubjectGradeTrigger } from '../subject-grade/SubjectGradeTrigger';

export type NavTab = 'home' | 'textbooks' | 'knowledge' | 'practice' | 'games' | 'statistics' | 'teacher' | 'assignments';

interface NavbarProps {
  currentUser: UserAccount | null;
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  grade: GradeLevel;
  subjectId: SubjectId;
  onOpenDrawer: () => void;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  onSelectTab,
  grade,
  subjectId,
  onOpenDrawer,
  onOpenLogin,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isTeacher = currentUser?.role === 'teacher';
  const isStudent = currentUser?.role === 'student';

  const navItems = [
    { id: 'home' as NavTab, label: 'Trang chủ', icon: Home },
    { id: 'textbooks' as NavTab, label: 'Sách giáo khoa', icon: BookOpen },
    { id: 'knowledge' as NavTab, label: 'Kho kiến thức', icon: BookOpen },
    { id: 'practice' as NavTab, label: 'Luyện tập', icon: CheckSquare },
    { id: 'games' as NavTab, label: 'Game học tập', icon: Gamepad2 },
    { id: 'statistics' as NavTab, label: 'Thống kê', icon: BarChart2 }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2EAF5] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Left: School Logo & Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('home')}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#2684FF] to-[#22C7E8] text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#172B4D] group-hover:text-[#2684FF] transition-colors">
                    THCS MỸ HÒA
                  </span>
                  <span className="hidden sm:inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                    2026–2027
                  </span>
                </div>
                <p className="text-[11px] font-medium text-[#64748B] flex items-center gap-1">
                  Học Tập Trực Tuyến <Sparkles className="w-3 h-3 text-amber-500 hidden sm:inline" />
                </p>
              </div>
            </button>
          </div>

          {/* Middle: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-200/60">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#2684FF] shadow-xs border border-blue-100'
                      : 'text-[#64748B] hover:text-[#172B4D] hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#2684FF]' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}

            {/* Teacher Tab: Only visible for verified teachers */}
            {isTeacher && (
              <button
                onClick={() => onSelectTab('teacher')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 cursor-pointer ${
                  activeTab === 'teacher'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                Quản lý giáo viên
              </button>
            )}
          </nav>

          {/* Right: Drawer Trigger & User Profile / Login */}
          <div className="flex items-center gap-2.5">
            {/* Mandatory Subject & Grade Drawer Trigger */}
            <SubjectGradeTrigger
              grade={grade}
              subjectId={subjectId}
              onClick={onOpenDrawer}
            />

            {/* User Session Area */}
            {currentUser ? (
              <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 p-1.5 rounded-2xl">
                <div className="flex items-center gap-2 px-2">
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black text-white ${isTeacher ? 'bg-amber-500' : 'bg-blue-600'}`}>
                    {isTeacher ? 'GV' : 'HS'}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-[#172B4D] truncate max-w-[120px]">
                      {currentUser.displayName}
                    </div>
                    <div className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${isTeacher ? 'bg-amber-500' : 'bg-blue-500'}`} />
                      {isTeacher ? 'Giáo viên' : `Học sinh (Lớp ${currentUser.grade || grade})`}
                    </div>
                  </div>
                </div>

                {isTeacher && (
                  <button
                    onClick={() => onSelectTab('teacher')}
                    className="px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Quản trị
                  </button>
                )}

                <button
                  onClick={onLogout}
                  title="Đăng xuất khỏi tài khoản"
                  className="p-1.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={onOpenLogin}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#2684FF] hover:bg-blue-600 shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  Đăng nhập
                </button>
              </div>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              aria-label="Mở menu điều hướng"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1.5 animate-fadeIn">
          {/* User Info on Mobile */}
          {currentUser ? (
            <div className="p-3 mb-2 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white ${isTeacher ? 'bg-amber-500' : 'bg-blue-600'}`}>
                  {isTeacher ? 'GV' : 'HS'}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#172B4D]">{currentUser.displayName}</div>
                  <div className="text-[10px] text-slate-500">{isTeacher ? 'Giáo viên THCS' : `Học sinh (Lớp ${currentUser.grade || grade})`}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-red-600 font-bold px-2.5 py-1 rounded-lg bg-red-50"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full mb-2 py-2.5 rounded-xl bg-[#2684FF] text-white text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <LogIn className="w-4 h-4" />
              Đăng nhập tài khoản
            </button>
          )}

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-blue-50 text-[#2684FF]'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}

          {isTeacher && (
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  onSelectTab('teacher');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200"
              >
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                Khu vực Quản lý Giáo viên
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
