import React, { useState } from 'react';
import {
  Plus,
  BookOpen,
  Search,
  Filter,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  Eye,
  EyeOff,
  ExternalLink,
  AlertTriangle,
  X,
  Sparkles,
  Link2,
  ShieldCheck,
  Check,
  Layers,
  GraduationCap,
  Info
} from 'lucide-react';
import { GradeLevel, SubjectId, Textbook, TextbookStatus, UserAccount } from '../../types';
import { SUBJECTS } from '../../data/mockData';
import { TextbookReaderModal } from '../textbooks/TextbookReaderModal';
import { TextbookUrlModal } from './TextbookUrlModal';

interface TextbookManagerProps {
  textbooks: Textbook[];
  onAddTextbook: (book: Textbook) => void;
  onUpdateTextbook: (book: Textbook) => void;
  onDeleteTextbook: (id: string) => void;
  onToggleStatus: (id: string) => void;
  currentUser: UserAccount | null;
}

export const TextbookManager: React.FC<TextbookManagerProps> = ({
  textbooks,
  onAddTextbook,
  onUpdateTextbook,
  onDeleteTextbook,
  onToggleStatus,
  currentUser
}) => {
  // Filter and search state
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modal form states
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [editingUrlBook, setEditingUrlBook] = useState<Textbook | null>(null);
  const [deleteConfirmBook, setDeleteConfirmBook] = useState<Textbook | null>(null);
  const [previewBook, setPreviewBook] = useState<Textbook | null>(null);
  const [fullUrlViewBook, setFullUrlViewBook] = useState<Textbook | null>(null);

  // Quick form state at the top of the management dashboard
  const [quickGrade, setQuickGrade] = useState<GradeLevel>(6);
  const [quickSubjectId, setQuickSubjectId] = useState<SubjectId>('tin-hoc');
  const [quickTitle, setQuickTitle] = useState('Tin học 6');
  const [quickUrl, setQuickUrl] = useState('');
  const [quickCoverUrl, setQuickCoverUrl] = useState('');
  const [quickDescription, setQuickDescription] = useState('');
  const [quickStatus, setQuickStatus] = useState<TextbookStatus>('published');
  const [quickError, setQuickError] = useState<string | null>(null);
  const [quickCopied, setQuickCopied] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Find if book exists for quick panel
  const existingQuickBook = textbooks.find(
    (b) => b.grade === quickGrade && b.subjectId === quickSubjectId && b.bookSet !== 'Cánh Diều'
  );

  // Auto-sync quick form when Grade or Subject changes
  const handleQuickGradeChange = (g: GradeLevel) => {
    setQuickGrade(g);
    syncQuickForm(g, quickSubjectId);
  };

  const handleQuickSubjectChange = (sId: SubjectId) => {
    setQuickSubjectId(sId);
    syncQuickForm(quickGrade, sId);
  };

  const syncQuickForm = (g: GradeLevel, sId: SubjectId) => {
    setQuickError(null);
    const found = textbooks.find((b) => b.grade === g && b.subjectId === sId && b.bookSet !== 'Cánh Diều');
    const subObj = SUBJECTS.find((s) => s.id === sId);
    const suggestedTitle = subObj ? `${subObj.name} ${g}` : `Sách ${g}`;

    if (found) {
      setQuickTitle(found.title || suggestedTitle);
      setQuickUrl(found.bookUrl || '');
      setQuickCoverUrl(found.coverUrl || '');
      setQuickDescription(found.description || '');
      setQuickStatus(found.status || 'published');
    } else {
      setQuickTitle(suggestedTitle);
      setQuickUrl('');
      setQuickCoverUrl('');
      setQuickDescription('');
      setQuickStatus('published');
    }
  };

  const isValidHttpUrl = (str: string): boolean => {
    try {
      const url = new URL(str.trim());
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  // Handle Quick Save / Update
  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuickError(null);

    // Strict role check
    if (!currentUser || currentUser.role !== 'teacher') {
      setQuickError('Quyền truy cập bị từ chối! Chỉ tài khoản Giáo viên mới có quyền cập nhật đường link sách giáo khoa.');
      return;
    }

    if (!quickTitle.trim()) {
      setQuickError('Vui lòng nhập tên sách giáo khoa.');
      return;
    }

    const rawUrl = quickUrl.trim();
    if (!rawUrl) {
      setQuickError('Vui lòng nhập đường link sách giáo khoa (URL).');
      return;
    }

    if (!isValidHttpUrl(rawUrl)) {
      setQuickError('Đường link SGK không hợp lệ! URL phải bắt đầu bằng http:// hoặc https://');
      return;
    }

    const subObj = SUBJECTS.find((s) => s.id === quickSubjectId);

    if (existingQuickBook) {
      // Update existing
      const updated: Textbook = {
        ...existingQuickBook,
        grade: quickGrade,
        subjectId: quickSubjectId,
        subjectName: subObj?.name || '',
        title: quickTitle.trim(),
        // BẢO TOÀN NGUYÊN VẸN URL ĐẦY ĐỦ KHÔNG CẮT NGẮN
        bookUrl: rawUrl,
        coverUrl: quickCoverUrl.trim() || undefined,
        description: quickDescription.trim() || undefined,
        status: quickStatus,
        updatedAt: new Date().toISOString()
      };
      onUpdateTextbook(updated);
      showToast(`Đã cập nhật URL thành công cho môn ${subObj?.name || ''} Khối ${quickGrade}!`);
    } else {
      // Create new
      const newBook: Textbook = {
        id: `sgk-${quickSubjectId}-${quickGrade}-${Date.now().toString(36)}`,
        grade: quickGrade,
        subjectId: quickSubjectId,
        subjectName: subObj?.name || '',
        bookSet: 'Kết nối tri thức với cuộc sống',
        title: quickTitle.trim(),
        bookUrl: rawUrl,
        coverUrl: quickCoverUrl.trim() || undefined,
        description: quickDescription.trim() || undefined,
        status: quickStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: currentUser.displayName || 'Giáo viên THCS Mỹ Hòa'
      };
      onAddTextbook(newBook);
      showToast(`Đã lưu URL mới thành công cho môn ${subObj?.name || ''} Khối ${quickGrade}!`);
    }
  };

  const handleQuickCopyUrl = () => {
    if (!quickUrl.trim()) return;
    navigator.clipboard.writeText(quickUrl.trim());
    setQuickCopied(true);
    setTimeout(() => setQuickCopied(false), 2500);
  };

  const handleQuickPreview = () => {
    const rawUrl = quickUrl.trim();
    if (!rawUrl || !isValidHttpUrl(rawUrl)) {
      setQuickError('Vui lòng nhập URL hợp lệ trước khi xem trước.');
      return;
    }
    setPreviewBook({
      id: existingQuickBook ? existingQuickBook.id : 'preview-temp',
      grade: quickGrade,
      subjectId: quickSubjectId,
      subjectName: SUBJECTS.find((s) => s.id === quickSubjectId)?.name || '',
      bookSet: 'Kết nối tri thức với cuộc sống',
      title: quickTitle.trim() || 'Xem trước sách',
      bookUrl: rawUrl,
      status: quickStatus,
      createdAt: '',
      updatedAt: '',
      createdBy: ''
    });
  };

  // Open modal with preselected book
  const handleOpenEditModal = (book: Textbook) => {
    setEditingUrlBook(book);
    setIsUrlModalOpen(true);
  };

  // Open modal for new book
  const handleOpenCreateModal = () => {
    setEditingUrlBook(null);
    setIsUrlModalOpen(true);
  };

  // Copy full URL intact
  const handleCopyFullUrl = (url: string, title: string) => {
    navigator.clipboard.writeText(url);
    showToast(`Đã sao chép toàn bộ đường link của sách "${title}" vào bộ nhớ tạm!`);
  };

  // Confirm delete
  const handleExecuteDelete = () => {
    if (!deleteConfirmBook) return;
    onDeleteTextbook(deleteConfirmBook.id);
    showToast(`Đã xóa sách "${deleteConfirmBook.title}" khỏi hệ thống.`);
    setDeleteConfirmBook(null);
  };

  // Filter books:
  // Purge any non-official Cánh Diều records
  // Filter by search query (strictly by book title)
  const filteredBooks = textbooks.filter((book) => {
    if (book.bookSet === 'Cánh Diều' || book.id.includes('canhdieu')) return false;
    if (gradeFilter !== 'all' && book.grade !== Number(gradeFilter)) return false;
    if (subjectFilter !== 'all' && book.subjectId !== subjectFilter) return false;
    if (statusFilter !== 'all' && book.status !== statusFilter) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      const matchTitle = book.title.toLowerCase().includes(q);
      return matchTitle;
    }
    return true;
  });

  // Calculate statistics (excluding Cánh Diều)
  const officialBooks = textbooks.filter((t) => t.bookSet !== 'Cánh Diều' && !t.id.includes('canhdieu'));
  const totalCount = officialBooks.length;
  const publishedCount = officialBooks.filter((t) => t.status === 'published').length;
  const hiddenCount = officialBooks.filter((t) => t.status === 'hidden').length;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-slideDown">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800">
              Quản trị Giáo viên
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Năm học 2026–2027 • Bộ sách Kết nối tri thức với cuộc sống
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#172B4D] tracking-tight uppercase flex items-center gap-2.5">
            <Link2 className="w-6 h-6 text-blue-600" />
            <span>QUẢN LÝ LINK SÁCH GIÁO KHOA</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Cập nhật và lưu trữ đường link sách giáo khoa điện tử trực tuyến cho học sinh THCS từ khối 6 đến khối 9 mà không cần sửa mã nguồn.
          </p>
        </div>

        {/* Nút mở biểu mẫu cập nhật URL */}
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer self-start md:self-auto hover:scale-[1.02]"
        >
          <Plus className="w-5 h-5" />
          <span>+ CẬP NHẬT ĐƯỜNG LINK SGK</span>
        </button>
      </div>

      {/* =====================================================================
          SECTION II: BIỂU MẪU CẬP NHẬT ĐƯỜNG LINK SÁCH GIÁO KHOA TRỰC TIẾP
          ===================================================================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-200/90 shadow-md space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#172B4D] uppercase">
                CẬP NHẬT ĐƯỜNG LINK SÁCH GIÁO KHOA
              </h3>
              <p className="text-xs text-slate-500">
                Thực hiện chọn Khối lớp và Môn học, sau đó dán toàn bộ đường link và nhấn Lưu/Cập nhật.
              </p>
            </div>
          </div>

          {existingQuickBook ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              Đã có sách hiện có trên hệ thống
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Tạo mới đường link môn này
            </span>
          )}
        </div>

        {quickError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{quickError}</span>
          </div>
        )}

        <form onSubmit={handleQuickSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* 1. Khối lớp */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Khối lớp <span className="text-red-500">*</span>
              </label>
              <select
                value={quickGrade}
                onChange={(e) => handleQuickGradeChange(Number(e.target.value) as GradeLevel)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value={6}>Khối 6</option>
                <option value={7}>Khối 7</option>
                <option value={8}>Khối 8</option>
                <option value={9}>Khối 9</option>
              </select>
            </div>

            {/* 2. Môn học */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Môn học <span className="text-red-500">*</span>
              </label>
              <select
                value={quickSubjectId}
                onChange={(e) => handleQuickSubjectChange(e.target.value as SubjectId)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Tên sách */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tên sách <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={quickTitle}
                onChange={(e) => setQuickTitle(e.target.value)}
                placeholder="Ví dụ: Tin học 6..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>
          </div>

          {/* 4. URL sách giáo khoa (Toàn bộ URL nguyên vẹn) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-900">
                URL sách giáo khoa <span className="text-red-500">*</span>
              </label>
              <span className="text-[10px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                Độ dài: {quickUrl.length} ký tự · Bảo toàn 100% nguyên vẹn
              </span>
            </div>
            
            <textarea
              value={quickUrl}
              onChange={(e) => setQuickUrl(e.target.value)}
              placeholder="Dán toàn bộ đường link sách giáo khoa tại đây (http:// hoặc https:// bao gồm tất cả tham số ?, &, =)..."
              rows={3}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y"
              required
            />

            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                Hệ thống lưu toàn bộ URL giáo viên nhập, không tự ý cắt ngắn hoặc sửa đổi tham số.
              </span>
            </div>
          </div>

          {/* 5. URL ảnh bìa & Mô tả */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                URL ảnh bìa <span className="text-slate-400 font-normal">(Không bắt buộc)</span>
              </label>
              <input
                type="text"
                value={quickCoverUrl}
                onChange={(e) => setQuickCoverUrl(e.target.value)}
                placeholder="https://example.com/cover.jpg"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Mô tả <span className="text-slate-400 font-normal">(Không bắt buộc)</span>
              </label>
              <input
                type="text"
                value={quickDescription}
                onChange={(e) => setQuickDescription(e.target.value)}
                placeholder="Tóm tắt nội dung môn học..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* 6. Trạng thái & Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-700">Trạng thái:</span>
              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="radio"
                  name="quickStatus"
                  value="published"
                  checked={quickStatus === 'published'}
                  onChange={() => setQuickStatus('published')}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  Công khai
                </span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="radio"
                  name="quickStatus"
                  value="hidden"
                  checked={quickStatus === 'hidden'}
                  onChange={() => setQuickStatus('hidden')}
                  className="w-4 h-4 text-slate-600"
                />
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />
                  Ẩn
                </span>
              </label>
            </div>

            {/* Các nút thao tác theo phần II.2 */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleQuickCopyUrl}
                disabled={!quickUrl.trim()}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  quickCopied
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed'
                }`}
              >
                {quickCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{quickCopied ? 'Đã sao chép' : 'Sao chép URL'}</span>
              </button>

              <button
                type="button"
                onClick={handleQuickPreview}
                disabled={!quickUrl.trim()}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Xem trước</span>
              </button>

              <button
                type="button"
                onClick={() => syncQuickForm(quickGrade, quickSubjectId)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-600 transition-colors cursor-pointer"
              >
                Hủy
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>{existingQuickBook ? 'Cập nhật URL' : 'Lưu URL'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Overview Stat Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500">Tổng số sách chính thức</div>
          <div className="text-2xl font-black text-[#172B4D] mt-1">{totalCount}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-emerald-600">Đang công khai</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{publishedCount}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-400">Đang ẩn</div>
          <div className="text-2xl font-black text-slate-500 mt-1">{hiddenCount}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-blue-600">Bộ sách thống nhất</div>
          <div className="text-xs font-black text-blue-700 mt-2">Kết nối tri thức với cuộc sống</div>
        </div>
      </div>

      {/* Filter and Search Bar: Only search by book title per Part V */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Ô tìm kiếm: Tìm tên sách */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm tên sách"
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Filter by Grade */}
          <div>
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">Tất cả Khối lớp</option>
              <option value="6">Khối 6</option>
              <option value="7">Khối 7</option>
              <option value="8">Khối 8</option>
              <option value="9">Khối 9</option>
            </select>
          </div>

          {/* Filter by Subject */}
          <div>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">Tất cả Môn học</option>
              {SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filter by Status */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="all">Tất cả Trạng thái</option>
              <option value="published">Đang công khai</option>
              <option value="hidden">Đang ẩn</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Textbooks Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="text-xs font-bold text-slate-700">
            Danh sách Sách Giáo Khoa ({filteredBooks.length} cuốn)
          </div>
          <span className="text-[11px] text-slate-500">
            Hiển thị danh mục SGK chính thức
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-extrabold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Khối</th>
                <th className="py-3 px-4">Môn học</th>
                <th className="py-3 px-4">Tên sách</th>
                <th className="py-3 px-4">Đường link (URL)</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4">Cập nhật</th>
                <th className="py-3 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => {
                  const subjectMeta = SUBJECTS.find((s) => s.id === book.subjectId);
                  const isPublished = book.status === 'published';

                  return (
                    <tr key={book.id} className="hover:bg-blue-50/40 transition-colors">
                      {/* Khối */}
                      <td className="py-3 px-4 whitespace-nowrap font-black text-slate-800">
                        <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 font-black text-xs">
                          Khối {book.grade}
                        </span>
                      </td>

                      {/* Môn học */}
                      <td className="py-3 px-4 font-bold text-slate-800 whitespace-nowrap">
                        {book.subjectName || subjectMeta?.name || book.subjectId}
                      </td>

                      {/* Tên sách */}
                      <td className="py-3 px-4 font-extrabold text-[#172B4D]">
                        <div className="max-w-[180px] truncate" title={book.title}>
                          {book.title}
                        </div>
                      </td>

                      {/* Đường link (URL) */}
                      <td className="py-3 px-4 max-w-[220px]">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="font-mono text-[11px] text-slate-600 truncate block max-w-[150px]"
                            title={book.bookUrl}
                          >
                            {book.bookUrl}
                          </span>
                          <button
                            onClick={() => handleCopyFullUrl(book.bookUrl, book.title)}
                            title="Sao chép toàn bộ link URL"
                            className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer shrink-0"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Trạng thái */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <button
                          onClick={() => onToggleStatus(book.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                            isPublished
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isPublished ? 'bg-emerald-500' : 'bg-slate-400'
                            }`}
                          />
                          <span>{isPublished ? 'Công khai' : 'Đang ẩn'}</span>
                        </button>
                      </td>

                      {/* Cập nhật */}
                      <td className="py-3 px-4 whitespace-nowrap text-[11px] text-slate-500">
                        {new Date(book.updatedAt).toLocaleDateString('vi-VN')}
                      </td>

                      {/* Thao tác */}
                      <td className="py-3 px-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1">
                          
                          {/* Nút Cập nhật URL */}
                          <button
                            onClick={() => handleOpenEditModal(book)}
                            title="Cập nhật đường link URL cho sách này"
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer font-bold flex items-center gap-1 text-[11px]"
                          >
                            <Edit className="w-4 h-4" />
                            <span className="hidden xl:inline">Sửa URL</span>
                          </button>

                          {/* Xem trước */}
                          <button
                            onClick={() => setPreviewBook(book)}
                            title="Xem trước khung đọc sách"
                            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Sao chép URL đầy đủ */}
                          <button
                            onClick={() => handleCopyFullUrl(book.bookUrl, book.title)}
                            title="Sao chép toàn bộ đường link (URL đầy đủ)"
                            className="p-1.5 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          {/* Xóa sách */}
                          <button
                            onClick={() => setDeleteConfirmBook(book)}
                            title="Xóa sách giáo khoa này"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-medium">
                    Không tìm thấy sách giáo khoa nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Cập nhật URL Sách Giáo Khoa */}
      <TextbookUrlModal
        isOpen={isUrlModalOpen}
        onClose={() => setIsUrlModalOpen(false)}
        textbooks={textbooks}
        onSaveBook={(book, isUpdate) => {
          if (isUpdate) {
            onUpdateTextbook(book);
            showToast(`Đã cập nhật URL thành công cho sách "${book.title}"!`);
          } else {
            onAddTextbook(book);
            showToast(`Đã lưu URL mới thành công cho sách "${book.title}"!`);
          }
        }}
        currentUser={currentUser}
        initialGrade={editingUrlBook ? editingUrlBook.grade : 6}
        initialSubjectId={editingUrlBook ? (editingUrlBook.subjectId as SubjectId) : 'tin-hoc'}
        initialBook={editingUrlBook}
        onPreviewBook={(b) => {
          setIsUrlModalOpen(false);
          setPreviewBook(b);
        }}
      />

      {/* Reader Modal for Preview */}
      <TextbookReaderModal
        book={previewBook}
        isOpen={previewBook !== null}
        onClose={() => setPreviewBook(null)}
      />

      {/* Modal Xác nhận Xóa sách */}
      {deleteConfirmBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-black text-slate-900">
                Xác nhận xóa sách giáo khoa?
              </h3>
              <p className="text-xs text-slate-500">
                Thầy/Cô có chắc chắn muốn xóa sách <strong>"{deleteConfirmBook.title}"</strong> (Khối {deleteConfirmBook.grade})?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmBook(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleExecuteDelete}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
