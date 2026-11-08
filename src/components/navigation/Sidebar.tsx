import React from 'react';
import {
  Home,
  GraduationCap,
  Layers,
  BookOpen,
  CheckSquare,
  Gamepad2,
  FileCheck,
  FolderOpen,
  BarChart2,
  MessageSquareQuote,
  Info,
  ShieldCheck,
  Sparkles,
  X
} from 'lucide-react';
import { NavTab } from './Navbar';
import { UserAccount } from '../../types';

export interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenDrawer: () => void;
  onOpenFeedback: () => void;
  onOpenAbout: () => void;
  currentUser: UserAccount | null;
  onOpenTeacherAuth: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenDrawer,
  onOpenFeedback,
  onOpenAbout,
  currentUser,
  onOpenTeacherAuth,
  isOpenMobile,
  onCloseMobile
}) => {
  const isTeacher = currentUser?.role === 'teacher';

  const menuItems = [
    {
      id: 'home',
      label: 'Trang chủ',
      icon: Home,
      action: () => {
        onSelectTab('home');
        onCloseMobile();
      },
      isActive: activeTab === 'home'
    },
    {
      id: 'classes',
      label: 'Lớp học',
      icon: GraduationCap,
      action: () => {
        onOpenDrawer();
        onCloseMobile();
      },
      badge: 'Khối 6–9',
      isActive: false
    },
    {
      id: 'subjects',
      label: 'Môn học',
      icon: Layers,
      action: () => {
        onOpenDrawer();
        onCloseMobile();
      },
      badge: '11 môn',
      isActive: false
    },
    {
      id: 'textbooks',
      label: 'Sách giáo khoa',
      icon: BookOpen,
      action: () => {
        onSelectTab('textbooks');
        onCloseMobile();
      },
      badge: 'Khối 6–9',
      isActive: activeTab === 'textbooks'
    },
    {
      id: 'practice',
      label: 'Luyện tập',
      icon: FileCheck,
      action: () => {
        onSelectTab('practice');
        onCloseMobile();
      },
      isActive: activeTab === 'practice'
    },
    {
      id: 'games',
      label: 'Trò chơi học tập',
      icon: Gamepad2,
      action: () => {
        onSelectTab('games');
        onCloseMobile();
      },
      isActive: activeTab === 'games'
    },
    {
      id: 'exams',
      label: 'Bài kiểm tra',
      icon: FileCheck,
      action: () => {
        onSelectTab('practice');
        onCloseMobile();
      },
      isActive: false
    },
    {
      id: 'assignments',
      label: 'Bài tập của tôi',
      icon: CheckSquare,
      action: () => {
        onSelectTab('assignments');
        onCloseMobile();
      },
      isActive: activeTab === 'assignments'
    },
    {
      id: 'library',
      label: 'Thư viện tài liệu',
      icon: FolderOpen,
      action: () => {
        onSelectTab('knowledge');
        onCloseMobile();
      },
      isActive: activeTab === 'knowledge'
    },
    {
      id: 'statistics',
      label: 'Thống kê học tập',
      icon: BarChart2,
      action: () => {
        onSelectTab('statistics');
        onCloseMobile();
      },
      isActive: activeTab === 'statistics'
    },
    {
      id: 'feedback',
      label: 'Hỏi đáp',
      icon: MessageSquareQuote,
      action: () => {
        onOpenFeedback();
        onCloseMobile();
      },
      isActive: false
    },
    {
      id: 'about',
      label: 'Giới thiệu',
      icon: Info,
      action: () => {
        onOpenAbout();
        onCloseMobile();
      },
      isActive: false
    }
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 bg-[#0F172A] text-slate-300 select-none">
      <div>
        {/* Top Header Logo */}
        <div className="flex items-center justify-between pb-6 pt-2 px-2 border-b border-slate-800">
          <button
            onClick={() => {
              onSelectTab('home');
              onCloseMobile();
            }}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#2684FF] to-[#22C7E8] text-white flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-black text-sm tracking-wide text-white leading-tight">
                THCS MỸ HÒA
              </h1>
              <p className="text-[11px] font-medium text-blue-400 flex items-center gap-1 mt-0.5">
                Học Tập Trực Tuyến <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              </p>
            </div>
          </button>

          {/* Close button on mobile */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 10 Navigation Items */}
        <div className="pt-4 space-y-1">
          <div className="text-[10px] font-bold tracking-wider uppercase text-slate-500 px-3 py-1">
            Menu chính
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all duration-150 cursor-pointer ${
                  item.isActive
                    ? 'bg-[#2684FF] text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      item.isActive ? 'text-white' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && !item.isActive && (
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-medium">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Area in Sidebar */}
      <div className="pt-4 border-t border-slate-800 space-y-2">
        {isTeacher ? (
          <button
            onClick={() => {
              onSelectTab('teacher');
              onCloseMobile();
            }}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
              activeTab === 'teacher'
                ? 'bg-amber-500 text-white'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Khu vực Quản trị GV</span>
          </button>
        ) : (
          <button
            onClick={() => {
              onOpenTeacherAuth();
              onCloseMobile();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 font-semibold text-[11px] transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>Dành cho Giáo viên</span>
          </button>
        )}

        <div className="px-3 py-1 text-[10px] text-slate-500 leading-tight">
          Năm học 2026–2027 · GDPT 2018
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 z-30 shadow-xl">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10 animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
