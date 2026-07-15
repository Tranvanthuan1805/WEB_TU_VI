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
    <div className="max-w-6xl mx-auto w-full px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form (8 columns) */}
        <div className="lg:col-span-8 w-full">
          <div className="space-y-6 w-full">
            <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-6 md:p-8 space-y-6">
              
              <div className="space-y-2 text-left">
                <h2 className="text-3xl font-bold font-serif text-stone-800 tracking-tight">Lập Lá Số Tử Vi</h2>
                <p className="text-slate-450 text-[13px] leading-relaxed">
                  Khám phá bản đồ định mệnh của bạn thông qua thuật toán cổ truyền kết hợp trí tuệ số. Hãy nhập chính xác thông tin để khai mở Manuscript.
                </p>
              </div>

              {/* Type Select */}
              <div className="space-y-2 text-left">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Chọn loại lá số</label>
                <div className="grid grid-cols-3 gap-2">
                  {["1", "2", "3"].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedOption(opt)}
                      className={`py-3 px-1 text-[11px] font-bold rounded-xl border text-center transition-all cursor-pointer ${
                        selectedOption === opt 
                          ? 'border-amber-700 bg-amber-50/40 text-stone-850 shadow-sm' 
                          : 'border-slate-200 bg-transparent text-slate-400 hover:border-slate-300 hover:text-slate-600'
                      }`}
                    >
                      {opt === "1" ? "CƠ BẢN" : opt === "2" ? "VẬN HẠN" : "TRỌN ĐỜI"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Mode Selection */}
              <div className="space-y-2 text-left pb-4 border-b border-slate-100">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phương thức nhập thông tin</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => toggleInputMode(false)}
                    className={`py-3 px-1 text-[11px] font-bold rounded-xl border text-center transition-all cursor-pointer ${
                      !useProfileSelect 
                        ? 'border-amber-700 bg-amber-50/40 text-stone-850 shadow-sm' 
                        : 'border-slate-200 bg-transparent text-slate-400 hover:border-slate-300 hover:text-slate-600'
                    }`}
                  >
                    NHẬP THỦ CÔNG
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleInputMode(true)}
                    className={`py-3 px-1 text-[11px] font-bold rounded-xl border text-center transition-all cursor-pointer ${
                      useProfileSelect 
                        ? 'border-amber-700 bg-amber-50/40 text-stone-850 shadow-sm' 
                        : 'border-slate-200 bg-transparent text-slate-400 hover:border-slate-300 hover:text-slate-600'
                    }`}
                  >
                    CHỌN TỪ DANH SÁCH
                  </button>
                </div>
              </div>

              {useProfileSelect ? (
                /* Search and select Profile */
                <div className="space-y-2 text-left relative">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tìm kiếm người trong danh sách</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchProfileQuery}
                      onChange={handleSearchProfileQueryChanged}
                      placeholder="Nhập tên để tìm kiếm..."
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-50 outline-none text-slate-700 font-semibold text-sm transition-all bg-slate-50/50 focus:bg-white"
                    />
                    {filteredProfiles.length > 0 && (
                      <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {filteredProfiles.map(p => (
                          <div
                            key={p.index}
                            onClick={() => handleSelectProfile(p)}
                            className="px-4 py-2.5 hover:bg-amber-50/40 cursor-pointer text-sm transition-colors border-b border-slate-100 last:border-none"
                          >
                            <div className="font-bold text-amber-750">{p.fullName} ({p.gender})</div>
                            <div className="text-xs text-slate-500">Sinh ngày: {p.day}/{p.month}/{p.year} - Giờ: {p.hour} {p.notes ? `| Ghi chú: ${p.notes}` : ''}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {searchProfileQuery && filteredProfiles.length === 0 && selectedProfile?.fullName !== searchProfileQuery && (
                      <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg p-4 text-center text-xs text-slate-500 italic">
                        Không tìm thấy tên tương thích
                      </div>
                    )}
                  </div>
                  {selectedProfile && (
                    <div className="p-4 bg-amber-50/20 border border-amber-200/60 rounded-2xl text-xs space-y-2 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>Đang chọn: <span className="font-bold text-amber-700 text-sm">{selectedProfile.fullName}</span> ({selectedProfile.gender})</div>
                        <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 rounded text-[10px] font-bold">Đã đồng bộ</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-slate-500">
                        <div>Ngày sinh: <span className="font-semibold text-slate-700">{selectedProfile.day}/{selectedProfile.month}/{selectedProfile.year}</span></div>
                        <div>Giờ sinh: <span className="font-semibold text-slate-700">{selectedProfile.hour}</span></div>
                      </div>
                      {selectedProfile.notes && (
                        <div className="text-slate-500/80 italic pt-1 border-t border-slate-100">Ghi chú: {selectedProfile.notes}</div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* Manual Inputs */
                <>
                  <div className="grid grid-cols-3 gap-3 text-left">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ngày sinh</label>
                      <input 
                        type="number" 
                        min="1" 
                        max={maxDayInMonth}
                        value={birthDay}
                        onChange={e => setBirthDay(Math.min(maxDayInMonth, Math.max(1, parseInt(e.target.value) || 1)))}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-50 outline-none text-slate-700 font-semibold text-sm transition-all bg-slate-50/50 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tháng sinh</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="12"
                        value={birthMonth}
                        onChange={e => setBirthMonth(Math.min(12, Math.max(1, parseInt(e.target.value) || 1)))}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-50 outline-none text-slate-700 font-semibold text-sm transition-all bg-slate-50/50 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Năm sinh</label>
                      <input 
                        type="number" 
                        min="1900" 
                        max="2099"
                        value={birthYear}
                        onChange={e => setBirthYear(Math.min(2099, Math.max(1900, parseInt(e.target.value) || 1900)))}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-50 outline-none text-slate-700 font-semibold text-sm transition-all bg-slate-50/50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Giờ sinh</label>
                      <div className="relative pt-1 px-1">
                        <input 
                          type="range" 
                          min="0" 
                          max="23" 
                          step="1"
                          value={birthHour24}
                          onChange={handleSliderChange}
                          className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-600 my-3"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5">
                          <span>0h</span>
                          <span className="text-amber-600 font-bold">{birthHour24}h</span>
                          <span>23h</span>
                        </div>
                      </div>
                      <select 
                        value={birthHour} 
                        onChange={handleSelectChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-amber-500 outline-none text-slate-700 font-semibold text-sm bg-slate-50/50 cursor-pointer transition-all"
                      >
                        <option value="Ty">00h · Tý (23h - 01h)</option>
                        <option value="Suu">01h · Sửu (01h - 03h)</option>
                        <option value="Dan">03h · Dần (03h - 05h)</option>
                        <option value="Mao">05h · Mão (05h - 07h)</option>
                        <option value="Thin">07h · Thìn (07h - 09h)</option>
                        <option value="Ty2">09h · Tỵ (09h - 11h)</option>
                        <option value="Ngo">11h · Ngọ (11h - 13h)</option>
                        <option value="Mui">13h · Mùi (13h - 15h)</option>
                        <option value="Than">15h · Thân (15h - 17h)</option>
                        <option value="Dau">17h · Dậu (17h - 19h)</option>
                        <option value="Tuat">19h · Tuất (19h - 21h)</option>
                        <option value="Hoi">21h · Hợi (21h - 23h)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Giới tính</label>
                      <div className="grid grid-cols-2 gap-2 h-[106px] items-end">
                        {["Nam", "Nữ"].map(g => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setGender(g)}
                            className={`py-3.5 px-4 rounded-xl border text-center font-bold text-sm transition-all cursor-pointer ${
                              gender === g 
                                ? 'border-amber-700 bg-amber-50/40 text-stone-850 shadow-sm' 
                                : 'border-slate-200 bg-transparent text-slate-400 hover:border-slate-300 hover:text-slate-600'
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
              <div className="space-y-2 text-left">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Năm xem</label>
                <input 
                  type="number" 
                  min="1900" 
                  max="2100"
                  value={viewYear}
                  onChange={e => setViewYear(parseInt(e.target.value) || new Date().getFullYear())}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-50 outline-none text-slate-700 font-semibold text-sm transition-all bg-slate-50/50 focus:bg-white"
                />
              </div>

              {/* Ticket Input */}
              <div className="space-y-2 text-left">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mã vé VIP (tùy chọn)</label>
                <input 
                  type="text" 
                  value={ticketCode}
                  onChange={e => setTicketCode(e.target.value)}
                  placeholder="Nhập mã vé nếu có để mở luận giải chi tiết"
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-50 outline-none text-slate-700 font-semibold text-sm transition-all bg-slate-50/50 focus:bg-white"
                />
              </div>

              {/* Free usage hint */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 rounded-lg px-2.5 py-1">
                  <span>✓</span>
                  <span>Mở khóa miễn phí 100%</span>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3.5 text-white disabled:text-slate-400 font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-95 shrink-0"
                  style={{ background: 'linear-gradient(135deg, #a68249, #8f6d39)' }}
                >
                  {isLoading ? "Đang tính toán..." : "Lập lá số ngay ❈"}
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Right Sidebar (4 columns) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20 w-full">
          
          {/* Portrait Sidebar Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] space-y-4">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] relative border border-slate-50">
              <img 
                src="/mystical_woman.png" 
                alt="Mystical celestial woman"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="bg-slate-50/50 rounded-xl p-3.5 border border-slate-100 text-center">
              <p className="text-xs italic text-stone-505 font-medium leading-relaxed">
                &quot;Mệnh tốt không bằng Thân tốt, Thân tốt không bằng Hạn tốt.&quot;
              </p>
            </div>
          </div>

          {/* Horoscope Knowledge */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] space-y-5 text-left">
            <div>
              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">Kiến thức tử vi</p>
              <h3 className="text-xl font-bold font-serif text-stone-800">Giải Mã Thuật Ngữ</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-stone-800 text-sm">Cung (Palaces)</p>
                <p className="text-slate-450 text-xs mt-1 leading-relaxed">
                  12 cung địa bàn đại diện cho 12 phương diện của cuộc đời như Mệnh, Phụ, Phúc, Điền, Quan...
                </p>
              </div>
              <div>
                <p className="font-bold text-stone-800 text-sm">Sao (Stars)</p>
                <p className="text-slate-450 text-xs mt-1 leading-relaxed">
                  Hệ thống Chính tinh và Phụ tinh tương tác lẫn nhau, tạo nên các cách cục tốt xấu trong lá số.
                </p>
              </div>
              <div>
                <p className="font-bold text-stone-800 text-sm">Hạn (Periods)</p>
                <p className="text-slate-450 text-xs mt-1 leading-relaxed">
                  Đại vận 10 năm và tiểu vận hàng năm giúp dự đoán các biến cố và thời cơ trong cuộc sống.
                </p>
              </div>
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] space-y-3 text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bài viết mới nhất</p>
            {recentPosts.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Không có bài viết nào.</p>
            ) : (
              <div className="space-y-2.5">
                {recentPosts.map(post => (
                  <Link key={post.postId} href={`/bai-viet/${post.slug}`} className="block text-xs font-semibold text-stone-700 hover:text-amber-600 transition-colors truncate">
                    ✦ {post.title.toUpperCase()}
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Results Section */}
      {hasResult && (
        <div className="mt-12 border-t border-slate-150 pt-10 space-y-8 animate-fade-in">
          <div className="text-center mb-6 space-y-2">
            <h3 className="font-serif text-3xl text-amber-800 font-bold">
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
            <div className="max-w-xl mx-auto mt-8 p-8 bg-amber-500/5 border border-amber-500/10 rounded-3xl text-center space-y-4 shadow-sm">
              <Lock className="w-12 h-12 text-amber-600 mx-auto mb-2" />
              <h4 className="font-serif text-xl font-bold text-amber-850">Đã Hết Lượt Xem Miễn Phí</h4>
              <p className="text-slate-600 font-medium text-sm">
                {limitMsg || "Bạn đã sử dụng hết 5 lượt xem miễn phí hôm nay. Vui lòng nhập mã vé hoặc mua vé để tiếp tục xem lá số."}
              </p>
              <Link 
                href="/san-pham" 
                className="px-8 py-3.5 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-95 inline-flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #a68249, #8f6d39)' }}
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
                <div className="border border-slate-100 rounded-3xl overflow-hidden bg-white shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
                  <button 
                    onClick={() => setShowTheCach(!showTheCach)}
                    className="w-full flex items-center justify-between px-6 py-4 bg-slate-50/50 hover:bg-slate-100/50 transition-colors cursor-pointer"
                  >
                    <span className="font-serif text-base font-bold text-stone-850">Thể Cách Luận Giải</span>
                    <span className={`transform transition-transform duration-300 ${showTheCach ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-5 h-5 text-amber-600" />
                    </span>
                  </button>
                  {showTheCach && result.theCachHtml && (
                    <div 
                      className="border-t border-slate-100 p-6 overflow-x-auto text-sm text-stone-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: result.theCachHtml }}
                    />
                  )}
                </div>

                {/* Accordion 2: Tử Vi */}
                <div className="border border-slate-100 rounded-3xl overflow-hidden bg-white shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
                  <button 
                    onClick={() => setShowTuVi(!showTuVi)}
                    className="w-full flex items-center justify-between px-6 py-4 bg-slate-50/50 hover:bg-slate-100/50 transition-colors cursor-pointer"
                  >
                    <span className="font-serif text-base font-bold text-stone-850">Chi Tiết Lá Số Tử Vi</span>
                    <span className={`transform transition-transform duration-300 ${showTuVi ? 'rotate-180' : ''}`}>
                      <ChevronDown className="w-5 h-5 text-amber-600" />
                    </span>
                  </button>
                  {showTuVi && result.tuViHtml && (
                    <div 
                      className="border-t border-slate-100 p-6 overflow-x-auto text-sm text-stone-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: result.tuViHtml }}
                    />
                  )}
                </div>

              </div>

              {!result.usedTicket && (
                <div className="max-w-xl mx-auto mt-8 p-8 bg-amber-500/5 border border-amber-500/10 rounded-3xl text-center space-y-4 shadow-sm">
                  <p className="text-slate-600 font-medium text-sm">
                    Để mở khóa các luận giải chuyên sâu chi tiết hơn, xin vui lòng mua vé VIP.
                  </p>
                  <Link 
                    href="/san-pham" 
                    className="px-8 py-3.5 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-95 inline-flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #a68249, #8f6d39)' }}
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
