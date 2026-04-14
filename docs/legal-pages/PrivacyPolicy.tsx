// Privacy Policy Page Component
// Route: /chinh-sach-privacy

export const metadata = {
  title: 'Chính sách bảo mật | Lá Số Tử Vi',
  description: 'Chính sách bảo mật của Lá Số Tử Vi - Thông tin về việc thu thập, sử dụng và bảo vệ dữ liệu cá nhân của người dùng theo Nghị định 13/2023/NĐ-CP.',
}

export default function PrivacyPolicy() {
  const lastUpdated = '14/04/2026'

  return (
    <div className="max-w-3xl mx-auto py-12 space-y-12">
      <header className="text-center space-y-4">
        <h1 className="font-headline text-4xl md:text-5xl text-primary leading-tight italic">
          Chính sách bảo mật
        </h1>
        <p className="text-on-surface-variant font-light">
          Cập nhật lần cuối: {lastUpdated}
        </p>
      </header>

      <nav className="bg-surface-container-lowest rounded-lg p-6 border border-outline-variant/20">
        <h2 className="font-label text-xs uppercase tracking-widest text-primary mb-4">Mục lục</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#du-lieu-thu-thap" className="text-yellow-400 hover:text-yellow-300 transition-colors">Dữ liệu được thu thập</a></li>
          <li><a href="#muc-dich-su-dung" className="text-yellow-400 hover:text-yellow-300 transition-colors">Mục đích sử dụng</a></li>
          <li><a href="#co-so-phap-ly" className="text-yellow-400 hover:text-yellow-300 transition-colors">Cơ sở pháp lý</a></li>
          <li><a href="#thoi-gian-luu-tru" className="text-yellow-400 hover:text-yellow-300 transition-colors">Thời gian lưu trữ</a></li>
          <li><a href="#chia-se-ben-thu-ba" className="text-yellow-400 hover:text-yellow-300 transition-colors">Chia sẻ cho bên thứ ba</a></li>
          <li><a href="#cookie-analytics" className="text-yellow-400 hover:text-yellow-300 transition-colors">Cookie và Analytics</a></li>
          <li><a href="#quyen-nguoi-dung" className="text-yellow-400 hover:text-yellow-300 transition-colors">Quyền của người dùng</a></li>
          <li><a href="#lien-he" className="text-yellow-400 hover:text-yellow-300 transition-colors">Liên hệ</a></li>
        </ul>
      </nav>

      <section id="du-lieu-thu-thap" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Dữ liệu được thu thập</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>Chúng tôi thu thập các loại dữ liệu sau để cung cấp dịch vụ tử vi/chiêm tinh:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Thông tin cá nhân:</strong> Họ tên, email, số điện thoại</li>
            <li><strong>Thông tin sinh:</strong> Ngày sinh, giờ sinh (theo 12 con giáp), nơi sinh</li>
            <li><strong>Thông tin giới tính:</strong> Nam/Nữ (nếu người dùng cung cấp)</li>
            <li><strong>Dữ liệu thiết bị:</strong> Địa chỉ IP, loại thiết bị, trình duyệt, hệ điều hành</li>
            <li><strong>Cookie:</strong> Các file nhỏ lưu trữ trên thiết bị của bạn</li>
            <li><strong>Dữ liệu analytics:</strong> Thông tin về cách bạn sử dụng website</li>
          </ul>
        </div>
      </section>

      <section id="muc-dich-su-dung" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Mục đích sử dụng</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>Dữ liệu thu thập được sử dụng cho các mục đích sau:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Cung cấp dịch vụ xem lá số tử vi/chiêm tinh cá nhân</li>
            <li>Gửi kết quả lá số qua email</li>
            <li>Cải thiện và cá nhân hóa trải nghiệm người dùng</li>
            <li>Gửi thông báo, bản tin (nếu người dùng đăng ký)</li>
            <li>Hỗ trợ khách hàng và giải đáp thắc mắc</li>
            <li>Phân tích dữ liệu để cải thiện dịch vụ</li>
            <li>Tuân thủ nghĩa vụ pháp lý</li>
          </ul>
        </div>
      </section>

      <section id="co-so-phap-ly" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Cơ sở pháp lý</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>Việc xử lý dữ liệu cá nhân của chúng tôi dựa trên:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Đồng ý của người dùng:</strong> Khi bạn điền thông tin và sử dụng dịch vụ, bạn đồng ý cho phép chúng tôi xử lý dữ liệu theo chính sách này.</li>
            <li><strong>Thực hiện hợp đồng:</strong> Để cung cấp dịch vụ tử vi theo yêu cầu.</li>
            <li><strong>Lợi ích chính đáng:</strong> Để cải thiện dịch vụ và trải nghiệm người dùng.</li>
          </ul>
          <p>Theo Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân, chúng tôi cam kết tuân thủ các quy định về bảo vệ dữ liệu cá nhân.</p>
        </div>
      </section>

      <section id="thoi-gian-luu-tru" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Thời gian lưu trữ</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>Chúng tôi lưu trữ dữ liệu cá nhân trong thời gian cần thiết để:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Cung cấp dịch vụ bạn yêu cầu</li>
            <li>Tuân thủ nghĩa vụ pháp lý (thường là 5 năm sau khi kết thúc hợp đồng)</li>
            <li>Giải quyết các tranh chấp</li>
          </ul>
          <p>Sau khi không còn cần thiết, dữ liệu sẽ được xóa an toàn hoặc ẩn danh hóa.</p>
        </div>
      </section>

      <section id="chia-se-ben-thu-ba" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Chia sẻ cho bên thứ ba</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>Chúng tôi có thể chia sẻ dữ liệu với:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Nhà cung cấp dịch vụ:</strong> Các bên thứ ba cung cấp dịch vụ cho chúng tôi (hosting, email, payment) - chỉ cung cấp thông tin cần thiết.</li>
            <li><strong>Pháp luật:</strong> Khi được yêu cầu bởi cơ quan có thẩm quyền.</li>
            <li><strong>Không bán dữ liệu:</strong> Chúng tôi KHÔNG bán, cho thuê hay trao đổi dữ liệu cá nhân cho bên thứ ba vì mục đích tiếp thị.</li>
          </ul>
        </div>
      </section>

      <section id="cookie-analytics" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Cookie và Analytics</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p><strong>Cookie:</strong> Chúng tôi sử dụng cookie để lưu trữ thông tin cơ bản, cải thiện trải nghiệm và ghi nhớ prefer của bạn. Bạn có thể tắt cookie trong cài đặt trình duyệt.</p>
          <p><strong>Google Analytics:</strong> Chúng tôi sử dụng Google Analytics để hiểu cách người dùng sử dụng website. Dữ liệu này được ẩn danh hóa.</p>
          <p>Chi tiết về cách Google xử lý dữ liệu: <a href="https://policies.google.com/technologies/partner-opt-out" className="text-yellow-400 hover:text-yellow-300 underline" target="_blank" rel="noopener">Google Privacy Policy</a></p>
        </div>
      </section>

      <section id="quyen-nguoi-dung" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Quyền của người dùng</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>Theo Nghị định 13/2023/NĐ-CP, bạn có các quyền sau:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Quyền truy cập:</strong> Yêu cầu cung cấp bản sao dữ liệu cá nhân của bạn.</li>
            <li><strong>Quyền sửa:</strong> Yêu cầu sửa thông tin không chính xác.</li>
            <li><strong>Quyền xóa:</strong> Yêu cầu xóa dữ liệu cá nhân ("Quyền được lãng quên").</li>
            <li><strong>Quyền phản đối:</strong> Phản đối việc xử lý dữ liệu cho mục đích tiếp thị.</li>
            <li><strong>Quyền khiếu nại:</strong> Khiếu nại đến cơ quan có thẩm quyền về bảo vệ dữ liệu.</li>
          </ul>
        </div>
      </section>

      <section id="lien-he" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Liên hệ</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>Nếu bạn có câu hỏi, yêu cầu truy cập, sửa hoặc xóa dữ liệu, vui lòng liên hệ:</p>
          <ul className="space-y-2">
            <li><strong>Email:</strong> contact@lasotuvi.com</li>
            <li><strong>Địa chỉ:</strong> [Địa chỉ công ty]</li>
          </ul>
          <p>Chúng tôi sẽ phản hồi trong vòng 30 ngày.</p>
        </div>
      </section>

      <footer className="pt-8 border-t border-outline-variant/30 text-center text-sm text-on-surface-variant">
        <p>&copy; 2026 Lá Số Tử Vi. Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  )
}