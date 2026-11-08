import React, { useState, useEffect } from 'react';
import { X, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { GradeLevel, SubjectId } from '../../types';
import { SUBJECTS } from '../../data/mockData';
import { GradeSelector } from './GradeSelector';
import { SubjectSelector } from './SubjectSelector';
import { SelectionSummary } from './SelectionSummary';
import { DrawerActions } from './DrawerActions';

interface SubjectGradeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentGrade: GradeLevel;
  currentSubjectId: SubjectId;
  onApply: (grade: GradeLevel, subjectId: SubjectId) => void;
  getSubjectStats: (grade: GradeLevel, subjectId: SubjectId) => { lessonsCount: number; questionsCount: number };
}

export const SubjectGradeDrawer: React.FC<SubjectGradeDrawerProps> = ({
  isOpen,
  onClose,
  currentGrade,
  currentSubjectId,
  onApply,
  getSubjectStats
}) => {
  // Temporary state inside the drawer
  const [tempGrade, setTempGrade] = useState<GradeLevel>(currentGrade);
  const [tempSubjectId, setTempSubjectId] = useState<SubjectId>(currentSubjectId);
  const [showAppliedToast, setShowAppliedToast] = useState(false);

  // Sync temp state when drawer opens
  useEffect(() => {
    if (isOpen) {
      setTempGrade(currentGrade);
      setTempSubjectId(currentSubjectId);
    }
  }, [isOpen, currentGrade, currentSubjectId]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentSubjectObj = SUBJECTS.find(s => s.id === tempSubjectId) || SUBJECTS[0];
  const stats = getSubjectStats(tempGrade, tempSubjectId);
  const hasChanges = tempGrade !== currentGrade || tempSubjectId !== currentSubjectId;

  const handleApply = () => {
    onApply(tempGrade, tempSubjectId);
    setShowAppliedToast(true);
    setTimeout(() => {
      setShowAppliedToast(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 animate-fadeIn"
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl flex flex-col h-full transform transition-all duration-300 ease-out animate-slideInRight border-l border-blue-100">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E2EAF5] bg-gradient-to-r from-blue-50/70 via-white to-indigo-50/40 flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#2684FF] text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0 mt-0.5">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#172B4D]">
                  Chọn môn học và khối lớp
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Lựa chọn nội dung phù hợp với chương trình học của bạn tại Trường THCS Mỹ Hòa
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body - Scrollable */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* Grade Selector */}
            <GradeSelector
              selectedGrade={tempGrade}
              onSelectGrade={setTempGrade}
            />

            {/* Subject Selector */}
            <SubjectSelector
              subjects={SUBJECTS}
              selectedSubjectId={tempSubjectId}
              onSelectSubject={setTempSubjectId}
              getSubjectStats={(subId) => getSubjectStats(tempGrade, subId)}
            />

            {/* Selection Summary */}
            <SelectionSummary
              grade={tempGrade}
              subject={currentSubjectObj}
              lessonsCount={stats.lessonsCount}
              questionsCount={stats.questionsCount}
            />

            {/* Local Storage Indicator Notification */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-[#64748B] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
              <span>
                Lựa chọn của bạn sẽ được lưu tự động trên thiết bị này và áp dụng đồng bộ cho tất cả các trang học tập.
              </span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-white border-t border-[#E2EAF5]">
            <DrawerActions
              onCancel={onClose}
              onApply={handleApply}
              isValid={Boolean(tempGrade && tempSubjectId)}
              hasChanges={hasChanges}
            />
          </div>

          {/* Toast feedback */}
          {showAppliedToast && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-4 h-4" />
              Đã cập nhật môn và khối thành công!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
