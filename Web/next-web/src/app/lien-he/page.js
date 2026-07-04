'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, phone, message })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSuccess(true);
          setFullName("");
          setEmail("");
          setPhone("");
          setMessage("");
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-[10px] tracking-widest text-[#C5A059] font-bold uppercase block">Liên Hệ Ban Biên Tập</span>
        <h1 className="font-serif text-3xl md:text-4xl italic font-semibold text-[#C5A059]">Kết Nối Tâm Giao</h1>
        <p className="text-slate-500 text-sm font-light leading-relaxed">
          Mọi thắc mắc về kỹ thuật lập lá số, đặt lịch tư vấn trực tiếp hay đóng góp ý kiến về nội dung, xin vui lòng gửi tin nhắn cho chúng tôi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto items-start">
        
        {/* Info Column (5 columns) */}
        <div className="lg:col-span-5 bg-white border border-[#E5DDD0]/70 rounded-3xl p-6 md:p-8 space-y-8 shadow-sm">
          <div className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-[#C5A059] italic">Thông Tin Liên Hệ</h3>
            <p className="text-slate-500 text-xs font-light leading-relaxed">
              Văn phòng đại diện ban quản trị tử vi số mệnh.
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-600 font-light">
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-0.5">Email Hỗ Trợ</h4>
                <p>support@tuvisomenh.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-0.5">Điện Thoại</h4>
                <p>(+84) 987 654 321</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
              <div>
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-0.5">Địa Chỉ</h4>
                <p>Quận 1, Thành phố Hồ Chí Minh, Việt Nam</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column (7 columns) */}
        <div className="lg:col-span-7 bg-white border border-[#E5DDD0]/70 rounded-3xl p-6 md:p-10 shadow-sm">
          {success ? (
            <div className="text-center py-10 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
              <h3 className="text-green-800 font-bold text-lg">Gửi Thành Công!</h3>
              <p className="text-slate-500 text-xs font-light leading-relaxed max-w-sm mx-auto">
                Cảm ơn bạn đã liên hệ. Chúng tôi đã ghi nhận phản hồi và sẽ liên lạc lại trong thời gian sớm nhất có thể.
              </p>
              <button 
                type="button"
                onClick={() => setSuccess(false)}
                className="px-6 py-2 border border-[#C5A059] rounded-xl text-xs font-bold text-[#C5A059] hover:bg-[#C5A059]/5 transition-colors cursor-pointer"
              >
                Gửi tin nhắn mới
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Họ và Tên</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Nhập họ tên đầy đủ"
                  className="ivory-input"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Địa chỉ Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="ivory-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Số điện thoại</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Nhập số điện thoại (tùy chọn)"
                    className="ivory-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Nội dung tin nhắn</label>
                <textarea
                  rows="5"
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Nhập nội dung cần hỗ trợ hoặc tư vấn..."
                  className="ivory-input resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold py-3.5 w-full flex items-center justify-center gap-2 cursor-pointer shadow-sm text-xs font-bold uppercase disabled:opacity-75"
                >
                  <span>{loading ? "Đang gửi đi..." : "Gửi liên hệ"}</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>

    </div>
  );
}
