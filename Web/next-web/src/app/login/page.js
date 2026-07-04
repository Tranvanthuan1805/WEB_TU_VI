'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ChevronLeft } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrorMsg("");

    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, rememberMe })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => { throw new Error(data.error || "Sai tên đăng nhập hoặc mật khẩu."); });
        }
        return res.json();
      })
      .then(data => {
        if (data.success) {
          router.push('/admin');
        }
      })
      .catch(err => {
        setErrorMsg(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#FDFCF7] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A059]/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-md w-full bg-white border border-[#E5DDD0]/80 rounded-3xl p-8 md:p-10 shadow-lg space-y-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-1 text-xs text-[#C5A059] font-bold hover:underline mb-2 uppercase tracking-widest">
            <ChevronLeft className="w-3.5 h-3.5" /> Về Trang Chủ
          </Link>
          <h2 className="font-serif text-3xl font-bold text-slate-800 italic">Quản Trị Hệ Thống</h2>
          <p className="text-slate-500 text-xs font-light">Vui lòng đăng nhập tài khoản quản trị viên</p>
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-600 text-xs font-medium rounded-xl">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider">Tài khoản Email</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="ivory-input pl-10"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="ivory-input pl-10 pr-10"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-slate-500 font-light cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="rounded border-[#E5DDD0] text-[#C5A059] focus:ring-[#C5A059]"
              />
              Ghi nhớ đăng nhập
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-gold py-3.5 w-full flex items-center justify-center gap-2 cursor-pointer shadow-sm text-xs font-bold uppercase disabled:opacity-75"
            >
              <span>{loading ? "Đang xác thực..." : "Đăng Nhập"}</span>
              <ShieldCheck className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
