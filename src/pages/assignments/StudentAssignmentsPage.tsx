import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  FileText,
  User,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Filter,
  Search,
  Sparkles,
  HelpCircle,
  Send,
  Save,
  Check,
  Award
} from 'lucide-react';
import {
  Assignment,
  AssignmentSubmission,
  AssignmentQuestion,
  GradeLevel,
  SubjectId,
  SubjectMeta,
  UserAccount
} from '../../types';
import { SUBJECTS } from '../../data/mockData';

interface StudentAssignmentsPageProps {
  currentGrade: GradeLevel;
  currentSubject: SubjectMeta;
  currentUser: UserAccount | null;
  assignments: Assignment[];
  submissions: AssignmentSubmission[];
  onSubmitAssignment: (submission: AssignmentSubmission) => void;
  onOpenLogin: () => void;
  onOpenDrawer: () => void;
}

export const StudentAssignmentsPage: React.FC<StudentAssignmentsPageProps> = ({
  currentGrade,
  currentSubject,
  currentUser,
  assignments,
  submissions,
  onSubmitAssignment,
  onOpenLogin,
  onOpenDrawer
}) => {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [reviewSubmission, setReviewSubmission] = useState<AssignmentSubmission | null>(null);

  // Student info fallback
  const studentUid = currentUser?.uid || 'u-student-guest';
  const studentName = currentUser?.displayName || 'Học sinh THCS Mỹ Hòa';
  const studentClass = currentUser?.className || `Khối ${currentGrade}`;

  // Filter assignments relevant for this student
  const filteredAssignments = assignments.filter((asg) => {
    if (asg.status !== 'published') return false;
    if (asg.grade !== currentGrade && asg.grade !== currentUser?.grade) return false;
    if (subjectFilter !== 'all' && asg.subjectId !== subjectFilter) return false;

    // Class target check
    if (asg.targetAudience === 'specific_classes' && asg.targetClasses && currentUser?.className) {
      if (!asg.targetClasses.includes(currentUser.className)) return false;
    }

    const sub = submissions.find(
      (s) => s.assignmentId === asg.id && s.studentUid === studentUid
    );

    if (statusFilter === 'pending' && sub) return false;
    if (statusFilter === 'submitted' && (!sub || sub.status !== 'submitted')) return false;
    if (statusFilter === 'graded' && (!sub || sub.status !== 'graded')) return false;

    return true;
  });

  // Load draft answers from localStorage when starting an assignment
  const startAssignment = (asg: Assignment) => {
    setSelectedAssignment(asg);
    setActiveQuestionIdx(0);
    const draftKey = `myhoa_draft_${asg.id}_${studentUid}`;
    try {
      const savedDraft = localStorage.getItem(draftKey);
      if (savedDraft) {
        setAnswers(JSON.parse(savedDraft));
      } else {
        setAnswers({});
      }
    } catch {
      setAnswers({});
    }

    if (asg.durationMinutes > 0) {
      setTimeLeftSeconds(asg.durationMinutes * 60);
    } else {
      setTimeLeftSeconds(0);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (!selectedAssignment || timeLeftSeconds <= 0) return;
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit when time runs out
          handleSubmitAnswers();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedAssignment, timeLeftSeconds]);

  // Auto-save answers draft
  const handleAnswerChange = (questionId: string, val: any) => {
    const updated = { ...answers, [questionId]: val };
    setAnswers(updated);
    if (selectedAssignment) {
      const draftKey = `myhoa_draft_${selectedAssignment.id}_${studentUid}`;
      try {
        localStorage.setItem(draftKey, JSON.stringify(updated));
      } catch {
        // ignore
      }
    }
  };

  // Handle final submission with auto grading of objective questions
  const handleSubmitAnswers = () => {
    if (!selectedAssignment) return;
    setIsSubmitting(true);

    const questions = selectedAssignment.questions;
    let earnedScore = 0;
    let hasSubjective = false;
    const questionScores: Record<string, number> = {};

    questions.forEach((q) => {
      const ans = answers[q.id];
      if (q.type === 'single_choice' || q.type === 'true_false') {
        if (ans !== undefined && Number(ans) === Number(q.correctAnswer)) {
          earnedScore += q.points;
          questionScores[q.id] = q.points;
        } else {
          questionScores[q.id] = 0;
        }
      } else if (q.type === 'multiple_choice') {
        // Multiple choice comparison
        const correctArr = Array.isArray(q.correctAnswer) ? q.correctAnswer : [];
        const studentArr = Array.isArray(ans) ? ans : [];
        const isMatch =
          correctArr.length === studentArr.length &&
          correctArr.every((c) => studentArr.includes(c));
        if (isMatch) {
          earnedScore += q.points;
          questionScores[q.id] = q.points;
        } else {
          // Partial credit if some are right without wrong choices
          const correctCount = studentArr.filter((c) => correctArr.includes(c)).length;
          const wrongCount = studentArr.filter((c) => !correctArr.includes(c)).length;
          if (wrongCount === 0 && correctCount > 0 && correctArr.length > 0) {
            const partial = Math.round((correctCount / correctArr.length) * q.points * 10) / 10;
            earnedScore += partial;
            questionScores[q.id] = partial;
          } else {
            questionScores[q.id] = 0;
          }
        }
      } else if (q.type === 'fill_in') {
        const studentText = (ans || '').toString().trim().toLowerCase();
        const expected = (q.correctAnswer || '').toString().trim().toLowerCase();
        if (studentText === expected) {
          earnedScore += q.points;
          questionScores[q.id] = q.points;
        } else {
          questionScores[q.id] = 0;
        }
      } else if (q.type === 'essay' || q.type === 'practice') {
        hasSubjective = true;
        // Subjective questions await teacher grading
        questionScores[q.id] = 0;
      }
    });

    const newSubmission: AssignmentSubmission = {
      id: `sub_${Date.now()}`,
      assignmentId: selectedAssignment.id,
      assignmentTitle: selectedAssignment.title,
      studentUid,
      studentName,
      studentClass,
      studentGrade: selectedAssignment.grade,
      subjectId: selectedAssignment.subjectId,
      status: hasSubjective ? 'submitted' : 'graded',
      submittedAt: new Date().toISOString(),
      timeSpentSeconds:
        selectedAssignment.durationMinutes > 0
          ? selectedAssignment.durationMinutes * 60 - timeLeftSeconds
          : 600,
      answers,
      questionScores,
      score: earnedScore,
      maxScore: selectedAssignment.maxPoints,
      attemptCount: 1,
      ...(hasSubjective ? {} : { gradedBy: 'Hệ thống tự động chấm', gradedAt: new Date().toISOString() })
    };

    onSubmitAssignment(newSubmission);

    // Clear draft
    const draftKey = `myhoa_draft_${selectedAssignment.id}_${studentUid}`;
    try {
      localStorage.removeItem(draftKey);
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    setShowSubmitConfirm(false);
    setSelectedAssignment(null);
  };

  // Helper formatting for seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // -------------------------------------------------------------
  // RENDER: EXAM TAKING VIEW
  // -------------------------------------------------------------
  if (selectedAssignment) {
    const currentQ: AssignmentQuestion | undefined = selectedAssignment.questions[activeQuestionIdx];
    const totalQ = selectedAssignment.questions.length;
    const answeredCount = Object.keys(answers).length;

    return (
      <div className="space-y-6 pb-12 animate-fadeIn max-w-4xl mx-auto">
        {/* Header Bar */}
        <div className="bg-white rounded-3xl p-6 border border-[#E2EAF5] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-600 font-bold mb-1">
              <span>{selectedAssignment.chapter}</span>
              <span>•</span>
              <span>Khối {selectedAssignment.grade}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#172B4D]">
              {selectedAssignment.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Giáo viên giao: <strong>{selectedAssignment.teacherName}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {selectedAssignment.durationMinutes > 0 && (
              <div
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-mono font-bold text-sm ${
                  timeLeftSeconds < 300
                    ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{formatTime(timeLeftSeconds)}</span>
              </div>
            )}

            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="px-5 py-2.5 rounded-2xl bg-[#2684FF] hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              Nộp bài
            </button>
          </div>
        </div>

        {/* Question Navigation Bubbles */}
        <div className="bg-white rounded-3xl p-4 border border-[#E2EAF5] shadow-2xs">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-bold text-slate-700">
              Danh sách câu hỏi ({answeredCount}/{totalQ} đã làm)
            </span>
            <span className="text-slate-400">
              Điểm tối đa: {selectedAssignment.maxPoints} điểm
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedAssignment.questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined && answers[q.id] !== '';
              const isActive = idx === activeQuestionIdx;
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQuestionIdx(idx)}
                  className={`w-9 h-9 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center ${
                    isActive
                      ? 'bg-blue-600 text-white ring-2 ring-blue-300 ring-offset-1'
                      : isAnswered
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Question Body */}
        {currentQ && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EAF5] shadow-sm space-y-6">
            {/* Question Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black">
                  Câu {activeQuestionIdx + 1}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                  {currentQ.type === 'single_choice' && 'Trắc nghiệm 1 đáp án'}
                  {currentQ.type === 'multiple_choice' && 'Trắc nghiệm nhiều đáp án'}
                  {currentQ.type === 'true_false' && 'Đúng / Sai'}
                  {currentQ.type === 'fill_in' && 'Điền từ / Câu trả lời ngắn'}
                  {currentQ.type === 'essay' && 'Tự luận'}
                  {currentQ.type === 'practice' && 'Thực hành'}
                </span>
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                {currentQ.points} điểm
              </span>
            </div>

            {/* Prompt text */}
            <div className="text-sm sm:text-base font-semibold text-[#172B4D] leading-relaxed whitespace-pre-line">
              {currentQ.prompt}
            </div>

            {/* Interactive Answer Input based on type */}
            <div className="pt-2">
              {/* 1. SINGLE CHOICE */}
              {currentQ.type === 'single_choice' && currentQ.options && (
                <div className="space-y-3">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = answers[currentQ.id] === optIdx;
                    const letter = String.fromCharCode(65 + optIdx);
                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleAnswerChange(currentQ.id, optIdx)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-500 shadow-xs'
                            : 'bg-white border-slate-200/80 hover:border-blue-300 hover:bg-slate-50/60'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {letter}
                        </div>
                        <span className="text-xs sm:text-sm text-slate-800 leading-snug">
                          {opt}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 2. MULTIPLE CHOICE */}
              {currentQ.type === 'multiple_choice' && currentQ.options && (
                <div className="space-y-3">
                  <p className="text-xs text-blue-600 font-semibold mb-2">
                    💡 Hãy chọn một hoặc nhiều phương án đúng bên dưới:
                  </p>
                  {currentQ.options.map((opt, optIdx) => {
                    const currentSelectedArr: number[] = Array.isArray(answers[currentQ.id])
                      ? answers[currentQ.id]
                      : [];
                    const isSelected = currentSelectedArr.includes(optIdx);
                    const letter = String.fromCharCode(65 + optIdx);

                    const toggleChoice = () => {
                      if (isSelected) {
                        handleAnswerChange(
                          currentQ.id,
                          currentSelectedArr.filter((i) => i !== optIdx)
                        );
                      } else {
                        handleAnswerChange(currentQ.id, [...currentSelectedArr, optIdx]);
                      }
                    };

                    return (
                      <div
                        key={optIdx}
                        onClick={toggleChoice}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                          isSelected
                            ? 'bg-indigo-50/80 border-indigo-500 shadow-xs'
                            : 'bg-white border-slate-200/80 hover:border-indigo-300 hover:bg-slate-50/60'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {isSelected ? <Check className="w-4 h-4" /> : letter}
                        </div>
                        <span className="text-xs sm:text-sm text-slate-800 leading-snug">
                          {opt}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 3. TRUE / FALSE */}
              {currentQ.type === 'true_false' && (
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Đúng', val: 0 },
                    { label: 'Sai', val: 1 }
                  ].map((tf) => {
                    const isSelected = answers[currentQ.id] === tf.val;
                    return (
                      <button
                        key={tf.val}
                        type="button"
                        onClick={() => handleAnswerChange(currentQ.id, tf.val)}
                        className={`p-4 rounded-2xl font-bold text-sm border transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {tf.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 4. FILL IN THE BLANK */}
              {currentQ.type === 'fill_in' && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Nhập câu trả lời ngắn của em:
                  </label>
                  <input
                    type="text"
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                    placeholder="Gõ từ khóa hoặc kết quả số..."
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm font-semibold"
                  />
                  <p className="text-[11px] text-slate-500">
                    Hệ thống sẽ đối chiếu đáp án tự động khi chấm điểm.
                  </p>
                </div>
              )}

              {/* 5. ESSAY */}
              {currentQ.type === 'essay' && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Trình bày bài làm tự luận của em:
                  </label>
                  <textarea
                    rows={6}
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                    placeholder="Viết đầy đủ các bước giải thích, luận điểm hoặc câu trả lời chi tiết..."
                    className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm leading-relaxed resize-none font-sans"
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Thầy cô bộ môn sẽ trực tiếp xem và chấm điểm câu hỏi này.</span>
                    <span>{(answers[currentQ.id] || '').length} ký tự</span>
                  </div>
                </div>
              )}

              {/* 6. PRACTICE TASK */}
              {currentQ.type === 'practice' && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700">
                    Báo cáo kết quả thực hành / Mã lệnh / Mô tả sản phẩm:
                  </label>
                  <textarea
                    rows={6}
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleAnswerChange(currentQ.id, e.target.value)}
                    placeholder="Dán mã nguồn, mô tả thao tác thực hiện, liên kết sản phẩm Scratch hoặc kết quả thu được..."
                    className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm font-mono leading-relaxed resize-none"
                  />
                </div>
              )}
            </div>

            {/* Next / Prev Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <button
                disabled={activeQuestionIdx === 0}
                onClick={() => setActiveQuestionIdx((prev) => prev - 1)}
                className="px-4 py-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                ← Câu trước
              </button>

              <span className="text-xs text-slate-400 font-semibold">
                Câu {activeQuestionIdx + 1} / {totalQ}
              </span>

              {activeQuestionIdx < totalQ - 1 ? (
                <button
                  onClick={() => setActiveQuestionIdx((prev) => prev + 1)}
                  className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
                >
                  Câu tiếp theo →
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Hoàn thành & Nộp bài
                </button>
              )}
            </div>
          </div>
        )}

        {/* Submit Confirmation Modal */}
        {showSubmitConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-[#172B4D]">
                Xác nhận nộp bài tập?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Em đã trả lời <strong>{answeredCount}/{totalQ}</strong> câu hỏi. Sau khi nộp bài, các câu trắc nghiệm sẽ được tự động chấm điểm và bài tự luận sẽ được gửi tới thầy cô.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Tiếp tục làm bài
                </button>
                <button
                  disabled={isSubmitting}
                  onClick={handleSubmitAnswers}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  {isSubmitting ? 'Đang nộp...' : 'Đồng ý nộp bài'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: REVIEW SUBMISSION MODAL
  // -------------------------------------------------------------
  if (reviewSubmission) {
    const asg = assignments.find((a) => a.id === reviewSubmission.assignmentId);
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
        <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-between shrink-0">
            <div>
              <div className="text-xs text-blue-200 font-semibold mb-1">
                Chi tiết kết quả bài tập
              </div>
              <h3 className="text-base sm:text-lg font-bold">
                {reviewSubmission.assignmentTitle}
              </h3>
              <div className="text-xs text-blue-100 mt-1">
                Điểm: <strong className="text-amber-300 text-sm font-black">{reviewSubmission.score}/{reviewSubmission.maxScore}</strong>
                {' • '}
                Trạng thái: <strong>{reviewSubmission.status === 'graded' ? 'Đã chấm điểm' : 'Chờ giáo viên chấm tự luận'}</strong>
              </div>
            </div>
            <button
              onClick={() => setReviewSubmission(null)}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Feedback section if graded */}
          <div className="p-6 overflow-y-auto space-y-4 text-xs">
            {reviewSubmission.teacherFeedback && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  Nhận xét của giáo viên ({reviewSubmission.gradedBy || 'Thầy/Cô'}):
                </div>
                <p className="text-xs text-amber-800 leading-relaxed italic">
                  "{reviewSubmission.teacherFeedback}"
                </p>
              </div>
            )}

            {/* Questions breakdown */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 text-sm">
                Chi tiết câu trả lời của em:
              </h4>
              {asg?.questions.map((q, idx) => {
                const ans = reviewSubmission.answers[q.id];
                const score = reviewSubmission.questionScores?.[q.id];
                return (
                  <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>Câu {idx + 1}: {q.prompt}</span>
                      <span className="text-blue-600 shrink-0 ml-2 font-mono">
                        {score !== undefined ? `${score}/${q.points}đ` : `—/${q.points}đ`}
                      </span>
                    </div>

                    <div className="text-slate-600 pl-2 border-l-2 border-blue-400">
                      <strong>Câu trả lời của em:</strong>{' '}
                      {q.type === 'single_choice' || q.type === 'true_false' ? (
                        <span>
                          {ans !== undefined && q.options ? q.options[Number(ans)] : 'Chưa trả lời'}
                        </span>
                      ) : q.type === 'multiple_choice' ? (
                        <span>
                          {Array.isArray(ans) && q.options
                            ? ans.map((i) => q.options![i]).join(', ')
                            : 'Chưa trả lời'}
                        </span>
                      ) : (
                        <span>{ans ? ans.toString() : 'Chưa có nội dung'}</span>
                      )}
                    </div>

                    {q.explanation && (
                      <div className="text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-100">
                        <strong>Giải thích:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end shrink-0">
            <button
              onClick={() => setReviewSubmission(null)}
              className="px-5 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs cursor-pointer"
            >
              Đóng xem chi tiết
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: MAIN LIST VIEW OF ASSIGNMENTS
  // -------------------------------------------------------------
  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#2684FF] text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Năm học 2026–2027 • THCS Mỹ Hòa</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            BÀI TẬP CỦA TÔI
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Danh sách bài tập và đề kiểm tra do các thầy cô bộ môn giao trực tuyến. Em có thể làm bài trực tiếp, xem điểm số tức thì và nhận lời nhận xét từ thầy cô.
          </p>
          <div className="flex items-center gap-3 pt-2 text-xs text-blue-200">
            <span>Học sinh: <strong>{studentName}</strong> ({studentClass})</span>
            <span>•</span>
            <span>Khối {currentGrade}</span>
          </div>
        </div>
      </div>

      {/* Filter and Subject Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-[#E2EAF5] shadow-2xs">
        {/* Status Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'Tất cả bài tập' },
            { id: 'pending', label: 'Chưa làm' },
            { id: 'submitted', label: 'Đã nộp bài' },
            { id: 'graded', label: 'Đã có điểm' }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                statusFilter === st.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Subject Filter Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="all">Tất cả môn học</option>
            {SUBJECTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Assignments Cards Grid */}
      {filteredAssignments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAssignments.map((asg) => {
            const sub = submissions.find(
              (s) => s.assignmentId === asg.id && s.studentUid === studentUid
            );
            const isGraded = sub?.status === 'graded';
            const isSubmitted = sub?.status === 'submitted';
            const isOverdue =
              new Date(asg.dueDate).getTime() < Date.now() && !sub;

            const subjectMeta = SUBJECTS.find((s) => s.id === asg.subjectId);

            return (
              <div
                key={asg.id}
                className="bg-white rounded-3xl p-6 border border-[#E2EAF5] hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Card Header: Subject badge & Status */}
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-100">
                      {subjectMeta?.name || 'Tin học'} • Khối {asg.grade}
                    </span>

                    {isGraded ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Điểm: {sub.score}/{sub.maxScore}
                      </span>
                    ) : isSubmitted ? (
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center gap-1 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        Đã nộp (Chờ chấm)
                      </span>
                    ) : isOverdue ? (
                      <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-bold text-[11px]">
                        Quá hạn
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px]">
                        Chưa làm
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold text-[#172B4D] leading-snug">
                    {asg.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {asg.description}
                  </p>

                  {/* Metadata info */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{asg.teacherName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {asg.durationMinutes > 0
                          ? `${asg.durationMinutes} phút`
                          : 'Không giới hạn giờ'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Hạn: {new Date(asg.dueDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>{asg.questions.length} câu hỏi</span>
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <div className="pt-2">
                  {sub ? (
                    <button
                      onClick={() => setReviewSubmission(sub)}
                      className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Xem lại bài làm & Nhận xét
                    </button>
                  ) : (
                    <button
                      onClick={() => startAssignment(asg)}
                      className="w-full py-2.5 rounded-2xl bg-[#2684FF] hover:bg-blue-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      Bắt đầu làm bài <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E2EAF5] shadow-xs space-y-3">
          <CheckSquare className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="text-base font-bold text-slate-700">
            Hiện không có bài tập nào cần làm
          </h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Thầy cô chưa giao thêm bài tập mới cho môn học này hoặc em đã hoàn thành tất cả bài tập được giao.
          </p>
        </div>
      )}
    </div>
  );
};
