import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Layers,
  Sparkles,
  FileText,
  ArrowRight,
  ArrowLeft,
  Filter,
  CheckCircle2,
  FolderOpen,
  Film,
  Image as ImageIcon,
  ChevronDown,
  Clock,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { GradeLevel, SubjectMeta, Lesson, LessonMedia } from '../../types';
import { LessonDetailModal } from '../../components/knowledge/LessonDetailModal';
import { OFFICIAL_TOPICS } from '../../data/mockData';

interface KnowledgePageProps {
  grade: GradeLevel;
  subject: SubjectMeta;
  lessons: Lesson[];
  mediaList: LessonMedia[];
  onOpenDrawer: () => void;
  selectedLesson: Lesson | null;
  onSelectLesson: (lesson: Lesson | null) => void;
}

export const KnowledgePage: React.FC<KnowledgePageProps> = ({
  grade,
  subject,
  lessons,
  mediaList,
  onOpenDrawer,
  selectedLesson,
  onSelectLesson
}) => {
  // All published lessons for current grade and subject
  const currentSubjectLessons = useMemo(() => {
    return lessons.filter(l => l.grade === grade && l.subjectId === subject.id && (l.isPublished !== false));
  }, [lessons, grade, subject.id]);

  // Available topics for this subject
  const availableTopics = useMemo(() => {
    if (subject.id === 'tin-hoc' && grade === 6) {
      // Strictly use the 5 official themes in correct order for Tin học 6
      return [...OFFICIAL_TOPICS];
    }
    // For other subjects and grades, dynamically get unique chapters in appearance order
    const chapters: string[] = [];
    currentSubjectLessons.forEach(l => {
      if (l.chapter && !chapters.includes(l.chapter)) {
        chapters.push(l.chapter);
      }
    });
    return chapters.length > 0 ? chapters : ['Chủ đề chung'];
  }, [subject.id, grade, currentSubjectLessons]);

  // Selected topic - default to first available topic
  const [selectedTopic, setSelectedTopic] = useState<string>(() => {
    return availableTopics[0] || (subject.id === 'tin-hoc' ? 'Chủ đề 1: Máy tính và cộng đồng' : 'Chương 1');
  });

  // Selected specific lesson filter (optional dropdown: 'all' or lesson.id)
  const [selectedLessonFilter, setSelectedLessonFilter] = useState<string>('all');

  // Search term
  const [searchTerm, setSearchTerm] = useState('');

  // Update selected topic if available topics change
  React.useEffect(() => {
    if (!availableTopics.includes(selectedTopic) && availableTopics.length > 0) {
      setSelectedTopic(availableTopics[0]);
      setSelectedLessonFilter('all');
    }
  }, [availableTopics, selectedTopic]);

  // Reset lesson filter when topic changes
  const handleTopicChange = (topic: string) => {
    setSelectedTopic(topic);
    setSelectedLessonFilter('all');
  };

  // Lessons strictly belonging to current topic
  const topicLessons = useMemo(() => {
    return currentSubjectLessons.filter(l => l.chapter === selectedTopic);
  }, [currentSubjectLessons, selectedTopic]);

  // Lessons filtered by search or specific lesson filter
  const displayedLessons = useMemo(() => {
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      // When searching, search across all lessons of the subject to help student find the topic
      return currentSubjectLessons.filter(l => {
        const matchTitle = l.title.toLowerCase().includes(term);
        const matchChapter = l.chapter.toLowerCase().includes(term);
        const matchSummary = l.summary.toLowerCase().includes(term);
        const matchKeyPoints = l.keyPoints?.some(kp => kp.toLowerCase().includes(term));
        return matchTitle || matchChapter || matchSummary || matchKeyPoints;
      });
    }

    if (selectedLessonFilter !== 'all') {
      return topicLessons.filter(l => l.id === selectedLessonFilter);
    }

    return topicLessons;
  }, [searchTerm, currentSubjectLessons, topicLessons, selectedLessonFilter]);

  // Navigation between topics
  const currentTopicIndex = availableTopics.indexOf(selectedTopic);
  const prevTopic = currentTopicIndex > 0 ? availableTopics[currentTopicIndex - 1] : null;
  const nextTopic = currentTopicIndex < availableTopics.length - 1 ? availableTopics[currentTopicIndex + 1] : null;

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
              Kho kiến thức THCS Mỹ Hòa
            </span>
            <span className="text-xs text-slate-400 font-medium">• Chuẩn GDPT 2018</span>
            {grade === 6 && subject.id === 'tin-hoc' ? (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                Đầy đủ 17 bài học Tin học 6
              </span>
            ) : (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                {currentSubjectLessons.length} bài học đã xuất bản
              </span>
            )}
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
              {currentSubjectLessons[0]?.bookSeries || 'Bộ sách: Kết nối tri thức'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#172B4D] tracking-tight">
            Kiến thức trọng tâm: {subject.name} — Khối {grade}
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
            Học tập theo từng chủ đề chuẩn SGK. Chọn chủ đề bên dưới để xem danh sách bài học, tóm tắt lý thuyết, ví dụ mẫu và mở bài học chi tiết.
          </p>
        </div>

        <button
          onClick={onOpenDrawer}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 hover:border-blue-400 font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer shrink-0 self-start md:self-auto"
        >
          <Layers className="w-4 h-4 text-[#2684FF]" />
          <span>Đổi môn hoặc khối khác</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Topic & Lesson Selection Controls */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E2EAF5] shadow-xs space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Dropdown 1: CHỌN CHỦ ĐỀ HỌC TẬP (Mục tiêu cốt lõi) */}
          <div className="lg:col-span-5">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <FolderOpen className="w-4 h-4 text-blue-600" />
              <span>Chọn chủ đề học tập:</span>
              <span className="text-xs font-medium text-slate-400">({availableTopics.length} chủ đề)</span>
            </label>
            <div className="relative">
              <select
                value={selectedTopic}
                onChange={e => {
                  setSearchTerm('');
                  handleTopicChange(e.target.value);
                }}
                className="w-full appearance-none bg-blue-50/60 hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 focus:border-blue-600 focus:bg-white text-slate-800 font-bold text-xs sm:text-sm rounded-2xl px-4 py-3 pr-10 cursor-pointer transition-all shadow-xs outline-hidden"
              >
                {availableTopics.map((topic, idx) => {
                  const count = currentSubjectLessons.filter(l => l.chapter === topic).length;
                  return (
                    <option key={topic} value={topic} className="py-2 text-slate-800 font-semibold bg-white">
                      {topic} ({count} bài học)
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-blue-600">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Dropdown 2: CHỌN BÀI HỌC TRONG CHỦ ĐỀ (Tiện ích chuyển nhanh) */}
          <div className="lg:col-span-4">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Chọn bài học trong chủ đề:</span>
            </label>
            <div className="relative">
              <select
                value={selectedLessonFilter}
                onChange={e => {
                  setSelectedLessonFilter(e.target.value);
                  if (e.target.value !== 'all') {
                    const l = topicLessons.find(item => item.id === e.target.value);
                    if (l) onSelectLesson(l);
                  }
                }}
                disabled={topicLessons.length === 0}
                className="w-full appearance-none bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:bg-white text-slate-800 font-medium text-xs sm:text-sm rounded-2xl px-4 py-3 pr-10 cursor-pointer transition-all shadow-xs outline-hidden disabled:opacity-50"
              >
                <option value="all">
                  — Xem tất cả bài học trong chủ đề ({topicLessons.length} bài) —
                </option>
                {topicLessons.map((l, index) => (
                  <option key={l.id} value={l.id}>
                    {l.title}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Ô TÌM KIẾM NHANH */}
          <div className="lg:col-span-3">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-slate-500" />
              <span>Tìm kiếm từ khóa:</span>
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Nhập tên bài, nội dung..."
                className="w-full pl-9 pr-4 py-2.8 text-xs sm:text-sm rounded-2xl border border-slate-200 focus:border-blue-500 focus:bg-white bg-slate-50/50 text-slate-800 transition-all outline-hidden"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer px-1.5 py-0.5 rounded-full bg-slate-200"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Quick Topic Switcher Tabs (Dễ bấm trên cả mobile lẫn máy tính) */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Phím tắt chọn:
          </span>
          {availableTopics.map((top, idx) => {
            const isSelected = selectedTopic === top && !searchTerm;
            const shortLabel = `Chủ đề ${idx + 1}`;
            return (
              <button
                key={top}
                onClick={() => {
                  setSearchTerm('');
                  handleTopicChange(top);
                }}
                title={top}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{shortLabel}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {currentSubjectLessons.filter(l => l.chapter === top).length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Topic Banner & Navigation */}
      {!searchTerm && (
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-0.8 rounded-full bg-white/20 backdrop-blur-xs text-xs font-extrabold uppercase tracking-wide">
                Đang hiển thị
              </span>
              <span className="text-xs text-blue-100 font-medium">
                {topicLessons[0]?.semester ? `Học kỳ ${topicLessons[0].semester}` : 'Học kỳ 1 & 2'}
              </span>
              <span className="text-xs text-blue-200">•</span>
              <span className="text-xs text-blue-100 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                ~{topicLessons.length * 45} phút ({topicLessons.length} tiết)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-yellow-300" />
              <span>{selectedTopic}</span>
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 max-w-xl">
              Chủ đề gồm <strong>{topicLessons.length} bài học</strong> với lý thuyết trọng tâm, bài tập mẫu và phương tiện minh họa trực quan.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
            {prevTopic && (
              <button
                onClick={() => handleTopicChange(prevTopic)}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                title={`Chuyển sang: ${prevTopic}`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Chủ đề trước</span>
              </button>
            )}
            {nextTopic && (
              <button
                onClick={() => handleTopicChange(nextTopic)}
                className="px-3.5 py-2 rounded-xl bg-white text-blue-700 hover:bg-blue-50 text-xs font-extrabold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                title={`Chuyển sang: ${nextTopic}`}
              >
                <span>Chủ đề kế tiếp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Search results banner if searching */}
      {searchTerm && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 text-amber-900">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Search className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Kết quả tìm kiếm cho: <strong>"{searchTerm}"</strong> — Tìm thấy <strong>{displayedLessons.length}</strong> bài học phù hợp
            </span>
          </div>
          <button
            onClick={() => setSearchTerm('')}
            className="text-xs font-bold px-3 py-1 bg-amber-200/80 hover:bg-amber-300 text-amber-900 rounded-lg cursor-pointer shrink-0"
          >
            Xóa tìm kiếm
          </button>
        </div>
      )}

      {/* Lesson List (Clean, Organized, Not an overwhelming wall of cards) */}
      {displayedLessons.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
            <span>
              {searchTerm ? 'Danh sách bài học tìm thấy' : `Các bài học thuộc ${selectedTopic}`}
            </span>
            <span>Hiển thị {displayedLessons.length} bài học</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedLessons.map((lesson, idx) => {
              const videosCount = mediaList.filter(m => m.lessonId === lesson.id && m.status === 'published' && m.type === 'video').length;
              const imagesCount = mediaList.filter(m => m.lessonId === lesson.id && m.status === 'published' && m.type === 'image').length;

              return (
                <div
                  key={lesson.id}
                  className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E2EAF5] hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Top lesson info */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-700">
                          {lesson.title.split(':')[0] || `Bài ${idx + 1}`}
                        </span>
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          HK{lesson.semester} • 45 phút
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {lesson.keyPoints.length} ý trọng tâm
                      </span>
                    </div>

                    <h3
                      onClick={() => onSelectLesson(lesson)}
                      className="text-base sm:text-lg font-bold text-[#172B4D] group-hover:text-blue-600 transition-colors leading-snug cursor-pointer"
                    >
                      {lesson.title}
                    </h3>

                    {/* Small topic tag if in search mode */}
                    {searchTerm && (
                      <p className="text-xs font-bold text-blue-600 mt-1">
                        {lesson.chapter}
                      </p>
                    )}

                    <p className="text-xs text-[#64748B] mt-2 line-clamp-2 leading-relaxed">
                      {lesson.summary}
                    </p>

                    {/* Key points preview bullets */}
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                      {lesson.keyPoints.slice(0, 2).map((pt, pIdx) => (
                        <div key={pIdx} className="text-[11px] text-slate-600 flex items-start gap-1.5 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer with "Mở bài học" */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3 text-xs flex-wrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {lesson.sampleExercises && lesson.sampleExercises.length > 0 && (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Bài tập mẫu
                        </span>
                      )}

                      {videosCount > 0 && (
                        <span className="text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-md border border-red-100 flex items-center gap-1">
                          <Film className="w-3 h-3 text-red-600" />
                          {videosCount} Video
                        </span>
                      )}

                      {imagesCount > 0 && (
                        <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100 flex items-center gap-1">
                          <ImageIcon className="w-3 h-3 text-indigo-600" />
                          {imagesCount} Ảnh
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onSelectLesson(lesson)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-xs shadow-xs hover:shadow transition-all inline-flex items-center gap-1.5 cursor-pointer ml-auto"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Mở bài học</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-500 mx-auto flex items-center justify-center">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-bold text-[#172B4D]">
              Không tìm thấy bài học phù hợp
            </h3>
            <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
              {searchTerm
                ? `Không có bài học nào chứa từ khóa "${searchTerm}". Vui lòng thử từ khóa khác.`
                : `Chưa có bài học nào trong chủ đề "${selectedTopic}".`}
            </p>
          </div>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedLessonFilter('all');
              setSelectedTopic(availableTopics[0]);
            }}
            className="px-5 py-2.5 rounded-xl bg-[#2684FF] hover:bg-blue-600 text-white text-xs font-bold cursor-pointer transition-colors"
          >
            Quay lại Chủ đề 1: Máy tính và cộng đồng
          </button>
        </div>
      )}

      {/* Modal Detail for the chosen lesson */}
      <LessonDetailModal
        lesson={selectedLesson}
        subject={subject}
        mediaList={mediaList}
        onClose={() => onSelectLesson(null)}
        onSelectLesson={onSelectLesson}
        allLessons={currentSubjectLessons}
      />
    </div>
  );
};
