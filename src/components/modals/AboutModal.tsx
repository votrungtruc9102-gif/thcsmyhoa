import React from 'react';
import { X, GraduationCap, MapPin, Phone, Mail, Award, BookOpen, ShieldCheck, Heart } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white p-6 relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#2684FF] to-[#22C7E8] flex items-center justify-center text-white shadow-lg">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                TRƯỜNG THCS MỸ HÒA
              </h3>
              <p className="text-xs text-blue-400 font-semibold">
                Nền tảng Học tập Trực tuyến · Năm học 2026–2027
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6 text-xs text-slate-600 leading-relaxed">
          {/* Mission */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-sm text-[#172B4D] flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              Sứ mệnh giáo dục & Chuyển đổi số
            </h4>
            <p>
              Hệ thống Học tập Trực tuyến Trường THCS Mỹ Hòa được xây dựng nhằm hiện đại hóa phương pháp dạy và học, giúp các em học sinh từ <strong>Khối 6 đến Khối 9</strong> dễ dàng tiếp cận kho học liệu điện tử, rèn luyện bài tập trắc nghiệm và tham gia trò chơi tri thức chuẩn chương trình GDPT 2018.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1">
              <div className="font-bold text-blue-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                17 Bài học Tin học 6
              </div>
              <p className="text-[11px] text-blue-700">
                Đầy đủ 5 chủ đề chuẩn sách giáo khoa, tích hợp câu hỏi ôn luyện và mục tiêu từng bài.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
              <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Luyện tập & Kiểm tra
              </div>
              <p className="text-[11px] text-emerald-700">
                Chấm điểm tức thì, giải thích chi tiết đáp án và ghi nhận bảng vàng thành tích.
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Thông tin liên hệ nhà trường
            </h5>
            <div className="space-y-1.5 text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Trường THCS Mỹ Hòa — Thị xã Bình Minh, Tỉnh Vĩnh Long</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Số điện thoại: <strong className="text-slate-900">(02703) 891198</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Email: <strong className="text-slate-900">thcsmyhoa.txbm@vinhlong.edu.vn</strong></span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-slate-400 text-[11px] border-t border-slate-100">
            <span>© 2026–2027 THCS Mỹ Hòa</span>
            <span className="flex items-center gap-1 text-slate-500 font-medium">
              Vì tương lai học sinh thân yêu <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
