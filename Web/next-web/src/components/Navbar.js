'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Lock } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith('/admin') || pathname === '/login') {
    return null;
  }

  useEffect(() => {
    // Check if user is logged in as admin
    fetch('/api/auth/me')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then(data => {
        if (data.isAuthenticated && data.roles?.includes('Admin')) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      })
      .catch(() => setIsAdmin(false));
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Lập Lá Số' },
    { href: '/phong-thuy', label: 'Xem Phong Thủy' },
    { href: '/bai-viet', label: 'Kinh Nghiệm' },
    { href: '/san-pham', label: 'Mua Vé Luận Giải' },
    { href: '/lien-he', label: 'Liên Hệ' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FDFCF7]/80 backdrop-blur-md border-b border-[#E5DDD0]/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#C5A059] text-3xl font-serif italic font-semibold tracking-wider">Tử Vi Số Mệnh</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium text-sm tracking-wider uppercase transition-colors hover:text-[#C5A059] ${
                    active ? 'text-[#C5A059] font-bold' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 px-4 py-2 border border-[#C5A059] rounded-full text-xs font-semibold uppercase tracking-wider text-[#C5A059] hover:bg-[#C5A059]/5 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                Quản Trị
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 p-2"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E5DDD0]/50 bg-[#FDFCF7]/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-3 shadow-lg">
          {navLinks.map(link => {
            const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-base font-semibold uppercase tracking-wide ${
                  active ? 'bg-[#C5A059]/10 text-[#C5A059]' : 'text-slate-600 hover:bg-[#E5DDD0]/20'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center px-3 py-2 border border-[#C5A059] rounded-xl text-[#C5A059] font-bold uppercase tracking-wider text-sm hover:bg-[#C5A059]/5 transition-colors"
            >
              Vào Bảng Quản Trị
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
