'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith('/admin') || pathname === '/login') {
    return null;
  }

  return (
    <footer className="bg-[#121210] text-[#DEDBD2] border-t border-[#3C3A35]/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="text-[#C5A059] text-3xl font-serif italic font-semibold">Tử Vi Số Mệnh</Link>
            <p className="text-[#A2A09B] text-sm leading-relaxed font-light max-w-sm">
              Nền tảng luận giải tử vi số mệnh kết hợp cổ thuật phương đông cùng thuật toán số hiện đại. Giúp bạn định vị bản thân và khai phá tài lộc hanh thông.
            </p>
          </div>

          <div>
            <h4 className="text-[#C5A059] font-semibold text-xs tracking-widest uppercase mb-4">Danh Mục</h4>
            <ul className="space-y-3 text-sm text-[#A2A09B] font-light">
              <li><Link href="/" className="hover:text-white transition-colors">Lập Lá Số Tử Vi</Link></li>
              <li><Link href="/phong-thuy" className="hover:text-white transition-colors">Xem Phong Thủy & Quẻ Dịch</Link></li>
              <li><Link href="/bai-viet" className="hover:text-white transition-colors">Blog Kiến Thức</Link></li>
              <li><Link href="/san-pham" className="hover:text-white transition-colors">Mua Vé VIP</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#C5A059] font-semibold text-xs tracking-widest uppercase mb-4">Điều Khoản</h4>
            <ul className="space-y-3 text-sm text-[#A2A09B] font-light">
              <li><Link href="/chinh-sach-bao-mat" className="hover:text-white transition-colors">Chính Sách Bảo Mật</Link></li>
              <li><Link href="/dieu-khoan-dich-vu" className="hover:text-white transition-colors">Điều Khoản Dịch Vụ</Link></li>
              <li><Link href="/mien-tru-trach-nhiem" className="hover:text-white transition-colors">Miễn Trừ Trách Nhiệm</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#3C3A35]/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#82807B]">
          <p>&copy; {currentYear} Bản Quyền Thuộc Về Tử Vi Số Mệnh. Mọi quyền được bảo lưu.</p>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-white flex items-center gap-1.5 transition-colors">
              <Lock className="w-3.5 h-3.5" />
              Đăng nhập Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
