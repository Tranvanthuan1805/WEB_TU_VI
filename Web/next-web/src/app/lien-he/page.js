'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, User, Copy } from 'lucide-react';

export default function Contact() {
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const finalEmail = email.trim() || "guest@tuvithantoan.com";

    fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        fullName: "Khách viếng thăm", 
        email: finalEmail, 
        phone: "", 
        message: content 
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSuccess(true);
          setEmail("");
          setContent("");
        } else {
          alert("Lỗi: " + (data.error || "Không gửi được liên hệ"));
        }
      })
      .catch(err => {
        alert("Lỗi kết nối: " + err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-full flex flex-col bg-slate-50/50">
      
      {/* Hero Header */}
      <section className="py-12 px-4 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #06091c, #0d1535, #180924)' }}>
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-amber-500/10 blur-[80px]"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-purple-500/10 blur-[80px]"></div>
        <div className="relative z-10 max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-400 uppercase tracking-widest animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            Kết Nối Bản Mệnh
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold" style={{ background: 'linear-gradient(180deg, #fde68a, #d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-indigo-200 text-sm md:text-base leading-relaxed">
            Hệ thống Tử Vi Thần Toán sẵn sàng lắng nghe mọi ý kiến đóng góp, gác lại âu lo, giải đáp vận số.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Info Column (5 columns) */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-lg font-bold text-stone-800 tracking-wide mb-2 pl-1 border-l-4 border-amber-500">Thông Tin Liên Hệ</h2>
            
            <div className="space-y-4">
              
              {/* Card 1: Representative */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-200/50 group animate-fade-in-up">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/10 to-yellow-500/5 flex items-center justify-center shrink-0 border border-slate-50 transition-all duration-500 group-hover:scale-110">
                  <User className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Đại Diện Hệ Thống</p>
                  <p className="text-stone-800 font-bold text-sm md:text-base mt-0.5 truncate select-all">Trần Đình Mãn</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button 
                      onClick={() => handleCopy("Trần Đình Mãn", "man")}
                      className="flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-amber-600 transition-colors cursor-pointer"
                      title="Sao chép thông tin"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedText === "man" ? "Đã chép" : "Sao chép"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: Phone */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-200/50 group animate-fade-in-up">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 flex items-center justify-center shrink-0 border border-slate-50 transition-all duration-500 group-hover:scale-110">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Số Điện Thoại</p>
                  <p className="text-stone-800 font-bold text-sm md:text-base mt-0.5 truncate select-all">0935.939.552</p>
                  <div className="flex items-center gap-3 mt-2">
                    <a href="tel:0935939552" className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors underline underline-offset-2 decoration-amber-300 hover:decoration-amber-500">Gọi điện</a>
                    <button 
                      onClick={() => handleCopy("0935.939.552", "phone")}
                      className="flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-amber-600 transition-colors cursor-pointer"
                      title="Sao chép thông tin"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedText === "phone" ? "Đã chép" : "Sao chép"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 3: Email */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-200/50 group animate-fade-in-up">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/5 flex items-center justify-center shrink-0 border border-slate-50 transition-all duration-500 group-hover:scale-110">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Địa Chỉ Email</p>
                  <p className="text-stone-800 font-bold text-sm md:text-base mt-0.5 truncate select-all">dinhmankt@gmail.com</p>
                  <div className="flex items-center gap-3 mt-2">
                    <a href="mailto:dinhmankt@gmail.com" className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors underline underline-offset-2 decoration-amber-300 hover:decoration-amber-500">Gửi thư</a>
                    <button 
                      onClick={() => handleCopy("dinhmankt@gmail.com", "email")}
                      className="flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-amber-600 transition-colors cursor-pointer"
                      title="Sao chép thông tin"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedText === "email" ? "Đã chép" : "Sao chép"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 4: Address */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-200/50 group animate-fade-in-up">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500/10 to-orange-500/5 flex items-center justify-center shrink-0 border border-slate-50 transition-all duration-500 group-hover:scale-110">
                  <MapPin className="w-5 h-5 text-rose-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Địa Chỉ Liên Hệ</p>
                  <p className="text-stone-800 font-bold text-sm md:text-base mt-0.5 truncate select-all">902 Ngô Quyền, TP. Đà Nẵng</p>
                  <div className="flex items-center gap-3 mt-2">
                    <a href="https://www.google.com/maps/search/?api=1&query=902+Ngô+Quyền+Đà+Nẵng" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors underline underline-offset-2 decoration-amber-300 hover:decoration-amber-500">Bản đồ</a>
                    <button 
                      onClick={() => handleCopy("902 Ngô Quyền, TP. Đà Nẵng", "address")}
                      className="flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-amber-600 transition-colors cursor-pointer"
                      title="Sao chép thông tin"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedText === "address" ? "Đã chép" : "Sao chép"}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Form Column (7 columns) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-amber-100/50 shadow-[0_8px_30px_rgba(217,119,6,0.03)] relative overflow-hidden animate-fade-in-up">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600"></div>
              
              {success ? (
                <div className="text-center py-10 space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                  <h3 className="text-green-800 font-bold text-lg">Gửi Thành Công!</h3>
                  <p className="text-slate-500 text-xs font-light leading-relaxed max-w-sm mx-auto">
                    Cảm ơn bạn đã đóng góp ý kiến. Chúng tôi đã ghi nhận phản hồi và sẽ xem xét cải thiện hệ thống.
                  </p>
                  <button 
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="px-6 py-2 border border-amber-500 rounded-xl text-xs font-bold text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                  >
                    Gửi tin nhắn mới
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-stone-800 mb-1">Gửi Tin Nhắn Góp Ý</h2>
                  <p className="text-slate-500 text-xs md:text-sm mb-6">Mọi góp ý về kết quả luận giải lá số hoặc đóng góp dịch vụ, quý khách vui lòng điền thông tin bên dưới.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        Email Liên Hệ <span className="text-slate-400 font-normal">(Tuỳ chọn)</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="ví dụ: email@gmail.com"
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label htmlFor="content" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                        Nội Dung Góp Ý / Câu Hỏi <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        id="content"
                        required
                        rows="5"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Nhập nội dung bạn muốn gửi tới Ban quản trị..."
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white transition-all duration-300 resize-y"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-5 rounded-xl text-stone-900 font-extrabold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-[length:200%_auto] hover:bg-right cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{loading ? "Đang gửi..." : "Gửi Ý Kiến Liên Hệ"}</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
