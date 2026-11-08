import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Award,
  Search,
  Filter,
  Eye,
  Check,
  Send,
  RotateCcw,
  User,
  Calendar,
  AlertCircle,
  FileText,
  BarChart2,
  X
} from 'lucide-react';
import {
  Assignment,
  AssignmentSubmission,
  GradeLevel,
  SubjectId,
  SubjectMeta
} from '../../types';
import { SUBJECTS } from '../../data/mockData';

interface SubmissionsGradingManagerProps {
  assignments: Assignment[];
  submissions: AssignmentSubmission[];
  onGradeSubmission: (
    submissionId: string,
    score: number,
    feedback: string,
    gradedBy: string,
    questionScores?: Record<string, number>
  ) => void;
  onResetSubmission?: (submissionId: string) => void;
  currentGrade: GradeLevel;
  currentSubject: SubjectMeta;
}

export const SubmissionsGradingManager: React.FC<SubmissionsGradingManagerProps> = ({
  assignments,
  submissions,
  onGradeSubmission,
  onResetSubmission,
  currentGrade,
  currentSubject
}) => {
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'submitted' | 'graded'>('all');
  const [classFilter, setClassFilter] = useState<string>('all');
  const [searchStudent, setSearchStudent] = useState('');

  // Selected submission to grade
  const [gradingSubmission, setGradingSubmission] = useState<AssignmentSubmission | null>(null);
  const [gradingScores, setGradingScores] = useState<Record<string, number>>({});
  const [gradingFeedback, setGradingFeedback] = useState('');
  const [totalCalculatedScore, setTotalCalculatedScore] = useState<number>(0);

  // Filtered submissions
  const filteredSubmissions = submissions.filter((sub) => {
    if (selectedAssignmentId !== 'all' && sub.assignmentId !== selectedAssignmentId) return false;
    if (statusFilter !== 'all' && sub.status !== statusFilter) return false;
    if (classFilter !== 'all' && sub.studentClass !== classFilter) return false;
    if (searchStudent.trim()) {
      const term = searchStudent.toLowerCase();
      return (
        sub.studentName.toLowerCase().includes(term) ||
        sub.assignmentTitle.toLowerCase().includes(term) ||
        sub.studentClass.toLowerCase().includes(term)
      );
    }
    return true;
  });

  // Overview Statistics per Phần VI
  const totalSubmissions = submissions.length;
  const gradedCount = submissions.filter((s) => s.status === 'graded').length;
  const pendingGradingCount = submissions.filter((s) => s.status === 'submitted').length;
  const totalScoreSum = submissions
    .filter((s) => s.status === 'graded')
    .reduce((acc, curr) => acc + curr.score, 0);
  const averageScore =
    gradedCount > 0 ? Math.round((totalScoreSum / gradedCount) * 10) / 10 : 0;

  // Open grading modal
  const openGradingModal = (sub: AssignmentSubmission) => {
    setGradingSubmission(sub);
    const initialScores = sub.questionScores ? { ...sub.questionScores } : {};
    setGradingScores(initialScores);
    setGradingFeedback(sub.teacherFeedback || '');
    setTotalCalculatedScore(sub.score || 0);
  };

  // Recalculate total score when individual question scores change
  const handleScoreChange = (qId: string, val: number) => {
    const updated = { ...gradingScores, [qId]: val };
    setGradingScores(updated);
    const sum = Object.values(updated).reduce((a, b) => a + Number(b), 0);
    setTotalCalculatedScore(Math.round(sum * 10) / 10);
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingSubmission) return;

    onGradeSubmission(
      gradingSubmission.id,
      totalCalculatedScore,
      gradingFeedback.trim() || 'Giáo viên đã hoàn thành chấm điểm và đánh giá bài làm.',
      'Giáo viên THCS Mỹ Hòa',
      gradingScores
    );

    setGradingSubmission(null);
    alert(`Đã lưu kết quả chấm điểm (${totalCalculatedScore}đ) cho học sinh ${gradingSubmission.studentName}!`);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Đánh giá & Chấm bài học sinh</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            BÀI LÀM CỦA HỌC SINH VÀ CHẤM ĐIỂM
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
            Xem danh sách bài tập đã nộp, tự động tổng hợp điểm trắc nghiệm, trực tiếp chấm điểm bài tự luận và gửi lời nhận xét khích lệ học sinh.
          </p>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#E2EAF5] shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-bold">Tổng bài nộp</span>
          <div className="text-2xl font-black text-[#172B4D]">{totalSubmissions}</div>
          <span className="text-[11px] text-blue-600 font-semibold">Tất cả bài tập</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-amber-200 bg-amber-50/30 shadow-2xs space-y-1">
          <span className="text-xs text-amber-800 font-bold">Chờ chấm tự luận</span>
          <div className="text-2xl font-black text-amber-600">{pendingGradingCount}</div>
          <span className="text-[11px] text-amber-700 font-semibold">Cần giáo viên duyệt</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-emerald-200 bg-emerald-50/30 shadow-2xs space-y-1">
          <span className="text-xs text-emerald-800 font-bold">Đã hoàn thành chấm</span>
          <div className="text-2xl font-black text-emerald-600">{gradedCount}</div>
          <span className="text-[11px] text-emerald-700 font-semibold">Đã công bố điểm</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E2EAF5] shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-bold">Điểm trung bình</span>
          <div className="text-2xl font-black text-blue-600">{averageScore}/10</div>
          <span className="text-[11px] text-slate-500 font-semibold">Khối 6–9</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#E2EAF5] shadow-2xs space-y-3 text-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
              placeholder="Tìm tên học sinh, lớp hoặc tên bài tập..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            {/* Filter by assignment */}
            <select
              value={selectedAssignmentId}
              onChange={(e) => setSelectedAssignmentId(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700"
            >
              <option value="all">Tất cả bài tập đã giao</option>
              {assignments.map((asg) => (
                <option key={asg.id} value={asg.id}>
                  {asg.title}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="submitted">Chờ chấm điểm</option>
              <option value="graded">Đã chấm điểm</option>
            </select>

            {/* Class */}
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700"
            >
              <option value="all">Tất cả các lớp</option>
              <option value="6A1">Lớp 6A1</option>
              <option value="6A2">Lớp 6A2</option>
              <option value="7A1">Lớp 7A1</option>
              <option value="7A3">Lớp 7A3</option>
              <option value="8A1">Lớp 8A1</option>
              <option value="9A1">Lớp 9A1</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-3xl border border-[#E2EAF5] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Học sinh</th>
                <th className="py-3.5 px-4">Lớp</th>
                <th className="py-3.5 px-4">Bài tập</th>
                <th className="py-3.5 px-4">Thời gian nộp</th>
                <th className="py-3.5 px-4">Điểm số</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((sub) => {
                  const isGraded = sub.status === 'graded';
                  return (
                    <tr key={sub.id} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs">
                            {sub.studentName.charAt(0)}
                          </div>
                          <span>{sub.studentName}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-slate-600">
                        {sub.studentClass}
                      </td>

                      <td className="py-3.5 px-4 font-medium text-slate-700 max-w-xs truncate">
                        {sub.assignmentTitle}
                      </td>

                      <td className="py-3.5 px-4 text-slate-500">
                        {new Date(sub.submittedAt).toLocaleString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold">
                        {isGraded ? (
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            {sub.score}/{sub.maxScore}đ
                          </span>
                        ) : (
                          <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                            {sub.score !== undefined ? `${sub.score}đ (Tạm)` : 'Chưa có'}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        {isGraded ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Đã chấm
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] inline-flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-600" />
                            Chờ chấm tự luận
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => openGradingModal(sub)}
                          className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white font-bold text-xs transition-all cursor-pointer shadow-2xs"
                        >
                          {isGraded ? 'Xem lại & Sửa điểm' : 'Chấm bài ngay'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 text-xs">
                    Không tìm thấy bài làm nào phù hợp với bộ lọc tìm kiếm.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODAL: GRADING SUBMISSION */}
      {/* ===================================================================== */}
      {gradingSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 max-h-[88vh] flex flex-col space-y-4 my-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  Chấm bài học sinh
                </span>
                <h3 className="font-extrabold text-base text-[#172B4D] mt-1">
                  {gradingSubmission.studentName} — Lớp {gradingSubmission.studentClass}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Bài tập: {gradingSubmission.assignmentTitle}
                </p>
              </div>
              <button
                onClick={() => setGradingSubmission(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveGrade} className="flex-1 overflow-y-auto space-y-5 text-xs pr-1">
              {/* Question list and answers */}
              {(() => {
                const asg = assignments.find((a) => a.id === gradingSubmission.assignmentId);
                return asg?.questions.map((q, idx) => {
                  const studentAns = gradingSubmission.answers[q.id];
                  const currentScore = gradingScores[q.id] ?? 0;

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
                    >
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>
                          Câu {idx + 1} ({q.type === 'single_choice' ? 'Trắc nghiệm' : q.type === 'essay' ? 'Tự luận' : q.type}):
                        </span>
                        <div className="flex items-center gap-1.5 font-bold">
                          <span>Điểm đạt được:</span>
                          <input
                            type="number"
                            step="0.25"
                            min="0"
                            max={q.points}
                            value={currentScore}
                            onChange={(e) => handleScoreChange(q.id, Number(e.target.value))}
                            className="w-16 px-2 py-1 rounded-lg border border-slate-300 bg-white text-center font-bold text-xs"
                          />
                          <span className="text-slate-400">/{q.points}đ</span>
                        </div>
                      </div>

                      <p className="text-slate-700 font-medium">{q.prompt}</p>

                      {/* Student answer render */}
                      <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Câu trả lời của học sinh:
                        </span>
                        <div className="text-slate-800 font-semibold leading-relaxed">
                          {q.type === 'single_choice' && q.options ? (
                            <span>
                              {studentAns !== undefined
                                ? `${String.fromCharCode(65 + Number(studentAns))}. ${q.options[Number(studentAns)]}`
                                : 'Chưa trả lời'}
                            </span>
                          ) : q.type === 'multiple_choice' && q.options ? (
                            <span>
                              {Array.isArray(studentAns)
                                ? studentAns.map((i) => q.options![i]).join(', ')
                                : 'Chưa trả lời'}
                            </span>
                          ) : (
                            <span className="whitespace-pre-line">
                              {studentAns?.toString() || 'Học sinh chưa nhập câu trả lời'}
                            </span>
                          )}
                        </div>
                      </div>

                      {q.explanation && (
                        <div className="text-[11px] text-blue-700 bg-blue-50/60 p-2 rounded-lg border border-blue-100">
                          <strong>Hướng dẫn đáp án:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                });
              })()}

              {/* Total Score & Feedback */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-blue-950">
                    Tổng điểm bài làm:
                  </span>
                  <div className="text-xl font-black text-blue-700 font-mono">
                    {totalCalculatedScore} / {gradingSubmission.maxScore} điểm
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nhận xét và lời khuyên của giáo viên:
                  </label>
                  <textarea
                    rows={3}
                    value={gradingFeedback}
                    onChange={(e) => setGradingFeedback(e.target.value)}
                    placeholder="Ví dụ: Em nắm chắc kiến thức cơ bản, phần tự luận cần trình bày rõ ràng hơn..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white text-xs resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setGradingSubmission(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  Lưu & Công bố điểm cho học sinh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
