import React, { useState, useEffect } from 'react';
import { Compass, RefreshCw, Database, Search, User, Calendar, Info, Layers, ChevronRight, X } from 'lucide-react';

export default function FengShui() {
  const [isImported, setIsImported] = useState(false);
  const [hexagrams, setHexagrams] = useState([]);
  const [selectedHex, setSelectedHex] = useState(null);
  const [loadingImport, setLoadingImport] = useState(false);
  const [loadingHex, setLoadingHex] = useState(false);
  
  // Search solar terms and profiles
  const [activeTab, setActiveTab] = useState("hexagrams"); // hexagrams, solarterms, profiles
  const [solarTerms, setSolarTerms] = useState([]);
  const [profiles, setProfiles] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = () => {
    fetch('/api/phongthuy/status')
      .then(res => res.json())
      .then(data => {
        setIsImported(data.isImported);
        if (data.isImported) {
          loadHexagrams();
        }
      })
      .catch(() => {});
  };

  const handleImport = () => {
    setLoadingImport(true);
    fetch('/api/phongthuy/import', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIsImported(true);
          loadHexagrams();
          alert(data.message);
        } else {
          alert("Lỗi: " + data.error);
        }
      })
      .catch(err => {
        alert("Lỗi kết nối: " + err.message);
      })
      .finally(() => {
        setLoadingImport(false);
      });
  };

  const loadHexagrams = () => {
    fetch('/api/phongthuy/hexagrams')
      .then(res => res.json())
      .then(data => setHexagrams(data))
      .catch(() => {});
  };

  const loadSolarTerms = () => {
    fetch('/api/phongthuy/solar-terms')
      .then(res => res.json())
      .then(data => setSolarTerms(data))
      .catch(() => {});
  };

  const loadProfiles = () => {
    fetch('/api/phongthuy/profiles')
      .then(res => res.json())
      .then(data => setProfiles(data))
      .catch(() => {});
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery("");
    if (tab === "solarterms" && solarTerms.length === 0) {
      loadSolarTerms();
    } else if (tab === "profiles" && profiles.length === 0) {
      loadProfiles();
    }
  };

  const handleSelectHexagram = (index) => {
    setLoadingHex(true);
    fetch(`/api/phongthuy/hexagrams/${index}`)
      .then(res => res.json())
      .then(data => {
        setSelectedHex(data);
      })
      .catch(err => {
        alert("Lỗi khi tải chi tiết quẻ: " + err.message);
      })
      .finally(() => {
        setLoadingHex(false);
      });
  };

  // Helper to draw a single line of hexagram: 1 = Yang (solid), 0 = Yin (broken)
  const renderHexagramLine = (type) => {
    const isYang = type === "1" || type === 1 || type?.toString()?.includes("1") || type?.toString()?.includes("Dương");
    if (isYang) {
      // Solid Line
      return (
        <div className="w-full h-3.5 bg-gradient-to-r from-[#8A6D3B] via-[#C5A059] to-[#8A6D3B] rounded-sm shadow-inner" />
      );
    } else {
      // Broken Line
      return (
        <div className="w-full h-3.5 flex justify-between gap-4">
          <div className="w-[45%] h-full bg-gradient-to-r from-[#8A6D3B] via-[#C5A059] to-[#8A6D3B] rounded-sm shadow-inner" />
          <div className="w-[10%] h-full bg-transparent" />
          <div className="w-[45%] h-full bg-gradient-to-r from-[#8A6D3B] via-[#C5A059] to-[#8A6D3B] rounded-sm shadow-inner" />
        </div>
      );
    }
  };

  const filteredHexagrams = hexagrams.filter(h => 
    h.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    h.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.index.toString() === searchQuery
  );

  const filteredSolarTerms = solarTerms.filter(s => 
    s.termName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.code?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProfiles = profiles.filter(p => 
    p.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.notes?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1A1A17] to-[#2B2A24] border border-[#3C3A35]/30 p-8 md:p-12 mb-10 shadow-lg text-white">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-8 -translate-y-8 scale-150">
          <Compass className="w-96 h-96 text-[#C5A059]" />
        </div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-[10px] tracking-widest text-[#C5A059] font-bold uppercase flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            Phong Thủy Khoa Học & Kinh Dịch Cổ Thuật
          </span>
          <h1 className="font-serif text-3xl md:text-5xl italic font-semibold text-[#C5A059]">Bát Tự Hà Lạc & 64 Quẻ Dịch</h1>
          <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
            Tra cứu thông tin quẻ mệnh, hào giải chi tiết cùng hệ thống Tiết Khí vũ trụ được đồng bộ trực tiếp từ cơ sở dữ liệu bảng tính Excel của chuyên gia.
          </p>
          
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={handleImport}
              disabled={loadingImport}
              className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md transition-all ${
                loadingImport 
                  ? 'bg-slate-700 text-slate-400' 
                  : 'bg-gradient-to-r from-[#C5A059] to-[#8A6D3B] hover:opacity-95 text-white'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${loadingImport ? 'animate-spin' : ''}`} />
              {isImported ? "Cập Nhật Dữ Liệu Sheet" : "Đồng bộ Sheet lên MongoDB"}
            </button>
            <span className="text-xs text-slate-400 font-medium">
              Trạng thái MongoDB: {isImported ? <span className="text-green-500 font-bold">Đã Kết Nối & Đầy Đủ</span> : <span className="text-amber-500 font-bold">Chưa Có Dữ Liệu</span>}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-[#E5DDD0]/70 mb-8 overflow-x-auto">
        <button
          onClick={() => handleTabChange("hexagrams")}
          className={`pb-3 px-6 text-sm font-semibold tracking-wider uppercase border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "hexagrams" ? 'border-[#C5A059] text-[#C5A059]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          64 Quẻ Kinh Dịch
        </button>
        <button
          onClick={() => handleTabChange("solarterms")}
          className={`pb-3 px-6 text-sm font-semibold tracking-wider uppercase border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "solarterms" ? 'border-[#C5A059] text-[#C5A059]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Hệ Thống Tiết Khí
        </button>
        <button
          onClick={() => handleTabChange("profiles")}
          className={`pb-3 px-6 text-sm font-semibold tracking-wider uppercase border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === "profiles" ? 'border-[#C5A059] text-[#C5A059]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Hồ Sơ Bản Mệnh
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 w-full">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder={
              activeTab === "hexagrams" ? "Tìm kiếm tên quẻ hoặc mô tả..." : 
              activeTab === "solarterms" ? "Tìm kiếm tiết khí..." : "Tìm kiếm hồ sơ nhân vật..."
            }
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-[#E5DDD0]/70 rounded-2xl text-sm focus:border-[#C5A059] focus:outline-none shadow-sm transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          {activeTab === "hexagrams" && `Tìm thấy ${filteredHexagrams.length} quẻ`}
          {activeTab === "solarterms" && `Tìm thấy ${filteredSolarTerms.length} tiết khí`}
          {activeTab === "profiles" && `Tìm thấy ${filteredProfiles.length} hồ sơ`}
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === "hexagrams" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Hexagram Grid (7 columns or full if no selection) */}
          <div className={`${selectedHex ? 'lg:col-span-6' : 'lg:col-span-12'} grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 transition-all duration-300`}>
            {filteredHexagrams.map(hex => (
              <button
                key={hex.index}
                onClick={() => handleSelectHexagram(hex.index)}
                className={`p-5 rounded-2xl border text-left transition-all shadow-sm cursor-pointer group hover:scale-[1.01] ${
                  selectedHex?.lines?.index === hex.index
                    ? 'bg-[#C5A059]/5 border-[#C5A059] shadow-md'
                    : 'bg-white border-[#E5DDD0]/60 hover:border-slate-400'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded-md text-slate-500">
                    Quẻ {hex.index}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-800 group-hover:text-[#C5A059] transition-colors">
                  {hex.name}
                </h3>
                <p className="text-slate-500 text-xs font-light line-clamp-2 mt-1 leading-relaxed">
                  {hex.description}
                </p>
              </button>
            ))}
            
            {hexagrams.length === 0 && (
              <div className="col-span-full py-16 text-center text-slate-400 italic bg-white rounded-3xl border border-dashed border-[#E5DDD0]">
                {loadingImport ? "Đang kết nối MongoDB..." : "Chưa có dữ liệu. Vui lòng bấm đồng bộ ở góc trên bên phải."}
              </div>
            )}
          </div>

          {/* Details Sidebar (6 columns) */}
          {selectedHex && (
            <div className="lg:col-span-6 bg-white border border-[#E5DDD0]/70 rounded-3xl p-6 md:p-8 space-y-6 shadow-md relative animate-fade-in sticky top-24">
              <button
                onClick={() => setSelectedHex(null)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row gap-6 items-start pb-4 border-b border-[#E5DDD0]/50">
                {/* Visual representation of Hexagram */}
                <div className="w-32 bg-[#FDFCF7] border border-[#E5DDD0] p-4 rounded-2xl flex flex-col gap-2.5 justify-center shadow-inner">
                  {selectedHex.details?.lines ? (
                    // Draw lines from bottom to top (Line 6 is first in array representation if drawn top-to-bottom)
                    // The sheet/DB array is line 1 to 6. So we reverse it to draw line 6 at the top!
                    [...selectedHex.details.lines].reverse().map(l => (
                      <div key={l.lineNumber} className="w-full flex flex-col gap-0.5">
                        {renderHexagramLine(l.yangYin)}
                        <span className="text-[7px] text-slate-400 font-bold text-center">Hào {l.lineNumber} - {l.stemBranch}</span>
                      </div>
                    ))
                  ) : (
                    // Fallback to binary code parsing (reversed order)
                    selectedHex.details?.binaryCode ? (
                      selectedHex.details.binaryCode.split("").reverse().map((char, idx) => (
                        <div key={idx} className="w-full flex flex-col gap-0.5">
                          {renderHexagramLine(char)}
                          <span className="text-[7px] text-slate-400 font-bold text-center">Hào {6 - idx}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-xs text-slate-400 italic py-6">Ký tự quẻ</div>
                    )
                  )}
                </div>

                <div className="space-y-2 flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#C5A059]/10 text-[#C5A059] rounded-md">
                      Quẻ {selectedHex.lines.index}
                    </span>
                    {selectedHex.details?.rating && (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                        Đánh giá: {selectedHex.details.rating}
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-800 italic">
                    Quẻ {selectedHex.lines.name}
                  </h2>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">
                    {selectedHex.lines.description}
                  </p>
                </div>
              </div>

              {/* General Poems */}
              {selectedHex.lines.generalPoems && selectedHex.lines.generalPoems.length > 0 && (
                <div className="space-y-3 bg-[#FDFCF7] border border-[#E5DDD0]/50 p-5 rounded-2xl">
                  <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-wider">Thơ Quẻ</h4>
                  <div className="font-serif text-sm italic text-slate-600 space-y-1 text-center md:text-left leading-relaxed">
                    {selectedHex.lines.generalPoems.map((p, i) => (
                      <p key={i}>"{p}"</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Detail parameters (dac thoi, extra value) */}
              {selectedHex.details && (
                <div className="grid grid-cols-2 gap-4 text-xs font-medium border-b border-[#E5DDD0]/40 pb-4">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block mb-1">Mã Nhị Phân</span>
                    <span className="text-slate-700 font-bold">{selectedHex.details.binaryCode}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block mb-1">Đắc Thời/Thế</span>
                    <span className="text-slate-700 font-bold">
                      {selectedHex.details.dacThoi === 1 ? "Có đắc" : "Không đắc"}
                    </span>
                  </div>
                </div>
              )}

              {/* Lines (Hào) tabs/scroll */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Luận Giải 6 Hào</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {selectedHex.lines.lines.map(line => {
                    const detailLine = selectedHex.details?.lines?.find(l => l.lineNumber === line.lineNumber);
                    return (
                      <div key={line.lineNumber} className="border border-[#E5DDD0]/50 rounded-2xl p-4 space-y-2 hover:border-[#C5A059]/40 transition-colors">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-[#C5A059]">Hào {line.lineNumber}</span>
                          {detailLine && (
                            <span className="text-slate-500">
                              {detailLine.yangYin} ({detailLine.stemBranch})
                            </span>
                          )}
                        </div>
                        {line.meaning && (
                          <p className="text-xs font-semibold text-slate-800">
                            Ý nghĩa: {line.meaning}
                          </p>
                        )}
                        {line.interpretation && (
                          <p className="text-xs text-slate-500 font-light leading-relaxed">
                            Luận đoán: {line.interpretation}
                          </p>
                        )}
                        {line.poems && line.poems.length > 0 && (
                          <div className="text-[11px] font-serif italic text-slate-400 border-l-2 border-[#E5DDD0] pl-3 py-1 space-y-1">
                            {line.poems.map((p, i) => <p key={i}>"{p}"</p>)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {activeTab === "solarterms" && (
        <div className="bg-white border border-[#E5DDD0]/70 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#C5A059] italic mb-4">Danh Sách Tiết Khí Vũ Trụ</h2>
          
          <div className="overflow-x-auto rounded-2xl border border-[#E5DDD0]/60">
            <table className="min-w-full divide-y divide-[#E5DDD0]">
              <thead className="bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left">Mã Số</th>
                  <th scope="col" className="px-6 py-4 text-left">Tên Tiết Khí</th>
                  <th scope="col" className="px-6 py-4 text-left">Thời Điểm Nhập Khí</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#E5DDD0]/40 text-sm text-slate-600 font-light">
                {filteredSolarTerms.map((term, index) => (
                  <tr key={term.id || index} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#C5A059]">{term.code}</td>
                    <td className="px-6 py-4 font-bold text-slate-800">{term.termName}</td>
                    <td className="px-6 py-4">
                      {term.entryTime ? new Date(term.entryTime).toLocaleString('vi-VN') : "N/A"}
                    </td>
                  </tr>
                ))}
                
                {solarTerms.length === 0 && (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center text-slate-400 italic">
                      Đang tải hoặc chưa có dữ liệu...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "profiles" && (
        <div className="bg-white border border-[#E5DDD0]/70 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#C5A059] italic mb-4">Hồ Sơ Bản Mệnh Nhân Vật</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((p, index) => (
              <div key={p.id || index} className="border border-[#E5DDD0]/60 hover:border-[#C5A059]/40 p-5 rounded-2xl space-y-4 hover:shadow-sm transition-all bg-[#FDFCF7]/30">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 text-base">{p.fullname}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    p.gender === "Nam" ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600'
                  }`}>
                    {p.gender}
                  </span>
                </div>
                
                <div className="text-xs text-slate-500 space-y-1 font-light leading-relaxed">
                  <p>
                    <span className="font-semibold text-slate-700">Ngày sinh:</span> {p.birthDay}/{p.birthMonth}/{p.birthYear}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700">Giờ sinh:</span> {p.birthHour}h {p.birthMinute}m
                  </p>
                  {p.birthDatetime && (
                    <p>
                      <span className="font-semibold text-slate-700">Mốc Dương Lịch:</span> {new Date(p.birthDatetime).toLocaleString('vi-VN')}
                    </p>
                  )}
                </div>

                {p.notes && (
                  <div className="pt-2 border-t border-[#E5DDD0]/40 text-xs text-slate-400 italic">
                    {p.notes}
                  </div>
                )}
              </div>
            ))}
            
            {profiles.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-400 italic">
                Đang tải hoặc chưa có dữ liệu...
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
