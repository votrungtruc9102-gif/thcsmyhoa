import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  BookOpen,
  CheckSquare,
  Gamepad2,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Quote,
  Flame,
  Award
} from 'lucide-react';
import { NavTab } from '../navigation/Navbar';
import { GradeLevel, SubjectMeta } from '../../types';

interface HeroSectionProps {
  onNavigate: (tab: NavTab) => void;
  currentGrade: GradeLevel;
  currentSubject: SubjectMeta;
  onOpenDrawer: () => void;
}

interface CarouselSlide {
  id: number;
  image: string;
  quote: string;
  subQuote: string;
  badge: string;
  theme: string;
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 1,
    image: '/assets/carousel/slide1.jpg',
    quote: '“Không có con đường nào trải đầy hoa hồng...”',
    subQuote: 'Muốn nhìn thấy cầu vồng rực rỡ, phải biết kiên trì vượt qua những cơn mưa.',
    badge: 'Bàn học bên cửa sổ • Ban đêm',
    theme: 'Nghị lực học tập'
  },
  {
    id: 2,
    image: '/assets/carousel/slide2.jpg',
    quote: '“Học không chỉ để có điểm số cao...”',
    subQuote: 'Học là để tự tin bước ra thế giới, khám phá tri thức và làm chủ tương lai rộng lớn.',
    badge: 'Đỉnh núi lúc bình minh • Khát vọng',
    theme: 'Vươn xa tầm nhìn'
  },
  {
    id: 3,
    image: '/assets/carousel/slide3.jpg',
    quote: '“Mỗi ngày đi học là một bước gần hơn đến ước mơ”',
    subQuote: 'Trường THCS Mỹ Hòa — Mái trường thân yêu ươm mầm tài năng và nhân cách.',
    badge: 'Sân trường rợp bóng cây xanh',
    theme: 'Mái trường Mỹ Hòa'
  },
  {
    id: 4,
    image: '/assets/carousel/slide4.jpg',
    quote: '“Học hôm nay để xây dựng tương lai ngày mai”',
    subQuote: 'Hành trang tri thức số vững chắc giúp thế hệ học sinh sẵn sàng hội nhập.',
    badge: 'Ba lô và sách trên núi bình minh',
    theme: 'Kiến tạo tương lai'
  },
  {
    id: 5,
    image: '/assets/carousel/slide5.jpg',
    quote: '“Cố gắng hôm nay là thành công ngày mai”',
    subQuote: 'Từng trang vở nắn nót, từng bài tập chăm chỉ gom góp thành thành công bền vững.',
    badge: 'Quyển vở, cây bút và hoa trắng',
    theme: 'Kiên trì mỗi ngày'
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  currentGrade,
  currentSubject,
  onOpenDrawer
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = CAROUSEL_SLIDES.length;

  // Safe navigation function with wrap-around
  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
    restartTimer();
  };

  // Timer management - restarts 5000ms timer
  const restartTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      goToNextSlide();
    }, 5000);
  }, [goToNextSlide]);

  // Set up 5s auto-scroll on mount and handle cleanup
  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [restartTimer]);

  // Handle manual next/prev clicks
  const handlePrevClick = () => {
    goToPrevSlide();
    restartTimer();
  };

  const handleNextClick = () => {
    goToNextSlide();
    restartTimer();
  };

  const currentSlide = CAROUSEL_SLIDES[currentSlideIndex];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#F8FBFF] to-[#EFF6FF] border border-[#E2EAF5] shadow-xs p-5 sm:p-7 lg:p-9">
      {/* Subtle decorative background glows */}
      <div className="absolute top-0 right-1/4 -mt-16 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-16 w-72 h-72 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Educational Branding & Call-to-Actions      */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-5">
          {/* School Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 border border-blue-200 text-blue-800 text-xs font-bold tracking-wide shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#2684FF] animate-pulse" />
            <span>TRƯỜNG THCS MỸ HÒA · NĂM HỌC 2026–2027</span>
          </div>

          {/* Main Title: Chinh phục tri thức số (Correct Vietnamese spelling) */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#172B4D] tracking-tight leading-tight">
              Chinh phục <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2684FF] via-[#0284C7] to-[#8B5CF6]">
                tri thức số
              </span>
            </h1>

            {/* Slogan */}
            <p className="text-base sm:text-lg font-bold text-blue-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
              <span>Kiến thức hôm nay, tương lai ngày mai.</span>
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-xl">
              Nền tảng học tập trực tuyến dành cho học sinh THCS Mỹ Hòa. Tự học chủ động, khám phá bài giảng số, luyện thi trắc nghiệm và thử thách qua các trò chơi giáo dục.
            </p>
          </div>

          {/* Current Selection Pill */}
          <div className="flex items-center gap-2.5 flex-wrap pt-1">
            <span className="text-xs text-[#64748B] font-semibold">Đang học:</span>
            <button
              onClick={onOpenDrawer}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-blue-200 text-xs font-bold text-blue-700 shadow-xs hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group"
              title="Bấm để đổi môn học hoặc khối lớp khác"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{currentSubject.name}</span>
              <span className="text-slate-300">•</span>
              <span>Lớp {currentGrade}</span>
              <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-bold group-hover:bg-blue-100 transition-colors ml-1">
                Đổi môn / lớp
              </span>
            </button>
          </div>

          {/* Action Buttons: "Bắt đầu học ngay" & "Khám phá kiến thức" & "Trò chơi học tập" */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('practice')}
              className="px-5 py-3 rounded-2xl bg-[#2684FF] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-blue-500/25 active:scale-[0.98] transition-all cursor-pointer group"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Bắt đầu học ngay</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('knowledge')}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-[#172B4D] border-2 border-[#E2EAF5] hover:border-blue-400 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Khám phá kiến thức</span>
            </button>

            <button
              onClick={() => onNavigate('games')}
              className="px-4 py-3 rounded-2xl bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
              title="Đấu trường mini-game giáo dục"
            >
              <Gamepad2 className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">Trò chơi học tập</span>
            </button>
          </div>

          {/* Fast Features highlight */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200/80">
            <div className="flex items-center gap-2 text-xs font-bold text-[#172B4D]">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 text-xs">
                ✓
              </div>
              <span>Chuẩn GDPT 2018</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#172B4D]">
              <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 text-xs">
                ⚡
              </div>
              <span>Chấm điểm tức thì</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#172B4D]">
              <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 text-xs">
                🎁
              </div>
              <span>Huy hiệu học tập</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: 5-IMAGE INSPIRATIONAL CAROUSEL (5 SECONDS)  */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 xl:col-span-6 relative">
          <div
            className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-2 border-white/80 bg-slate-900 group select-none"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* The 5 Carousel Slides with Smooth Fade Effect */}
            {CAROUSEL_SLIDES.map((slide, index) => {
              const isActive = index === currentSlideIndex;
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
                  }`}
                  style={{ transitionProperty: 'opacity, transform' }}
                >
                  {/* Photo */}
                  <img
                    src={slide.image}
                    alt={slide.badge}
                    className="w-full h-full object-cover object-center transform transition-transform duration-7000 ease-linear scale-100"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />

                  {/* Gradient Overlay for Crisp Typography Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-transparent" />

                  {/* Top Badge & Counter */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-md">
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      <span>{slide.badge}</span>
                    </div>

                    {/* Required exact slide index display: "1/5", "2/5", etc. */}
                    <div className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-xs font-black tracking-wider shadow-md">
                      {slide.id}/5
                    </div>
                  </div>

                  {/* Bottom Text Content & Inspirational Quote */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 space-y-1.5 text-white">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-600/90 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-xs">
                      {slide.theme}
                    </div>

                    <h3 className="text-base sm:text-lg lg:text-xl font-black text-white leading-snug drop-shadow-md">
                      {slide.quote}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed drop-shadow-sm font-medium">
                      {slide.subQuote}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Left & Right Manual Navigation Arrows */}
            <button
              onClick={handlePrevClick}
              aria-label="Ảnh trước"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all active:scale-90 cursor-pointer backdrop-blur-xs opacity-90 hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5 text-slate-800" />
            </button>

            <button
              onClick={handleNextClick}
              aria-label="Ảnh kế tiếp"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all active:scale-90 cursor-pointer backdrop-blur-xs opacity-90 hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5 text-slate-800" />
            </button>

            {/* 5 Position Indicator Dots (Active Dot Highlighted) */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              {CAROUSEL_SLIDES.map((slide, index) => {
                const isActive = index === currentSlideIndex;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(index)}
                    aria-label={`Chuyển đến ảnh ${slide.id}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      isActive
                        ? 'w-6 h-2 bg-[#2684FF] shadow-xs'
                        : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                    }`}
                  />
                );
              })}
            </div>

            {/* Hover Indicator / Auto-play indicator */}
            <div className="absolute top-4 right-16 z-20 hidden group-hover:block transition-all">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/80 text-slate-300 border border-white/10">
                {isHovering ? 'Tạm dừng khi di chuột' : 'Tự đổi mỗi 5s'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
