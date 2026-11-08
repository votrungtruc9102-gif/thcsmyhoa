import React from 'react';
import { HelpCircle, CheckCircle, Award, BookOpen, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  totalQuestions: number;
  completedTests: number;
  averageScore: number;
  totalLessons: number;
  accuracyRate: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  totalQuestions,
  completedTests,
  averageScore,
  totalLessons,
  accuracyRate
}) => {
  const cards = [
    {
      title: 'Ngân hàng câu hỏi',
      value: totalQuestions.toString(),
      unit: 'câu hỏi',
      desc: 'Câu hỏi chuẩn 4 mức độ nhận thức',
      icon: HelpCircle,
      color: '#2684FF',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
      textColor: 'text-blue-700'
    },
    {
      title: 'Bài luyện đã làm',
      value: completedTests.toString(),
      unit: 'lượt hoàn thành',
      desc: 'Lưu trên thiết bị của học sinh',
      icon: CheckCircle,
      color: '#22C55E',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
      textColor: 'text-emerald-700'
    },
    {
      title: 'Điểm số trung bình',
      value: averageScore > 0 ? averageScore.toFixed(1) : '---',
      unit: '/ 10 điểm',
      desc: completedTests > 0 ? `Tỷ lệ chính xác: ${accuracyRate}%` : 'Chưa thực hiện bài làm nào',
      icon: Award,
      color: '#FFB020',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
      textColor: 'text-amber-700'
    },
    {
      title: 'Số bài học kiến thức',
      value: totalLessons.toString(),
      unit: 'bài giảng',
      desc: 'Tóm tắt trọng tâm & bài tập mẫu',
      icon: BookOpen,
      color: '#8B5CF6',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-100',
      textColor: 'text-purple-700'
    }
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#172B4D] flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#2684FF]" />
          Chỉ số học tập thực tế hệ thống
        </h3>
        <span className="text-xs text-[#64748B]">Dữ liệu thực tế từ bộ lưu trữ thiết bị</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`group p-5 rounded-2xl bg-white border ${card.borderColor} shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default flex flex-col justify-between`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#64748B]">
                    {card.title}
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-2xl sm:text-3xl font-black text-[#172B4D] tracking-tight">
                      {card.value}
                    </span>
                    <span className="text-xs font-medium text-[#64748B]">
                      {card.unit}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-11 h-11 rounded-2xl ${card.bgColor} ${card.textColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-[#64748B]">
                {card.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
