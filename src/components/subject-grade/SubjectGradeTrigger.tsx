import React from 'react';
import { BookOpen, ChevronRight, Layers } from 'lucide-react';
import { GradeLevel, SubjectId } from '../../types';
import { SUBJECTS } from '../../data/mockData';

interface SubjectGradeTriggerProps {
  grade: GradeLevel;
  subjectId: SubjectId;
  onClick: () => void;
}

export const SubjectGradeTrigger: React.FC<SubjectGradeTriggerProps> = ({
  grade,
  subjectId,
  onClick
}) => {
  const currentSubject = SUBJECTS.find(s => s.id === subjectId) || SUBJECTS[0];

  return (
    <button
      onClick={onClick}
      className="group relative flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200/80 transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] text-left cursor-pointer"
      title="Nhấn để đổi Môn học và Khối lớp"
      aria-label="Chọn môn học và khối lớp"
    >
      <div className="w-9 h-9 rounded-xl bg-[#2684FF] text-white flex items-center justify-center shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
        <BookOpen className="w-5 h-5" />
      </div>

      <div className="flex flex-col">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 flex items-center gap-1">
          <Layers className="w-3 h-3 inline" /> Chọn môn & khối
        </span>
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#172B4D]">
          <span className="truncate max-w-[110px] sm:max-w-[130px]">{currentSubject.name}</span>
          <span className="text-gray-300">•</span>
          <span className="text-blue-700 whitespace-nowrap">Lớp {grade}</span>
        </div>
      </div>

      <div className="w-6 h-6 rounded-full bg-white/80 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:translate-x-0.5 transition-transform ml-1">
        <ChevronRight className="w-3.5 h-3.5" />
      </div>
    </button>
  );
};
