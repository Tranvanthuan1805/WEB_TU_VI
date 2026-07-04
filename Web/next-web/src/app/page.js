'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, HelpCircle, FileText, ShoppingBag, Mail, ChevronDown, Sparkles, MessageCircle, Lock } from 'lucide-react';

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
  const [isLimitReached, setIsLimitReached] = useState(false);
  
  const [freeUsageHint, setFreeUsageHint] = useState("");
  const [recentPosts, setRecentPosts] = useState([]);
  const [config, setConfig] = useState(null);
  const [anonymousId, setAnonymousId] = useState("");

  const [showTheCach, setShowTheCach] = useState(true);
  const [showTuVi, setShowTuVi] = useState(false);

  // Excel profile properties
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchProfileQuery, setSearchProfileQuery] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [useProfileSelect, setUseProfileSelect] = useState(false);

  useEffect(() => {
    // Generate or load anonymous ID on client mount
    let id = localStorage.getItem('tuvi_anon_id');
    if (!id) {
      id = 'anon_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('tuvi_anon_id', id);
    }
    setAnonymousId(id);
  }, []);

  useEffect(() => {
    if (!anonymousId) return;

    loadFreeUsage(anonymousId);
    loadRecentPosts();
    loadConfig();
    loadExcelProfiles();
  }, [anonymousId]);

  const loadFreeUsage = (anonId) => {
    fetch(`/api/tuvi/free-usage?anonymousId=${anonId}`)
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

  const loadExcelProfiles = () => {
    fetch('/api/tuvi/profiles')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProfiles(data);
        }
      })
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
    if (e) e.preventDefault();
    triggerCalculate(birthDay, birthMonth, birthYear, birthHour24, birthHour, gender, ticketCode);
  };

  const triggerCalculate = (d, m, y, h24, hCanh, gen, tCode) => {
    if (isLoading) return;

    setIsLoading(true);
    setHasResult(false);
    setLimitMsg("");
    setIsLimitReached(false);
    setResult(null);

    const payload = {
      selectedOption,
      ticketCode: tCode,
      birthDay: d,
      birthMonth: m,
      birthYear: y,
      birthHour24: h24,
      birthHour: hCanh,
      gender: gen,
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
          setIsLimitReached(true);
          setLimitMsg(data.message);
          setHasResult(true);
        } else if (data.success) {
          setResult(data);
          setHasResult(true);
          loadFreeUsage(anonymousId);
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

  const handleSearchProfileQueryChanged = (e) => {
    const val = e.target.value;
    setSearchProfileQuery(val);
    if (!val.trim()) {
      setFilteredProfiles([]);
    } else {
      const filtered = profiles
        .filter(p => p.fullName.toLowerCase().includes(val.toLowerCase()))
        .slice(0, 8);
      setFilteredProfiles(filtered);
    }
  };

  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile);
    setSearchProfileQuery(profile.fullName);
    setFilteredProfiles([]);

    setGender(profile.gender);
    setBirthDay(profile.day);
    setBirthMonth(profile.month);
    setBirthYear(profile.year);

    let h24 = 0;
    let hCanh = "Ty";

    const parsedH24 = parseInt(profile.hour);
    if (!isNaN(parsedH24) && parsedH24 >= 0 && parsedH24 <= 23) {
      h24 = parsedH24;
      hCanh = Hour24ToCanh[parsedH24] || "Ty";
    } else {
      const normalized = profile.hour.toLowerCase()
        .replace("tý", "Ty")
        .replace("sửu", "Suu")
        .replace("dần", "Dan")
        .replace("mão", "Mao")
        .replace("thìn", "Thin")
        .replace("tỵ", "Ty2")
        .replace("ngọ", "Ngo")
        .replace("mùi", "Mui")
        .replace("thân", "Than")
        .replace("dậu", "Dau")
        .replace("tuất", "Tuat")
        .replace("hợi", "Hoi")
        .replace("ty2", "Ty2")
        .replace("ty", "Ty");

      if (CanhToHour24[normalized] !== undefined) {
        hCanh = normalized;
        h24 = CanhToHour24[normalized];
      }
    }

    setBirthHour24(h24);
    setBirthHour(hCanh);

    // Auto submit immediately!
    triggerCalculate(profile.day, profile.month, profile.year, h24, hCanh, profile.gender, ticketCode);
  };

  const toggleInputMode = (useSelect) => {
    setUseProfileSelect(useSelect);
    if (!useSelect) {
      setSelectedProfile(null);
      setSearchProfileQuery("");
      setFilteredProfiles([]);
    }
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
                      className={`flex items-center justify-center p-3 border rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
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

              {/* Input Mode Selection */}
              <div className="space-y-2 pb-4 border-b border-[#E5DDD0]/30">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Phương thức nhập thông tin</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => toggleInputMode(false)}
                    className={`py-3 border rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      !useProfileSelect 
                        ? 'border-[#C5A059] bg-[#C5A059]/5 text-[#C5A059]' 
                        : 'border-[#E5DDD0]/70 bg-white text-slate-500 hover:border-slate-400'
                    }`}
                  >
                    Nhập thủ công
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleInputMode(true)}
                    className={`py-3 border rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      useProfileSelect 
                        ? 'border-[#C5A059] bg-[#C5A059]/5 text-[#C5A059]' 
                        : 'border-[#E5DDD0]/70 bg-white text-slate-500 hover:border-slate-400'
                    }`}
                  >
                    Chọn từ danh sách
                  </button>
                </div>
              </div>

              {useProfileSelect ? (
                /* Search and select Profile */
                <div className="space-y-2 relative">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Tìm kiếm người trong danh sách</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchProfileQuery}
                      onChange={handleSearchProfileQueryChanged}
                      placeholder="Nhập tên để tìm kiếm..."
                      className="ivory-input"
                    />
                    {filteredProfiles.length > 0 && (
                      <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-[#E5DDD0] rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {filteredProfiles.map(p => (
                          <div
                            key={p.index}
                            onClick={() => handleSelectProfile(p)}
                            className="px-4 py-2.5 hover:bg-[#C5A059]/5 cursor-pointer text-sm transition-colors border-b border-[#E5DDD0]/30 last:border-none"
                          >
                            <div className="font-bold text-[#C5A059]">{p.fullName} ({p.gender})</div>
                            <div className="text-xs text-slate-500">Sinh ngày: {p.day}/{p.month}/{p.year} - Giờ: {p.hour} {p.notes ? `| Ghi chú: ${p.notes}` : ''}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {searchProfileQuery && filteredProfiles.length === 0 && selectedProfile?.fullName !== searchProfileQuery && (
                      <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-[#E5DDD0] rounded-xl shadow-lg p-4 text-center text-xs text-slate-500 italic">
                        Không tìm thấy tên tương thích
                      </div>
                    )}
                  </div>
                  {selectedProfile && (
                    <div className="p-4 bg-[#C5A059]/5 border border-[#C5A059]/20 rounded-2xl text-xs space-y-2 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>Đang chọn: <span className="font-bold text-[#C5A059] text-sm">{selectedProfile.fullName}</span> ({selectedProfile.gender})</div>
                        <span className="px-2 py-0.5 bg-[#C5A059]/10 text-[#C5A059] rounded text-[10px] font-bold">Đã đồng bộ</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-slate-500">
                        <div>Ngày sinh: <span className="font-semibold text-slate-700">{selectedProfile.day}/{selectedProfile.month}/{selectedProfile.year}</span></div>
                        <div>Giờ sinh: <span className="font-semibold text-slate-700">{selectedProfile.hour}</span></div>
                      </div>
                      {selectedProfile.notes && (
                        <div className="text-slate-500/80 italic pt-1 border-t border-[#E5DDD0]/30">Ghi chú: {selectedProfile.notes}</div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* Manual Inputs */
                <>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </>
              )}

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

              {/* Free usage hint */}
              {freeUsageHint && (
                <div className="text-xs text-[#C5A059] font-bold bg-[#C5A059]/5 border border-[#C5A059]/20 rounded-xl px-4 py-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>{freeUsageHint}</span>
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
                  <Link key={post.postId} href={`/bai-viet/${post.slug}`} className="block group border-b border-[#E5DDD0]/30 pb-3 last:border-none last:pb-0">
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
      {hasResult && (
        <div className="mt-12 border-t border-[#E5DDD0]/50 pt-10 space-y-8 animate-fade-in">
          <div className="text-center mb-6 space-y-2">
            <h3 className="font-serif text-3xl text-[#C5A059] font-bold italic">
              {selectedProfile ? `Bản Đồ Mệnh Cách - ${selectedProfile.fullName}` : 'Bản Đồ Mệnh Cách'}
            </h3>
            <p className="text-slate-500 text-sm font-medium">
              Giới tính: {gender} | Ngày sinh: {birthDay}/{birthMonth}/{birthYear} - Giờ {birthHour}
            </p>
            {selectedProfile && selectedProfile.notes && (
              <p className="text-slate-400 text-xs italic">Ghi chú: {selectedProfile.notes}</p>
            )}
          </div>

          {isLimitReached || !result ? (
            /* Locked Block when limit is reached */
            <div className="max-w-xl mx-auto mt-8 p-8 bg-[#C5A059]/5 border border-[#C5A059]/20 rounded-3xl text-center space-y-4 shadow-sm">
              <Lock className="w-12 h-12 text-[#C5A059] mx-auto mb-2" />
              <h4 className="font-serif text-xl font-bold text-[#C5A059]">Đã Hết Lượt Xem Miễn Phí</h4>
              <p className="text-slate-600 font-medium text-sm">
                {limitMsg || "Bạn đã sử dụng hết 5 lượt xem miễn phí hôm nay. Vui lòng nhập mã vé hoặc mua vé để tiếp tục xem lá số."}
              </p>
              <Link 
                href="/san-pham" 
                className="btn-gold px-8 py-3.5 inline-flex items-center justify-center gap-2 text-xs"
              >
                Mua vé ngay
                <ShoppingBag className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            /* Results tables */
            <>
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
                    href="/san-pham" 
                    className="btn-gold px-8 py-3.5 inline-flex items-center justify-center gap-2 text-xs"
                  >
                    Mua vé ngay
                    <ShoppingBag className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
