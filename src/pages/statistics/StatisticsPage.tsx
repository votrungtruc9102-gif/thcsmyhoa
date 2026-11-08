import React from 'react';
import {
  BarChart2,
  Trophy,
  Award,
  CheckCircle,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  Target,
  Flame,
  Calendar,
  Layers
} from 'lucide-react';
import { UserExamResult, StudentProfile, GradeLevel, SubjectMeta } from '../../types';

interface StatisticsPageProps {
  examResults: UserExamResult[];
  profile: StudentProfile;
  grade: GradeLevel;
  subject: SubjectMeta;
  onOpenDrawer: () => void;
  onResetData: () => void;
}

export const StatisticsPage: React.FC<StatisticsPageProps> = ({
  examResults,
  profile,
  grade,
  subject,
  onOpenDrawer,
  onResetData
}) => {
  const totalTests = examResults.length;
  const totalCorrect = examResults.reduce((acc, curr) => acc + curr.correctCount, 0);
  const totalQuestionsAnswered = examResults.reduce((acc, curr) => acc + curr.totalQuestions, 0);
  const accuracyRate = totalQuestionsAnswered > 0
    ? Math.round((totalCorrect / totalQuestionsAnswered) * 100)
    : 0;

  const averageScore = totalTests > 0
    ? Math.round((examResults.reduce((acc, curr) => acc + curr.score, 0) / totalTests) * 10) / 10
    : 0;

  // Identify weak areas / topics needing review: exams with score < 6.5
  const testsNeedingReview = examResults.filter(r => r.score < 6.5);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
              Hồ sơ học tập học sinh
            </span>
            <span className="text-xs text-slate-400 font-medium">• THCS Mỹ Hòa (2026–2027)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#172B4D] tracking-tight">
            Thống kê kết quả & Tiến độ học tập
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
            Dữ liệu tổng hợp từ các lần luyện tập trắc nghiệm và thử thách thực tế được lưu trên thiết bị của học sinh {profile.name} (Lớp {profile.className}).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-2 text-xs font-bold shadow-xs">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-400" />
            <span>Điểm tích lũy: <strong className="text-base text-orange-600">{profile.totalPoints}</strong></span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-5 rounded-2xl bg-white border border-blue-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Tổng bài kiểm tra đã làm</span>
            <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-[#172B4D]">{totalTests}</div>
          <p className="text-[11px] text-slate-500">Đã nộp và chấm điểm</p>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Tỷ lệ trả lời chính xác</span>
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-emerald-600">{accuracyRate}%</div>
          <p className="text-[11px] text-slate-500">{totalCorrect} / {totalQuestionsAnswered} câu đúng</p>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-2xl bg-white border border-amber-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Điểm số trung bình</span>
            <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-amber-600">
            {averageScore > 0 ? averageScore.toFixed(1) : '---'}
            <span className="text-sm font-normal text-slate-400"> / 10</span>
          </div>
          <p className="text-[11px] text-slate-500">
            {averageScore >= 8 ? 'Xếp loại: Xuất sắc' : averageScore >= 6.5 ? 'Xếp loại: Khá' : totalTests > 0 ? 'Xếp loại: Trung bình' : 'Chưa có bài thi'}
          </p>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Huy hiệu học tập</span>
            <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-purple-600">{profile.badges.length}</div>
          <p className="text-[11px] text-slate-500">Danh hiệu đã mở khóa</p>
        </div>
      </div>

      {/* Main Grid: Score History + Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Test History List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#172B4D] flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-blue-600" />
                Lịch sử làm bài trắc nghiệm
              </h3>
              <span className="text-xs text-slate-500 font-medium">Lưu trữ cục bộ</span>
            </div>

            {examResults.length > 0 ? (
              <div className="space-y-3">
                {examResults.map((result, idx) => (
                  <div
                    key={result.id || idx}
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-colors flex items-center justify-between"
                  >
                    <div className="space-y-1 min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                          Lớp {result.grade}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#172B4D] truncate">
                          {result.examTitle}
                        </h4>
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(result.completedAt).toLocaleDateString('vi-VN')} {new Date(result.completedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span>•</span>
                        <span>Đúng: <strong>{result.correctCount}/{result.totalQuestions}</strong> câu</span>
                        <span>•</span>
                        <span>Thời gian: {Math.round(result.timeSpentSeconds)}s</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div
                        className={`text-xl font-black ${
                          result.score >= 8
                            ? 'text-emerald-600'
                            : result.score >= 5
                            ? 'text-blue-600'
                            : 'text-amber-600'
                        }`}
                      >
                        {result.score.toFixed(1)}
                        <span className="text-xs text-slate-400 font-normal"> / 10</span>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500">
                        {result.score >= 8 ? 'Xuất sắc' : result.score >= 5 ? 'Đạt' : 'Cần ôn lại'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs">
                Chưa có dữ liệu bài làm. Hãy vào mục "Luyện tập" để bắt đầu thử sức nhé!
              </div>
            )}
          </div>

          {/* Topics Needing Review */}
          {testsNeedingReview.length > 0 && (
            <div className="p-6 rounded-3xl bg-amber-50/80 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                Chủ đề gợi ý cần ôn tập lại
              </div>
              <p className="text-xs text-slate-600">
                Các bài kiểm tra dưới 6.5 điểm em nên vào lại "Kho kiến thức" để đọc lại lý thuyết và làm lại bài:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {testsNeedingReview.map(item => (
                  <div key={item.id} className="p-3 rounded-xl bg-white border border-amber-200 text-xs">
                    <strong className="text-slate-800">{item.examTitle}</strong>
                    <div className="text-red-600 font-semibold mt-1">
                      Điểm lần trước: {item.score} điểm
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Badges & Student Card */}
        <div className="lg:col-span-4 space-y-6">
          {/* Student Profile Card */}
          <div className="p-6 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-4 text-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#2684FF] to-[#22C7E8] text-white flex items-center justify-center text-2xl font-black mx-auto shadow-md shadow-blue-500/20">
              MQ
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#172B4D]">{profile.name}</h3>
              <p className="text-xs text-[#64748B]">Học sinh Lớp {profile.className} • Trường THCS Mỹ Hòa</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-left">
              <div className="p-2.5 rounded-xl bg-slate-50">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Chuỗi chăm chỉ</span>
                <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
                  🔥 {profile.streakDays} ngày liên tiếp
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Khối lớp hiện tại</span>
                <span className="text-xs font-bold text-blue-600">
                  Lớp {grade}
                </span>
              </div>
            </div>
          </div>

          {/* Badges Collection */}
          <div className="p-6 rounded-3xl bg-white border border-[#E2EAF5] shadow-xs space-y-4">
            <h3 className="text-sm font-extrabold text-[#172B4D] flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Bộ sưu tập Huy hiệu danh dự
            </h3>

            <div className="space-y-2">
              {profile.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-gradient-to-r from-amber-50/70 to-orange-50/50 border border-amber-200/80 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                    🎖️
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-amber-950">{badge}</h5>
                    <span className="text-[10px] text-amber-700">Đạt thành tích học tập tốt</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reset Device Storage Button */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <span className="text-[11px] text-slate-500 block">
              Dữ liệu được lưu trữ trực tiếp trong trình duyệt máy tính của bạn.
            </span>
            <button
              onClick={() => {
                if (window.confirm('Bạn có chắc chắn muốn đặt lại dữ liệu mẫu ban đầu?')) {
                  onResetData();
                }
              }}
              className="text-xs font-semibold text-slate-500 hover:text-red-600 underline cursor-pointer"
            >
              Đặt lại dữ liệu mẫu hệ thống
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
