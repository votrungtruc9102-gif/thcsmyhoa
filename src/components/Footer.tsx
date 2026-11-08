import React from 'react';
import { GraduationCap, Heart, Sparkles, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E2EAF5] mt-16 text-[#64748B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: School Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2684FF] to-[#22C7E8] text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-[#172B4D]">
                  TRƯỜNG THCS MỸ HÒA
                </h4>
                <p className="text-xs text-blue-600 font-semibold">
                  HỆ THỐNG HỌC TẬP TRỰC TUYẾN · NĂM HỌC 2026–2027
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-md pt-1">
              Nền tảng số hóa giáo dục hỗ trợ học sinh các khối 6, 7, 8, 9 khám phá tri thức, rèn luyện kỹ năng giải trắc nghiệm và tham gia các trò chơi học tập tương tác chuẩn chương trình GDPT 2018.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Chế độ lưu trữ: Trực tiếp trên thiết bị học tập của người dùng (Local Storage)</span>
            </div>
          </div>

          {/* Col 2: Contact info */}
          <div className="space-y-3 text-xs">
            <h5 className="font-bold text-[#172B4D] uppercase tracking-wider">
              Thông tin liên hệ
            </h5>
            <ul className="space-y-2 text-slate-500">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                <span>Trường THCS Mỹ Hòa</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Số điện thoại: (02703) 891198</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>thcsmyhoa.txbm@vinhlong.edu.vn</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Year */}
          <div className="space-y-3 text-xs">
            <h5 className="font-bold text-[#172B4D] uppercase tracking-wider">
              Khối lớp trực tuyến
            </h5>
            <div className="grid grid-cols-2 gap-2">
              <span className="p-2 rounded-xl bg-slate-50 border border-slate-100 font-semibold text-slate-700 text-center">
                Khối 6
              </span>
              <span className="p-2 rounded-xl bg-slate-50 border border-slate-100 font-semibold text-slate-700 text-center">
                Khối 7
              </span>
              <span className="p-2 rounded-xl bg-slate-50 border border-slate-100 font-semibold text-slate-700 text-center">
                Khối 8
              </span>
              <span className="p-2 rounded-xl bg-slate-50 border border-slate-100 font-semibold text-slate-700 text-center">
                Khối 9
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div>
            © 2026–2027 Trường THCS Mỹ Hòa. Bản quyền thuộc về nhà trường.
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Xây dựng vì học sinh thân yêu</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
