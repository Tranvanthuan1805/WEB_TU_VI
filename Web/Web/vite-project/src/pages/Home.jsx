import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, HelpCircle, FileText, ShoppingBag, Mail, ChevronDown, Sparkles, MessageCircle } from 'lucide-react';

const Hour24ToCanh = {
  0: "Ty", 1: "Suu", 2: "Suu", 3: "Dan", 4: "Dan", 5: "Mao",
  6: "Mao", 7: "Thin", 8: "Thin", 9: "Ty2", 10: "Ty2", 11: "Ngo",
  12: "Ngo", 13: "Mui", 14: "Mui", 15: "Than", 16: "Than", 17: "Dau",
  18: "Dau", 19: "Tuat", 20: "Tuat", 21: "Hoi", 22: "Hoi", 23: "Ty"
};

const CanhToHour24 = {
  "Ty": 23, "Suu": 1, "Dan": 3, "Mao": 5, "Thin": 7, "Ty2": 9,
  "Ngo": 11, "Mui": 13, "Than": 15, "Dau": 17, "Tuat": 19, "Hoi": 21
};

function getOrCreateAnonId() {
  let id = localStorage.getItem('tuvi_anon_id');
  if (!id) {
    id = 'anon_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('tuvi_anon_id', id);
  }
  return id;
}

