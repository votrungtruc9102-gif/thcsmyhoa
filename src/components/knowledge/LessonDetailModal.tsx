import React, { useState } from 'react';
import {
  X,
  BookOpen,
  CheckCircle2,
  Download,
  FileText,
  HelpCircle,
  Sparkles,
  Printer,
  Play,
  Film,
  Image as ImageIcon,
  ExternalLink,
  ZoomIn,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Lesson, SubjectMeta, LessonMedia } from '../../types';

interface LessonDetailModalProps {
  lesson: Lesson | null;
  subject: SubjectMeta;
  mediaList: LessonMedia[];
  onClose: () => void;
  onPracticeLesson?: () => void;
  onSelectLesson?: (lesson: Lesson) => void;
  allLessons?: Lesson[];
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lesson,
  subject,
  mediaList,
  onClose,
  onPracticeLesson,
  onSelectLesson,
  allLessons = []
}) => {
  const [selectedImageModal, setSelectedImageModal] = useState<LessonMedia | null>(null);
  const [understood, setUnderstood] = useState(false);

  if (!lesson) return null;

  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Filter only published videos & images for student view
  const publishedVideos = mediaList.filter(
    m => m.lessonId === lesson.id && m.type === 'video' && m.status === 'published'
  ).sort((a, b) => a.sortOrder - b.sortOrder);

  const publishedImages = mediaList.filter(
    m => m.lessonId === lesson.id && m.type === 'image' && m.status === 'published'
  ).sort((a, b) => a.sortOrder - b.sortOrder);

  const handleDownloadAttachment = (fileName: string) => {
    const content = `TRƯỜNG THCS MỸ HÒA - NĂM HỌC 2026-2027
Tài liệu học tập: ${lesson.title}
Môn: ${subject.name} - Khối: Lớp ${lesson.grade}
Chủ đề: ${lesson.chapter}
--------------------------------------------------
TÓM TẮT KIẾN THỨC TRỌNG TÂM:
${lesson.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}

NỘI DUNG CHI TIẾT:
${lesson.contentMarkdown}
--------------------------------------------------
Hệ thống học tập trực tuyến THCS Mỹ Hòa.`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName.replace(/\.[^/.]+$/, '') + '.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
        <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-blue-100 flex flex-col max-h-[92vh] my-auto animate-scaleUp overflow-hidden">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#E2EAF5] bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm"
                style={{ backgroundColor: subject.color }}
              >
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-2.5 py-0.5 rounded-full">
                    {subject.name} • Lớp {lesson.grade}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {lesson.chapter}
                  </span>
                  {lesson.bookSeries && (
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                      {lesson.bookSeries}
                    </span>
                  )}
                  {lesson.pageReference && (
                    <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      {lesson.pageReference}
                    </span>
                  )}
                  {allLessons.length > 0 && currentIndex !== -1 && (
                    <span className="text-xs font-extrabold text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                      Bài {currentIndex + 1} / {allLessons.length}
                    </span>
                  )}
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#172B4D] mt-1">
                  {lesson.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              {allLessons.length > 1 && onSelectLesson && (
                <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
                  <button
                    disabled={!prevLesson}
                    onClick={() => {
                      if (prevLesson) {
                        onSelectLesson(prevLesson);
                        setUnderstood(false);
                      }
                    }}
                    className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                      prevLesson
                        ? 'text-slate-700 hover:bg-slate-100'
                        : 'text-slate-300 cursor-not-allowed'
                    }`}
                    title={prevLesson ? `Bài trước: ${prevLesson.title}` : 'Đây là bài đầu tiên'}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden md:inline text-xs">Trước</span>
                  </button>

                  <span className="text-xs font-semibold px-2 text-slate-500 border-x border-slate-200">
                    {currentIndex + 1}/{allLessons.length}
                  </span>

                  <button
                    disabled={!nextLesson}
                    onClick={() => {
                      if (nextLesson) {
                        onSelectLesson(nextLesson);
                        setUnderstood(false);
                      }
                    }}
                    className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                      nextLesson
                        ? 'text-slate-700 hover:bg-slate-100'
                        : 'text-slate-300 cursor-not-allowed'
                    }`}
                    title={nextLesson ? `Bài tiếp: ${nextLesson.title}` : 'Đây là bài cuối cùng'}
                  >
                    <span className="hidden md:inline text-xs">Sau</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Đóng bài học"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* 1. Summary / Objectives */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-3">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Mục tiêu học tập & Tóm lược bài học
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {lesson.summary}
                </p>
              </div>

              {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
                <div className="pt-2 border-t border-blue-200/60 space-y-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wide text-blue-900">
                    Mục tiêu cần đạt:
                  </span>
                  <div className="grid grid-cols-1 gap-1">
                    {lesson.learningObjectives.map((obj, oIdx) => (
                      <div key={oIdx} className="text-xs text-slate-700 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Key Points */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#172B4D] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Kiến thức trọng tâm cần ghi nhớ
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {lesson.keyPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-[#172B4D] flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. LESSON VIDEOS SECTION (SECTION 2.5) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="text-sm sm:text-base font-extrabold text-[#172B4D] flex items-center gap-2">
                  <Film className="w-4 h-4 text-red-500" />
                  Video bài học ({publishedVideos.length})
                </h4>
                <span className="text-xs text-slate-400 font-medium">
                  Đã kiểm duyệt bởi Tổ Chuyên Môn
                </span>
              </div>

              {publishedVideos.length > 0 ? (
                <div className="space-y-6">
                  {publishedVideos.map((video, idx) => (
                    <div
                      key={video.id || idx}
                      className="p-5 rounded-3xl bg-slate-50/80 border border-slate-200 space-y-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                          Video {video.sortOrder || idx + 1}
                        </span>
                        {video.sourceUrl && (
                          <a
                            href={video.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1 font-semibold transition-colors"
                          >
                            <span>Xem tại YouTube</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      <h5 className="text-sm font-bold text-[#172B4D]">
                        {video.title}
                      </h5>

                      {/* 16:9 Responsive Video Iframe Container */}
                      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner border border-slate-200">
                        {video.embedUrl ? (
                          <iframe
                            src={video.embedUrl}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full border-0"
                            sandbox="allow-scripts allow-same-origin allow-presentation"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-slate-400 text-xs p-4 text-center">
                            <AlertCircle className="w-6 h-6 mb-2 text-amber-500" />
                            <span>Đường dẫn video đang được cập nhật.</span>
                          </div>
                        )}
                      </div>

                      {video.description && (
                        <p className="text-xs text-slate-600 leading-relaxed pt-1">
                          {video.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-slate-500 text-xs">
                  Thầy cô đang cập nhật video bài giảng sinh động cho tiết học này. Em hãy đọc trước phần lý thuyết và ví dụ bên dưới nhé!
                </div>
              )}
            </div>

            {/* 4. DETAILED LESSON CONTENT */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#172B4D] flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Nội dung chi tiết bài học
              </h4>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                {lesson.contentMarkdown}
              </div>
            </div>

            {/* 5. ILLUSTRATION IMAGES GALLERY (SECTION 2.6) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="text-sm sm:text-base font-extrabold text-[#172B4D] flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  Hình ảnh minh họa bài học ({publishedImages.length})
                </h4>
                <span className="text-xs text-slate-400 font-medium">
                  Nhấn vào ảnh để xem kích thước lớn
                </span>
              </div>

              {publishedImages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {publishedImages.map((img, idx) => (
                    <div
                      key={img.id || idx}
                      onClick={() => setSelectedImageModal(img)}
                      className="group p-3 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer space-y-2 flex flex-col justify-between"
                    >
                      <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-100">
                        <img
                          src={img.sourceUrl}
                          alt={img.altText || img.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <span className="px-3 py-1.5 rounded-full bg-black/60 text-xs font-bold flex items-center gap-1.5">
                            <ZoomIn className="w-3.5 h-3.5" /> Phóng to ảnh
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs font-bold text-[#172B4D] group-hover:text-blue-600 transition-colors line-clamp-1">
                          {img.title}
                        </div>
                        {img.caption && (
                          <div className="text-[11px] text-slate-500 italic line-clamp-2">
                            {img.caption}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center rounded-2xl bg-slate-50 border border-slate-200 text-slate-500 text-xs">
                  Chưa có sơ đồ hoặc hình ảnh bổ sung cho bài này.
                </div>
              )}
            </div>

            {/* 6. Sample Exercises */}
            {lesson.sampleExercises && lesson.sampleExercises.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[#172B4D] flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  Ví dụ minh họa & Câu hỏi ôn tập
                </h4>
                <div className="space-y-2">
                  {lesson.sampleExercises.map((ex, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs sm:text-sm space-y-2">
                      <p className="font-bold text-amber-900">
                        Câu hỏi {idx + 1}: {ex.question}
                      </p>
                      <div className="p-3 rounded-lg bg-white border border-amber-200/60 text-slate-700">
                        <strong className="text-emerald-700">Hướng dẫn giải:</strong> {ex.solution}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. Attachments */}
            {lesson.attachments && lesson.attachments.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  Tài liệu đính kèm từ giáo viên
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {lesson.attachments.map((file, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-slate-200 flex items-center justify-between bg-slate-50 hover:bg-blue-50/60 transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                        <div className="truncate">
                          <div className="text-xs font-bold text-[#172B4D] truncate">
                            {file.name}
                          </div>
                          <span className="text-[10px] text-slate-500 uppercase">
                            {file.fileType} • {file.size}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownloadAttachment(file.name)}
                        className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer shrink-0"
                        title="Tải tệp về thiết bị"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 px-6 border-t border-[#E2EAF5] bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-[11px] text-slate-500 flex items-center gap-2">
              <span>Nguồn tài liệu: Tổ bộ môn {subject.name} · Trường THCS Mỹ Hòa</span>
              <span className="hidden md:inline">• Chuẩn GDPT 2018</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-end">
              {prevLesson && onSelectLesson && (
                <button
                  onClick={() => {
                    onSelectLesson(prevLesson);
                    setUnderstood(false);
                  }}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Bài trước</span>
                </button>
              )}

              <button
                onClick={() => window.print()}
                className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                In bài
              </button>

              <button
                onClick={() => setUnderstood(!understood)}
                className={`px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                  understood
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {understood ? 'Đã ghi nhận hiểu bài' : 'Đã hiểu bài'}
              </button>

              {nextLesson && onSelectLesson ? (
                <button
                  onClick={() => {
                    onSelectLesson(nextLesson);
                    setUnderstood(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#2684FF] text-white hover:bg-blue-600 text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Bài tiếp theo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-[#2684FF] text-white hover:bg-blue-600 text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Hoàn thành
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Image Preview Modal */}
      {selectedImageModal && (
        <div
          onClick={() => setSelectedImageModal(null)}
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          >
            <button
              onClick={() => setSelectedImageModal(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 overflow-auto bg-black flex items-center justify-center p-2">
              <img
                src={selectedImageModal.sourceUrl}
                alt={selectedImageModal.altText || selectedImageModal.title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
              <h5 className="font-bold text-sm text-[#172B4D]">
                {selectedImageModal.title}
              </h5>
              {selectedImageModal.caption && (
                <p className="text-xs text-slate-600 mt-0.5">
                  {selectedImageModal.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
