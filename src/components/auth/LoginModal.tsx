import React, { useState } from 'react';
import {
  GraduationCap,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  X,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { authService } from '../../services/authService';
import { UserAccount } from '../../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showQuickFill, setShowQuickFill] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate 400ms network check for authentic feel
      await new Promise(r => setTimeout(r, 350));
      const user = await authService.login(username, password);
      setIsLoading(false);
      onLoginSuccess(user);
      onClose();
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại.');
    }
  };

  const handleQuickFill = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-blue-100 my-auto animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
          aria-label="Đóng cửa sổ đăng nhập"
        >
          <X className="w-4 h-4" />
        </button>

        {/* School Branding & Title */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2684FF] to-[#22C7E8] text-white flex items-center justify-center shadow-lg shadow-blue-500/25 mx-auto">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#172B4D] tracking-tight">
              Đăng nhập hệ thống
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5 font-medium">
              Trường THCS Mỹ Hòa · Năm học 2026–2027
            </p>
          </div>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="mb-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-xs font-bold text-[#172B4D] mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600" />
              Tên đăng nhập
            </label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={e => {
                setUsername(e.target.value);
                setErrorMessage('');
              }}
              placeholder="Nhập tên đăng nhập của bạn..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#2684FF] focus:ring-2 focus:ring-blue-500/20 text-sm font-medium text-[#172B4D]"
              disabled={isLoading}
              autoFocus
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-[#172B4D] mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="Nhập mật khẩu..."
                className="w-full pl-4 pr-11 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#2684FF] focus:ring-2 focus:ring-blue-500/20 text-sm font-medium text-[#172B4D]"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-bold text-sm text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isLoading
                ? 'bg-blue-400 cursor-wait'
                : 'bg-[#2684FF] hover:bg-blue-600 shadow-blue-500/25 active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Đang xác thực thông tin...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Đăng nhập</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Helper Tip (Click to quickly fill credentials for verification) */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
              Tài khoản thử nghiệm hệ thống
            </span>
            <button
              type="button"
              onClick={() => setShowQuickFill(!showQuickFill)}
              className="text-[11px] text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
            >
              {showQuickFill ? 'Ẩn gợi ý' : 'Xem danh sách'}
            </button>
          </div>

          {showQuickFill && (
            <div className="mt-3 space-y-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs animate-fadeIn">
              <div className="text-[11px] font-bold text-slate-600">Bấm chọn tài khoản để tự động điền:</div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleQuickFill('teacher', 'myhoa2026')}
                  className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-left cursor-pointer transition-colors"
                >
                  <div className="font-bold text-amber-900">👨‍🏫 Giáo viên</div>
                  <div className="text-[10px] text-amber-700">teacher / myhoa2026</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('student', 'myhoa2026')}
                  className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-left cursor-pointer transition-colors"
                >
                  <div className="font-bold text-blue-900">🎒 Học sinh (Khối 6)</div>
                  <div className="text-[10px] text-blue-700">student / myhoa2026</div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
