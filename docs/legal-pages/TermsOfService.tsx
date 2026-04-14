// Terms of Service Page Component
// Route: /dieu-khoan-su-dung

export const metadata = {
  title: 'Điều khoản sử dụng | Lá Số Tử Vi',
  description: 'Điều khoản sử dụng dịch vụ của Lá Số Tử Vi - Quyền và nghĩa vụ của người dùng khi sử dụng website và dịch vụ xem tử vi.',
}

export default function TermsOfService() {
  const lastUpdated = '14/04/2026'

  return (
    <div className="max-w-3xl mx-auto py-12 space-y-12">
      <header className="text-center space-y-4">
        <h1 className="font-headline text-4xl md:text-5xl text-primary leading-tight italic">
          Điều khoản sử dụng
        </h1>
        <p className="text-on-surface-variant font-light">
          Cập nhật lần cuối: {lastUpdated}
        </p>
      </header>

      <nav className="bg-surface-container-lowest rounded-lg p-6 border border-outline-variant/20">
        <h2 className="font-label text-xs uppercase tracking-widest text-primary mb-4">Mục lục</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#chap-nhan-dieu-khoan" className="text-yellow-400 hover:text-yellow-300 transition-colors">Chấp nhận điều khoản</a></li>
          <li><a href="#dieu-kien-su-dung" className="text-yellow-400 hover:text-yellow-300 transition-colors">Điều kiện sử dụng</a></li>
          <li><a href="#do-tuoi" className="text-yellow-400 hover:text-yellow-300 transition-colors">Độ tuổi</a></li>
          <li><a href="#tai-khoan" className="text-yellow-400 hover:text-yellow-300 transition-colors">Tài khoản người dùng</a></li>
          <li><a href="#hanh-vi-cam" className="text-yellow-400 hover:text-yellow-300 transition-colors">Hành vi bị cấm</a></li>
          <li><a href="#so-huu-tri-tue" className="text-yellow-400 hover:text-yellow-300 transition-colors">Quyền sở hữu trí tuệ</a></li>
          <li><a href="#noi-dung-nguoi-dung" className="text-yellow-400 hover:text-yellow-300 transition-colors">Nội dung người dùng</a></li>
          <li><a href="#thanh-toan" className="text-yellow-400 hover:text-yellow-300 transition-colors">Thanh toán & Hoàn tiền</a></li>
          <li><a href="#mien-tru-bao-dam" className="text-yellow-400 hover:text-yellow-300 transition-colors">Miễn trừ bảo đảm</a></li>
          <li><a href="#gioi-han-trach-nhiem" className="text-yellow-400 hover:text-yellow-300 transition-colors">Giới hạn trách nhiệm</a></li>
          <li><a href="#cham-dut" className="text-yellow-400 hover:text-yellow-300 transition-colors">Chấm dứt dịch vụ</a></li>
          <li><a href="#luat-ap-dung" className="text-yellow-400 hover:text-yellow-300 transition-colors">Luật áp dụng</a></li>
        </ul>
      </nav>

      <section id="chap-nhan-dieu-khoan" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Chấp nhận điều khoản</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>Bằng việc truy cập và sử dụng website Lá Số Tử Vi, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý bị ràng buộc bởi các Điều khoản sử dụng này.</p>
          <p>Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng website.</p>
        </div>
      </section>

      <section id="dieu-kien-su-dung" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Điều kiện sử dụng</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>Để sử dụng dịch vụ, bạn cần:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Có thiết bị kết nối internet</li>
            <li>Cung cấp thông tin cá nhân chính xác (họ tên, ngày sinh, giờ sinh)</li>
            <li>Tuân thủ các điều khoản và điều kiện tại đây</li>
          </ul>
        </div>
      </section>

      <section id="do-tuoi" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Độ tuổi</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>Bạn phải từ <strong>18 tuổi</strong> trở lên để sử dụng dịch vụ tự viếng phí.</p>
          <p>Nếu bạn dưới 18 tuổi, cần có sự đồng ý và giám sát của phụ huynh hoặc người giám hộ hợp pháp.</p>
        </div>
      </section>

      <section id="tai-khoan" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Tài khoản người dùng</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>Khi tạo tài khoản:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Cung cấp thông tin chính xác, đầy đủ</li>
            <li>Giữ mật khẩu bảo mật</li>
            <li>Chịu trách nhiệm cho mọi hoạt động dưới tài khoản của bạn</li>
            <li>Thông báo ngay cho chúng tôi nếu phát hiện truy cập trái phép</li>
          </ul>
        </div>
      </section>

      <section id="hanh-vi-cam" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Hành vi bị cấm</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>Bạn KHÔNG được:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Sử dụng cho mục đích bất hợp pháp</li>
            <li>Cố tình gửi nội dung sai sự thật, xúc phạm</li>
            <li>Thu thập thông tin người dùng khác</li>
            <li>Tấn công, can thiệp vào hệ thống</li>
            <li>Sao chép, phân phối nội dung mà không có sự đồng ý</li>
            <li>Sử dụng bot, script tự động để truy cập</li>
          </ul>
        </div>
      </section>

      <section id="so-huu-tri-tue" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Quyền sở hữu trí tuệ</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>Tất cả nội dung trên website bao gồm:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Thuật toán, phương pháp xem tử vi</li>
            <li>Thiết kế, giao diện, hình ảnh</li>
            <li>Logo, thương hiệu "Lá Số Tử Vi"</li>
            <li>Bài viết, nội dung</li>
          </ul>
          <p>Đều thuộc quyền sở hữu của Lá Số Tử Vi hoặc được cấp phép. Không được sao chép khi chưa có sự đồng ý.</p>
        </div>
      </section>

      <section id="noi-dung-nguoi-dung" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Nội dung người dùng đăng tải</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>Khi đăng tải nội dung (bình luận, đánh giá):</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Bạn đảm bảo có quyền đăng tải nội dung đó</li>
            <li>Nội dung không vi phạm pháp luật, quyền của bên thứ ba</li>
            <li>Chúng tôi có quyền xóa nội dung vi phạm mà không cần thông báo</li>
          </ul>
        </div>
      </section>

      <section id="thanh-toan" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Thanh toán & Hoàn tiền</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p><strong>Thanh toán:</strong> Thanh toán qua các kênh được hỗ trợ (VNPay, MoMo, chuyển khoản). Giao dịch được bảo mật.</p>
          <p><strong>Chính sách hoàn tiền:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Hoàn tiền 100% nếu kết quả không đúng (do lỗi hệ thống)</li>
            <li>Hoàn tiền trong vòng 7 ngày kể từ ngày thanh toán</li>
            <li>Liên hệ: contact@lasotuvi.com để yêu cầu hoàn tiền</li>
          </ul>
        </div>
      </section>

      <section id="mien-tru-bao-dam" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Miễn trừ bảo đảm</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>DỊCH VỤ ĐƯỢC CUNG CẤP "NHƯ TÌNH TRẠNG HIỆN TẠI" VÀ "THEO CÓ SẴN".</p>
          <p>CHÚNG TÔI KHÔNG BẢO ĐẢM:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Dịch vụ không bị gián đoạn, lỗi</li>
            <li>Kết quả tử vi chính xác tuyệt đối</li>
            <li>Chất lượng đáp ứng mọi kỳ vọng</li>
          </ul>
        </div>
      </section>

      <section id="gioi-han-trach-nhiem" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Giới hạn trách nhiệm</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>CHÚNG TÔI KHÔNG CHỊU TRÁCH NHIỆM CHO:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Thiệt hại gián tiếp, ngẫu nhiên</li>
            <li>Mất mát cơ hội, doanh thu, dữ liệu</li>
            <li>Quyết định của bạn dựa trên kết quả tử vi</li>
            <li>Nội dung, hành vi của bên thứ ba</li>
          </ul>
          <p>Trách nhiệm tối đa không vượt quá số tiền bạn đã thanh toán.</p>
        </div>
      </section>

      <section id="cham-dut" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Chấm dứt dịch vụ</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>Chúng tôi có quyền:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Khóa tài khoản vi phạm điều khoản</li>
            <li>Tạm ngừng dịch vụ để bảo trì</li>
            <li>Chấm dứt cung cấp dịch vụ bất kỳ lúc nào</li>
          </ul>
        </div>
      </section>

      <section id="luat-ap-dung" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Luật áp dụng & Giải quyết tranh chấp</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>Điều khoản này được điều chỉnh bởi pháp luật Việt Nam.</p>
          <p>Mọi tranh chấp sẽ được giải quyết tại Tòa án Nhân dân có thẩm quyền tại Việt Nam.</p>
        </div>
      </section>

      <footer className="pt-8 border-t border-outline-variant/30 text-center text-sm text-on-surface-variant">
        <p>&copy; 2026 Lá Số Tử Vi. Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  )
}