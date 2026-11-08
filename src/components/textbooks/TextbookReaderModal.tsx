import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Maximize2,
  Minimize2,
  BookOpen,
  ArrowLeft,
  ShieldCheck,
  Info
} from 'lucide-react';
import { Textbook } from '../../types';
import { isKnownIframeBlocked, isDirectEmbeddableDoc, checkServerFrameSupport } from '../../utils/embedCheck';

interface TextbookReaderModalProps {
  book: Textbook | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TextbookReaderModal: React.FC<TextbookReaderModalProps> = ({
  book,
  isOpen,
  onClose
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // embedMode:
  // - 'blocked': Website nguồn không hỗ trợ nhúng iframe (chỉ hiển thị đúng 2 nút điều khiển)
  // - 'embedded': Website nguồn hỗ trợ nhúng (hiển thị iframe đọc trực tiếp)
  // - 'checking': Đang kiểm tra
  const [embedMode, setEmbedMode] = useState<'blocked' | 'embedded' | 'checking'>('blocked');

  useEffect(() => {
    if (!isOpen || !book) return;

    const url = (book.embedUrl || book.bookUrl || '').trim();

    // 1. Kiểm tra tức thì: nếu URL thuộc danh sách nguồn đã biết chặn iframe
    // (taphuan.nxbgd.vn, hanhtrangso.nxbgd.vn, hoc10.vn, etc.)
    if (isKnownIframeBlocked(url)) {
      setEmbedMode('blocked');
      return;
    }

    // 2. Nếu là tài liệu nhúng trực tiếp (như file PDF trực tiếp)
    if (isDirectEmbeddableDoc(url)) {
      setEmbedMode('embedded');
      return;
    }

    // 3. Với các URL khác, kiểm tra hỗ trợ qua API máy chủ
    let isMounted = true;
    setEmbedMode('checking');

    checkServerFrameSupport(url).then((canEmbed) => {
      if (isMounted) {
        setEmbedMode(canEmbed ? 'embedded' : 'blocked');
      }
    });

    return () => {
      isMounted = false;
    };
  }, [isOpen, book]);

  if (!isOpen || !book) return null;

  // Lấy chính xác toàn bộ URL giáo viên đã cập nhật
  const rawTargetUrl = (book.embedUrl || book.bookUrl || '').trim();

  const handleOpenExternalTab = () => {
    window.open(rawTargetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      
      {/* ===================================================================
          TRƯỜNG HỢP B: WEBSITE NGUỒN KHÔNG HỖ TRỢ NHÚNG IFRAME
          (CHỈ CÓ ĐÚNG 2 NÚT ĐIỀU KHIỂN ĐẶT CHÍNH GIỮA MÀN HÌNH THEO CẢ 2 CHIỀU)
          =================================================================== */}
      {embedMode === 'blocked' ? (
        <div className="relative w-full max-w-xl bg-gradient-to-b from-[#F0F7FF] via-white to-[#F5F9FF] rounded-3xl shadow-2xl border border-blue-100 p-8 sm:p-12 min-h-[260px] flex items-center justify-center text-center overflow-hidden animate-scaleUp">
          {/* CHỈ CÓ ĐÚNG 2 NÚT ĐIỀU KHIỂN NẰM NGANG CHÍNH GIỮA (DỌC TRÊN MOBILE) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            {/* NÚT 1: MỞ SÁCH GIÁO KHOA */}
            <a
              href={rawTargetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto h-13 sm:h-14 px-7 sm:px-8 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-extrabold sm:font-black text-sm sm:text-base shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-white" />
              <span>MỞ SÁCH GIÁO KHOA</span>
              <ExternalLink className="w-4 h-4 text-white" />
            </a>

            {/* NÚT 2: QUAY LẠI DANH SÁCH BÀI HỌC */}
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto h-13 sm:h-14 px-7 sm:px-8 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 text-[#1E3A8A] font-extrabold sm:font-black text-sm sm:text-base shadow-md hover:shadow-lg transition-all transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2.5"
            >
              <ArrowLeft className="w-5 h-5 text-[#1E3A8A]" />
              <span>QUAY LẠI DANH SÁCH BÀI HỌC</span>
            </button>
          </div>
        </div>
      ) : (
        /* TRƯỜNG HỢP A: WEBSITE NGUỒN CHO PHÉP NHÚNG IFRAME */
        <div
          className={`bg-white rounded-3xl shadow-2xl flex flex-col border border-slate-200 transition-all duration-200 overflow-hidden ${
            isFullscreen
              ? 'w-screen h-screen rounded-none'
              : 'w-full max-w-6xl h-[92vh] max-h-[900px]'
          }`}
        >
          {/* Header Toolbar khi đang nhúng */}
          <div className="bg-[#0F172A] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                title="Quay lại danh sách bài học"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Quay lại</span>
              </button>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-blue-600 text-white">
                    Khối {book.grade}
                  </span>
                  <span className="text-xs font-bold text-slate-300 truncate hidden sm:inline">
                    {book.subjectName || 'Sách giáo khoa'}
                  </span>
                </div>
                <h2 className="text-sm sm:text-base font-black truncate text-white leading-tight mt-0.5">
                  {book.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleOpenExternalTab}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                title="Mở sách trong tab mới"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mở trong tab mới</span>
              </button>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title={isFullscreen ? 'Thu nhỏ cửa sổ' : 'Phóng to toàn màn hình'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Đóng khung đọc"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Vùng hiển thị trực tiếp iframe hoặc kiểm tra */}
          {embedMode === 'embedded' && (
            <div className="flex-1 bg-slate-100 relative overflow-hidden flex flex-col">
              <div className="bg-blue-50 border-b border-blue-100 px-4 py-2 text-xs text-blue-900 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2 truncate">
                  <Info className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate">
                    Đang mở trực tiếp: <strong className="font-bold">{book.title}</strong>
                  </span>
                </div>
                <button
                  onClick={handleOpenExternalTab}
                  className="text-blue-700 font-bold hover:underline text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  Mở tab mới <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <iframe
                src={rawTargetUrl}
                title={book.title}
                className="w-full h-full border-0 flex-1 bg-white"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
                onError={() => setEmbedMode('blocked')}
              />
            </div>
          )}

          {embedMode === 'checking' && (
            <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center animate-spin mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-700">
                Đang kết nối tài liệu sách giáo khoa...
              </p>
            </div>
          )}

          {/* Footer thông tin khi đang nhúng trực tiếp */}
          <div className="bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Nguồn tài liệu giáo dục THCS Mỹ Hòa · Năm học 2026–2027</span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
            >
              Quay lại danh sách
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
