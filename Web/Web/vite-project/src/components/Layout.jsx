import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Compass, HelpCircle, FileText, ShoppingBag, Mail, ChevronRight, Lock } from 'lucide-react';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if admin cookie or state is logged in
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.isAuthenticated && data.roles?.includes('Admin')) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      })
      .catch(() => setIsAdmin(false));
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF7] text-slate-800 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FDFCF7]/80 backdrop-blur-md border-b border-[#E5DDD0]/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-[#C5A059] text-3xl font-serif italic font-semibold tracking-wider">Tử Vi Số Mệnh</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `font-medium text-sm tracking-wider uppercase transition-colors hover:text-[#C5A059] ${
                    isActive ? 'text-[#C5A059] font-bold' : 'text-slate-600'
                  }`
                }
              >
                Lập Lá Số
              </NavLink>
              <NavLink 
                to="/phong-thuy" 
                className={({ isActive }) => 
                  `font-medium text-sm tracking-wider uppercase transition-colors hover:text-[#C5A059] ${
                    isActive ? 'text-[#C5A059] font-bold' : 'text-slate-600'
                  }`
                }
              >
                Xem Phong Thủy
              </NavLink>
              <NavLink 
                to="/bai-viet" 
                className={({ isActive }) => 
                  `font-medium text-sm tracking-wider uppercase transition-colors hover:text-[#C5A059] ${
                    isActive ? 'text-[#C5A059] font-bold' : 'text-slate-600'
                  }`
                }
              >
                Kinh Nghiệm
              </NavLink>
              <NavLink 
                to="/san-pham" 
                className={({ isActive }) => 
                  `font-medium text-sm tracking-wider uppercase transition-colors hover:text-[#C5A059] ${
                    isActive ? 'text-[#C5A059] font-bold' : 'text-slate-600'
                  }`
                }
              >
                Mua Vé Luận Giải
              </NavLink>
              <NavLink 
                to="/lien-he" 
                className={({ isActive }) => 
                  `font-medium text-sm tracking-wider uppercase transition-colors hover:text-[#C5A059] ${
                    isActive ? 'text-[#C5A059] font-bold' : 'text-slate-600'
                  }`
                }
              >
                Liên Hệ
              </NavLink>
              
              {isAdmin && (
                <Link 
                  to="/admin" 
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
            <NavLink 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-xl text-base font-semibold uppercase tracking-wide ${
                  isActive ? 'bg-[#C5A059]/10 text-[#C5A059]' : 'text-slate-600 hover:bg-[#E5DDD0]/20'
                }`
              }
            >
              Lập Lá Số
            </NavLink>
            <NavLink 
              to="/phong-thuy" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-xl text-base font-semibold uppercase tracking-wide ${
                  isActive ? 'bg-[#C5A059]/10 text-[#C5A059]' : 'text-slate-600 hover:bg-[#E5DDD0]/20'
                }`
              }
            >
              Xem Phong Thủy
            </NavLink>
            <NavLink 
              to="/bai-viet" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-xl text-base font-semibold uppercase tracking-wide ${
                  isActive ? 'bg-[#C5A059]/10 text-[#C5A059]' : 'text-slate-600 hover:bg-[#E5DDD0]/20'
                }`
              }
            >
              Kinh Nghiệm
            </NavLink>
            <NavLink 
              to="/san-pham" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-xl text-base font-semibold uppercase tracking-wide ${
                  isActive ? 'bg-[#C5A059]/10 text-[#C5A059]' : 'text-slate-600 hover:bg-[#E5DDD0]/20'
                }`
              }
            >
              Mua Vé Luận Giải
            </NavLink>
            <NavLink 
              to="/lien-he" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-xl text-base font-semibold uppercase tracking-wide ${
                  isActive ? 'bg-[#C5A059]/10 text-[#C5A059]' : 'text-slate-600 hover:bg-[#E5DDD0]/20'
                }`
              }
            >
              Liên Hệ
            </NavLink>
            {isAdmin && (
              <Link 
                to="/admin" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center px-3 py-2 border border-[#C5A059] rounded-xl text-[#C5A059] font-bold uppercase tracking-wider text-sm hover:bg-[#C5A059]/5 transition-colors"
              >
                Vào Bảng Quản Trị
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#121210] text-[#DEDBD2] border-t border-[#3C3A35]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
            <div className="md:col-span-2 space-y-6">
              <Link to="/" className="text-[#C5A059] text-3xl font-serif italic font-semibold">Tử Vi Số Mệnh</Link>
              <p className="text-[#A2A09B] text-sm leading-relaxed font-light max-w-sm">
                Nền tảng luận giải tử vi số mệnh kết hợp cổ thuật phương đông cùng thuật toán số hiện đại. Giúp bạn định vị bản thân và khai phá tài lộc hanh thông.
              </p>
            </div>
            
            <div>
              <h4 className="text-[#C5A059] font-semibold text-xs tracking-widest uppercase mb-4">Danh Mục</h4>
              <ul className="space-y-3 text-sm text-[#A2A09B] font-light">
                <li><Link to="/" className="hover:text-white transition-colors">Lập Lá Số Tử Vi</Link></li>
                <li><Link to="/phong-thuy" className="hover:text-white transition-colors">Xem Phong Thủy & Quẻ Dịch</Link></li>
                <li><Link to="/bai-viet" className="hover:text-white transition-colors">Blog Kiến Thức</Link></li>
                <li><Link to="/san-pham" className="hover:text-white transition-colors">Mua Vé VIP</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#C5A059] font-semibold text-xs tracking-widest uppercase mb-4">Điều Khoản</h4>
              <ul className="space-y-3 text-sm text-[#A2A09B] font-light">
                <li><Link to="/chinh-sach-bao-mat" className="hover:text-white transition-colors">Chính Sách Bảo Mật</Link></li>
                <li><Link to="/dieu-khoan-dich-vu" className="hover:text-white transition-colors">Điều Khoản Dịch Vụ</Link></li>
                <li><Link to="/mien-tru-trach-nhiem" className="hover:text-white transition-colors">Miễn Trừ Trách Nhiệm</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#3C3A35]/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#82807B]">
            <p>&copy; {new Date().getFullYear()} Bản Quyền Thuộc Về Tử Vi Số Mệnh. Mọi quyền được bảo lưu.</p>
            <div className="flex gap-4">
              <Link to="/login" className="hover:text-white flex items-center gap-1.5 transition-colors">
                <Lock className="w-3.5 h-3.5" />
                Đăng nhập Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
