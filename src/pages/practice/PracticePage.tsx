import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
  Play,
  RotateCcw,
  Award,
  Zap,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { GradeLevel, SubjectMeta, Exam, Question, UserExamResult } from '../../types';
import { ExamPlayer } from './ExamPlayer';

interface PracticePageProps {
  grade: GradeLevel;
  subject: SubjectMeta;
  exams: Exam[];
  questions: Question[];
  onOpenDrawer: () => void;
  examResults: UserExamResult[];
  onSaveResult: (result: UserExamResult) => void;
}

export const PracticePage: React.FC<PracticePageProps> = ({
  grade,
  subject,
  exams,
  questions,
  onOpenDrawer,
  examResults,
  onSaveResult
}) => {
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [customQuestions, setCustomQuestions] = useState<Question[] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [customCount, setCustomCount] = useState<number>(5);

  // Available questions for this grade & subject
  const availableQuestions = questions.filter(
    q => q.grade === grade && q.subjectId === subject.id
  );

  // Available predefined exams for this grade & subject
  const subjectExams = exams.filter(
    e => e.grade === grade && e.subjectId === subject.id
  );

  const filteredExams = subjectExams.filter(e => {
    if (filterType === 'all') return true;
    return e.examType === filterType;
  });

  // Recent results for this subject and grade
  const recentResults = examResults.filter(
    r => r.grade === grade && r.subjectId === subject.id
  );

  const startPredefinedExam = (exam: Exam) => {
    // Resolve questions
    const matched = questions.filter(q => exam.questionIds.includes(q.id));
    // If some questionIds not in DB, fallback to available questions
    const finalQuestions = matched.length > 0 ? matched : availableQuestions.slice(0, 5);

    setActiveExam(exam);
    setCustomQuestions(finalQuestions);
    setIsPlaying(true);
  };

  const startQuickPractice = () => {
    if (availableQuestions.length === 0) return;
    // Shuffle and pick customCount
    const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, Math.min(customCount, shuffled.length));

    const quickExam: Exam = {
      id: 'quick-' + Date.now(),
      title: `Thử thách trắc nghiệm nhanh ${customCount} câu (${subject.name} - Lớp ${grade})`,
      subjectId: subject.id,
      grade,
      semester: 1,
      durationMinutes: Math.max(5, Math.ceil(picked.length * 1.5)),
      examType: 'luyen_tap',
      questionIds: picked.map(q => q.id),
      description: 'Đề luyện tập ngẫu nhiên được trích xuất từ ngân hàng câu hỏi THCS Mỹ Hòa.'
    };

    setActiveExam(quickExam);
    setCustomQuestions(picked);
    setIsPlaying(true);
  };

  if (isPlaying && customQuestions) {
    return (
      <ExamPlayer
        exam={activeExam}
        questions={customQuestions}
        grade={grade}
        subject={subject}
        onFinishExam={(res) => {
          onSaveResult(res);
        }}
        onExit={() => {
          setIsPlaying(false);
          setActiveExam(null);
          setCustomQuestions(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
              Phòng Luyện Thi & Đánh Giá
            </span>
            <span className="text-xs text-slate-400 font-medium">• Hệ thống THCS Mỹ Hòa</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#172B4D] tracking-tight">
            Luyện tập trắc nghiệm: {subject.name} — Khối {grade}
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
            Rèn luyện kỹ năng giải trắc nghiệm theo thang điểm 10, phân bố theo 4 mức độ nhận thức (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao).
          </p>
        </div>

        <button
          onClick={onOpenDrawer}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 hover:border-blue-400 font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer shrink-0 self-start md:self-auto"
        >
          <Layers className="w-4 h-4 text-[#2684FF]" />
          <span>Đổi môn hoặc khối khác</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quick Custom Test Generator Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              Luyện tập nhanh theo số câu
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Tạo đề ngẫu nhiên từ Ngân hàng câu hỏi
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Ngân hàng hiện có <strong className="text-white underline">{availableQuestions.length}</strong> câu hỏi trắc nghiệm {subject.name} Lớp {grade}. Hệ thống sẽ trích xuất và chấm điểm tức thì.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/20 backdrop-blur-xs">
              {[5, 10, 15].map(cnt => (
                <button
                  key={cnt}
                  onClick={() => setCustomCount(cnt)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    customCount === cnt
                      ? 'bg-white text-blue-700 shadow-sm'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  {cnt} câu
                </button>
              ))}
            </div>

            <button
              onClick={startQuickPractice}
              disabled={availableQuestions.length === 0}
              className={`px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer ${
                availableQuestions.length > 0
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-900 shadow-amber-400/20'
                  : 'bg-white/30 text-white cursor-not-allowed'
              }`}
            >
              <Play className="w-4 h-4 fill-slate-900" />
              Bắt đầu làm bài
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Predefined Exam List + Student History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Predefined Exams */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-extrabold text-[#172B4D] flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-blue-600" />
              Đề thi chính thức & Đề định kỳ THCS Mỹ Hòa
            </h3>

            {/* Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: '15_phut', label: '15 phút' },
                { id: 'giua_ky', label: 'Giữa kỳ' },
                { id: 'luyen_tap', label: 'Luyện tập' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    filterType === f.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {filteredExams.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredExams.map(exam => {
                const questionCount = exam.questionIds.length;
                return (
                  <div
                    key={exam.id}
                    className="p-5 rounded-2xl bg-white border border-[#E2EAF5] hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-2 font-bold">
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                          {exam.examType === '15_phut'
                            ? '15 Phút'
                            : exam.examType === 'giua_ky'
                            ? 'Giữa Học Kỳ'
                            : 'Đề Luyện Tập'}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-blue-500" />
                          {exam.durationMinutes} phút
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#172B4D] leading-snug">
                        {exam.title}
                      </h4>

                      <p className="text-xs text-[#64748B] line-clamp-2 mt-2 leading-relaxed">
                        {exam.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-medium">
                        Số lượng: <strong className="text-[#172B4D]">{questionCount} câu</strong>
                      </span>
                      <button
                        onClick={() => startPredefinedExam(exam)}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-50 hover:bg-[#2684FF] text-blue-700 hover:text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        Vào thi <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-white border border-[#E2EAF5] text-slate-500 space-y-3">
              <AlertCircle className="w-8 h-8 mx-auto text-amber-500" />
              <p className="text-sm font-medium">
                Chưa có đề thi mẫu trong danh mục này. Em hãy sử dụng nút "Luyện tập nhanh" ở trên để làm đề tự động nhé!
              </p>
            </div>
          )}
        </div>

        {/* Right: Student's Recent Exam Attempts */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-[#172B4D] flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                Lịch sử làm bài gần đây
              </h3>
              <span className="text-xs text-slate-400 font-medium">
                {recentResults.length} lần làm
              </span>
            </div>

            {recentResults.length > 0 ? (
              <div className="space-y-3">
                {recentResults.slice(0, 5).map(res => (
                  <div
                    key={res.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                  >
                    <div className="min-w-0 pr-2">
                      <h5 className="text-xs font-bold text-[#172B4D] truncate">
                        {res.examTitle}
                      </h5>
                      <span className="text-[10px] text-slate-500">
                        {new Date(res.completedAt).toLocaleDateString('vi-VN')} • Đúng {res.correctCount}/{res.totalQuestions} câu
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <div
                        className={`text-sm font-black ${
                          res.score >= 8
                            ? 'text-emerald-600'
                            : res.score >= 5
                            ? 'text-blue-600'
                            : 'text-amber-600'
                        }`}
                      >
                        {res.score.toFixed(1)} <span className="text-[10px] font-normal text-slate-400">đ</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center rounded-2xl bg-slate-50 text-slate-500 text-xs">
                Em chưa làm bài kiểm tra nào cho môn {subject.name} Lớp {grade}. Hãy thử sức ngay bây giờ nhé!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
