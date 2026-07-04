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

export default function PrivacyPolicy() {
  return (
    <PageWrapper title="Chính Sách Bảo Mật">
      <p>Chào mừng bạn đến với Lá Số Tử Vi. Chúng tôi cam kết bảo vệ thông tin cá nhân của người dùng.</p>
      
      <h2 className="font-serif text-xl font-bold text-slate-800 pt-4">1. Thu Thập Thông Tin Cá Nhân</h2>
      <p>Chúng tôi chỉ thu thập thông tin khi bạn tự nguyện nhập thông tin lập lá số bao gồm Ngày sinh, Giờ sinh, Giới tính, và họ tên. Các thông tin này chỉ sử dụng cho thuật toán tính toán lá số của bạn và không được sử dụng cho mục đích quảng cáo hoặc bán lại.</p>

      <h2 className="font-serif text-xl font-bold text-slate-800 pt-4">2. Lưu Trữ Dữ Liệu</h2>
      <p>Thông tin của bạn được lưu trữ an toàn trong cơ sở dữ liệu của chúng tôi và chỉ có thể truy cập bởi ban quản trị hệ thống. Chúng tôi tuân thủ các quy tắc bảo mật dữ liệu tiên tiến để ngăn ngừa việc truy cập trái phép.</p>

      <h2 className="font-serif text-xl font-bold text-slate-800 pt-4">3. Cookie & Tracking</h2>
      <p>Chúng tôi sử dụng một số cookie nhỏ (chẳng hạn như khóa ẩn danh AnonymousId lưu trữ trong trình duyệt của bạn) để quản lý giới hạn xem miễn phí trong ngày, giúp cải thiện chất lượng dịch vụ.</p>
    </PageWrapper>
  );
}
