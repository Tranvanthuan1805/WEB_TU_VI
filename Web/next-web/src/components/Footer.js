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
    <footer className="mt-auto bg-slate-900 text-slate-400 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">☯</span>
              <span className="font-bold text-amber-400">TỬ VI THẦN TOÁN</span>
            </div>
            <p className="text-sm leading-relaxed">
              Tra cứu lịch âm dương, can chi, tiết khí và tứ trụ theo phương pháp truyền thống.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm mb-3">Liên kết</h3>
            <div className="space-y-1.5 text-sm">
              <Link href="/" className="block hover:text-amber-400 transition-colors">Trang chủ</Link>
              <Link href="/bai-viet" className="block hover:text-amber-400 transition-colors">Bài viết</Link>
              <Link href="/lien-he" className="block hover:text-amber-400 transition-colors">Liên hệ</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm mb-3">Về chúng tôi</h3>
            <p className="text-sm leading-relaxed">
              Hệ thống tính toán âm lịch và tứ trụ chính xác, phục vụ tra cứu mệnh lý.
            </p>
          </div>
        </div>
        <div className="pt-6 border-t border-slate-800 text-center text-xs">
          <p>© {currentYear} Tử Vi Thần Toán · Tất cả quyền được bảo lưu</p>
        </div>
      </div>
    </footer>
  );
}
