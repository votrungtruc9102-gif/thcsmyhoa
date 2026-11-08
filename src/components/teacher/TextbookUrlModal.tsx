import React, { useState, useEffect } from 'react';
import {
  X,
  Link2,
  BookOpen,
  Check,
  Copy,
  Eye,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Info
} from 'lucide-react';
import { GradeLevel, SubjectId, Textbook, TextbookStatus, UserAccount } from '../../types';
import { SUBJECTS } from '../../data/mockData';

interface TextbookUrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  textbooks: Textbook[];
  onSaveBook: (book: Textbook, isUpdate: boolean) => void;
  currentUser: UserAccount | null;
  onPreviewBook?: (book: Textbook) => void;
  initialGrade?: GradeLevel;
  initialSubjectId?: SubjectId;
  initialBook?: Textbook | null;
}

export const TextbookUrlModal: React.FC<TextbookUrlModalProps> = ({
  isOpen,
  onClose,
  textbooks,
  onSaveBook,
  currentUser,
  onPreviewBook,
  initialGrade = 6,
  initialSubjectId = 'tin-hoc',
  initialBook = null
}) => {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(initialGrade);
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>(initialSubjectId);
  const [title, setTitle] = useState('');
  const [bookUrl, setBookUrl] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TextbookStatus>('published');
  
  const [existingBookId, setExistingBookId] = useState<string | null>(null);
  const [isExistingFound, setIsExistingFound] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync state when modal opens or initial props change
  useEffect(() => {
    if (!isOpen) return;

    const g = initialBook ? initialBook.grade : initialGrade;
    const sId = initialBook ? (initialBook.subjectId as SubjectId) : initialSubjectId;

    setSelectedGrade(g);
    setSelectedSubjectId(sId);
    loadBookFor(g, sId, initialBook);
  }, [isOpen, initialGrade, initialSubjectId, initialBook, textbooks]);

  // Load book matching grade & subject
  const loadBookFor = (g: GradeLevel, sId: SubjectId, explicitBook?: Textbook | null) => {
    setErrorMessage(null);
    setCopied(false);

    // Look for existing book for this grade & subject
    const found =
      explicitBook ||
      textbooks.find((b) => b.grade === g && b.subjectId === sId && b.bookSet !== 'Cánh Diều');

    const subjectMeta = SUBJECTS.find((s) => s.id === sId);
    const defaultTitle = subjectMeta ? `${subjectMeta.name} ${g}` : `Sách lớp ${g}`;

    if (found) {
      setExistingBookId(found.id);
      setIsExistingFound(true);
      setTitle(found.title || defaultTitle);
      // Giữ nguyên 100% URL đầy đủ không cắt ngắn
      setBookUrl(found.bookUrl || '');
      setCoverUrl(found.coverUrl || '');
      setDescription(found.description || '');
      setStatus(found.status || 'published');
    } else {
      setExistingBookId(null);
      setIsExistingFound(false);
      setTitle(defaultTitle);
      setBookUrl('');
      setCoverUrl('');
      setDescription('');
      setStatus('published');
    }
  };

  const handleGradeChange = (newG: GradeLevel) => {
    setSelectedGrade(newG);
    loadBookFor(newG, selectedSubjectId);
  };

  const handleSubjectChange = (newSId: SubjectId) => {
    setSelectedSubjectId(newSId);
    loadBookFor(selectedGrade, newSId);
  };

  const isValidHttpUrl = (str: string): boolean => {
    try {
      const url = new URL(str.trim());
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  // Copy full URL
  const handleCopyUrl = () => {
    if (!bookUrl.trim()) return;
    navigator.clipboard.writeText(bookUrl.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Preview action
  const handlePreview = () => {
    const rawUrl = bookUrl.trim();
    if (!rawUrl || !isValidHttpUrl(rawUrl)) {
      setErrorMessage('Vui lòng nhập đường link URL hợp lệ (bắt đầu bằng http:// hoặc https://) để xem trước.');
      return;
    }
    const tempBook: Textbook = {
      id: existingBookId || `preview-${Date.now()}`,
      grade: selectedGrade,
      subjectId: selectedSubjectId,
      subjectName: SUBJECTS.find((s) => s.id === selectedSubjectId)?.name || '',
      bookSet: 'Kết nối tri thức với cuộc sống',
      title: title.trim() || `Sách ${selectedGrade}`,
      bookUrl: rawUrl,
      coverUrl: coverUrl.trim() || undefined,
      description: description.trim() || undefined,
      status: status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: currentUser?.displayName || 'Giáo viên THCS Mỹ Hòa'
    };

    if (onPreviewBook) {
      onPreviewBook(tempBook);
    } else {
      window.open(rawUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Submit / Save URL
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Verify teacher permission strictly
    if (!currentUser || currentUser.role !== 'teacher') {
      setErrorMessage('Quyền truy cập bị từ chối! Chỉ tài khoản Giáo viên mới có quyền cập nhật đường link sách giáo khoa.');
      return;
    }

    if (!title.trim()) {
      setErrorMessage('Vui lòng nhập tên sách giáo khoa.');
      return;
    }

    const rawUrl = bookUrl.trim();
    if (!rawUrl) {
      setErrorMessage('Vui lòng nhập đường link sách giáo khoa (URL).');
      return;
    }

    if (!isValidHttpUrl(rawUrl)) {
      setErrorMessage('Đường link SGK không hợp lệ! URL phải bắt đầu bằng http:// hoặc https://');
      return;
    }

    const subjectMeta = SUBJECTS.find((s) => s.id === selectedSubjectId);

    const savedBook: Textbook = {
      id: existingBookId || `sgk-${selectedSubjectId}-${selectedGrade}-${Date.now().toString(36)}`,
      grade: selectedGrade,
      subjectId: selectedSubjectId,
      subjectName: subjectMeta?.name || '',
      bookSet: 'Kết nối tri thức với cuộc sống',
      title: title.trim(),
      // BẢO TOÀN NGUYÊN VẸN 100% URL ĐẦY ĐỦ DO GIÁO VIÊN NHẬP
      bookUrl: rawUrl,
      coverUrl: coverUrl.trim() || undefined,
      description: description.trim() || undefined,
      status: status,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      createdBy: currentUser.displayName || 'Giáo viên THCS Mỹ Hòa'
    };

    onSaveBook(savedBook, isExistingFound);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Link2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-[#172B4D] tracking-tight">
                CẬP NHẬT ĐƯỜNG LINK SÁCH GIÁO KHOA
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Dành cho Giáo viên • Cập nhật URL trực tiếp cho từng môn học và khối lớp
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status notification if existing book was found */}
        {isExistingFound ? (
          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-medium flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Đã tìm thấy sách hiện có:</strong> Đang chỉnh sửa bản ghi{' '}
              <strong className="text-blue-700 underline font-extrabold">{title}</strong>. Thầy/Cô có thể
              dán URL mới để cập nhật cho học sinh mà không cần sửa mã nguồn.
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              Chưa có sách cho môn học này ở Khối {selectedGrade}. Điền URL để lưu sách mới vào hệ thống.
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Row 1: Khối lớp & Môn học */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* 1. Khối lớp */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Khối lớp <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => handleGradeChange(Number(e.target.value) as GradeLevel)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
                value={selectedSubjectId}
                onChange={(e) => handleSubjectChange(e.target.value as SubjectId)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Tên sách (Tự động gợi ý theo khối và môn hoặc cho phép giáo viên nhập) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Tên sách <span className="text-red-500">*</span>
              </label>
              <span className="text-[10px] text-slate-400">
                (Tự động gợi ý theo khối và môn, có thể chỉnh sửa)
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Tin học 6, Lịch sử và Địa lí 6..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              required
            />
          </div>

          {/* 4. URL sách giáo khoa (BẮT BUỘC - BẢO TOÀN NGUYÊN VẸN 100%) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-900">
                URL sách giáo khoa <span className="text-red-500">*</span>
              </label>
              <span className="text-[10px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                Độ dài: {bookUrl.length} ký tự
              </span>
            </div>
            
            <textarea
              value={bookUrl}
              onChange={(e) => setBookUrl(e.target.value)}
              placeholder="Dán toàn bộ đường link sách giáo khoa tại đây (ví dụ: https://hanhtrangso.nxbgd.vn/sach-dien-tu/tin-hoc-6-10504?token=xyz&page=1)..."
              rows={3}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y"
              required
            />

            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>
                Hệ thống cam kết lưu toàn bộ URL giáo viên nhập, không cắt ngắn tham số <code className="text-blue-700 font-bold">?</code>, <code className="text-blue-700 font-bold">&</code>, <code className="text-blue-700 font-bold">=</code>.
              </span>
            </div>
          </div>

          {/* 5. URL ảnh bìa (Không bắt buộc) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              URL ảnh bìa <span className="text-slate-400 font-normal">(Không bắt buộc)</span>
            </label>
            <input
              type="text"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="https://example.com/anh-bia-sach.jpg"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* 6. Mô tả (Không bắt buộc) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Mô tả sách <span className="text-slate-400 font-normal">(Không bắt buộc)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tóm tắt nội dung môn học, chủ đề hoặc ghi chú dành cho học sinh..."
              rows={2}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
            />
          </div>

          {/* 7. Trạng thái: Công khai hoặc Ẩn */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Trạng thái hiển thị
            </label>
            <div className="flex items-center gap-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={status === 'published'}
                  onChange={() => setStatus('published')}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  Công khai (Học sinh đọc được ngay)
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="radio"
                  name="status"
                  value="hidden"
                  checked={status === 'hidden'}
                  onChange={() => setStatus('hidden')}
                  className="w-4 h-4 text-slate-600"
                />
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
                  Ẩn (Chỉ giáo viên thấy)
                </span>
              </label>
            </div>
          </div>

          {/* 8. Action buttons (Section II.2: Lưu URL / Cập nhật URL, Xem trước, Sao chép URL, Hủy) */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              {/* Sao chép URL */}
              <button
                type="button"
                onClick={handleCopyUrl}
                disabled={!bookUrl.trim()}
                className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  copied
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed'
                }`}
                title="Sao chép toàn bộ đường link URL vào bộ nhớ tạm"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã sao chép!' : 'Sao chép URL'}</span>
              </button>

              {/* Xem trước */}
              <button
                type="button"
                onClick={handlePreview}
                disabled={!bookUrl.trim()}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                title="Xem trước khung đọc sách"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Xem trước</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Hủy */}
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-600 transition-colors cursor-pointer"
              >
                Hủy
              </button>

              {/* Lưu URL / Cập nhật URL */}
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>{isExistingFound ? 'Cập nhật URL' : 'Lưu URL'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
