import React from 'react';
import { Sparkles, BookOpenCheck, HelpCircle, Layers } from 'lucide-react';
import { GradeLevel, SubjectMeta } from '../../types';

interface SelectionSummaryProps {
  grade: GradeLevel;
  subject: SubjectMeta;
  lessonsCount: number;
  questionsCount: number;
}

export const SelectionSummary: React.FC<SelectionSummaryProps> = ({
  grade,
  subject,
  lessonsCount,
  questionsCount
}) => {
  return (
    <div className="rounded-2xl p-4 bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-white border border-blue-200/80 shadow-xs">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
          Xem trước lựa chọn học tập
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-blue-200 text-[#172B4D] font-bold shadow-xs">
          <Layers className="w-4 h-4 text-[#2684FF]" />
          <span>Khối lớp: <span className="text-blue-600">Lớp {grade}</span></span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-blue-200 text-[#172B4D] font-bold shadow-xs">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: subject.color }}
          />
          <span>Môn học: <span className="text-blue-600">{subject.name}</span></span>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-blue-100 text-xs text-[#64748B]">
        <div className="flex items-center gap-1.5">
          <BookOpenCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>
            {lessonsCount > 0 ? (
              <strong className="text-emerald-700 font-semibold">{lessonsCount} bài học lý thuyết</strong>
            ) : (
              <span className="text-amber-600">Chưa có bài học</span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
          <span>
            {questionsCount > 0 ? (
              <strong className="text-blue-700 font-semibold">{questionsCount} câu hỏi trắc nghiệm</strong>
            ) : (
              <span className="text-amber-600">Chưa có câu hỏi</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
