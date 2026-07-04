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

export default function TermsOfService() {
  return (
    <PageWrapper title="Điều Khoản Dịch Vụ">
      <p>Khi sử dụng dịch vụ lập lá số và xem phong thủy trên website này, bạn đồng ý với các điều khoản dịch vụ dưới đây.</p>
      
      <h2 className="font-serif text-xl font-bold text-slate-800 pt-4">1. Bản Quyền Nội Dung</h2>
      <p>Hệ thống nội dung, thuật toán, thơ phú luận đoán thuộc bản quyền sở hữu trí tuệ của Lá Số Tử Vi. Nghiêm cấm sao chép, phân phối hoặc khai thác thương mại dưới mọi hình thức mà không có sự đồng ý bằng văn bản của chúng tôi.</p>

      <h2 className="font-serif text-xl font-bold text-slate-800 pt-4">2. Dịch Vụ Thanh Toán</h2>
      <p>Các giao dịch mua vé VIP luận giải được xử lý thông qua cổng thanh toán VNPay. Chúng tôi cam kết bảo mật giao dịch và hoàn thành bàn giao vé mã số ngay khi nhận được tín hiệu thanh toán thành công.</p>

      <h2 className="font-serif text-xl font-bold text-slate-800 pt-4">3. Thay Đổi Dịch Vụ</h2>
      <p>Chúng tôi bảo lưu quyền thay đổi, tạm ngừng hoặc điều chỉnh các tính năng trên website bất cứ lúc nào để phục vụ bảo trì mà không cần báo trước.</p>
    </PageWrapper>
  );
}
