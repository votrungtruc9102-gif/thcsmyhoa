import React, { useState } from 'react';
import {
  Film,
  Image as ImageIcon,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Upload,
  Sparkles,
  Layers,
  HelpCircle,
  X,
  Play,
  FileCheck
} from 'lucide-react';
import { Lesson, LessonMedia, GradeLevel, SubjectId, SubjectMeta } from '../../types';
import { validateAndFormatVideoUrl, VideoValidationResult } from '../../utils/videoUtils';
import { SUBJECTS } from '../../data/mockData';

interface LessonMediaManagerProps {
  lessons: Lesson[];
  mediaList: LessonMedia[];
  onAddMedia: (media: LessonMedia) => void;
  onUpdateMedia: (media: LessonMedia) => void;
  onDeleteMedia: (id: string) => void;
  currentGrade: GradeLevel;
  currentSubject: SubjectMeta;
}

export const LessonMediaManager: React.FC<LessonMediaManagerProps> = ({
  lessons,
  mediaList,
  onAddMedia,
  onUpdateMedia,
  onDeleteMedia,
  currentGrade,
  currentSubject
}) => {
  // Lesson filter & selection
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(currentGrade);
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>(currentSubject.id);

  const availableLessons = lessons.filter(
    l => l.grade === selectedGrade && l.subjectId === selectedSubjectId
  );

  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    availableLessons[0]?.id || ''
  );

  // Active media sub-tab (Videos vs Images)
  const [mediaTab, setMediaTab] = useState<'video' | 'image'>('video');

  // Video Form State
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState<LessonMedia | null>(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoRawUrl, setVideoRawUrl] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [videoSortOrder, setVideoSortOrder] = useState<number>(1);
  const [videoStatus, setVideoStatus] = useState<'draft' | 'published'>('published');
  const [validationResult, setValidationResult] = useState<VideoValidationResult | null>(null);

  // Image Form State
  const [showImageModal, setShowImageModal] = useState(false);
  const [editingImage, setEditingImage] = useState<LessonMedia | null>(null);
  const [imageTitle, setImageTitle] = useState('');
  const [imageSourceUrl, setImageSourceUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [imageAltText, setImageAltText] = useState('');
  const [imageSortOrder, setImageSortOrder] = useState<number>(1);
  const [imageStatus, setImageStatus] = useState<'draft' | 'published'>('published');
  const [imageError, setImageError] = useState('');

  // Delete Confirmation State
  const [itemToDelete, setItemToDelete] = useState<LessonMedia | null>(null);

  // Current selected lesson object
  const activeLesson = lessons.find(l => l.id === selectedLessonId) || availableLessons[0];

  // Media items for currently active lesson
  const lessonVideos = mediaList
    .filter(m => m.lessonId === activeLesson?.id && m.type === 'video')
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const lessonImages = mediaList
    .filter(m => m.lessonId === activeLesson?.id && m.type === 'image')
    .sort((a, b) => a.sortOrder - b.sortOrder);

  // Live video URL validation on input change
  const handleVideoUrlChange = (value: string) => {
    setVideoRawUrl(value);
    if (!value.trim()) {
      setValidationResult(null);
      return;
    }
    const res = validateAndFormatVideoUrl(value);
    setValidationResult(res);
  };

  // Open Video Add/Edit Modal
  const openVideoModal = (videoToEdit?: LessonMedia) => {
    if (videoToEdit) {
      setEditingVideo(videoToEdit);
      setVideoTitle(videoToEdit.title);
      setVideoRawUrl(videoToEdit.sourceUrl);
      setVideoDesc(videoToEdit.description);
      setVideoSortOrder(videoToEdit.sortOrder);
      setVideoStatus(videoToEdit.status);
      setValidationResult(validateAndFormatVideoUrl(videoToEdit.sourceUrl));
    } else {
      setEditingVideo(null);
      setVideoTitle('');
      setVideoRawUrl('');
      setVideoDesc('');
      setVideoSortOrder(lessonVideos.length + 1);
      setVideoStatus('published');
      setValidationResult(null);
    }
    setShowVideoModal(true);
  };

  // Save Video
  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLesson) return;

    if (!videoTitle.trim()) {
      alert('Vui lòng nhập tiêu đề video.');
      return;
    }

    const val = validateAndFormatVideoUrl(videoRawUrl);
    if (!val.isValid || !val.embedUrl) {
      alert(val.error || 'Đường dẫn video không hợp lệ.');
      return;
    }

    if (editingVideo) {
      const updated: LessonMedia = {
        ...editingVideo,
        title: videoTitle.trim(),
        description: videoDesc.trim(),
        sourceUrl: videoRawUrl.trim(),
        embedUrl: val.embedUrl,
        sortOrder: Number(videoSortOrder) || 1,
        status: videoStatus,
        updatedAt: new Date().toISOString()
      };
      onUpdateMedia(updated);
    } else {
      const newVideo: LessonMedia = {
        id: 'media-v-' + Date.now(),
        lessonId: activeLesson.id,
        type: 'video',
        title: videoTitle.trim(),
        description: videoDesc.trim(),
        sourceUrl: videoRawUrl.trim(),
        embedUrl: val.embedUrl,
        sortOrder: Number(videoSortOrder) || lessonVideos.length + 1,
        status: videoStatus,
        createdBy: 'Giáo viên THCS Mỹ Hòa',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      onAddMedia(newVideo);
    }

    setShowVideoModal(false);
  };

  // Open Image Add/Edit Modal
  const openImageModal = (imageToEdit?: LessonMedia) => {
    setImageError('');
    if (imageToEdit) {
      setEditingImage(imageToEdit);
      setImageTitle(imageToEdit.title);
      setImageSourceUrl(imageToEdit.sourceUrl);
      setImageCaption(imageToEdit.caption || '');
      setImageAltText(imageToEdit.altText || '');
      setImageSortOrder(imageToEdit.sortOrder);
      setImageStatus(imageToEdit.status);
    } else {
      setEditingImage(null);
      setImageTitle('');
      setImageSourceUrl('');
      setImageCaption('');
      setImageAltText('');
      setImageSortOrder(lessonImages.length + 1);
      setImageStatus('published');
    }
    setShowImageModal(true);
  };

  // Handle Image File Upload (local FileReader)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setImageError('Vui lòng chọn tệp hình ảnh hợp lệ (PNG, JPG, WEBP, GIF).');
      return;
    }

    // Check size limit: max 5MB
    if (file.size > 5 * 1024 * 1024) {
      setImageError('Dung lượng hình ảnh vượt quá giới hạn 5MB.');
      return;
    }

    setImageError('');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageSourceUrl(reader.result);
        if (!imageTitle) {
          setImageTitle(file.name.replace(/\.[^/.]+$/, ''));
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Image
  const handleSaveImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLesson) return;

    if (!imageTitle.trim() || !imageSourceUrl.trim()) {
      setImageError('Vui lòng nhập tên hình ảnh và chọn ảnh hoặc dán URL.');
      return;
    }

    if (editingImage) {
      const updated: LessonMedia = {
        ...editingImage,
        title: imageTitle.trim(),
        sourceUrl: imageSourceUrl.trim(),
        caption: imageCaption.trim(),
        altText: imageAltText.trim() || imageTitle.trim(),
        sortOrder: Number(imageSortOrder) || 1,
        status: imageStatus,
        updatedAt: new Date().toISOString()
      };
      onUpdateMedia(updated);
    } else {
      const newImg: LessonMedia = {
        id: 'media-img-' + Date.now(),
        lessonId: activeLesson.id,
        type: 'image',
        title: imageTitle.trim(),
        description: imageCaption.trim(),
        sourceUrl: imageSourceUrl.trim(),
        caption: imageCaption.trim(),
        altText: imageAltText.trim() || imageTitle.trim(),
        sortOrder: Number(imageSortOrder) || lessonImages.length + 1,
        status: imageStatus,
        createdBy: 'Giáo viên THCS Mỹ Hòa',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      onAddMedia(newImg);
    }

    setShowImageModal(false);
  };

  // Move item up / down in sort order
  const handleMoveOrder = (item: LessonMedia, direction: 'up' | 'down') => {
    const list = item.type === 'video' ? [...lessonVideos] : [...lessonImages];
    const index = list.findIndex(m => m.id === item.id);
    if (index === -1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    // Swap sortOrders
    const currentSort = item.sortOrder;
    const targetItem = list[targetIndex];
    const targetSort = targetItem.sortOrder;

    onUpdateMedia({ ...item, sortOrder: targetSort });
    onUpdateMedia({ ...targetItem, sortOrder: currentSort });
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Lesson Selector Filter */}
      <div className="p-6 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-black text-[#172B4D] flex items-center gap-2">
            <Film className="w-5 h-5 text-red-500" />
            Quản lý Video & Hình ảnh bài học
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
            Thêm video bài giảng nhúng YouTube và hình ảnh minh họa cho từng tiết học. Nội dung xuất bản sẽ hiển thị ngay cho học sinh khi mở bài học.
          </p>
        </div>

        {/* Filters for Grade, Subject and Lesson */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">1. Chọn Khối lớp:</label>
            <select
              value={selectedGrade}
              onChange={e => {
                const g = parseInt(e.target.value, 10) as GradeLevel;
                setSelectedGrade(g);
                const nextLessons = lessons.filter(l => l.grade === g && l.subjectId === selectedSubjectId);
                setSelectedLessonId(nextLessons[0]?.id || '');
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
            >
              <option value={6}>Khối 6</option>
              <option value={7}>Khối 7</option>
              <option value={8}>Khối 8</option>
              <option value={9}>Khối 9</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">2. Chọn Môn học:</label>
            <select
              value={selectedSubjectId}
              onChange={e => {
                const s = e.target.value as SubjectId;
                setSelectedSubjectId(s);
                const nextLessons = lessons.filter(l => l.grade === selectedGrade && l.subjectId === s);
                setSelectedLessonId(nextLessons[0]?.id || '');
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
            >
              {SUBJECTS.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">3. Chọn Tiết / Bài học:</label>
            <select
              value={selectedLessonId}
              onChange={e => setSelectedLessonId(e.target.value)}
              disabled={availableLessons.length === 0}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-slate-50"
            >
              {availableLessons.length > 0 ? (
                availableLessons.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.title}
                  </option>
                ))
              ) : (
                <option value="">Chưa có bài học cho môn này</option>
              )}
            </select>
          </div>
        </div>

        {activeLesson && (
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-blue-900">
                Đang quản lý nội dung bài: {activeLesson.title}
              </span>
              <div className="text-[11px] text-blue-700">
                Chủ đề: {activeLesson.chapter} • Hiện có: <strong>{lessonVideos.length} video</strong> và <strong>{lessonImages.length} hình ảnh</strong>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white text-blue-700 font-bold border border-blue-200 shrink-0">
              Khối {activeLesson.grade}
            </span>
          </div>
        )}
      </div>

      {/* 2. Media Tabs: Videos vs Images */}
      {activeLesson ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl">
              <button
                onClick={() => setMediaTab('video')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mediaTab === 'video'
                    ? 'bg-white text-red-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Film className="w-4 h-4" />
                <span>Video bài học ({lessonVideos.length})</span>
              </button>

              <button
                onClick={() => setMediaTab('image')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  mediaTab === 'image'
                    ? 'bg-white text-emerald-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Hình ảnh minh họa ({lessonImages.length})</span>
              </button>
            </div>

            {mediaTab === 'video' ? (
              <button
                onClick={() => openVideoModal()}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                + Thêm video mới
              </button>
            ) : (
              <button
                onClick={() => openImageModal()}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                + Thêm hình ảnh mới
              </button>
            )}
          </div>

          {/* ======================================================== */}
          {/* VIDEOS LIST */}
          {/* ======================================================== */}
          {mediaTab === 'video' && (
            <div className="space-y-4">
              {lessonVideos.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {lessonVideos.map((video, idx) => (
                    <div
                      key={video.id}
                      className="p-5 rounded-2xl bg-white border border-[#E2EAF5] hover:border-blue-300 shadow-xs transition-all space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className="w-7 h-7 rounded-xl bg-red-100 text-red-700 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {video.sortOrder}
                          </span>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-sm sm:text-base font-bold text-[#172B4D]">
                                {video.title}
                              </h4>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  video.status === 'published'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {video.status === 'published' ? '✓ Đã xuất bản' : '○ Bản nháp (Học sinh chưa thấy)'}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                              {video.description || 'Chưa có mô tả chi tiết cho video này.'}
                            </p>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
                          <button
                            onClick={() => handleMoveOrder(video, 'up')}
                            disabled={idx === 0}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
                            title="Di chuyển lên"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveOrder(video, 'down')}
                            disabled={idx === lessonVideos.length - 1}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
                            title="Di chuyển xuống"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              onUpdateMedia({
                                ...video,
                                status: video.status === 'published' ? 'draft' : 'published'
                              });
                            }}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                              video.status === 'published'
                                ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                            }`}
                          >
                            {video.status === 'published' ? 'Chuyển về Nháp' : 'Xuất bản ngay'}
                          </button>
                          <button
                            onClick={() => openVideoModal(video)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            title="Chỉnh sửa video"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setItemToDelete(video)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Xóa video"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Video Embed Preview Box */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                        <div className="md:col-span-5 relative aspect-video rounded-xl overflow-hidden bg-black shadow-inner">
                          {video.embedUrl ? (
                            <iframe
                              src={video.embedUrl}
                              title={video.title}
                              className="w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              sandbox="allow-scripts allow-same-origin allow-presentation"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-xs text-slate-400">
                              Lỗi tải iframe
                            </div>
                          )}
                        </div>
                        <div className="md:col-span-7 space-y-1 text-xs text-slate-600">
                          <div>
                            <span className="font-bold text-slate-700">Đường dẫn gốc: </span>
                            <a
                              href={video.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline break-all"
                            >
                              {video.sourceUrl}
                            </a>
                          </div>
                          <div>
                            <span className="font-bold text-slate-700">URL nhúng an toàn: </span>
                            <code className="bg-slate-200 px-1.5 py-0.5 rounded text-[11px] font-mono break-all text-slate-800">
                              {video.embedUrl}
                            </code>
                          </div>
                          <div className="text-[11px] text-slate-400 pt-1">
                            Thứ tự hiển thị: {video.sortOrder} • Tạo bởi: {video.createdBy}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-3">
                  <Film className="w-10 h-10 text-slate-300 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-700">
                    Bài học "{activeLesson.title}" chưa có video bài giảng nào
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Thầy cô có thể dán đường dẫn YouTube hoặc YouTube Shorts để nhúng bài giảng trực quan cho học sinh.
                  </p>
                  <button
                    onClick={() => openVideoModal()}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Thêm video đầu tiên
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* IMAGES LIST */}
          {/* ======================================================== */}
          {mediaTab === 'image' && (
            <div className="space-y-4">
              {lessonImages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lessonImages.map((img, idx) => (
                    <div
                      key={img.id}
                      className="p-4 rounded-2xl bg-white border border-[#E2EAF5] hover:border-blue-300 shadow-xs transition-all space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        {/* Thumbnail */}
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                          <img
                            src={img.sourceUrl}
                            alt={img.altText || img.title}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold">
                            Thứ tự: {img.sortOrder}
                          </span>
                          <span
                            className={`absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              img.status === 'published'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-amber-500 text-white'
                            }`}
                          >
                            {img.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                          </span>
                        </div>

                        <h4 className="text-xs sm:text-sm font-bold text-[#172B4D] line-clamp-1">
                          {img.title}
                        </h4>

                        {img.caption && (
                          <p className="text-[11px] text-slate-500 line-clamp-2 italic">
                            Chú thích: {img.caption}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleMoveOrder(img, 'up')}
                            disabled={idx === 0}
                            className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                            title="Di chuyển trước"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveOrder(img, 'down')}
                            disabled={idx === lessonImages.length - 1}
                            className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer"
                            title="Di chuyển sau"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openImageModal(img)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
                            title="Sửa hình ảnh"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setItemToDelete(img)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                            title="Xóa hình ảnh"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-3">
                  <ImageIcon className="w-10 h-10 text-slate-300 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-700">
                    Bài học "{activeLesson.title}" chưa có hình ảnh minh họa
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Thầy cô có thể tải lên sơ đồ tư duy, hình ảnh linh kiện máy tính hoặc ảnh chụp sách giáo khoa để học sinh dễ hình dung.
                  </p>
                  <button
                    onClick={() => openImageModal()}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Thêm hình ảnh đầu tiên
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500">
          Chưa có bài học nào được chọn.
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT VIDEO */}
      {/* ======================================================== */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl border border-red-100 my-auto animate-scaleUp">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-black text-[#172B4D] mb-4 flex items-center gap-2">
              <Film className="w-5 h-5 text-red-500" />
              {editingVideo ? 'Chỉnh sửa video bài học' : 'Thêm video bài giảng mới'}
            </h3>

            <form onSubmit={handleSaveVideo} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tiêu đề video bài học:
                </label>
                <input
                  type="text"
                  value={videoTitle}
                  onChange={e => setVideoTitle(e.target.value)}
                  placeholder="Ví dụ: Video Bài 1 - Thông tin và thu nhận thông tin"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold"
                  required
                />
              </div>

              {/* URL Input Box with Mandatory Label */}
              <div>
                <label className="block text-xs font-black text-[#172B4D] mb-1">
                  Dán đường dẫn video tại đây:
                </label>
                <input
                  type="text"
                  value={videoRawUrl}
                  onChange={e => handleVideoUrlChange(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... hoặc https://youtu.be/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-xs sm:text-sm font-mono"
                  required
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Hỗ trợ: YouTube video, YouTube Shorts, link chia sẻ youtu.be.
                </p>
              </div>

              {/* Validation Status & Live Preview */}
              {validationResult && (
                <div className="space-y-2">
                  {validationResult.isValid ? (
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-2">
                      <div className="flex items-center gap-1.5 font-bold">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>Đường dẫn YouTube hợp lệ! Video ID: {validationResult.videoId}</span>
                      </div>
                      
                      {/* Live Preview Container */}
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black shadow-md">
                        <iframe
                          src={validationResult.embedUrl}
                          title="Khung xem trước video"
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          sandbox="allow-scripts allow-same-origin allow-presentation"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{validationResult.error}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mô tả ngắn gọn nội dung video:
                </label>
                <textarea
                  rows={2}
                  value={videoDesc}
                  onChange={e => setVideoDesc(e.target.value)}
                  placeholder="Tóm tắt nội dung trọng tâm của video giúp học sinh theo dõi..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Thứ tự hiển thị:
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={videoSortOrder}
                    onChange={e => setVideoSortOrder(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Trạng thái xuất bản:
                  </label>
                  <select
                    value={videoStatus}
                    onChange={e => setVideoStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  >
                    <option value="published">Đã xuất bản (Học sinh xem được ngay)</option>
                    <option value="draft">Bản nháp (Chỉ giáo viên thấy)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowVideoModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={validationResult ? !validationResult.isValid : false}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {editingVideo ? 'Cập nhật video' : 'Lưu và thêm video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT IMAGE */}
      {/* ======================================================== */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl border border-emerald-100 my-auto animate-scaleUp">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-black text-[#172B4D] mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-emerald-600" />
              {editingImage ? 'Chỉnh sửa hình ảnh minh họa' : 'Thêm hình ảnh minh họa bài học'}
            </h3>

            {imageError && (
              <div className="mb-3 p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{imageError}</span>
              </div>
            )}

            <form onSubmit={handleSaveImage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tên hình ảnh:
                </label>
                <input
                  type="text"
                  value={imageTitle}
                  onChange={e => setImageTitle(e.target.value)}
                  placeholder="Ví dụ: Sơ đồ chu trình xử lý thông tin"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold"
                  required
                />
              </div>

              {/* Image Input Options: Upload from computer or paste URL */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Chọn ảnh từ máy tính hoặc dán đường dẫn hình ảnh HTTPS:
                </label>
                
                {/* Local file chooser */}
                <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center hover:bg-slate-100 transition-colors relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-blue-600">
                    Chọn tệp ảnh từ thiết bị
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Hỗ trợ JPG, PNG, WEBP tối đa 5MB
                  </span>
                </div>

                {/* Or paste HTTPS URL */}
                <div className="relative">
                  <input
                    type="url"
                    value={imageSourceUrl}
                    onChange={e => setImageSourceUrl(e.target.value)}
                    placeholder="Hoặc dán URL ảnh https://..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Thumbnail Preview */}
              {imageSourceUrl && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-600 block mb-1.5">
                    Xem trước hình ảnh:
                  </span>
                  <div className="relative aspect-video max-h-48 rounded-xl overflow-hidden bg-slate-200">
                    <img
                      src={imageSourceUrl}
                      alt="Xem trước"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chú thích hiển thị dưới ảnh (Caption):
                </label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={e => setImageCaption(e.target.value)}
                  placeholder="Ví dụ: Hình 1.1: Sơ đồ luồng dữ liệu"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mô tả thay thế cho khả năng tiếp cận (Alt Text):
                </label>
                <input
                  type="text"
                  value={imageAltText}
                  onChange={e => setImageAltText(e.target.value)}
                  placeholder="Mô tả nội dung hình ảnh..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Thứ tự hiển thị:
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={imageSortOrder}
                    onChange={e => setImageSortOrder(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Trạng thái xuất bản:
                  </label>
                  <select
                    value={imageStatus}
                    onChange={e => setImageStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  >
                    <option value="published">Đã xuất bản (Học sinh thấy)</option>
                    <option value="draft">Bản nháp (Ẩn với học sinh)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowImageModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  {editingImage ? 'Cập nhật ảnh' : 'Lưu và thêm ảnh'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ======================================================== */}
      {itemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-red-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h4 className="text-base font-bold text-[#172B4D]">
                Xác nhận xóa {itemToDelete.type === 'video' ? 'video' : 'hình ảnh'}?
              </h4>
              <p className="text-xs text-slate-500">
                Bạn có chắc chắn muốn xóa "<strong>{itemToDelete.title}</strong>"? Thao tác này sẽ gỡ bỏ nội dung khỏi bài học của học sinh.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => {
                  onDeleteMedia(itemToDelete.id);
                  setItemToDelete(null);
                }}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Đồng ý xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
