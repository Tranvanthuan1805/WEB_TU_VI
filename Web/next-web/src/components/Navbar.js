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
    { href: '/', label: 'Trang chủ' },
    { href: '/bai-viet', label: 'Bài viết' },
    { href: '/san-pham', label: 'Sản phẩm' },
    { href: '/lien-he', label: 'Liên hệ' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-amber-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo & Title */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-full border border-amber-200/60 shadow-sm bg-amber-50/20 p-0.5 flex items-center justify-center transition-all duration-500 group-hover:shadow-md group-hover:scale-105">
            <img src="/logo.png" alt="Tử Vi Thần Toán Logo" className="w-full h-full object-contain animate-spin-slow" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-sans font-black text-lg md:text-xl bg-gradient-to-r from-amber-700 via-amber-500 to-amber-800 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient tracking-wide drop-shadow-sm select-none">
              Tử Vi Thần Toán
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map(link => {
            const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  active 
                    ? 'text-amber-700 bg-amber-50 font-semibold' 
                    : 'text-stone-600 hover:text-amber-600 hover:bg-amber-50/70'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Nav (Admin/Mobile Button) */}
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Link
              href="/admin"
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-stone-400 hover:text-amber-600 transition-colors border border-stone-200 hover:border-amber-300 hover:bg-amber-50 px-3 py-1.5 rounded-lg"
            >
              <span className="text-base">⊛</span> Quản trị
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Mở menu"
            className="md:hidden flex flex-col items-center justify-center w-9 h-9 gap-1.5 rounded-lg hover:bg-amber-50 transition-colors"
          >
            <span className={`block w-5 h-0.5 bg-stone-600 rounded transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-stone-600 rounded transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-stone-600 rounded transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden overflow-hidden transition-all duration-300">
          <div className="bg-white px-4 py-3 space-y-1 border-t border-slate-100 shadow-lg">
            {navLinks.map(link => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                    active 
                      ? 'text-amber-700 bg-amber-50 font-semibold' 
                      : 'text-stone-700 hover:text-amber-600 hover:bg-amber-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {isAdmin && (
              <div className="pt-1 border-t border-stone-100 mt-1">
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                >
                  <span>⊛</span> Quản trị
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
