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

export function PrivacyPolicy() {
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

export function TermsOfService() {
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

export function Disclaimer() {
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
