import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Eye,
  Calendar,
  Clock,
  Send,
  Save,
  Check,
  AlertCircle,
  Sparkles,
  Layers,
  HelpCircle,
  ArrowRight,
  X
} from 'lucide-react';
import {
  Assignment,
  AssignmentQuestion,
  AssignmentQuestionType,
  GradeLevel,
  SubjectId,
  SubjectMeta,
  TeacherDocument
} from '../../types';
import { SUBJECTS } from '../../data/mockData';

interface AssignmentCreatorProps {
  currentGrade: GradeLevel;
  currentSubject: SubjectMeta;
  documents: TeacherDocument[];
  onSaveAssignment: (assignment: Assignment) => void;
  onCancel: () => void;
  initialAssignment?: Assignment | null;
}

export const AssignmentCreator: React.FC<AssignmentCreatorProps> = ({
  currentGrade,
  currentSubject,
  documents,
  onSaveAssignment,
  onCancel,
  initialAssignment
}) => {
  // General Info
  const [title, setTitle] = useState(initialAssignment?.title || '');
  const [subjectId, setSubjectId] = useState<SubjectId>(initialAssignment?.subjectId || currentSubject.id);
  const [grade, setGrade] = useState<GradeLevel>(initialAssignment?.grade || currentGrade);
  const [chapter, setChapter] = useState(initialAssignment?.chapter || 'Chủ đề 1: Máy tính và cộng đồng');
  const [description, setDescription] = useState(
    initialAssignment?.description ||
      'Học sinh đọc kỹ đề bài và hoàn thành các câu hỏi trắc nghiệm, đúng/sai và tự luận trước hạn nộp.'
  );
  const [durationMinutes, setDurationMinutes] = useState<number>(initialAssignment?.durationMinutes ?? 45);
  const [dueDate, setDueDate] = useState<string>(
    initialAssignment?.dueDate
      ? initialAssignment.dueDate.split('T')[0]
      : new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
  );
  const [maxAttempts, setMaxAttempts] = useState<number>(initialAssignment?.maxAttempts || 2);
  const [targetAudience, setTargetAudience] = useState<'all_grade' | 'specific_classes'>(
    initialAssignment?.targetAudience === 'specific_classes' ? 'specific_classes' : 'all_grade'
  );
  const [selectedClasses, setSelectedClasses] = useState<string[]>(
    initialAssignment?.targetClasses || [`${grade}A1`, `${grade}A2`]
  );

  // Questions List
  const [questions, setQuestions] = useState<AssignmentQuestion[]>(
    initialAssignment?.questions || [
      {
        id: 'q_init_1',
        type: 'single_choice',
        prompt: 'Nhập câu hỏi trắc nghiệm tại đây...',
        options: ['Phương án A', 'Phương án B', 'Phương án C', 'Phương án D'],
        correctAnswer: 0,
        points: 2.5,
        explanation: 'Giải thích chi tiết cho đáp án đúng.'
      }
    ]
  );

  // New question draft form
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [qType, setQType] = useState<AssignmentQuestionType>('single_choice');
  const [qPrompt, setQPrompt] = useState('');
  const [qOptions, setQOptions] = useState<string[]>(['', '', '', '']);
  const [qSingleCorrect, setQSingleCorrect] = useState<number>(0);
  const [qMultiCorrect, setQMultiCorrect] = useState<number[]>([0]);
  const [qTrueFalseCorrect, setQTrueFalseCorrect] = useState<number>(0); // 0 = Dung, 1 = Sai
  const [qFillInCorrect, setQFillInCorrect] = useState<string>('');
  const [qPoints, setQPoints] = useState<number>(2);
  const [qExplanation, setQExplanation] = useState('');

  // AI / Document Suggestion
  const [showDocImportModal, setShowDocImportModal] = useState(false);

  // Calculate total points
  const totalPoints = questions.reduce((acc, q) => acc + q.points, 0);

  // Open Add Question Modal
  const openNewQuestion = (type: AssignmentQuestionType = 'single_choice') => {
    setEditingQuestionId(null);
    setQType(type);
    setQPrompt('');
    setQOptions(['', '', '', '']);
    setQSingleCorrect(0);
    setQMultiCorrect([0]);
    setQTrueFalseCorrect(0);
    setQFillInCorrect('');
    setQPoints(2);
    setQExplanation('');
    setShowAddQuestionModal(true);
  };

  // Open Edit Question Modal
  const openEditQuestion = (q: AssignmentQuestion) => {
    setEditingQuestionId(q.id);
    setQType(q.type);
    setQPrompt(q.prompt);
    setQOptions(q.options ? [...q.options] : ['', '', '', '']);
    if (q.type === 'single_choice') {
      setQSingleCorrect(typeof q.correctAnswer === 'number' ? q.correctAnswer : 0);
    } else if (q.type === 'multiple_choice') {
      setQMultiCorrect(Array.isArray(q.correctAnswer) ? q.correctAnswer : [0]);
    } else if (q.type === 'true_false') {
      setQTrueFalseCorrect(typeof q.correctAnswer === 'number' ? q.correctAnswer : 0);
    } else if (q.type === 'fill_in') {
      setQFillInCorrect(typeof q.correctAnswer === 'string' ? q.correctAnswer : '');
    }
    setQPoints(q.points);
    setQExplanation(q.explanation || '');
    setShowAddQuestionModal(true);
  };

  // Save question to list
  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qPrompt.trim()) {
      alert('Vui lòng nhập nội dung câu hỏi!');
      return;
    }

    let calculatedCorrect: any = 0;
    let finalOptions: string[] | undefined = undefined;

    if (qType === 'single_choice') {
      if (qOptions.some((o) => !o.trim())) {
        alert('Vui lòng điền đủ 4 phương án trắc nghiệm!');
        return;
      }
      calculatedCorrect = qSingleCorrect;
      finalOptions = qOptions.map((o) => o.trim());
    } else if (qType === 'multiple_choice') {
      if (qOptions.some((o) => !o.trim())) {
        alert('Vui lòng điền đủ các phương án!');
        return;
      }
      calculatedCorrect = qMultiCorrect;
      finalOptions = qOptions.map((o) => o.trim());
    } else if (qType === 'true_false') {
      calculatedCorrect = qTrueFalseCorrect;
      finalOptions = ['Đúng', 'Sai'];
    } else if (qType === 'fill_in') {
      if (!qFillInCorrect.trim()) {
        alert('Vui lòng nhập đáp án chuẩn cho câu điền từ!');
        return;
      }
      calculatedCorrect = qFillInCorrect.trim();
    }

    const questionObj: AssignmentQuestion = {
      id: editingQuestionId || `q_${Date.now()}`,
      type: qType,
      prompt: qPrompt.trim(),
      options: finalOptions,
      correctAnswer: calculatedCorrect,
      points: Number(qPoints) || 1,
      explanation: qExplanation.trim() || 'Đáp án theo hướng dẫn chấm của giáo viên bộ môn.'
    };

    if (editingQuestionId) {
      setQuestions((prev) =>
        prev.map((item) => (item.id === editingQuestionId ? questionObj : item))
      );
    } else {
      setQuestions((prev) => [...prev, questionObj]);
    }

    setShowAddQuestionModal(false);
  };

  const handleDeleteQuestion = (qId: string) => {
    if (questions.length <= 1) {
      alert('Bài tập cần có ít nhất 1 câu hỏi!');
      return;
    }
    setQuestions((prev) => prev.filter((q) => q.id !== qId));
  };

  // Final Publish or Draft Save
  const handleFinalSubmit = (status: 'published' | 'draft') => {
    if (!title.trim()) {
      alert('Vui lòng nhập tên bài tập!');
      return;
    }
    if (questions.length === 0) {
      alert('Bài tập chưa có câu hỏi nào!');
      return;
    }

    const newAssignment: Assignment = {
      id: initialAssignment?.id || `asg_${Date.now()}`,
      title: title.trim(),
      subjectId,
      grade,
      chapter: chapter.trim(),
      description: description.trim(),
      durationMinutes: Number(durationMinutes),
      dueDate: new Date(dueDate).toISOString(),
      maxPoints: Math.round(totalPoints * 10) / 10,
      maxAttempts: Number(maxAttempts),
      status,
      targetAudience,
      targetClasses: targetAudience === 'specific_classes' ? selectedClasses : undefined,
      teacherId: 'u-teacher-01',
      teacherName: 'Giáo viên THCS Mỹ Hòa',
      createdAt: new Date().toISOString(),
      questions
    };

    onSaveAssignment(newAssignment);
    alert(
      status === 'published'
        ? `Đã giao bài tập "${title}" thành công cho học sinh Khối ${grade}!`
        : `Đã lưu bản nháp bài tập "${title}"!`
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Trình tạo bài tập đa tương tác</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            TẠO BÀI TẬP VÀ ĐỀ KIỂM TRA CHO HỌC SINH
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
            Biên soạn câu hỏi trắc nghiệm một đáp án, nhiều đáp án, đúng/sai, điền từ, tự luận và thực hành. Thiết lập hạn nộp và đối tượng học sinh.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onCancel}
            className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer transition-colors"
          >
            Quay lại
          </button>
          <button
            onClick={() => handleFinalSubmit('draft')}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold shadow-sm cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            Lưu nháp
          </button>
          <button
            onClick={() => handleFinalSubmit('published')}
            className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold shadow-md cursor-pointer transition-all flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            Xuất bản & Giao bài
          </button>
        </div>
      </div>

      {/* Main Settings Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2EAF5] shadow-2xs space-y-5 text-xs">
        <h3 className="text-sm font-extrabold text-[#172B4D] border-b border-slate-100 pb-3">
          1. Thông tin cấu hình bài tập
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">
              Tên bài tập <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Bài tập tuần 8: Mạng máy tính và An toàn trên Internet"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Môn học</label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value as SubjectId)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-bold text-xs"
            >
              {SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Khối lớp</label>
            <select
              value={grade}
              onChange={(e) => setGrade(Number(e.target.value) as GradeLevel)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-bold text-xs"
            >
              <option value={6}>Khối 6</option>
              <option value={7}>Khối 7</option>
              <option value={8}>Khối 8</option>
              <option value={9}>Khối 9</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Thời gian làm bài (Phút)</label>
            <input
              type="number"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              placeholder="45"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Hạn nộp bài</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Số lần được làm</label>
            <select
              value={maxAttempts}
              onChange={(e) => setMaxAttempts(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-bold text-xs"
            >
              <option value={1}>1 lần duy nhất</option>
              <option value={2}>2 lần</option>
              <option value={3}>3 lần</option>
              <option value={99}>Không giới hạn</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Chủ đề / Bài học liên quan</label>
            <input
              type="text"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              placeholder="Chủ đề 2: Mạng máy tính và Internet"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Đối tượng giao bài</label>
            <div className="flex items-center gap-3 mt-1.5">
              <label className="flex items-center gap-1.5 font-semibold text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="audience"
                  checked={targetAudience === 'all_grade'}
                  onChange={() => setTargetAudience('all_grade')}
                  className="w-4 h-4 text-blue-600"
                />
                Toàn bộ Khối {grade}
              </label>
              <label className="flex items-center gap-1.5 font-semibold text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="audience"
                  checked={targetAudience === 'specific_classes'}
                  onChange={() => setTargetAudience('specific_classes')}
                  className="w-4 h-4 text-blue-600"
                />
                Lớp cụ thể ({grade}A1, {grade}A2)
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Mô tả và hướng dẫn làm bài</label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs resize-none"
          />
        </div>
      </div>

      {/* Questions Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2EAF5] shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-sm font-extrabold text-[#172B4D]">
              2. Danh sách câu hỏi ({questions.length} câu • Tổng điểm: {totalPoints}đ)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Hỗ trợ đầy đủ 6 dạng bài tập: Trắc nghiệm 1 đáp án, nhiều đáp án, đúng/sai, điền từ, tự luận và thực hành.
            </p>
          </div>

          {/* Add Question Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowDocImportModal(true)}
              className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Lấy từ Sách & Tài liệu
            </button>

            <button
              onClick={() => openNewQuestion('single_choice')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4" />
              Thêm câu hỏi mới
            </button>
          </div>
        </div>

        {/* Question Type Buttons Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-bold shrink-0">Thêm nhanh dạng:</span>
          {[
            { type: 'single_choice' as AssignmentQuestionType, label: '+ Trắc nghiệm 1 đáp án' },
            { type: 'multiple_choice' as AssignmentQuestionType, label: '+ Trắc nghiệm nhiều đáp án' },
            { type: 'true_false' as AssignmentQuestionType, label: '+ Đúng / Sai' },
            { type: 'fill_in' as AssignmentQuestionType, label: '+ Điền từ' },
            { type: 'essay' as AssignmentQuestionType, label: '+ Tự luận' },
            { type: 'practice' as AssignmentQuestionType, label: '+ Thực hành' }
          ].map((btn) => (
            <button
              key={btn.type}
              onClick={() => openNewQuestion(btn.type)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 text-slate-600 font-bold text-[11px] shrink-0 cursor-pointer transition-colors"
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Questions List */}
        <div className="space-y-3 pt-2">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-blue-300 transition-all space-y-2.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                    {q.type === 'single_choice' && 'Trắc nghiệm 1 đáp án'}
                    {q.type === 'multiple_choice' && 'Trắc nghiệm nhiều đáp án'}
                    {q.type === 'true_false' && 'Đúng / Sai'}
                    {q.type === 'fill_in' && 'Điền từ'}
                    {q.type === 'essay' && 'Tự luận'}
                    {q.type === 'practice' && 'Thực hành'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                    {q.points} điểm
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => openEditQuestion(q)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-white cursor-pointer transition-colors"
                    title="Chỉnh sửa câu này"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white cursor-pointer transition-colors"
                    title="Xóa câu hỏi"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
                {q.prompt}
              </p>

              {/* Options Preview */}
              {q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                  {q.options.map((opt, oIdx) => {
                    const isCorrect =
                      q.type === 'single_choice'
                        ? q.correctAnswer === oIdx
                        : q.type === 'multiple_choice' && Array.isArray(q.correctAnswer)
                        ? q.correctAnswer.includes(oIdx)
                        : q.type === 'true_false' && q.correctAnswer === oIdx;
                    return (
                      <div
                        key={oIdx}
                        className={`p-2 rounded-xl border flex items-center gap-2 ${
                          isCorrect
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-[10px] font-bold shrink-0">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="truncate">{opt}</span>
                        {isCorrect && <Check className="w-3.5 h-3.5 text-emerald-600 ml-auto" />}
                      </div>
                    );
                  })}
                </div>
              )}

              {q.type === 'fill_in' && (
                <div className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                  <strong>Đáp án đúng:</strong> {q.correctAnswer?.toString()}
                </div>
              )}

              {q.explanation && (
                <div className="text-[11px] text-slate-500 italic">
                  Giải thích: {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODAL: ADD / EDIT QUESTION */}
      {/* ===================================================================== */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 my-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-[#172B4D]">
                {editingQuestionId ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi mới vào bài tập'}
              </h3>
              <button
                onClick={() => setShowAddQuestionModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Dạng câu hỏi
                  </label>
                  <select
                    value={qType}
                    onChange={(e) => setQType(e.target.value as AssignmentQuestionType)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-xs"
                  >
                    <option value="single_choice">Trắc nghiệm một đáp án đúng</option>
                    <option value="multiple_choice">Trắc nghiệm nhiều đáp án đúng</option>
                    <option value="true_false">Đúng / Sai</option>
                    <option value="fill_in">Điền từ hoặc câu trả lời ngắn</option>
                    <option value="essay">Tự luận (Học sinh nhập đoạn văn)</option>
                    <option value="practice">Bài tập thực hành / Dự án</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Điểm số cho câu hỏi
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="10"
                    value={qPoints}
                    onChange={(e) => setQPoints(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nội dung câu hỏi / Yêu cầu đề bài <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={qPrompt}
                  onChange={(e) => setQPrompt(e.target.value)}
                  required
                  placeholder="Nhập nội dung câu hỏi chi tiết..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-xs font-medium"
                />
              </div>

              {/* Dynamic options based on type */}
              {qType === 'single_choice' && (
                <div className="space-y-2">
                  <label className="block font-bold text-slate-700">
                    4 Phương án (Tích chọn đáp án đúng):
                  </label>
                  {qOptions.map((opt, oIdx) => (
                    <div key={oIdx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="single_choice_ans"
                        checked={qSingleCorrect === oIdx}
                        onChange={() => setQSingleCorrect(oIdx)}
                        className="w-4 h-4 text-blue-600 cursor-pointer"
                      />
                      <span className="font-bold text-slate-500 w-5">
                        {String.fromCharCode(65 + oIdx)}:
                      </span>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const next = [...qOptions];
                          next[oIdx] = e.target.value;
                          setQOptions(next);
                        }}
                        placeholder={`Phương án ${String.fromCharCode(65 + oIdx)}...`}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                        required
                      />
                    </div>
                  ))}
                </div>
              )}

              {qType === 'multiple_choice' && (
                <div className="space-y-2">
                  <label className="block font-bold text-slate-700">
                    Các phương án (Tích chọn tất cả các đáp án đúng):
                  </label>
                  {qOptions.map((opt, oIdx) => {
                    const isChecked = qMultiCorrect.includes(oIdx);
                    return (
                      <div key={oIdx} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            if (isChecked) {
                              setQMultiCorrect(qMultiCorrect.filter((i) => i !== oIdx));
                            } else {
                              setQMultiCorrect([...qMultiCorrect, oIdx]);
                            }
                          }}
                          className="w-4 h-4 text-indigo-600 cursor-pointer rounded"
                        />
                        <span className="font-bold text-slate-500 w-5">
                          {String.fromCharCode(65 + oIdx)}:
                        </span>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const next = [...qOptions];
                            next[oIdx] = e.target.value;
                            setQOptions(next);
                          }}
                          placeholder={`Phương án ${String.fromCharCode(65 + oIdx)}...`}
                          className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                          required
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {qType === 'true_false' && (
                <div className="space-y-2">
                  <label className="block font-bold text-slate-700">
                    Đáp án chuẩn:
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 font-bold cursor-pointer">
                      <input
                        type="radio"
                        name="tf_correct"
                        checked={qTrueFalseCorrect === 0}
                        onChange={() => setQTrueFalseCorrect(0)}
                        className="w-4 h-4 text-blue-600"
                      />
                      Đúng
                    </label>
                    <label className="flex items-center gap-2 font-bold cursor-pointer">
                      <input
                        type="radio"
                        name="tf_correct"
                        checked={qTrueFalseCorrect === 1}
                        onChange={() => setQTrueFalseCorrect(1)}
                        className="w-4 h-4 text-blue-600"
                      />
                      Sai
                    </label>
                  </div>
                </div>
              )}

              {qType === 'fill_in' && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Đáp án đúng (Từ khóa cần điền chuẩn xác):
                  </label>
                  <input
                    type="text"
                    value={qFillInCorrect}
                    onChange={(e) => setQFillInCorrect(e.target.value)}
                    required
                    placeholder="Ví dụ: Switch hoặc Thiết bị chuyển mạch"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                  />
                </div>
              )}

              {(qType === 'essay' || qType === 'practice') && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px]">
                  💡 Dạng bài tự luận và thực hành sẽ được lưu lại trong mục <strong>"Bài làm của học sinh"</strong> để thầy/cô chấm điểm và nhận xét chi tiết sau khi học sinh nộp bài.
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Lời giải thích chi tiết / Hướng dẫn chấm
                </label>
                <textarea
                  rows={2}
                  value={qExplanation}
                  onChange={(e) => setQExplanation(e.target.value)}
                  placeholder="Giải thích vì sao đáp án đúng để học sinh đối chiếu sau khi thi..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddQuestionModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs cursor-pointer"
                >
                  {editingQuestionId ? 'Cập nhật câu hỏi' : 'Thêm vào bài tập'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL: IMPORT FROM DOCUMENTS */}
      {/* ===================================================================== */}
      {showDocImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 my-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-base text-[#172B4D]">
                  Lấy câu hỏi gợi ý từ Sách & Tài liệu đã tải
                </h3>
              </div>
              <button
                onClick={() => setShowDocImportModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto text-xs">
              {documents.filter((d) => d.suggestedQuestions && d.suggestedQuestions.length > 0)
                .length > 0 ? (
                documents
                  .filter((d) => d.suggestedQuestions && d.suggestedQuestions.length > 0)
                  .map((doc) => (
                    <div
                      key={doc.id}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 bg-slate-50 space-y-2"
                    >
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>{doc.title}</span>
                        <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                          {doc.suggestedQuestions?.length} câu gợi ý
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{doc.topic}</p>

                      <button
                        onClick={() => {
                          const newAdded: AssignmentQuestion[] = (doc.suggestedQuestions || []).map(
                            (sq, i) => ({
                              id: `q_imp_${Date.now()}_${i}`,
                              type:
                                sq.type === 'true_false'
                                  ? 'true_false'
                                  : sq.type === 'essay'
                                  ? 'essay'
                                  : 'single_choice',
                              prompt: sq.question,
                              options:
                                sq.type === 'true_false'
                                  ? ['Đúng', 'Sai']
                                  : sq.type === 'essay'
                                  ? undefined
                                  : [sq.answer, 'Phương án nhiễu 1', 'Phương án nhiễu 2', 'Phương án nhiễu 3'],
                              correctAnswer: 0,
                              points: 2,
                              explanation: `Gợi ý theo tài liệu: ${doc.title}`
                            })
                          );
                          setQuestions((prev) => [...prev, ...newAdded]);
                          setShowDocImportModal(false);
                          alert(`Đã thêm ${newAdded.length} câu hỏi từ tài liệu "${doc.title}"!`);
                        }}
                        className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Chèn các câu hỏi này vào bài tập
                      </button>
                    </div>
                  ))
              ) : (
                <div className="p-8 text-center text-slate-400">
                  Chưa có tài liệu nào chứa câu hỏi gợi ý. Thầy/Cô hãy vào mục "Quản lý sách và tài liệu" để khai thác tài liệu trước.
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowDocImportModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
