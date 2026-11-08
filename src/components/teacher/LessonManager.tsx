import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  Edit3,
  Trash2,
  Plus,
  RefreshCw,
  Sparkles,
  Layers,
  FileText,
  Bookmark,
  Check,
  X,
  ArrowRight,
  Upload,
  AlertTriangle,
  FolderOpen
} from 'lucide-react';
import { Lesson, GradeLevel, SubjectId, SubjectMeta, TeacherDocument } from '../../types';
import { SUBJECTS } from '../../data/mockData';
import { LessonDetailModal } from '../knowledge/LessonDetailModal';

interface LessonManagerProps {
  lessons: Lesson[];
  documents: TeacherDocument[];
  onAddLesson: (lesson: Lesson) => void;
  onUpdateLesson: (lesson: Lesson) => void;
  onDeleteLesson: (id: string) => void;
  currentGrade: GradeLevel;
  currentSubject: SubjectMeta;
}

export const LessonManager: React.FC<LessonManagerProps> = ({
  lessons,
  documents,
  onAddLesson,
  onUpdateLesson,
  onDeleteLesson,
  currentGrade,
  currentSubject
}) => {
  // Filters
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('all');
  const [selectedBookFilter, setSelectedBookFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals & Active state
  const [previewLesson, setPreviewLesson] = useState<Lesson | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncStepText, setSyncStepText] = useState('');
  const [showSyncSuccessModal, setShowSyncSuccessModal] = useState(false);

  // Edit / Create Form state
  const [formTitle, setFormTitle] = useState('');
  const [formSubjectId, setFormSubjectId] = useState<SubjectId>(currentSubject.id);
  const [formGrade, setFormGrade] = useState<GradeLevel>(currentGrade);
  const [formChapter, setFormChapter] = useState('');
  const [formBookSeries, setFormBookSeries] = useState('Kết nối tri thức với cuộc sống');
  const [formSummary, setFormSummary] = useState('');
  const [formPageRef, setFormPageRef] = useState('Trang 10 - 15');
  const [formKeyPoints, setFormKeyPoints] = useState('');
  const [formObjectives, setFormObjectives] = useState('');
  const [formMarkdown, setFormMarkdown] = useState('');
  const [formIsPublished, setFormIsPublished] = useState(true);

  // Filtered lessons
  const filteredLessons = useMemo(() => {
    return lessons.filter(les => {
      if (selectedSubjectFilter !== 'all' && les.subjectId !== selectedSubjectFilter) return false;
      if (selectedGradeFilter !== 'all' && les.grade.toString() !== selectedGradeFilter) return false;
      if (selectedBookFilter !== 'all' && (les.bookSeries || 'Kết nối tri thức với cuộc sống') !== selectedBookFilter) return false;
      if (selectedStatusFilter === 'published' && les.isPublished === false) return false;
      if (selectedStatusFilter === 'draft' && les.isPublished !== false) return false;

      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        return (
          les.title.toLowerCase().includes(term) ||
          les.chapter.toLowerCase().includes(term) ||
          les.summary.toLowerCase().includes(term)
        );
      }
      return true;
    });
  }, [lessons, selectedSubjectFilter, selectedGradeFilter, selectedBookFilter, selectedStatusFilter, searchTerm]);

  // Statistics
  const totalLessons = lessons.length;
  const publishedCount = lessons.filter(l => l.isPublished !== false).length;
  const draftCount = lessons.filter(l => l.isPublished === false).length;
  const coveredSubjectsCount = new Set(lessons.map(l => l.subjectId)).size;

  // Open edit modal
  const handleStartEdit = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setFormTitle(lesson.title);
    setFormSubjectId(lesson.subjectId);
    setFormGrade(lesson.grade);
    setFormChapter(lesson.chapter);
    setFormBookSeries(lesson.bookSeries || 'Kết nối tri thức với cuộc sống');
    setFormSummary(lesson.summary);
    setFormPageRef(lesson.pageReference || 'Trang SGK');
    setFormKeyPoints(lesson.keyPoints.join('\n'));
    setFormObjectives((lesson.learningObjectives || []).join('\n'));
    setFormMarkdown(lesson.contentMarkdown);
    setFormIsPublished(lesson.isPublished !== false);
  };

  // Open create modal
  const handleStartCreate = () => {
    setShowCreateModal(true);
    setFormTitle('');
    setFormSubjectId(currentSubject.id);
    setFormGrade(currentGrade);
    setFormChapter('Chương 1: Khởi động');
    setFormBookSeries('Kết nối tri thức với cuộc sống');
    setFormSummary('');
    setFormPageRef('Trang 5 - 10');
    setFormKeyPoints('');
    setFormObjectives('');
    setFormMarkdown('### 1. Nội dung trọng tâm\n...\n### 2. Ví dụ minh họa\n...');
    setFormIsPublished(true);
  };

  // Save lesson (update or create)
  const handleSaveLessonForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formChapter.trim()) {
      alert('Vui lòng nhập tên bài học và tên chương/chủ đề!');
      return;
    }

    const keyPointsArr = formKeyPoints
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const objectivesArr = formObjectives
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingLesson) {
      const updated: Lesson = {
        ...editingLesson,
        title: formTitle.trim(),
        subjectId: formSubjectId,
        grade: formGrade,
        chapter: formChapter.trim(),
        bookSeries: formBookSeries,
        summary: formSummary.trim() || formTitle.trim(),
        pageReference: formPageRef.trim(),
        keyPoints: keyPointsArr.length > 0 ? keyPointsArr : editingLesson.keyPoints,
        learningObjectives: objectivesArr.length > 0 ? objectivesArr : editingLesson.learningObjectives,
        contentMarkdown: formMarkdown.trim(),
        isPublished: formIsPublished
      };
      onUpdateLesson(updated);
      setEditingLesson(null);
    } else {
      const newLesson: Lesson = {
        id: `les-${Date.now()}`,
        title: formTitle.trim(),
        subjectId: formSubjectId,
        grade: formGrade,
        semester: 1,
        chapter: formChapter.trim(),
        bookSeries: formBookSeries,
        summary: formSummary.trim() || formTitle.trim(),
        pageReference: formPageRef.trim(),
        keyPoints: keyPointsArr.length > 0 ? keyPointsArr : ['Nội dung trọng tâm theo chuẩn SGK.'],
        learningObjectives: objectivesArr,
        contentMarkdown: formMarkdown.trim(),
        isPublished: formIsPublished
      };
      onAddLesson(newLesson);
      setShowCreateModal(false);
    }
  };

  // Toggle publish / unpublish
  const handleTogglePublish = (lesson: Lesson) => {
    const nextStatus = lesson.isPublished === false ? true : false;
    onUpdateLesson({
      ...lesson,
      isPublished: nextStatus
    });
  };

  // Batch sync process simulation
  const handleTriggerSyncAll = () => {
    setIsSyncing(true);
    setSyncProgress(10);
    setSyncStepText('Đang quét và đọc toàn bộ 25+ file SGK các môn học...');

    setTimeout(() => {
      setSyncProgress(35);
      setSyncStepText('Nhận diện cấu trúc mục lục, chương và chủ đề theo chuẩn GDPT 2018...');
    }, 400);

    setTimeout(() => {
      setSyncProgress(70);
      setSyncStepText('Trích xuất nội dung lý thuyết, bài tập mẫu và số trang tham chiếu...');
    }, 800);

    setTimeout(() => {
      setSyncProgress(100);
      setSyncStepText('Đồng bộ hoàn tất! Toàn bộ bài học đã sẵn sàng xuất bản cho học sinh.');
      setIsSyncing(false);
      setShowSyncSuccessModal(true);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header Banner & Global Stats */}
      <div className="bg-gradient-to-r from-[#172B4D] via-[#1E293B] to-[#2684FF] text-white p-6 sm:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kho kiến thức & Quản lý bài học SGK (Khối 6–9)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            TRUNG TÂM QUẢN LÝ VÀ XUẤT BẢN BÀI HỌC
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl leading-relaxed">
            Đồng bộ và quản lý nội dung bài học từ toàn bộ sách giáo khoa 11 môn học chuẩn GDPT 2018. Giáo viên kiểm duyệt, chỉnh sửa và xuất bản trực tiếp lên mục "Khám phá kiến thức" của học sinh.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={handleTriggerSyncAll}
            disabled={isSyncing}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/20 transition-all cursor-pointer shadow-xs disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Đồng bộ & Quét SGK</span>
          </button>

          <button
            onClick={handleStartCreate}
            className="px-5 py-2.5 rounded-2xl bg-[#2684FF] hover:bg-blue-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tạo bài học mới</span>
          </button>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Tổng số bài học
          </span>
          <div className="text-2xl sm:text-3xl font-black text-[#172B4D]">
            {totalLessons}
          </div>
          <p className="text-xs text-blue-600 font-semibold">
            Bao gồm 17 bài Tin học 6
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Đã xuất bản cho học sinh
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 flex items-center gap-2">
            <span>{publishedCount}</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-xs text-slate-500">
            Hiển thị trên mục Khám phá kiến thức
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Bản nháp / Chờ duyệt
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">
            {draftCount}
          </div>
          <p className="text-xs text-slate-500">
            Đang được giáo viên biên tập
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Độ phủ môn học
          </span>
          <div className="text-2xl sm:text-3xl font-black text-indigo-600">
            {coveredSubjectsCount} / 11 môn
          </div>
          <p className="text-xs text-slate-500">
            Chuẩn chương trình THCS 2026–2027
          </p>
        </div>
      </div>

      {/* 3. Filters & Search Toolbar */}
      <div className="bg-white p-5 rounded-3xl border border-[#E2EAF5] shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {/* Filter 1: Môn học */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Môn học</label>
            <select
              value={selectedSubjectFilter}
              onChange={e => setSelectedSubjectFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="all">Tất cả môn học (11 môn)</option>
              {SUBJECTS.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Filter 2: Khối lớp */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Khối lớp</label>
            <select
              value={selectedGradeFilter}
              onChange={e => setSelectedGradeFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="all">Tất cả các khối (6–9)</option>
              <option value="6">Khối Lớp 6</option>
              <option value="7">Khối Lớp 7</option>
              <option value="8">Khối Lớp 8</option>
              <option value="9">Khối Lớp 9</option>
            </select>
          </div>

          {/* Filter 3: Bộ sách */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Bộ sách giáo khoa</label>
            <select
              value={selectedBookFilter}
              onChange={e => setSelectedBookFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="all">Tất cả bộ sách</option>
              <option value="Kết nối tri thức với cuộc sống">Kết nối tri thức với cuộc sống</option>
              <option value="Chân trời sáng tạo">Chân trời sáng tạo</option>
              <option value="Global Success (Bộ GD&ĐT)">Global Success (Tiếng Anh)</option>
              <option value="Cánh diều">Cánh diều</option>
            </select>
          </div>

          {/* Filter 4: Trạng thái xuất bản */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Trạng thái hiển thị</label>
            <select
              value={selectedStatusFilter}
              onChange={e => setSelectedStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="published">Đã xuất bản (Công khai)</option>
              <option value="draft">Bản nháp / Chưa xuất bản</option>
            </select>
          </div>

          {/* Search Input */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Tìm kiếm bài học</label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Nhập tên bài, chủ đề..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Lesson Items Table / List */}
      <div className="bg-white rounded-3xl border border-[#E2EAF5] shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="font-extrabold text-sm text-[#172B4D] flex items-center gap-2">
            <span>Danh sách bài học tìm thấy:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
              {filteredLessons.length} bài
            </span>
          </div>

          <div className="text-xs text-slate-500">
            Hiển thị bài học theo thứ tự SGK chuẩn GDPT 2018
          </div>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {filteredLessons.map((les, idx) => {
            const subjMeta = SUBJECTS.find(s => s.id === les.subjectId);
            const isPub = les.isPublished !== false;

            return (
              <div
                key={les.id}
                className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 font-black text-xs shadow-xs"
                    style={{ backgroundColor: subjMeta?.color || '#2684FF' }}
                  >
                    {idx + 1}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                        {subjMeta?.name || les.subjectId} — Lớp {les.grade}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {les.chapter}
                      </span>
                      {les.bookSeries && (
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                          {les.bookSeries}
                        </span>
                      )}
                      {les.pageReference && (
                        <span className="text-[10px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {les.pageReference}
                        </span>
                      )}
                    </div>

                    <h4 className="font-extrabold text-sm text-[#172B4D] leading-snug">
                      {les.title}
                    </h4>

                    <p className="text-slate-500 line-clamp-1 max-w-2xl text-[11px]">
                      {les.summary}
                    </p>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  {/* Publish Status Toggle */}
                  <button
                    onClick={() => handleTogglePublish(les)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
                      isPub
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                    }`}
                    title={isPub ? 'Nhấn để gỡ xuất bản (ẩn khỏi học sinh)' : 'Nhấn để xuất bản bài học cho học sinh'}
                  >
                    {isPub ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Đã xuất bản</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-slate-400" />
                        <span>Bản nháp</span>
                      </>
                    )}
                  </button>

                  {/* Preview Button */}
                  <button
                    onClick={() => setPreviewLesson(les)}
                    className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                    title="Xem trước nội dung học sinh"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleStartEdit(les)}
                    className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                    title="Chỉnh sửa nội dung bài học"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      if (les.id.startsWith('tin6-')) {
                        alert('Không thể xóa bài học chuẩn Tin học 6 đã được cấu hình trong hệ thống!');
                        return;
                      }
                      if (window.confirm(`Thầy/Cô có chắc chắn muốn xóa bài học "${les.title}"?`)) {
                        onDeleteLesson(les.id);
                      }
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Xóa bài học"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {filteredLessons.length === 0 && (
            <div className="p-12 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <h5 className="font-bold text-slate-700 text-sm">
                Không tìm thấy bài học nào phù hợp với bộ lọc
              </h5>
              <p className="text-xs text-slate-400">
                Hãy thử chọn bộ lọc khác hoặc nhấn "Đồng bộ & Quét SGK" để tự động nhận diện bài học mới.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 5. MODAL: EDIT / CREATE LESSON */}
      {(editingLesson || showCreateModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col space-y-4 my-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-[#172B4D]">
                    {editingLesson ? 'Chỉnh sửa nội dung bài học' : 'Tạo bài học SGK mới'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Cập nhật kiến thức chuẩn SGK GDPT 2018 cho học sinh THCS Mỹ Hòa
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingLesson(null);
                  setShowCreateModal(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveLessonForm} className="space-y-4 flex-1 overflow-y-auto pr-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Môn học</label>
                  <select
                    value={formSubjectId}
                    onChange={e => setFormSubjectId(e.target.value as SubjectId)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold"
                  >
                    {SUBJECTS.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Khối lớp</label>
                  <select
                    value={formGrade}
                    onChange={e => setFormGrade(Number(e.target.value) as GradeLevel)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold"
                  >
                    <option value={6}>Khối Lớp 6</option>
                    <option value={7}>Khối Lớp 7</option>
                    <option value={8}>Khối Lớp 8</option>
                    <option value={9}>Khối Lớp 9</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Bộ sách</label>
                  <input
                    type="text"
                    value={formBookSeries}
                    onChange={e => setFormBookSeries(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Tên bài học</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    placeholder="Bài 1: ..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Trang SGK tham chiếu</label>
                  <input
                    type="text"
                    value={formPageRef}
                    onChange={e => setFormPageRef(e.target.value)}
                    placeholder="Trang 10 - 15"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên chương hoặc chủ đề</label>
                <input
                  type="text"
                  value={formChapter}
                  onChange={e => setFormChapter(e.target.value)}
                  placeholder="Chương 1: ..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tóm tắt ngắn</label>
                <textarea
                  rows={2}
                  value={formSummary}
                  onChange={e => setFormSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 resize-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mục tiêu bài học (mỗi dòng một mục tiêu)
                </label>
                <textarea
                  rows={2}
                  value={formObjectives}
                  onChange={e => setFormObjectives(e.target.value)}
                  placeholder="Nắm vững khái niệm...&#10;Vận dụng giải bài tập..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 resize-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Kiến thức trọng tâm (mỗi dòng một ý chính)
                </label>
                <textarea
                  rows={3}
                  value={formKeyPoints}
                  onChange={e => setFormKeyPoints(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 resize-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nội dung chi tiết bài học (Hỗ trợ định dạng Markdown, Đề mục I, II, III, Công thức)
                </label>
                <textarea
                  rows={8}
                  value={formMarkdown}
                  onChange={e => setFormMarkdown(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pubCheck"
                  checked={formIsPublished}
                  onChange={e => setFormIsPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="pubCheck" className="font-bold text-slate-700 cursor-pointer">
                  Xuất bản ngay lên mục "Khám phá kiến thức" dành cho học sinh
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setEditingLesson(null);
                    setShowCreateModal(false);
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Lưu bài học</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL: SYNC PROGRESS MODAL */}
      {isSyncing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-4 text-center my-auto">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
              <RefreshCw className="w-7 h-7 animate-spin" />
            </div>

            <div>
              <h3 className="font-black text-lg text-[#172B4D]">
                Đang quét & Đồng bộ nội dung SGK
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {syncStepText}
              </p>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${syncProgress}%` }}
              />
            </div>

            <span className="text-xs font-black text-blue-600">
              Tiến trình: {syncProgress}%
            </span>
          </div>
        </div>
      )}

      {/* 7. MODAL: PREVIEW LESSON DETAIL (LIKE STUDENT VIEW) */}
      {previewLesson && (
        <LessonDetailModal
          lesson={previewLesson}
          subject={SUBJECTS.find(s => s.id === previewLesson.subjectId) || currentSubject}
          mediaList={[]}
          onClose={() => setPreviewLesson(null)}
          allLessons={filteredLessons}
          onSelectLesson={l => setPreviewLesson(l)}
        />
      )}
    </div>
  );
};
