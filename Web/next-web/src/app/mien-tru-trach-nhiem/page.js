import React from 'react';

function PageWrapper({ title, children }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-6">
      <h1 className="font-serif text-3xl md:text-4xl text-[#C5A059] font-bold italic border-b border-[#E5DDD0]/50 pb-4">
        {title}
      </h1>
      <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-light space-y-6">
        {children}
      </div>
    </div>
  );
}

export default function Disclaimer() {
  return (
    <PageWrapper title="Miễn Trừ Trách Nhiệm">
      <p>Xin vui lòng đọc kỹ tuyên bố miễn trừ trách nhiệm này trước khi sử dụng bất kỳ thông tin nào từ website.</p>
      
      <h2 className="font-serif text-xl font-bold text-slate-800 pt-4">1. Tính Chất Chiêm Tinh</h2>
      <p>Các luận giải Tử Vi, Hà Lạc, Phong Thủy trên website này được xây dựng trên cơ sở các tư liệu học thuyết phương Đông cổ đại kết hợp thuật toán. Tất cả nội dung chỉ mang tính chất tham khảo, chiêm nghiệm văn hóa và giải trí tâm linh.</p>

      <h2 className="font-serif text-xl font-bold text-slate-800 pt-4">2. Quyết Định Cá Nhân</h2>
      <p>Chúng tôi không chịu trách nhiệm pháp lý hoặc bồi thường cho bất kỳ quyết định cá nhân, tổn thất tài chính, sức khỏe hay tinh thần nào phát sinh từ việc bạn áp dụng hoặc tin theo các luận đoán của lá số.</p>

      <h2 className="font-serif text-xl font-bold text-slate-800 pt-4">3. Sự Hợp Lý Kỹ Thuật</h2>
      <p>Chúng tôi luôn nỗ lực tối đa để thuật toán tính toán chính xác nhất dựa trên giờ giấc và dữ liệu nạp vào. Tuy nhiên, do tính chất phức tạp của hệ thống lịch pháp, chúng tôi không cam kết tính đúng đắn tuyệt đối trong mọi trường hợp đặc biệt.</p>
    </PageWrapper>
  );
}
