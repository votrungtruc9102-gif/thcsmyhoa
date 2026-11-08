import React from 'react';
import {
  Bell,
  BookOpen,
  CheckSquare,
  Gamepad2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  HelpCircle,
  FileText,
  GraduationCap,
  Laptop,
  Calculator,
  Languages,
  Atom,
  Compass,
  Wrench,
  HeartHandshake,
  Palette,
  Activity,
  Compass as CompassIcon,
  FolderOpen,
  CheckCircle2
} from 'lucide-react';
import { HeroSection } from '../../components/hero/HeroSection';
import { StatsCards } from '../../components/stats/StatsCards';
import { NavTab } from '../../components/navigation/Navbar';
import { GradeLevel, SubjectMeta, SchoolAnnouncement, Lesson, SubjectId } from '../../types';
import { SUBJECTS } from '../../data/mockData';

interface HomePageProps {
  onNavigate: (tab: NavTab) => void;
  currentGrade: GradeLevel;
  currentSubject: SubjectMeta;
  onOpenDrawer: () => void;
  onSelectGrade?: (grade: GradeLevel) => void;
  onSelectSubject?: (subjectId: SubjectId) => void;
  announcements: SchoolAnnouncement[];
  totalQuestions: number;
  completedTests: number;
  averageScore: number;
  totalLessons: number;
  accuracyRate: number;
  currentLessons: Lesson[];
  onSelectLesson: (lesson: Lesson) => void;
  isTeacher: boolean;
  onOpenTeacherAuth: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  currentGrade,
  currentSubject,
  onOpenDrawer,
  onSelectGrade,
  onSelectSubject,
  announcements,
  totalQuestions,
  completedTests,
  averageScore,
  totalLessons,
  accuracyRate,
  currentLessons,
  onSelectLesson,
  isTeacher,
  onOpenTeacherAuth
}) => {
  // 4 Classes definitions with pastel colors & icons per Section 2.4
  const classCards: {
    grade: GradeLevel;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    cardBg: string;
    borderCol: string;
    textColor: string;
    btnBg: string;
    badge: string;
  }[] = [
    {
      grade: 6,
      title: 'Khối Lớp 6',
      subtitle: 'Khởi đầu cấp THCS',
      description: 'Làm quen môi trường THCS, tiếp cận 17 bài học Tin học & phương pháp học tập số mới.',
      icon: <Sparkles className="w-5 h-5 text-sky-600" />,
      cardBg: 'bg-sky-50/70 hover:bg-sky-50',
      borderCol: 'border-sky-200 hover:border-sky-400',
      textColor: 'text-sky-900',
      btnBg: 'bg-sky-600 hover:bg-sky-700 text-white',
      badge: '17 bài Tin 6'
    },
    {
      grade: 7,
      title: 'Khối Lớp 7',
      subtitle: 'Nâng cao kỹ năng',
      description: 'Củng cố tư duy logic, phân loại thiết bị số và ứng dụng bảng tính điện tử trực quan.',
      icon: <BookOpen className="w-5 h-5 text-emerald-600" />,
      cardBg: 'bg-emerald-50/70 hover:bg-emerald-50',
      borderCol: 'border-emerald-200 hover:border-emerald-400',
      textColor: 'text-emerald-900',
      btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      badge: 'Đổi mới GDPT'
    },
    {
      grade: 8,
      title: 'Khối Lớp 8',
      subtitle: 'Tư duy thuật toán',
      description: 'Khám phá lịch sử máy tính điện tử, các thuật toán tìm kiếm và xử lý dữ liệu phức hợp.',
      icon: <Award className="w-5 h-5 text-amber-600" />,
      cardBg: 'bg-amber-50/70 hover:bg-amber-50',
      borderCol: 'border-amber-200 hover:border-amber-400',
      textColor: 'text-amber-900',
      btnBg: 'bg-amber-600 hover:bg-amber-700 text-white',
      badge: 'Luyện thi 15p'
    },
    {
      grade: 9,
      title: 'Khối Lớp 9',
      subtitle: 'Bứt phá chuyển cấp',
      description: 'Tổng ôn toàn diện kiến thức THCS, hướng nghiệp công nghệ số và luyện thi vào 10.',
      icon: <GraduationCap className="w-5 h-5 text-purple-600" />,
      cardBg: 'bg-purple-50/70 hover:bg-purple-50',
      borderCol: 'border-purple-200 hover:border-purple-400',
      textColor: 'text-purple-900',
      btnBg: 'bg-purple-600 hover:bg-purple-700 text-white',
      badge: 'Ôn thi vào 10'
    }
  ];

  // 11 Subjects per Section 2.5
  const extraSubjects = [
    {
      id: 'tin-hoc' as SubjectId,
      name: 'Tin học',
      icon: <Laptop className="w-4 h-4" />,
      color: 'bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-400',
      desc: 'Khoa học máy tính & Scratch'
    },
    {
      id: 'toan' as SubjectId,
      name: 'Toán học',
      icon: <Calculator className="w-4 h-4" />,
      color: 'bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-400',
      desc: 'Số học & Hình học'
    },
    {
      id: 'van' as SubjectId,
      name: 'Ngữ văn',
      icon: <BookOpen className="w-4 h-4" />,
      color: 'bg-purple-50 text-purple-700 border-purple-200 hover:border-purple-400',
      desc: 'Đọc hiểu & Viết văn'
    },
    {
      id: 'khtn' as SubjectId,
      name: 'Khoa học tự nhiên',
      icon: <Atom className="w-4 h-4" />,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-400',
      desc: 'Lý - Hóa - Sinh'
    },
    {
      id: 'lich-su-dia-ly' as SubjectId,
      name: 'Lịch sử và Địa lí',
      icon: <Compass className="w-4 h-4" />,
      color: 'bg-pink-50 text-pink-700 border-pink-200 hover:border-pink-400',
      desc: 'Lịch sử & Địa danh'
    },
    {
      id: 'tieng-anh' as SubjectId,
      name: 'Tiếng Anh',
      icon: <Languages className="w-4 h-4" />,
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:border-cyan-400',
      desc: 'Ngữ pháp & Giao tiếp'
    },
    {
      id: 'gdcd' as SubjectId,
      name: 'Giáo dục công dân',
      icon: <HeartHandshake className="w-4 h-4" />,
      color: 'bg-teal-50 text-teal-700 border-teal-200 hover:border-teal-400',
      desc: 'Đạo đức & Pháp luật'
    },
    {
      id: 'cong-nghe' as SubjectId,
      name: 'Công nghệ',
      icon: <Wrench className="w-4 h-4" />,
      color: 'bg-orange-50 text-orange-700 border-orange-200 hover:border-orange-400',
      desc: 'Đời sống & Kỹ thuật'
    },
    {
      id: 'toan' as SubjectId,
      name: 'Nghệ thuật',
      icon: <Palette className="w-4 h-4" />,
      color: 'bg-rose-50 text-rose-700 border-rose-200 hover:border-rose-400',
      desc: 'Âm nhạc & Mỹ thuật'
    },
    {
      id: 'toan' as SubjectId,
      name: 'Giáo dục thể chất',
      icon: <Activity className="w-4 h-4" />,
      color: 'bg-lime-50 text-lime-700 border-lime-200 hover:border-lime-400',
      desc: 'Vận động & Sức khỏe'
    },
    {
      id: 'toan' as SubjectId,
      name: 'Hoạt động trải nghiệm',
      icon: <CompassIcon className="w-4 h-4" />,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:border-indigo-400',
      desc: 'Kỹ năng sống & Hướng nghiệp'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Hero Section with 5-Image Carousel (Section 2.3 & 3) */}
      <HeroSection
        onNavigate={onNavigate}
        currentGrade={currentGrade}
        currentSubject={currentSubject}
        onOpenDrawer={onOpenDrawer}
      />

      {/* 2. Khu vực chọn lớp (Section 2.4 - 4 thẻ lớp học pastel) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#172B4D] tracking-tight flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-blue-600" />
              <span>Khối lớp học THCS Mỹ Hòa</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              Chọn khối lớp để tự động lọc bài học và đề kiểm tra phù hợp theo chuẩn chương trình mới.
            </p>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-xl border border-blue-100 hidden sm:inline-block">
            Đang chọn: Lớp {currentGrade}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {classCards.map((card) => {
            const isSelected = currentGrade === card.grade;
            return (
              <div
                key={card.grade}
                className={`p-5 rounded-3xl border-2 transition-all duration-200 flex flex-col justify-between shadow-xs ${card.cardBg} ${card.borderCol} ${
                  isSelected ? 'ring-2 ring-blue-500 shadow-md' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-xs flex items-center justify-center">
                      {card.icon}
                    </div>
                    {isSelected ? (
                      <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-600 text-white shadow-xs">
                        Đang chọn
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/80 text-slate-600 border border-slate-200">
                        {card.badge}
                      </span>
                    )}
                  </div>

                  <h3 className={`text-lg font-black ${card.textColor}`}>
                    {card.title}
                  </h3>
                  <div className="text-xs font-bold text-slate-500 mb-1.5">
                    {card.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {card.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60">
                  <button
                    onClick={() => {
                      if (onSelectGrade) {
                        onSelectGrade(card.grade);
                      } else {
                        onOpenDrawer();
                      }
                      onNavigate('knowledge');
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${card.btnBg}`}
                  >
                    <span>Vào học Lớp {card.grade}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Khu vực các môn học (Section 2.5 - Thẻ nhỏ màu sắc & biểu tượng riêng) */}
      <div className="p-6 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[#172B4D] tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>Chương trình các môn học</span>
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Các môn học theo chương trình GDPT 2018 tại trường THCS Mỹ Hòa.
            </p>
          </div>
          <button
            onClick={onOpenDrawer}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            Mở bộ chọn môn & khối <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {extraSubjects.map((sub, idx) => {
            const isCurrent = currentSubject.id === sub.id && sub.id === 'tin-hoc';
            return (
              <button
                key={`${sub.name}-${idx}`}
                onClick={() => {
                  if (onSelectSubject) {
                    onSelectSubject(sub.id);
                  }
                  onNavigate('knowledge');
                }}
                className={`p-3.5 rounded-2xl border transition-all text-left group cursor-pointer flex flex-col justify-between ${sub.color} ${
                  isCurrent ? 'ring-2 ring-blue-500 shadow-xs' : 'hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-white shadow-xs flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                    {sub.icon}
                  </div>
                  <h4 className="text-xs font-extrabold leading-snug">
                    {sub.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                    {sub.desc}
                  </p>
                </div>
                <div className="mt-2 text-[10px] font-bold text-blue-600 flex items-center gap-0.5 opacity-90 group-hover:opacity-100">
                  <span>Học môn</span> →
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Khu vực chức năng học tập lớn (Section 2.6) */}
      <div className="space-y-3">
        <h2 className="text-lg sm:text-xl font-black text-[#172B4D] tracking-tight">
          Chức năng học tập trực tuyến
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Sách giáo khoa điện tử */}
          <div
            onClick={() => onNavigate('textbooks')}
            className="group p-5 rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-blue-50 border-2 border-indigo-200 hover:border-indigo-400 transition-all cursor-pointer shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 mb-3 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-black text-[#172B4D]">
                Sách giáo khoa (SGK)
              </h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Đọc sách giáo khoa điện tử lớp 6–9 chuẩn GDPT 2018 theo khối lớp và môn học.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-indigo-100 inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-700 group-hover:translate-x-1 transition-transform">
              <span>Đọc sách ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Luyện tập và kiểm tra */}
          <div
            onClick={() => onNavigate('practice')}
            className="group p-5 rounded-3xl bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-2 border-blue-200 hover:border-blue-400 transition-all cursor-pointer shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#2684FF] text-white flex items-center justify-center shadow-md shadow-blue-500/20 mb-3 group-hover:scale-105 transition-transform">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-black text-[#172B4D]">
                Luyện tập & kiểm tra
              </h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Ngân hàng đề trắc nghiệm 4 mức độ nhận thức, chấm điểm tự động và lưu kết quả.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between gap-2 text-xs font-extrabold text-blue-700">
              <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Làm đề <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('assignments');
                }}
                className="px-2 py-0.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold shadow-2xs cursor-pointer transition-colors"
              >
                Bài tập →
              </button>
            </div>
          </div>

          {/* Card 3: Trò chơi học tập */}
          <div
            onClick={() => onNavigate('games')}
            className="group p-5 rounded-3xl bg-gradient-to-br from-purple-50 via-white to-pink-50 border-2 border-purple-200 hover:border-purple-400 transition-all cursor-pointer shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#8B5CF6] text-white flex items-center justify-center shadow-md shadow-purple-500/20 mb-3 group-hover:scale-105 transition-transform">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-black text-[#172B4D]">
                Trò chơi học tập
              </h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Vòng quay may mắn, ghép cặp thuật ngữ và thử thách 60 giây rèn tư duy nhạy bén.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-purple-100 inline-flex items-center gap-1.5 text-xs font-extrabold text-purple-700 group-hover:translate-x-1 transition-transform">
              <span>Chơi trò chơi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Thư viện tài liệu */}
          <div
            onClick={() => onNavigate('knowledge')}
            className="group p-5 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-2 border-emerald-200 hover:border-emerald-400 transition-all cursor-pointer shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 mb-3 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-sm sm:text-base font-black text-[#172B4D]">
                Kho bài học & Tài liệu
              </h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Hệ thống bài học chuẩn theo chủ đề, kèm video minh họa, sơ đồ và tệp đính kèm.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-100 inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>Xem bài học</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. 4 Thẻ Thống kê Học tập */}
      <StatsCards
        totalQuestions={totalQuestions}
        completedTests={completedTests}
        averageScore={averageScore}
        totalLessons={totalLessons}
        accuracyRate={accuracyRate}
      />

      {/* 6. Lộ trình học tập & Bảng tin THCS Mỹ Hòa */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Cột trái: Bài học trọng tâm môn hiện tại */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Lộ trình học tập trực tiếp
                </span>
                <h3 className="text-lg font-extrabold text-[#172B4D] mt-0.5">
                  Bài học trọng tâm: {currentSubject.name} — Khối {currentGrade}
                </h3>
              </div>
              <button
                onClick={() => onNavigate('knowledge')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                Mở Kho kiến thức <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {currentLessons.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentLessons.slice(0, 4).map((lesson) => (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      onSelectLesson(lesson);
                      onNavigate('knowledge');
                    }}
                    className="group p-4 rounded-2xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/40 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[11px] font-semibold text-blue-600 mb-1">
                        {lesson.chapter}
                      </div>
                      <h4 className="text-sm font-bold text-[#172B4D] group-hover:text-blue-600 transition-colors line-clamp-2">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-[#64748B] line-clamp-2 mt-1">
                        {lesson.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-3 mt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1 font-medium">
                        <FileText className="w-3.5 h-3.5 text-blue-500" />
                        {lesson.keyPoints.length} ý trọng tâm
                      </span>
                      <span className="text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform">
                        Khám phá →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-slate-500">
                <BookOpen className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                <p className="text-sm font-medium">
                  Môn {currentSubject.name} lớp {currentGrade} đang được cập nhật thêm bài giảng mới.
                </p>
                <button
                  onClick={() => {
                    if (onSelectSubject) onSelectSubject('tin-hoc');
                  }}
                  className="mt-3 px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer"
                >
                  Chọn môn Tin học để trải nghiệm trọn vẹn 17 bài
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Cột phải: Bảng tin nhà trường & Lối vào giáo viên */}
        <div className="lg:col-span-4 space-y-6">
          {/* Bảng tin trường */}
          <div className="p-6 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#2684FF] flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#172B4D]">Bảng tin THCS Mỹ Hòa</h3>
                <span className="text-[11px] text-[#64748B]">Năm học 2026–2027</span>
              </div>
            </div>

            <div className="space-y-3">
              {announcements.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-slate-100/70 transition-colors"
                >
                  <div className="flex items-center justify-between text-[10px] text-[#64748B] mb-1 font-semibold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                    {item.priority && (
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">
                        Quan trọng
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-[#172B4D] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#64748B] mt-1 line-clamp-3">
                    {item.content}
                  </p>
                  <div className="text-[10px] text-blue-600 font-medium mt-1.5">
                    Nguồn: {item.author}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dành cho Cán bộ & Giáo viên */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-200 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Dành cho Cán bộ & Giáo viên</span>
            </div>
            <h4 className="text-sm font-extrabold text-[#172B4D]">
              Quản trị bài học, video và ngân hàng đề
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Khu vực bảo mật dành cho giáo viên THCS Mỹ Hòa biên soạn câu hỏi, gắn video/hình ảnh minh họa vào bài học.
            </p>
            {isTeacher ? (
              <button
                onClick={() => onNavigate('teacher')}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
              >
                Mở Trang Quản Trị Giáo Viên
              </button>
            ) : (
              <button
                onClick={onOpenTeacherAuth}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-amber-50 border border-amber-300 text-amber-900 font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Xác thực chuyển sang chế độ Giáo viên
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
