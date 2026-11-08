import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  GraduationCap,
  Layers,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ExternalLink,
  BookMarked,
  CheckCircle2,
  ChevronRight,
  Search,
  Filter,
  Bookmark,
  Library,
  ShieldCheck,
  Compass,
  Laptop,
  Calculator,
  Languages,
  Atom,
  Wrench,
  HeartHandshake,
  Palette,
  Activity,
  Link2,
  Edit3
} from 'lucide-react';
import { GradeLevel, SubjectId, SubjectMeta, Textbook, UserAccount } from '../../types';
import { SUBJECTS } from '../../data/mockData';
import { TextbookReaderModal } from '../../components/textbooks/TextbookReaderModal';
import { TextbookUrlModal } from '../../components/teacher/TextbookUrlModal';

interface StudentTextbooksPageProps {
  textbooks: Textbook[];
  currentGrade: GradeLevel;
  currentSubjectId: SubjectId;
  onApplySubjectGrade: (grade: GradeLevel, subjectId: SubjectId) => void;
  currentUser: UserAccount | null;
  onAddTextbook: (b: Textbook) => void;
  onUpdateTextbook: (b: Textbook) => void;
  onOpenDrawer?: () => void;
}

export const StudentTextbooksPage: React.FC<StudentTextbooksPageProps> = ({
  textbooks,
  currentGrade,
  currentSubjectId,
  onApplySubjectGrade,
  currentUser,
  onAddTextbook,
  onUpdateTextbook
}) => {
  // Synchronized grade and subject selection with App and TopBar
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(currentGrade);
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId | null>(currentSubjectId);
  
  const [readingBook, setReadingBook] = useState<Textbook | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Teacher URL Manager Modal state
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [editingUrlBook, setEditingUrlBook] = useState<Textbook | null>(null);

  const isTeacher = currentUser?.role === 'teacher';

  // Sync if parent currentGrade / currentSubjectId changes (e.g. from drawer)
  useEffect(() => {
    setSelectedGrade(currentGrade);
    setSelectedSubjectId(currentSubjectId);
  }, [currentGrade, currentSubjectId]);

  // 4 Grades definitions
  const gradeCards = [
    {
      grade: 6 as GradeLevel,
      title: 'Khối Lớp 6',
      badge: 'Chương trình GDPT 2018',
      desc: 'Sách giáo khoa lớp 6 chuẩn Bộ GD&ĐT: Toán, Tin học, Ngữ văn, Tiếng Anh...',
      color: 'from-blue-600 to-indigo-700',
      lightBg: 'bg-blue-50/70 border-blue-200 hover:border-blue-500 hover:bg-blue-50',
      activeRing: 'ring-4 ring-blue-500/30 border-blue-600 bg-blue-50',
      iconBg: 'bg-blue-600 text-white'
    },
    {
      grade: 7 as GradeLevel,
      title: 'Khối Lớp 7',
      badge: 'Chương trình GDPT 2018',
      desc: 'Sách giáo khoa lớp 7 chuẩn Bộ GD&ĐT: Khoa học tự nhiên, Sử - Địa, GDCD...',
      color: 'from-emerald-600 to-teal-700',
      lightBg: 'bg-emerald-50/70 border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50',
      activeRing: 'ring-4 ring-emerald-500/30 border-emerald-600 bg-emerald-50',
      iconBg: 'bg-emerald-600 text-white'
    },
    {
      grade: 8 as GradeLevel,
      title: 'Khối Lớp 8',
      badge: 'Chương trình GDPT 2018',
      desc: 'Sách giáo khoa lớp 8 chuẩn Bộ GD&ĐT: Đại số, Hình học, Công nghệ, KHTN...',
      color: 'from-amber-600 to-orange-700',
      lightBg: 'bg-amber-50/70 border-amber-200 hover:border-amber-500 hover:bg-amber-50',
      activeRing: 'ring-4 ring-amber-500/30 border-amber-600 bg-amber-50',
      iconBg: 'bg-amber-600 text-white'
    },
    {
      grade: 9 as GradeLevel,
      title: 'Khối Lớp 9',
      badge: 'Chương trình GDPT 2018',
      desc: 'Sách giáo khoa lớp 9 chuẩn Bộ GD&ĐT & Định hướng ôn thi tuyển sinh vào lớp 10.',
      color: 'from-purple-600 to-pink-700',
      lightBg: 'bg-purple-50/70 border-purple-200 hover:border-purple-500 hover:bg-purple-50',
      activeRing: 'ring-4 ring-purple-500/30 border-purple-600 bg-purple-50',
      iconBg: 'bg-purple-600 text-white'
    }
  ];

  // Selected subject metadata object
  const selectedSubjectObj = SUBJECTS.find((s) => s.id === selectedSubjectId);

  // Available subjects for the chosen grade (excluding Cánh Diều records)
  const availableSubjects = SUBJECTS.map((sub) => {
    const count = textbooks.filter(
      (t) =>
        t.status === 'published' &&
        t.grade === selectedGrade &&
        t.subjectId === sub.id &&
        t.bookSet !== 'Cánh Diều' &&
        !t.id.includes('canhdieu')
    ).length;
    return {
      ...sub,
      booksCount: count
    };
  });

  // Filtered published books:
  // 1. Unified series only: purge Cánh Diều or non-official old records
  // 2. Filter strictly by selected grade and subject
  // 3. Search strictly by book title (Tên sách)
  const matchingBooks = textbooks.filter((book) => {
    if (book.status !== 'published') return false;
    // Thống nhất bộ sách: loại bỏ hoàn toàn Cánh Diều khỏi danh mục chính thức
    if (book.bookSet === 'Cánh Diều' || book.id.includes('canhdieu')) return false;

    if (book.grade !== selectedGrade) return false;
    if (selectedSubjectId !== null && book.subjectId !== selectedSubjectId) return false;

    // Yêu cầu phần V: Chỉ tìm kiếm theo tên sách
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      const matchTitle = book.title.toLowerCase().includes(q);
      return matchTitle;
    }
    return true;
  });

  // Action handlers synchronizing state with App and TopBar:
  const handleChangeGrade = () => {
    setSelectedSubjectId(null);
    setSearchTerm('');
  };

  const handleChangeSubject = () => {
    setSelectedSubjectId(null);
    setSearchTerm('');
  };

  const handleSelectGrade = (g: GradeLevel) => {
    setSelectedGrade(g);
    setSelectedSubjectId(null);
    setSearchTerm('');
    // If a default subject is available, sync with parent
    onApplySubjectGrade(g, currentSubjectId);
  };

  const handleSelectSubject = (sId: SubjectId) => {
    setSelectedSubjectId(sId);
    setSearchTerm('');
    // BẮT BUỘC ĐỒNG BỘ: Cập nhật ngay Khối lớp & Môn học lên App và TopBar
    onApplySubjectGrade(selectedGrade, sId);
  };

  // Open URL Modal for quick update
  const handleOpenUrlManager = (book?: Textbook) => {
    setEditingUrlBook(book || null);
    setIsUrlModalOpen(true);
  };

  const handleSaveBookUrl = (book: Textbook, isUpdate: boolean) => {
    if (isUpdate) {
      onUpdateTextbook(book);
    } else {
      onAddTextbook(book);
    }
    setIsUrlModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 p-6 sm:p-8 text-white shadow-xl shadow-blue-900/10">
        <div className="relative z-10 max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-white border border-white/20">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>Thư viện Sách giáo khoa Điện tử THCS Mỹ Hòa</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            Sách Giáo Khoa Cấp THCS
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 font-normal leading-relaxed">
            Tra cứu và đọc sách giáo khoa điện tử chính thức các khối 6, 7, 8, 9 theo Chương trình GDPT 2018 (Bộ sách Kết nối tri thức với cuộc sống).
          </p>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <BookOpen className="w-80 h-80 text-white" />
        </div>
      </div>

      {/* TEACHER TOOLBAR: Section II.1 & II.3 - HIỂN THỊ KHI ĐĂNG NHẬP VỚI VAI TRÒ GIÁO VIÊN */}
      {isTeacher && (
        <div className="bg-gradient-to-r from-amber-500/15 via-blue-500/10 to-indigo-500/15 border-2 border-amber-400/40 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500 text-white shadow-2xs">
                  Chức năng Giáo viên
                </span>
                <span className="text-xs font-extrabold text-slate-800">
                  {currentUser?.displayName || 'Giáo viên THCS Mỹ Hòa'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Cập nhật nhanh đường link SGK cho Khối {selectedGrade}{' '}
                {selectedSubjectObj ? `• Môn ${selectedSubjectObj.name}` : ''}.
              </p>
            </div>
          </div>

          {/* Nút QUẢN LÝ LINK SÁCH GIÁO KHOA */}
          <button
            onClick={() => handleOpenUrlManager()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-black text-xs shadow-md shadow-amber-600/20 transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto hover:scale-[1.02]"
            title="Mở giao diện nhập và cập nhật đường link SGK"
          >
            <Link2 className="w-4 h-4" />
            <span>QUẢN LÝ LINK SÁCH GIÁO KHOA</span>
          </button>
        </div>
      )}

      {/* Control breadcrumb / Active filter status & reset buttons */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm">
          <span className="font-bold text-slate-500">Đang chọn:</span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-100 text-blue-800 font-extrabold border border-blue-200">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            Khối {selectedGrade}
          </span>

          <ChevronRight className="w-4 h-4 text-slate-400" />

          {selectedSubjectObj ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-100 text-indigo-900 font-extrabold border border-indigo-200">
              <Layers className="w-4 h-4 text-indigo-600" />
              {selectedSubjectObj.name}
            </span>
          ) : (
            <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-500 font-semibold text-xs">
              Chưa chọn môn
            </span>
          )}
        </div>

        {/* Change buttons */}
        <div className="flex items-center gap-2">
          {selectedSubjectId !== null && (
            <button
              onClick={handleChangeSubject}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đổi môn học</span>
            </button>
          )}

          <button
            onClick={handleChangeGrade}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Đổi khối lớp</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          BƯỚC 1: HỘP CHỌN KHỐI LỚP (HIỂN THỊ KHI CHƯA CHỌN KHỐI HOẶC BẤM ĐỔI KHỐI)
          ===================================================================== */}
      {selectedSubjectId === null && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6 animate-fadeIn">
          
          {/* Chọn Khối lớp */}
          <div className="space-y-4">
            <div className="text-center max-w-2xl mx-auto space-y-1.5">
              <span className="text-[11px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Lựa chọn Khối Lớp
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#172B4D] tracking-tight uppercase">
                CHỌN KHỐI LỚP CỦA BẠN
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Nhấn vào khối lớp để xem danh mục các môn học tương ứng.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
              {gradeCards.map((gCard) => {
                const isSelected = selectedGrade === gCard.grade;
                const bookCountForGrade = textbooks.filter(
                  (t) =>
                    t.status === 'published' &&
                    t.grade === gCard.grade &&
                    t.bookSet !== 'Cánh Diều' &&
                    !t.id.includes('canhdieu')
                ).length;

                return (
                  <div
                    key={gCard.grade}
                    onClick={() => handleSelectGrade(gCard.grade)}
                    className={`p-5 rounded-3xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-lg hover:-translate-y-0.5 ${
                      isSelected ? gCard.activeRing : gCard.lightBg
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-lg shadow-md ${gCard.iconBg}`}
                        >
                          {gCard.grade}
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white text-slate-700 shadow-xs border border-slate-200">
                          {bookCountForGrade} đầu sách
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-black text-[#172B4D] group-hover:text-blue-600 transition-colors">
                          {gCard.title}
                        </h3>
                        <p className="text-[10px] font-semibold text-slate-500 mt-0.5">
                          {gCard.badge}
                        </p>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {gCard.desc}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                      <span>{isSelected ? 'Đang chọn' : `Chọn khối ${gCard.grade}`}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BƯỚC 2: CHỌN MÔN HỌC THUỘC KHỐI LỚP ĐANG CHỌN */}
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-black text-[#172B4D] tracking-tight uppercase flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  <span>DANH SÁCH 11 MÔN HỌC – KHỐI {selectedGrade}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Nhấn vào môn học để mở ngay sách giáo khoa tương ứng.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
              {availableSubjects.map((sub) => {
                const hasBooks = sub.booksCount > 0;
                return (
                  <div
                    key={sub.id}
                    onClick={() => handleSelectSubject(sub.id)}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-md hover:-translate-y-0.5 bg-slate-50/50 hover:bg-white ${
                      hasBooks
                        ? 'border-slate-200 hover:border-blue-400'
                        : 'border-slate-200/60 opacity-80'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xs bg-gradient-to-tr ${sub.bgGradient}`}
                        >
                          <BookMarked className="w-5 h-5" />
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            hasBooks
                              ? 'bg-blue-100 text-blue-700 font-extrabold'
                              : 'bg-slate-200 text-slate-600 font-medium'
                          }`}
                        >
                          {sub.booksCount} sách
                        </span>
                      </div>

                      <div>
                        <h4 className="font-extrabold text-sm sm:text-base text-[#172B4D] group-hover:text-blue-600 transition-colors leading-snug">
                          {sub.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {sub.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                      <span>Xem sách</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          BƯỚC 3: HIỂN THỊ SÁCH GIÁO KHOA CỦA MÔN HỌC ĐÃ CHỌN
          (ĐÃ ĐỒNG BỘ 100% VỚI TOPBAR: Lớp X • Môn Y)
          ===================================================================== */}
      {selectedSubjectId !== null && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Top subject summary & search bar */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md bg-gradient-to-tr ${
                  selectedSubjectObj?.bgGradient || 'from-blue-600 to-indigo-600'
                }`}
              >
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-800 border border-blue-200">
                    Khối {selectedGrade}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Môn học: <strong className="text-slate-800">{selectedSubjectObj?.name}</strong>
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-[#172B4D] mt-0.5">
                  Danh Mục Sách Giáo Khoa
                </h2>
              </div>
            </div>

            {/* YÊU CẦU PHẦN V: Ô TÌM KIẾM ĐỔI NỘI DUNG THÀNH "Tìm tên sách" */}
            <div className="flex items-center gap-2 max-w-md w-full md:w-auto">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm tên sách"
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Nút Giáo viên Cập nhật link SGK */}
              {isTeacher && (
                <button
                  onClick={() => handleOpenUrlManager()}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition-colors shrink-0 cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  title="Cập nhật link sách cho môn này"
                >
                  <Link2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cập nhật link</span>
                </button>
              )}

              <button
                onClick={handleChangeSubject}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0 cursor-pointer"
              >
                Đổi môn
              </button>
            </div>
          </div>

          {/* Book Cards Grid - TUÂN THỦ NGHIÊM NGẶT PHẦN III.3 */}
          {matchingBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* 1. Ảnh bìa sách (nếu có) */}
                    <div className="relative h-48 bg-gradient-to-tr from-slate-800 via-blue-900 to-indigo-900 p-4 flex flex-col justify-between overflow-hidden">
                      {book.coverUrl ? (
                        <>
                          <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-75"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
                        </>
                      ) : null}

                      {/* Cover Badges: CHỈ HIỂN THỊ KHỐI LỚP (KHÔNG HIỂN THỊ TÊN BỘ SÁCH) */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-blue-600 text-white shadow-sm">
                          Khối {book.grade}
                        </span>
                        
                        {/* Biểu tượng xác thực SGK chính thức */}
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-emerald-600/90 text-white shadow-sm backdrop-blur-xs flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Chính thức</span>
                        </span>
                      </div>

                      {/* Tên môn học & Tên sách trên bìa */}
                      <div className="relative z-10 text-white space-y-1">
                        <span className="text-[11px] text-blue-200 font-bold flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          {book.subjectName || selectedSubjectObj?.name}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-white leading-tight line-clamp-2">
                          {book.title}
                        </h3>
                      </div>
                    </div>

                    {/* Book Metadata & Description (KHÔNG HIỂN THỊ DÒNG BỘ SÁCH) */}
                    <div className="p-5 space-y-3">
                      {/* Mô tả sách */}
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {book.description ||
                          `Sách giáo khoa điện tử ${book.title} chuẩn chương trình Giáo dục phổ thông 2018 dành cho học sinh khối ${book.grade}.`}
                      </p>

                      {/* Ngày cập nhật */}
                      <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-100 flex items-center justify-between">
                        <span>Ngày cập nhật:</span>
                        <span className="text-slate-600 font-semibold">
                          {new Date(book.updatedAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Nút Thao Tác: MỞ SÁCH + Nút sửa link dành riêng cho giáo viên */}
                  <div className="p-5 pt-0 space-y-2">
                    {/* Nút MỞ SÁCH (Sử dụng 100% URL gốc) */}
                    <button
                      onClick={() => setReadingBook(book)}
                      className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>MỞ SÁCH</span>
                    </button>

                    {/* Nút Sửa đường link URL (Chỉ hiển thị với giáo viên) */}
                    {isTeacher && (
                      <button
                        onClick={() => handleOpenUrlManager(book)}
                        className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        title="Chỉnh sửa đường link URL cho sách này"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                        <span>Sửa đường link URL</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Friendly Empty State */
            <div className="bg-white rounded-3xl p-10 sm:p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto space-y-4 animate-fadeIn my-6">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-black text-[#172B4D]">
                  Chưa có sách giáo khoa
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Hiện chưa có sách giáo khoa cho khối lớp và môn học này. Vui lòng quay lại sau hoặc liên hệ Thầy/Cô bộ môn.
                </p>
              </div>

              {isTeacher && (
                <div className="pt-2">
                  <button
                    onClick={() => handleOpenUrlManager()}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <Link2 className="w-4 h-4" />
                    <span>Cập nhật đường link cho môn này ngay</span>
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleChangeSubject}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Chọn môn học khác
                </button>
                <button
                  onClick={handleChangeGrade}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Đổi khối lớp
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Reader Modal */}
      <TextbookReaderModal
        book={readingBook}
        isOpen={readingBook !== null}
        onClose={() => setReadingBook(null)}
      />

      {/* Teacher URL Management Modal */}
      {isTeacher && (
        <TextbookUrlModal
          isOpen={isUrlModalOpen}
          onClose={() => setIsUrlModalOpen(false)}
          textbooks={textbooks}
          onSaveBook={handleSaveBookUrl}
          currentUser={currentUser}
          initialGrade={selectedGrade}
          initialSubjectId={selectedSubjectId || 'tin-hoc'}
          initialBook={editingUrlBook}
          onPreviewBook={(book) => {
            setIsUrlModalOpen(false);
            setReadingBook(book);
          }}
        />
      )}
    </div>
  );
};
