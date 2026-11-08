import React, { useState } from 'react';
import { Lock, KeyRound, ShieldAlert, X, Check, HelpCircle } from 'lucide-react';

interface TeacherAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const TeacherAuthModal: React.FC<TeacherAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default demo passwords for teachers
    if (password === 'myhoa2026' || password === 'admin' || password === 'thcsmyhoa') {
      setError('');
      setPassword('');
      onSuccess();
    } else {
      setError('Mật khẩu không chính xác. Mẹo thử nghiệm: nhập "myhoa2026"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-blue-100 animate-scaleUp relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#172B4D]">Xác thực tài khoản Giáo viên</h3>
            <p className="text-xs text-[#64748B]">Trường THCS Mỹ Hòa · Năm học 2026–2027</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Khu vực dành riêng cho giáo viên quản lý ngân hàng câu hỏi, tạo đề kiểm tra, tải tài liệu bài giảng và theo dõi phổ điểm học sinh.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#172B4D] mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-blue-600" />
              Mật khẩu xác thực:
            </label>
            <input
              type="password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setError('');
              }}
              placeholder="Nhập mật khẩu giáo viên..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#2684FF] focus:ring-2 focus:ring-blue-500/20 text-sm font-medium text-[#172B4D]"
              autoFocus
            />
            {error && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                {error}
              </p>
            )}
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-800 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Mật khẩu demo thử nghiệm:</strong> Nhập <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-amber-900 border border-amber-300">myhoa2026</code> để trải nghiệm ngay quyền giáo viên.
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold text-xs transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#2684FF] hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-blue-500/20 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              Xác nhận & Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
