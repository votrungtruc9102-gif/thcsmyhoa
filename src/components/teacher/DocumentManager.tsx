import React, { useState } from 'react';
import {
  Upload,
  BookOpen,
  FileText,
  FileCode,
  Download,
  Trash2,
  Edit,
  Eye,
  Sparkles,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  Plus,
  X,
  FileCheck2,
  RefreshCw,
  Table,
  LayoutGrid,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { TeacherDocument, DocumentFileType, GradeLevel, SubjectId, SubjectMeta, Lesson } from '../../types';
import { SUBJECTS } from '../../data/mockData';

interface DocumentManagerProps {
  documents: TeacherDocument[];
  onAddDocument: (doc: TeacherDocument) => void;
  onDeleteDocument: (id: string) => void;
  onUpdateDocument?: (doc: TeacherDocument) => void;
  currentGrade: GradeLevel;
  currentSubject: SubjectMeta;
  onUseQuestionsInAssignment?: (questions: any[], topic: string) => void;
  lessons?: Lesson[];
  onDeleteLesson?: (id: string) => void;
  isTeacher?: boolean;
}

export const DocumentManager: React.FC<DocumentManagerProps> = ({
  documents,
  onAddDocument,
  onDeleteDocument,
  onUpdateDocument,
  currentGrade,
  currentSubject,
  onUseQuestionsInAssignment,
  lessons = [],
  onDeleteLesson,
  isTeacher = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [scanningDocId, setScanningDocId] = useState<string | null>(null);

  // Pre-deletion modal state & notifications
  const [docToDelete, setDocToDelete] = useState<TeacherDocument | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteExploitedChoice, setDeleteExploitedChoice] = useState<'keep_lessons' | 'delete_lessons'>('keep_lessons');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<TeacherDocument | null>(null);
  const [extractingDoc, setExtractingDoc] = useState<TeacherDocument | null>(null);

  // Upload form state
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadSubject, setUploadSubject] = useState<SubjectId>(currentSubject.id);
  const [uploadGrade, setUploadGrade] = useState<GradeLevel>(currentGrade);
  const [uploadTopic, setUploadTopic] = useState('Chủ đề 1: Máy tính và cộng đồng');
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadFileType, setUploadFileType] = useState<DocumentFileType>('pdf');
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadFileSize, setUploadFileSize] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fileContentText, setFileContentText] = useState('');

  // Handle actual file input with format & size validation
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size <= 30MB
    if (file.size > 30 * 1024 * 1024) {
      alert('Tệp quá lớn! Vui lòng chọn tệp có dung lượng nhỏ hơn 30MB.');
      return;
    }

    const name = file.name;
    const ext = name.split('.').pop()?.toLowerCase();
    let detectedType: DocumentFileType = 'pdf';

    if (ext === 'pdf') detectedType = 'pdf';
    else if (ext === 'doc' || ext === 'docx') detectedType = 'docx';
    else if (ext === 'ppt' || ext === 'pptx') detectedType = 'pptx';
    else if (ext === 'txt') detectedType = 'txt';
    else if (ext === 'xlsx' || ext === 'xls') detectedType = 'xlsx';
    else if (ext === 'json') detectedType = 'json';
    else {
      alert('Định dạng không được hỗ trợ! Chỉ cho phép tệp: .pdf, .docx, .doc, .pptx, .ppt, .txt');
      return;
    }

    setUploadFileName(name);
    setUploadFileType(detectedType);
    setUploadFileSize(`${(file.size / 1024).toFixed(1)} KB`);
    if (!uploadTitle) {
      setUploadTitle(name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
    }

    // Read content for text/json or mock preview
    if (detectedType === 'txt' || detectedType === 'json') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContentText((event.target?.result as string) || '');
      };
      reader.readAsText(file);
    } else {
      setFileContentText(`[Nội dung tài liệu ${name} đã được xử lý an toàn]`);
    }

    // Simulate upload progress
    setIsUploading(true);
    setUploadProgress(20);
    const t1 = setTimeout(() => setUploadProgress(65), 200);
    const t2 = setTimeout(() => {
      setUploadProgress(100);
      setIsUploading(false);
    }, 450);
  };

  const handleSaveDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadFileName) {
      alert('Vui lòng chọn tệp và điền tên tài liệu!');
      return;
    }

    // Simulated AI extracted summary and question suggestions from file content
    const extractedSummary = `Tài liệu "${uploadTitle}" cung cấp kiến thức nền tảng về ${uploadTopic}. Bao gồm hệ thống khái niệm, ví dụ minh họa và bài tập vận dụng chuẩn chương trình GDPT 2018.`;
    const extractedKeyPoints = [
      `Khái niệm và đặc điểm cốt lõi của ${uploadTopic}`,
      'Phương pháp ứng dụng và kỹ năng thực hành số',
      'Các tình huống thực tiễn và bài tập củng cố kiến thức'
    ];

    const suggestedQuestions = [
      {
        type: 'single_choice',
        level: 'nhan_biet',
        question: `Khái niệm cơ bản được đề cập trọng tâm trong tài liệu "${uploadTitle}" là gì?`,
        answer: 'Là nội dung kiến thức cốt lõi theo chuẩn sách giáo khoa.'
      },
      {
        type: 'true_false',
        level: 'thong_hieu',
        question: `Nội dung tài liệu "${uploadTitle}" có thể áp dụng trực tiếp vào tiết học thực hành.`,
        answer: 'Đúng'
      },
      {
        type: 'essay',
        level: 'van_dung',
        question: `Em hãy vận dụng nội dung bài học trong tài liệu "${uploadTitle}" để giải thích một hiện tượng hoặc bài toán thực tế.`,
        answer: 'Học sinh phân tích và đưa ra ví dụ minh họa hợp lý.'
      }
    ];

    const newDoc: TeacherDocument = {
      id: `doc_${Date.now()}`,
      title: uploadTitle.trim(),
      fileName: uploadFileName,
      fileType: uploadFileType,
      fileSize: uploadFileSize || '1.2 MB',
      subjectId: uploadSubject,
      grade: uploadGrade,
      topic: uploadTopic,
      academicYear: '2026-2027',
      uploadedBy: 'Giáo viên THCS Mỹ Hòa',
      uploadedAt: new Date().toISOString().split('T')[0],
      status: 'da_xac_nhan',
      description: uploadDesc.trim() || 'Tài liệu hỗ trợ giảng dạy và ôn tập cho học sinh.',
      source: 'Tổ Chuyên Môn THCS Mỹ Hòa',
      extractedSummary,
      extractedKeyPoints,
      suggestedQuestions
    };

    onAddDocument(newDoc);
    setShowUploadModal(false);

    // Reset
    setUploadTitle('');
    setUploadFileName('');
    setUploadDesc('');
    setUploadProgress(0);
    alert('Tải lên và lưu trữ tài liệu thành công vào hệ thống!');
  };

  // Helper: check if a document has linked / extracted lessons
  const getLinkedLessonsForDoc = (doc: TeacherDocument | null): Lesson[] => {
    if (!doc || !lessons) return [];
    return lessons.filter((l) => {
      if (doc.linkedLessonId && l.id === doc.linkedLessonId) return true;
      if (l.attachments?.some(att => att.name.toLowerCase() === doc.fileName.toLowerCase())) return true;
      if (doc.linkedLessonId && doc.linkedLessonId.startsWith('tin6-') && doc.subjectId === 'tin-hoc' && doc.grade === 6 && l.id === doc.linkedLessonId) return true;
      return false;
    });
  };

  // Perform actual document deletion with optional linked lessons removal
  const handleConfirmDelete = async () => {
    if (!docToDelete) return;
    if (!isTeacher) {
      alert('Chỉ tài khoản giáo viên mới có quyền xóa tài liệu!');
      setDocToDelete(null);
      return;
    }

    setIsDeleting(true);
    try {
      const docId = docToDelete.id;
      const docTitle = docToDelete.title;
      const linked = getLinkedLessonsForDoc(docToDelete);

      // If teacher explicitly selected to delete linked lessons
      if (deleteExploitedChoice === 'delete_lessons' && onDeleteLesson && linked.length > 0) {
        linked.forEach((l) => {
          onDeleteLesson(l.id);
        });
      }

      // Execute actual document deletion from storage and state
      onDeleteDocument(docId);

      // Show success notification
      setSuccessToast(`Đã xóa tài liệu "${docTitle}" thành công!`);
      setTimeout(() => {
        setSuccessToast(null);
      }, 4000);

      setDocToDelete(null);
    } catch (err) {
      console.error('Lỗi khi xóa tài liệu:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered documents
  const filteredDocs = documents.filter((doc) => {
    if (gradeFilter !== 'all' && doc.grade.toString() !== gradeFilter) return false;
    if (subjectFilter !== 'all' && doc.subjectId !== subjectFilter) return false;
    if (typeFilter !== 'all' && doc.fileType !== typeFilter) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      return (
        doc.title.toLowerCase().includes(term) ||
        doc.fileName.toLowerCase().includes(term) ||
        doc.topic.toLowerCase().includes(term)
      );
    }
    return true;
  });

  // Section III Overview Statistics
  const totalDocsCount = documents.length;
  const uniqueSubjectsCount = new Set(documents.map((d) => d.subjectId)).size;
  const uniqueGradesCount = new Set(documents.map((d) => d.grade)).size;
  const totalChaptersCount = documents.reduce((acc, d) => acc + (d.recognizedChapters || 0), 0);
  const totalLessonsCount = documents.reduce((acc, d) => acc + (d.recognizedLessons || 0), 0);
  const totalSuccessCount = documents.reduce((acc, d) => acc + (d.successLessons || 0), 0);
  const totalNeedsReviewCount = documents.reduce((acc, d) => acc + (d.needsReviewLessons || 0), 0);

  // Re-scan simulation
  const handleRescanDoc = (doc: TeacherDocument) => {
    setScanningDocId(doc.id);
    setTimeout(() => {
      setScanningDocId(null);
      if (onUpdateDocument) {
        onUpdateDocument({
          ...doc,
          readingStatus: 'da_doc',
          processingStatus: 'da_xuat_ban',
          isPublished: true
        });
      }
      setSuccessToast(`Quét lại thành công: "${doc.title}". Đã nhận diện ${doc.recognizedChapters || 4} chương, ${doc.recognizedLessons || 12} bài học.`);
      setTimeout(() => setSuccessToast(null), 4000);
    }, 1000);
  };

  // Toggle publish status
  const handleTogglePublishDoc = (doc: TeacherDocument) => {
    const isNowPublished = doc.processingStatus !== 'da_xuat_ban';
    const nextStatus = isNowPublished ? 'da_xuat_ban' : 'cho_xac_nhan';
    if (onUpdateDocument) {
      onUpdateDocument({
        ...doc,
        processingStatus: nextStatus,
        isPublished: isNowPublished
      });
    }
    setSuccessToast(
      isNowPublished
        ? `Đã xuất bản toàn bộ bài học từ "${doc.title}" lên Kho kiến thức!`
        : `Đã chuyển tài liệu "${doc.title}" sang trạng thái Chờ xác nhận.`
    );
    setTimeout(() => setSuccessToast(null), 3500);
  };

  return (
    <div className="space-y-6 animate-fadeIn relative">
      {/* Floating Success Toast */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 animate-bounceIn flex items-center gap-3 px-5 py-3.5 bg-emerald-600 text-white rounded-2xl shadow-xl shadow-emerald-600/30 border border-emerald-500">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <div className="text-xs font-bold leading-snug">
            <div className="text-[10px] uppercase tracking-wider text-emerald-200 font-extrabold">Hệ thống thông báo</div>
            <div className="text-sm font-black">Xử lý thành công!</div>
            <div className="text-[11px] text-emerald-100 font-normal">{successToast}</div>
          </div>
          <button
            onClick={() => setSuccessToast(null)}
            className="ml-2 p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* In-page Success Banner */}
      {successToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-extrabold text-xs sm:text-sm text-emerald-900">
                Thực hiện thao tác thành công
              </p>
              <p className="text-[11px] text-emerald-700">
                {successToast}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSuccessToast(null)}
            className="p-1 rounded-lg hover:bg-emerald-100 text-emerald-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kho học liệu số GDPT 2018</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            QUẢN LÝ SÁCH VÀ TÀI LIỆU GIẢNG DẠY
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
            Tải lên sách giáo khoa, kế hoạch bài dạy, giáo án Word, slide trình chiếu PowerPoint và tài liệu PDF. Tự động nhận diện cấu trúc chương, bài học và xuất bản kiến thức.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-5 py-3 rounded-2xl bg-white hover:bg-blue-50 text-blue-700 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-black/10 cursor-pointer shrink-0 transition-all hover:scale-102"
        >
          <Upload className="w-4 h-4 text-blue-700" />
          Tải tài liệu mới lên
        </button>
      </div>

      {/* Overview Metric Cards (Section III & XII) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tổng SGK</div>
          <div className="text-xl sm:text-2xl font-black text-slate-800 mt-1">{totalDocsCount}</div>
          <div className="text-[10px] text-blue-600 font-semibold mt-0.5">Tệp lưu trữ</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Số môn học</div>
          <div className="text-xl sm:text-2xl font-black text-indigo-700 mt-1">{uniqueSubjectsCount} / 11</div>
          <div className="text-[10px] text-indigo-600 font-semibold mt-0.5">Đủ các môn THCS</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Số khối lớp</div>
          <div className="text-xl sm:text-2xl font-black text-purple-700 mt-1">{uniqueGradesCount} / 4</div>
          <div className="text-[10px] text-purple-600 font-semibold mt-0.5">Khối 6, 7, 8, 9</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Chương nhận diện</div>
          <div className="text-xl sm:text-2xl font-black text-cyan-700 mt-1">{totalChaptersCount}</div>
          <div className="text-[10px] text-cyan-600 font-semibold mt-0.5">Đã phân tách</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Bài nhận diện</div>
          <div className="text-xl sm:text-2xl font-black text-blue-700 mt-1">{totalLessonsCount}</div>
          <div className="text-[10px] text-blue-600 font-semibold mt-0.5">Mục lục hoàn chỉnh</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-2xs">
          <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Xử lý thành công</div>
          <div className="text-xl sm:text-2xl font-black text-emerald-700 mt-1">{totalSuccessCount}</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Sẵn sàng xuất bản</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-2xs">
          <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Cần kiểm tra</div>
          <div className="text-xl sm:text-2xl font-black text-amber-700 mt-1">{totalNeedsReviewCount}</div>
          <div className="text-[10px] text-amber-600 font-semibold mt-0.5">Chờ giáo viên duyệt</div>
        </div>
      </div>

      {/* Filter and Search Bar with View Mode Toggle */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#E2EAF5] shadow-2xs space-y-3">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm tên sách, bộ sách, bài giảng, chủ đề..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            {/* Grade */}
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-700"
            >
              <option value="all">Tất cả Khối</option>
              <option value="6">Khối 6</option>
              <option value="7">Khối 7</option>
              <option value="8">Khối 8</option>
              <option value="9">Khối 9</option>
            </select>

            {/* Subject */}
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-700"
            >
              <option value="all">Tất cả Môn học (11 môn)</option>
              {SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            {/* File type */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-slate-700"
            >
              <option value="all">Tất cả định dạng</option>
              <option value="pdf">Tài liệu PDF (.pdf)</option>
              <option value="docx">Văn bản Word (.docx, .doc)</option>
              <option value="pptx">Slide PowerPoint (.pptx)</option>
              <option value="txt">Tệp văn bản (.txt)</option>
              <option value="json">Dữ liệu (.json)</option>
            </select>

            {/* View Mode Switch */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 ml-auto lg:ml-2">
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Bảng thống kê tổng hợp"
              >
                <Table className="w-3.5 h-3.5" />
                <span>Bảng theo dõi</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Dạng thẻ lưới"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Dạng thẻ</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* VIEW 1: DETAILED SUMMARY TABLE (Per Phần III) */}
      {/* ===================================================================== */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-3xl border border-[#E2EAF5] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/90 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200 font-extrabold whitespace-nowrap">
                  <th className="py-3.5 px-4">Tên tài liệu</th>
                  <th className="py-3.5 px-3">Môn học</th>
                  <th className="py-3.5 px-2.5 text-center">Khối</th>
                  <th className="py-3.5 px-3">Bộ sách</th>
                  <th className="py-3.5 px-2.5 text-center">Năm học</th>
                  <th className="py-3.5 px-3">Định dạng & Dung lượng</th>
                  <th className="py-3.5 px-3">Trạng thái đọc</th>
                  <th className="py-3.5 px-3">Trạng thái xử lý</th>
                  <th className="py-3.5 px-2.5 text-center">Chương</th>
                  <th className="py-3.5 px-2.5 text-center">Bài nhận diện</th>
                  <th className="py-3.5 px-2.5 text-center text-emerald-700">Đã xử lý</th>
                  <th className="py-3.5 px-2.5 text-center text-amber-700">Cần KT</th>
                  <th className="py-3.5 px-4 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredDocs.map((doc) => {
                  const subjectObj = SUBJECTS.find((s) => s.id === doc.subjectId);
                  const isScanning = scanningDocId === doc.id;
                  const readStatus = doc.readingStatus || 'da_doc';
                  const procStatus = doc.processingStatus || 'da_xuat_ban';

                  return (
                    <tr
                      key={doc.id}
                      className="hover:bg-blue-50/40 transition-colors group"
                    >
                      {/* 1. Tên tài liệu */}
                      <td className="py-3 px-4 min-w-[220px]">
                        <div className="font-extrabold text-[#172B4D] text-xs line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {doc.title}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate mt-0.5">
                          {doc.fileName}
                        </div>
                      </td>

                      {/* 2. Môn học */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold"
                          style={{
                            backgroundColor: `${subjectObj?.color || '#3B82F6'}15`,
                            color: subjectObj?.color || '#3B82F6'
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: subjectObj?.color || '#3B82F6' }}
                          />
                          {subjectObj?.name || doc.subjectId}
                        </span>
                      </td>

                      {/* 3. Khối lớp */}
                      <td className="py-3 px-2.5 text-center whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-extrabold text-[11px]">
                          Lớp {doc.grade}
                        </span>
                      </td>

                      {/* 4. Bộ sách */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 font-semibold text-[11px]">
                          {doc.bookSeries || 'Kết nối tri thức'}
                        </span>
                      </td>

                      {/* 5. Năm học */}
                      <td className="py-3 px-2.5 text-center whitespace-nowrap text-[11px] text-slate-500 font-semibold">
                        {doc.schoolYear || '2026-2027'}
                      </td>

                      {/* 6. Định dạng và dung lượng */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-md font-bold uppercase text-[10px] ${
                            doc.fileType === 'pdf'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : doc.fileType === 'docx'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : doc.fileType === 'pptx'
                              ? 'bg-orange-50 text-orange-700 border border-orange-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {doc.fileType.toUpperCase()} • {doc.fileSize}
                        </span>
                      </td>

                      {/* 7. Trạng thái đọc */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        {isScanning ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span>Đang quét...</span>
                          </span>
                        ) : readStatus === 'da_doc' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Đã đọc</span>
                          </span>
                        ) : readStatus === 'dang_quet' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span>Đang quét</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Lỗi</span>
                          </span>
                        )}
                      </td>

                      {/* 8. Trạng thái xử lý */}
                      <td className="py-3 px-3 whitespace-nowrap">
                        {procStatus === 'da_xuat_ban' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                            <CheckCircle className="w-3 h-3" />
                            <span>Đã xuất bản</span>
                          </span>
                        ) : procStatus === 'cho_xac_nhan' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                            <Clock className="w-3 h-3" />
                            <span>Chờ xác nhận</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-bold">
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            <span>Đang xử lý</span>
                          </span>
                        )}
                      </td>

                      {/* 9. Số chương nhận diện */}
                      <td className="py-3 px-2.5 text-center font-bold text-slate-700">
                        {doc.recognizedChapters || 4}
                      </td>

                      {/* 10. Số bài nhận diện */}
                      <td className="py-3 px-2.5 text-center font-bold text-blue-600">
                        {doc.recognizedLessons || 12}
                      </td>

                      {/* 11. Số bài đã xử lý thành công */}
                      <td className="py-3 px-2.5 text-center font-bold text-emerald-600">
                        {doc.successLessons || doc.recognizedLessons || 12}
                      </td>

                      {/* 12. Số bài cần kiểm tra */}
                      <td className="py-3 px-2.5 text-center font-bold text-amber-600">
                        {doc.needsReviewLessons || 0}
                      </td>

                      {/* 13. Thao tác */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setPreviewDoc(doc)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Xem trước nội dung sách"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setExtractingDoc(doc)}
                            className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                            title="Khai thác nội dung & tạo bài tập"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleRescanDoc(doc)}
                            disabled={isScanning}
                            className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer disabled:opacity-50"
                            title="Quét lại cấu trúc SGK"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                          </button>

                          <button
                            onClick={() => handleTogglePublishDoc(doc)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              procStatus === 'da_xuat_ban'
                                ? 'text-emerald-600 hover:bg-emerald-50'
                                : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                            }`}
                            title={procStatus === 'da_xuat_ban' ? 'Hủy xuất bản' : 'Xác nhận & Xuất bản'}
                          >
                            <FileCheck2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              const dummyContent = `TÀI LIỆU: ${doc.title}\nNăm học: ${doc.schoolYear || '2026-2027'}\nMôn: ${doc.subjectId}\nKhối: ${doc.grade}\nBộ sách: ${doc.bookSeries || 'Kết nối tri thức'}\n\nNội dung SGK đã được số hóa và kiểm duyệt trong hệ thống THCS Mỹ Hòa.`;
                              const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = doc.fileName;
                              a.click();
                              URL.revokeObjectURL(url);
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                            title="Tải tệp SGK về máy"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              setDocToDelete(doc);
                              setDeleteExploitedChoice('keep_lessons');
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Xóa tài liệu"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* VIEW 2: CARDS GRID VIEW */}
      {/* ===================================================================== */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => {
            const subjectObj = SUBJECTS.find((s) => s.id === doc.subjectId);
            const isScanning = scanningDocId === doc.id;
            const procStatus = doc.processingStatus || 'da_xuat_ban';

            return (
              <div
                key={doc.id}
                className="bg-white rounded-3xl p-5 border border-[#E2EAF5] hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  {/* Header tags */}
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] ${
                        doc.fileType === 'pdf'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : doc.fileType === 'docx'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : doc.fileType === 'pptx'
                          ? 'bg-orange-50 text-orange-700 border border-orange-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {doc.fileType.toUpperCase()} • {doc.fileSize}
                    </span>

                    <span className="text-[11px] text-slate-400 font-medium">
                      {doc.schoolYear || '2026-2027'}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm text-[#172B4D] leading-snug line-clamp-2">
                    {doc.title}
                  </h4>

                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-bold text-[11px]"
                      style={{
                        backgroundColor: `${subjectObj?.color || '#3B82F6'}15`,
                        color: subjectObj?.color || '#3B82F6'
                      }}
                    >
                      {subjectObj?.name || doc.subjectId} — Lớp {doc.grade}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold text-[10px]">
                      {doc.bookSeries || 'Kết nối tri thức'}
                    </span>
                  </div>

                  {/* Recognition stats pill */}
                  <div className="grid grid-cols-4 gap-1 p-2 bg-slate-50 rounded-xl text-center text-[10px] text-slate-600">
                    <div>
                      <div className="font-bold text-slate-800">{doc.recognizedChapters || 4}</div>
                      <div className="text-[9px] text-slate-400">Chương</div>
                    </div>
                    <div>
                      <div className="font-bold text-blue-600">{doc.recognizedLessons || 12}</div>
                      <div className="text-[9px] text-slate-400">Bài nhận diện</div>
                    </div>
                    <div>
                      <div className="font-bold text-emerald-600">{doc.successLessons || doc.recognizedLessons || 12}</div>
                      <div className="text-[9px] text-slate-400">Thành công</div>
                    </div>
                    <div>
                      <div className="font-bold text-amber-600">{doc.needsReviewLessons || 0}</div>
                      <div className="text-[9px] text-slate-400">Cần KT</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {doc.description}
                  </p>
                </div>

                {/* Actions Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                      title="Xem trước nội dung"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setExtractingDoc(doc)}
                      className="p-2 rounded-xl text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer flex items-center gap-1 font-bold text-xs"
                      title="Khai thác nội dung & tạo câu hỏi"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Khai thác</span>
                    </button>

                    <button
                      onClick={() => handleRescanDoc(doc)}
                      disabled={isScanning}
                      className="p-2 rounded-xl text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                      title="Quét lại"
                    >
                      <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleTogglePublishDoc(doc)}
                      className={`p-2 rounded-xl transition-colors cursor-pointer ${
                        procStatus === 'da_xuat_ban'
                          ? 'text-emerald-600 hover:bg-emerald-50'
                          : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                      }`}
                      title={procStatus === 'da_xuat_ban' ? 'Hủy xuất bản' : 'Xác nhận & Xuất bản'}
                    >
                      <FileCheck2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        const dummyContent = `TÀI LIỆU: ${doc.title}\nNăm học: ${doc.schoolYear || '2026-2027'}\nMôn: ${doc.subjectId}\nKhối: ${doc.grade}\nBộ sách: ${doc.bookSeries || 'Kết nối tri thức'}\n\nNội dung chi tiết được lưu trữ an toàn trong hệ thống THCS Mỹ Hòa.`;
                        const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = doc.fileName;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="p-2 rounded-xl text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                      title="Tải tệp về máy tính"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setDocToDelete(doc);
                        setDeleteExploitedChoice('keep_lessons');
                      }}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Xóa tài liệu"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredDocs.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="font-bold text-slate-700 text-sm">
            Không tìm thấy tài liệu phù hợp với bộ lọc
          </h4>
          <p className="text-xs text-slate-400">
            Hãy thử tìm bằng từ khóa khác hoặc nhấn "Tải tài liệu mới lên" để thêm sách giáo khoa và giáo án mới.
          </p>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 1: UPLOAD DOCUMENT */}
      {/* ===================================================================== */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 my-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-[#172B4D]">
                    Tải lên Sách & Tài liệu Giảng dạy
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Hỗ trợ định dạng PDF, Word (.docx), PowerPoint (.pptx), Text (.txt)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveDocument} className="space-y-4 text-xs">
              {/* File input / Drag & drop */}
              <div className="relative p-6 rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/40 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.xlsx,.json"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="font-bold text-slate-800 text-sm">
                  {uploadFileName ? `Đã chọn: ${uploadFileName}` : 'Nhấn để chọn tệp từ máy tính hoặc kéo thả vào đây'}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Định dạng: PDF, Word, PowerPoint, TXT • Giới hạn tối đa 30MB
                </p>
              </div>

              {isUploading && (
                <div className="space-y-1">
                  <div className="flex justify-between font-bold text-slate-600 text-[11px]">
                    <span>Đang kiểm tra và tải tệp...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Tên sách hoặc tài liệu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    required
                    placeholder="Ví dụ: Sách giáo khoa Tin học 6 Cánh Diều"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Môn học
                  </label>
                  <select
                    value={uploadSubject}
                    onChange={(e) => setUploadSubject(e.target.value as SubjectId)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-xs"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Khối lớp
                  </label>
                  <select
                    value={uploadGrade}
                    onChange={(e) => setUploadGrade(Number(e.target.value) as GradeLevel)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-xs"
                  >
                    <option value={6}>Khối Lớp 6</option>
                    <option value={7}>Khối Lớp 7</option>
                    <option value={8}>Khối Lớp 8</option>
                    <option value={9}>Khối Lớp 9</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Chủ đề / Chương bài học
                  </label>
                  <input
                    type="text"
                    value={uploadTopic}
                    onChange={(e) => setUploadTopic(e.target.value)}
                    placeholder="Chủ đề 1: Máy tính và cộng đồng"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mô tả và mục đích sử dụng
                </label>
                <textarea
                  rows={2}
                  value={uploadDesc}
                  onChange={(e) => setUploadDesc(e.target.value)}
                  placeholder="Ghi chú thêm về nội dung, đối tượng áp dụng..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-xs resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" />
                  Lưu & Tải lên hệ thống
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 2: PREVIEW DOCUMENT */}
      {/* ===================================================================== */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 max-h-[85vh] flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  Xem trước: {previewDoc.fileType.toUpperCase()}
                </span>
                <h3 className="font-extrabold text-base text-[#172B4D] mt-1">
                  {previewDoc.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 text-xs text-slate-600">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div><strong>Tên tệp:</strong> {previewDoc.fileName}</div>
                  <div><strong>Dung lượng:</strong> {previewDoc.fileSize}</div>
                  <div><strong>Môn học:</strong> {previewDoc.subjectId} - Lớp {previewDoc.grade}</div>
                  <div><strong>Ngày tải:</strong> {previewDoc.uploadedAt}</div>
                </div>
                <p><strong>Mô tả:</strong> {previewDoc.description}</p>
              </div>

              {previewDoc.extractedSummary && (
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1.5 text-blue-900">
                  <div className="font-bold flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    Tóm tắt nội dung tài liệu:
                  </div>
                  <p className="leading-relaxed">{previewDoc.extractedSummary}</p>
                </div>
              )}

              {previewDoc.extractedKeyPoints && previewDoc.extractedKeyPoints.length > 0 && (
                <div className="space-y-2">
                  <h5 className="font-bold text-slate-800">Các nội dung trọng tâm trích xuất:</h5>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    {previewDoc.extractedKeyPoints.map((pt, idx) => (
                      <li key={idx}>{pt}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  const doc = previewDoc;
                  setPreviewDoc(null);
                  setExtractingDoc(doc);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Khai thác câu hỏi từ tài liệu này
              </button>

              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs cursor-pointer"
              >
                Đóng xem trước
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 3: EXTRACT & EXPLOIT CONTENT (Per Phần III.6) */}
      {/* ===================================================================== */}
      {extractingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 max-h-[85vh] flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base text-[#172B4D]">
                    Khai thác nội dung & Gợi ý câu hỏi bài tập
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Tài liệu nguồn: {extractingDoc.title} ({extractingDoc.fileName})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setExtractingDoc(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 space-y-2">
                <p className="font-bold">
                  Hệ thống đã phân tích nội dung tệp và trích xuất thành công {extractingDoc.suggestedQuestions?.length || 3} câu hỏi gợi ý.
                </p>
                <p className="text-[11px] text-indigo-700">
                  Thầy/Cô có thể kiểm tra, chỉnh sửa nội dung bên dưới trước khi đưa vào ngân hàng đề hoặc giao bài tập cho học sinh.
                </p>
              </div>

              <div className="space-y-3">
                {extractingDoc.suggestedQuestions?.map((q, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">Câu gợi ý {idx + 1}</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                        {q.type} • {q.level}
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium">{q.question}</p>
                    <div className="text-[11px] text-emerald-700 bg-white p-2 rounded-xl border border-slate-100">
                      <strong>Đáp án gợi ý:</strong> {q.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setExtractingDoc(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs cursor-pointer"
              >
                Đóng
              </button>

              <button
                onClick={() => {
                  if (onUseQuestionsInAssignment && extractingDoc.suggestedQuestions) {
                    onUseQuestionsInAssignment(extractingDoc.suggestedQuestions, extractingDoc.topic);
                  }
                  setExtractingDoc(null);
                  alert('Đã chuyển các câu hỏi gợi ý sang Trình tạo bài tập!');
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <ArrowRight className="w-4 h-4" />
                Chuyển vào Trình tạo bài tập
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL 4: PRE-DELETION CONFIRMATION (Xác nhận xóa tài liệu) */}
      {/* ===================================================================== */}
      {docToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-100 my-auto space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 shadow-inner">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#172B4D]">
                    Xác nhận xóa tài liệu?
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Hệ thống quản lý tài liệu và sách giáo khoa THCS Mỹ Hòa
                  </p>
                </div>
              </div>
              <button
                disabled={isDeleting}
                onClick={() => setDocToDelete(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
                title="Đóng hộp thoại"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description Prompt Requirement */}
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              Bạn có chắc chắn muốn xóa tài liệu sách giáo khoa này không? Sau khi xác nhận, tài liệu sẽ bị xóa khỏi danh sách quản lý.
            </p>

            {/* Document Details Information Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
              <div className="font-extrabold text-[10px] uppercase tracking-wider text-slate-400">
                Thông tin chi tiết tài liệu
              </div>

              <div className="space-y-1.5 divide-y divide-slate-200/60">
                <div className="flex items-start justify-between gap-3 pt-1">
                  <span className="font-bold text-slate-500 shrink-0">Tên file:</span>
                  <span className="font-extrabold text-[#172B4D] text-right break-all">
                    {docToDelete.fileName || docToDelete.title}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1.5">
                  <span className="font-bold text-slate-500 shrink-0">Môn học:</span>
                  <span className="font-bold text-blue-600">
                    {SUBJECTS.find((s) => s.id === docToDelete.subjectId)?.name || docToDelete.subjectId}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1.5">
                  <span className="font-bold text-slate-500 shrink-0">Khối lớp:</span>
                  <span className="font-bold text-slate-800">
                    Khối {docToDelete.grade}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 pt-1.5">
                  <span className="font-bold text-slate-500 shrink-0">Dung lượng file:</span>
                  <span className="font-bold text-slate-800">
                    {docToDelete.fileSize}
                  </span>
                </div>
              </div>
            </div>

            {/* Exploited Document Handling (If linked lessons exist) */}
            {(() => {
              const linkedLessons = getLinkedLessonsForDoc(docToDelete);
              if (linkedLessons.length === 0) return null;

              const totalLessons = linkedLessons.length;
              const publishedCount = linkedLessons.length;

              return (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-black text-amber-900 text-xs sm:text-sm">
                        Cảnh báo: Tài liệu này đã được khai thác
                      </p>
                      <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                        Tài liệu này đã được khai thác và liên kết với{' '}
                        <strong>{totalLessons} bài học</strong> trong hệ thống ({publishedCount} bài đã xuất bản).
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1 border-t border-amber-200/60">
                    <div className="font-bold text-amber-900 text-[11px]">
                      Chọn phương thức xử lý nội dung trích xuất:
                    </div>

                    <label className="flex items-start gap-2.5 p-2 rounded-xl bg-white/80 border border-amber-200 cursor-pointer hover:bg-white transition-colors">
                      <input
                        type="radio"
                        name="deleteExploitedChoice"
                        value="keep_lessons"
                        checked={deleteExploitedChoice === 'keep_lessons'}
                        onChange={() => setDeleteExploitedChoice('keep_lessons')}
                        className="mt-0.5 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="text-[11px] leading-snug">
                        <strong className="text-slate-800">Chỉ xóa tài liệu sách giáo khoa</strong>
                        <p className="text-slate-500 mt-0.5">
                          Giữ lại toàn bộ các bài học đã trích xuất trong hệ thống để học sinh tiếp tục học tập.
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2 rounded-xl bg-white/80 border border-amber-200 cursor-pointer hover:bg-white transition-colors">
                      <input
                        type="radio"
                        name="deleteExploitedChoice"
                        value="delete_lessons"
                        checked={deleteExploitedChoice === 'delete_lessons'}
                        onChange={() => setDeleteExploitedChoice('delete_lessons')}
                        className="mt-0.5 text-red-600 focus:ring-red-500"
                      />
                      <div className="text-[11px] leading-snug">
                        <strong className="text-red-700">Xóa tài liệu VÀ các bài học đã trích xuất</strong>
                        <p className="text-slate-500 mt-0.5">
                          Xóa cả bài học liên kết. <em>Lưu ý: Lịch sử học tập và điểm số làm bài của học sinh vẫn được bảo toàn an toàn tuyệt đối.</em>
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              );
            })()}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDocToDelete(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs cursor-pointer transition-colors disabled:opacity-50"
              >
                Hủy
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-xs shadow-md shadow-red-600/20 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Đang xóa...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Xóa tài liệu</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