export default function Home() {
  const [selectedOption, setSelectedOption] = useState("1");
  const [ticketCode, setTicketCode] = useState("");
  const [birthDay, setBirthDay] = useState(new Date().getDate());
  const [birthMonth, setBirthMonth] = useState(new Date().getMonth() + 1);
  const [birthYear, setBirthYear] = useState(new Date().getFullYear() - 30);
  const [birthHour24, setBirthHour24] = useState(0);
  const [birthHour, setBirthHour] = useState("Ty");
  const [gender, setGender] = useState("Nam");
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  
  const [isLoading, setIsLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [result, setResult] = useState(null);
  const [limitMsg, setLimitMsg] = useState("");
  
  const [freeUsageHint, setFreeUsageHint] = useState("");
  const [recentPosts, setRecentPosts] = useState([]);
  const [config, setConfig] = useState(null);

  const [showTheCach, setShowTheCach] = useState(true);
  const [showTuVi, setShowTuVi] = useState(false);

  const anonymousId = getOrCreateAnonId();

  useEffect(() => {
    loadFreeUsage();
    loadRecentPosts();
    loadConfig();
  }, []);

  const loadFreeUsage = () => {
    fetch(`/api/tuvi/free-usage?anonymousId=${anonymousId}`)
      .then(res => res.json())
      .then(data => setFreeUsageHint(data.hint))
      .catch(() => {});
  };

  const loadRecentPosts = () => {
    fetch('/api/posts/recent?limit=3')
      .then(res => res.json())
      .then(data => setRecentPosts(data))
      .catch(() => {});
  };

  const loadConfig = () => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(() => {});
  };

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value);
    setBirthHour24(val);
    setBirthHour(Hour24ToCanh[val] || "Ty");
  };

  const handleSelectChange = (e) => {
    const val = e.target.value;
    setBirthHour(val);
    setBirthHour24(CanhToHour24[val] || 0);
  };

  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  const maxDayInMonth = (() => {
    switch (birthMonth) {
      case 1: case 3: case 5: case 7: case 8: case 10: case 12: return 31;
      case 4: case 6: case 9: case 11: return 30;
      case 2: return isLeapYear(birthYear) ? 29 : 28;
      default: return 30;
    }
  })();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setHasResult(false);
    setLimitMsg("");

    const payload = {
      selectedOption,
      ticketCode,
      birthDay,
      birthMonth,
      birthYear,
      birthHour24,
      birthHour,
      gender,
      viewYear,
      anonymousId
    };

    fetch('/api/tuvi/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        if (data.limitReached) {
          setLimitMsg(data.message);
        } else if (data.success) {
          setResult(data);
          setHasResult(true);
          loadFreeUsage();
        } else if (data.error) {
          alert(data.error);
        }
      })
      .catch(err => {
        alert("Lỗi kết nối máy chủ: " + err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form (7 columns) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white border border-[#E5DDD0]/70 shadow-md rounded-3xl p-6 md:p-10 space-y-6">
            <header className="mb-4">
              <h1 className="font-serif text-3xl md:text-4xl text-[#C5A059] leading-tight mb-3 italic font-semibold">Lập Lá Số Tử Vi</h1>
              <p className="text-slate-500 text-sm font-light leading-relaxed">
                Khám phá bản đồ định mệnh của bạn thông qua thuật toán cổ truyền kết hợp trí tuệ số. Hãy nhập chính xác thông tin để khai mở.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Type Select */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Chọn loại lá số</label>
                <div className="grid grid-cols-3 gap-3">
                  {["1", "2", "3"].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedOption(opt)}
                      className={`flex items-center justify-center p-3.5 border rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        selectedOption === opt 
                          ? 'border-[#C5A059] bg-[#C5A059]/5 text-[#C5A059]' 
                          : 'border-[#E5DDD0]/70 bg-white text-slate-500 hover:border-slate-400'
                      }`}
                    >
                      {opt === "1" ? "Cơ Bản" : opt === "2" ? "Vận Hạn" : "Trọn Đời"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ticket Input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Mã vé VIP (tùy chọn)</label>
                <input 
                  type="text" 
                  value={ticketCode}
                  onChange={e => setTicketCode(e.target.value)}
                  placeholder="Nhập mã vé nếu có để mở luận giải chi tiết"
                  className="ivory-input"
                />
              </div>

              {/* Date of birth */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Ngày sinh</label>
                  <input 
                    type="number" 
                    min="1" 
                    max={maxDayInMonth}
                    value={birthDay}
                    onChange={e => setBirthDay(Math.min(maxDayInMonth, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="ivory-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Tháng sinh</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="12"
                    value={birthMonth}
                    onChange={e => setBirthMonth(Math.min(12, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="ivory-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Năm sinh</label>
                  <input 
                    type="number" 
                    min="1900" 
                    max="2099"
                    value={birthYear}
                    onChange={e => setBirthYear(Math.min(2099, Math.max(1900, parseInt(e.target.value) || 1900)))}
                    className="ivory-input"
                  />
                </div>
              </div>

              {/* View Year */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Năm xem</label>
                <input 
                  type="number" 
                  min="1900" 
                  max="2100"
                  value={viewYear}
                  onChange={e => setViewYear(parseInt(e.target.value) || new Date().getFullYear())}
                  className="ivory-input"
                />
              </div>

              {/* Time of birth & Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Time slider/select */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Giờ sinh</label>
                  <div className="px-1 py-1.5">
                    <input 
                      type="range" 
                      min="0" 
                      max="23" 
                      step="1"
                      value={birthHour24}
                      onChange={handleSliderChange}
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer mb-2 accent-[#C5A059]"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 font-semibold px-0.5">
                      <span>0h</span>
                      <span className="text-[#C5A059] font-bold">{birthHour24}h</span>
                      <span>23h</span>
                    </div>
                  </div>
                  <select 
                    value={birthHour} 
                    onChange={handleSelectChange}
                    className="ivory-input cursor-pointer"
                  >
                    <option value="Ty">Tý (23h - 01h)</option>
                    <option value="Suu">Sửu (01h - 03h)</option>
                    <option value="Dan">Dần (03h - 05h)</option>
                    <option value="Mao">Mão (05h - 07h)</option>
                    <option value="Thin">Thìn (07h - 09h)</option>
                    <option value="Ty2">Tỵ (09h - 11h)</option>
                    <option value="Ngo">Ngọ (11h - 13h)</option>
                    <option value="Mui">Mùi (13h - 15h)</option>
                    <option value="Than">Thân (15h - 17h)</option>
                    <option value="Dau">Dậu (17h - 19h)</option>
                    <option value="Tuat">Tuất (19h - 21h)</option>
                    <option value="Hoi">Hợi (21h - 23h)</option>
                  </select>
                </div>

                {/* Gender toggle */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Giới tính</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Nam", "Nữ"].map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`py-3.5 border rounded-xl font-bold text-sm transition-all cursor-pointer ${
                          gender === g 
                            ? 'border-[#C5A059] bg-[#C5A059]/5 text-[#C5A059]' 
                            : 'border-[#E5DDD0]/70 bg-white text-slate-500 hover:border-slate-400'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Free usage hint */}
              {freeUsageHint && (
                <div className="text-xs text-[#C5A059] font-bold bg-[#C5A059]/5 border border-[#C5A059]/20 rounded-xl px-4 py-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>{freeUsageHint}</span>
                </div>
              )}

              {/* Limit message */}
              {limitMsg && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-4 space-y-2">
                  <p>{limitMsg}</p>
                  <Link to="/san-pham" className="inline-flex items-center gap-1 text-xs font-bold text-[#C5A059] hover:underline uppercase tracking-wider">
                    Mua vé xem ngay <ChevronDown className="w-3 h-3 -rotate-90" />
                  </Link>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-gold py-4 w-full flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.005] active:scale-[0.995] disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="font-bold">Đang tính toán lá số...</span>
                  ) : (
                    <>
                      <span className="font-bold tracking-widest">Lập Lá Số Ngay</span>
                      <Sparkles className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Right Sidebar (5 columns) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Portrait Sidebar Card */}
          <div className="bg-white border border-[#E5DDD0]/70 shadow-sm rounded-3xl p-6 space-y-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-sm">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm4UysmCrrtwbRhfFYYTqcrMv4VHb4TAgR4mIz_bBGFJY-GVLrg_dGtlH5HkOBJfnO5zwLxOn14ne2os0hYVk7fUSGEw1kJbJuXmcDH5c4XY3L8h8UKUr2v-8glPqWIpgCUQ6o7-e0_Rerm4W_qmf5Fru3ZqMsyqP6DpwsiKgYGlZle9wdJMgxZ9EXStQwhQB_dx0cEGGIsHcSQOkYkgdQRKm7b0mIkfbseXXwsWDh_o-vbhY8aIAKnW2kp_WWrxhOXP_EFhvYz4E" 
                alt="Portrait"
                className="w-full h-full object-cover sepia-[0.1] brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <p className="text-xs italic text-[#C5A059] font-serif p-3 bg-black/60 backdrop-blur-md rounded-xl border border-[#3C3A35]/30 leading-relaxed shadow-sm">
                  "Mệnh tốt không bằng Thân tốt, Thân tốt không bằng Hạn tốt."
                </p>
              </div>
            </div>

            {config && (config.facebookEnabled || config.zaloEnabled) && (
              <div className="pt-4 border-t border-[#E5DDD0]/50 space-y-3">
                <span className="text-[10px] tracking-widest text-[#C5A059] font-bold uppercase block">Tư Vấn Trực Tiếp</span>
                <h4 className="font-serif text-base text-slate-800 font-bold italic">Luận giải chuyên sâu cùng chuyên gia</h4>
                <div className="flex flex-wrap gap-3">
                  {config.facebookEnabled && config.facebookUrl && (
                    <a 
                      href={config.facebookUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 px-4 py-2 border border-[#E5DDD0] rounded-xl text-xs font-semibold text-slate-600 hover:text-[#C5A059] hover:border-[#C5A059] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                      <span>Facebook</span>
                    </a>
                  )}
                  {config.zaloEnabled && config.zaloUrl && (
                    <a 
                      href={config.zaloUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 px-4 py-2 border border-[#E5DDD0] rounded-xl text-xs font-semibold text-slate-600 hover:text-[#C5A059] hover:border-[#C5A059] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-teal-600" />
                      <span>Zalo</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Horoscope Knowledge */}
          <div className="bg-white border border-[#E5DDD0]/70 shadow-sm rounded-3xl p-6 space-y-5">
            <div>
              <span className="text-[10px] tracking-widest text-[#C5A059] font-bold uppercase block mb-2">Kiến Thức Căn Bản</span>
              <h3 className="font-serif text-xl text-[#C5A059] font-semibold mb-4 italic">Giải Mã Số Mệnh</h3>
              <div className="space-y-4">
                <div className="border-b border-[#E5DDD0]/40 pb-3 last:border-none last:pb-0">
                  <h4 className="text-slate-800 font-bold text-sm mb-1">Cung Vị (12 Palaces)</h4>
                  <p className="text-slate-500 text-xs font-light leading-relaxed">
                    12 cung địa bàn đại diện cho 12 phương diện của cuộc đời như Mệnh, Phụ, Phúc, Điền, Quan...
                  </p>
                </div>
                <div className="border-b border-[#E5DDD0]/40 pb-3 last:border-none last:pb-0">
                  <h4 className="text-slate-800 font-bold text-sm mb-1">Sao Tọa Thủ (Stars)</h4>
                  <p className="text-slate-500 text-xs font-light leading-relaxed">
                    Hệ thống Chính tinh và Phụ tinh tương tác lẫn nhau, tạo nên các cách cục tốt xấu trong lá số.
                  </p>
                </div>
                <div>
                  <h4 className="text-slate-800 font-bold text-sm mb-1">Đại Tiểu Vận (Periods)</h4>
                  <p className="text-slate-500 text-xs font-light leading-relaxed">
                    Đại vận 10 năm và tiểu vận hàng năm giúp dự đoán các biến cố và thời cơ trong cuộc sống.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-white border border-[#E5DDD0]/70 shadow-sm rounded-3xl p-6 space-y-4">
            <h5 className="font-bold text-[10px] uppercase tracking-widest text-[#C5A059]">Bài viết mới nhất</h5>
            {recentPosts.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Không có bài viết nào.</p>
            ) : (
              <div className="space-y-4">
                {recentPosts.map(post => (
                  <Link key={post.postId} to={`/bai-viet/${post.slug}`} className="block group border-b border-[#E5DDD0]/30 pb-3 last:border-none last:pb-0">
                    <p className="text-sm font-bold text-slate-800 group-hover:text-[#C5A059] transition-colors mb-1 leading-snug">
                      {post.title}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-light">
                      {post.description?.replace(/<[^>]*>/g, '')}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Results Section */}
      {hasResult && result && (
        <div className="mt-12 border-t border-[#E5DDD0]/50 pt-10 space-y-8 animate-fade-in">
          <div className="text-center mb-6 space-y-2">
            <h3 className="font-serif text-3xl text-[#C5A059] font-bold italic">Bản Đồ Mệnh Cách</h3>
            <p className="text-slate-500 text-sm font-medium">
              Ngày sinh: {birthDay}/{birthMonth}/{birthYear} - Giờ {birthHour}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            
            {/* Accordion 1: Thể Cách */}
            <div className="border border-[#E5DDD0] rounded-2xl overflow-hidden bg-white shadow-sm">
              <button 
                onClick={() => setShowTheCach(!showTheCach)}
                className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer"
              >
                <span className="font-serif text-lg font-bold text-[#C5A059]">Thể Cách Luận Giải</span>
                <span className={`transform transition-transform duration-300 ${showTheCach ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-5 h-5 text-[#C5A059]" />
                </span>
              </button>
              {showTheCach && result.theCachHtml && (
                <div 
                  className="border-t border-[#E5DDD0]/70 p-6 overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: result.theCachHtml }}
                />
              )}
            </div>

            {/* Accordion 2: Tử Vi */}
            <div className="border border-[#E5DDD0] rounded-2xl overflow-hidden bg-white shadow-sm">
              <button 
                onClick={() => setShowTuVi(!showTuVi)}
                className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 hover:bg-slate-100/70 transition-colors cursor-pointer"
              >
                <span className="font-serif text-lg font-bold text-[#C5A059]">Chi Tiết Lá Số Tử Vi</span>
                <span className={`transform transition-transform duration-300 ${showTuVi ? 'rotate-180' : ''}`}>
                  <ChevronDown className="w-5 h-5 text-[#C5A059]" />
                </span>
              </button>
              {showTuVi && result.tuViHtml && (
                <div 
                  className="border-t border-[#E5DDD0]/70 p-6 overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: result.tuViHtml }}
                />
              )}
            </div>

          </div>

          {!result.usedTicket && (
            <div className="max-w-xl mx-auto mt-8 p-8 bg-[#C5A059]/5 border border-[#C5A059]/20 rounded-3xl text-center space-y-4 shadow-sm">
              <p className="text-slate-600 font-medium text-sm">
                Để mở khóa các luận giải chuyên sâu chi tiết hơn, xin vui lòng mua vé VIP.
              </p>
              <Link 
                to="/san-pham" 
                className="btn-gold px-8 py-3.5 inline-flex items-center justify-center gap-2 text-xs"
              >
                Mua vé ngay
                <ShoppingBag className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
