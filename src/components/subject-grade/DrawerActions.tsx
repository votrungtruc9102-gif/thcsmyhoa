import React from 'react';
import { Check, X } from 'lucide-react';

interface DrawerActionsProps {
  onCancel: () => void;
  onApply: () => void;
  isValid: boolean;
  hasChanges: boolean;
}

export const DrawerActions: React.FC<DrawerActionsProps> = ({
  onCancel,
  onApply,
  isValid,
  hasChanges
}) => {
  return (
    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2EAF5] mt-4 bg-white">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2.5 rounded-xl border border-slate-200 text-[#64748B] hover:text-[#172B4D] hover:bg-slate-50 font-semibold text-sm transition-colors cursor-pointer flex items-center gap-1.5"
      >
        <X className="w-4 h-4" />
        Hủy bỏ
      </button>

      <button
        type="button"
        onClick={onApply}
        disabled={!isValid}
        className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-all duration-200 cursor-pointer ${
          isValid
            ? 'bg-[#2684FF] hover:bg-blue-600 text-white shadow-blue-500/25 hover:shadow active:scale-[0.98]'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
        }`}
      >
        <Check className="w-4 h-4 stroke-[2.5]" />
        Áp dụng lựa chọn
        {hasChanges && (
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        )}
      </button>
    </div>
  );
};
