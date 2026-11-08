import React from 'react';
import { Check, GraduationCap } from 'lucide-react';
import { GradeLevel } from '../../types';

interface GradeSelectorProps {
  selectedGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
}

const GRADES_INFO: { grade: GradeLevel; subtitle: string; iconTag: string }[] = [
  { grade: 6, subtitle: 'Khởi đầu cấp 2 & Làm quen', iconTag: '🎒 Khởi đầu' },
  { grade: 7, subtitle: 'Tăng tốc & Mở rộng kiến thức', iconTag: '🚀 Tăng tốc' },
  { grade: 8, subtitle: 'Đột phá & Nâng cao kỹ năng', iconTag: '⭐ Đột phá' },
  { grade: 9, subtitle: 'Bứt phá & Ôn thi chuyển cấp', iconTag: '🏆 Bứt phá' }
];

export const GradeSelector: React.FC<GradeSelectorProps> = ({
  selectedGrade,
  onSelectGrade
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-[#172B4D] flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-[#2684FF]" />
          1. Chọn khối lớp học tập
        </label>
        <span className="text-xs text-[#64748B] font-medium">Bắt buộc</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {GRADES_INFO.map(item => {
          const isSelected = selectedGrade === item.grade;
          return (
            <button
              key={item.grade}
              type="button"
              onClick={() => onSelectGrade(item.grade)}
              className={`relative flex flex-col p-3 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-[#2684FF] bg-blue-50/70 shadow-sm shadow-blue-500/10'
                  : 'border-[#E2EAF5] bg-white hover:border-blue-200 hover:bg-slate-50/70'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#2684FF] text-white flex items-center justify-center shadow-xs">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}

              <span className="text-[10px] font-semibold text-blue-600 mb-1 inline-flex items-center gap-0.5">
                {item.iconTag}
              </span>

              <div className="text-base font-extrabold text-[#172B4D]">
                Lớp {item.grade}
              </div>

              <div className="text-[11px] text-[#64748B] line-clamp-1 mt-0.5">
                {item.subtitle}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
