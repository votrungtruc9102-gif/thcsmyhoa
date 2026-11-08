import React from 'react';
import {
  Laptop,
  Calculator,
  BookOpen,
  Languages,
  Atom,
  Compass,
  Wrench,
  HeartHandshake,
  Palette,
  Activity,
  Sparkles,
  Check,
  FolderOpen
} from 'lucide-react';
import { SubjectId, SubjectMeta } from '../../types';

interface SubjectSelectorProps {
  subjects: SubjectMeta[];
  selectedSubjectId: SubjectId;
  onSelectSubject: (id: SubjectId) => void;
  getSubjectStats: (id: SubjectId) => { lessonsCount: number; questionsCount: number };
}

const ICON_MAP: Record<string, React.ElementType> = {
  Laptop,
  Calculator,
  BookOpen,
  Languages,
  Atom,
  Compass,
  Wrench,
  HeartHandshake,
  Palette,
  Activity,
  Sparkles
};

export const SubjectSelector: React.FC<SubjectSelectorProps> = ({
  subjects,
  selectedSubjectId,
  onSelectSubject,
  getSubjectStats
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-[#172B4D] flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-[#2684FF]" />
          2. Chọn môn học theo chương trình GDPT 2018
        </label>
        <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
          Ưu tiên Tin học
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto pr-1">
        {subjects.map(subj => {
          const isSelected = selectedSubjectId === subj.id;
          const stats = getSubjectStats(subj.id);
          const IconComp = ICON_MAP[subj.icon] || BookOpen;
          const hasContent = stats.lessonsCount > 0 || stats.questionsCount > 0;

          return (
            <button
              key={subj.id}
              type="button"
              onClick={() => onSelectSubject(subj.id)}
              className={`group relative flex items-start gap-3.5 p-3 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-[#2684FF] bg-blue-50/80 ring-2 ring-blue-500/10 shadow-sm'
                  : 'border-[#E2EAF5] bg-white hover:border-blue-200 hover:bg-slate-50/60'
              }`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white font-bold shadow-xs transition-transform group-hover:scale-105"
                style={{ backgroundColor: subj.color }}
              >
                <IconComp className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-sm font-bold text-[#172B4D] truncate">
                    {subj.name}
                  </h4>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-[#2684FF] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-[#64748B] line-clamp-1 mt-0.5">
                  {subj.description}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  {hasContent ? (
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
                      {stats.lessonsCount} bài học • {stats.questionsCount} câu hỏi
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
                      Đang cập nhật nội dung
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
