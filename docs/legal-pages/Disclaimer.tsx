// Disclaimer Page Component
// Route: /tu-choi-trach-nhiem

export const metadata = {
  title: 'Từ chối trách nhiệm | Lá Số Tử Vi',
  description: 'Từ chối trách nhiệm của Lá Số Tử Vi - Nội dung tử vi/chiêm tinh chỉ dùng cho mục đích tham khảo và giải trí, không phải lời khuyên chuyên môn.',
}

export default function Disclaimer() {
  const lastUpdated = '14/04/2026'

  return (
    <div className="max-w-3xl mx-auto py-12 space-y-12">
      <header className="text-center space-y-4">
        <h1 className="font-headline text-4xl md:text-5xl text-primary leading-tight italic">
          Từ chối trách nhiệm
        </h1>
        <p className="text-on-surface-variant font-light">
          Cập nhật lần cuối: {lastUpdated}
        </p>
      </header>

      <nav className="bg-surface-container-lowest rounded-lg p-6 border border-outline-variant/20">
        <h2 className="font-label text-xs uppercase tracking-widest text-primary mb-4">Mục lục</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#muc-dich-giai-tri" className="text-yellow-400 hover:text-yellow-300 transition-colors">Mục đích giải trí</a></li>
          <li><a href="#khong-phai-loi-khuyen" className="text-yellow-400 hover:text-yellow-300 transition-colors">Không phải lời khuyên chuyên môn</a></li>
          <li><a href="#khong-bao-dam" className="text-yellow-400 hover:text-yellow-300 transition-colors">Không bảo đảm độ chính xác</a></li>
          <li><a href="#trach-nhiem-nguoi-dung" className="text-yellow-400 hover:text-yellow-300 transition-colors">Trách nhiệm người dùng</a></li>
          <li><a href="#lien-ket-ben-thu-ba" className="text-yellow-400 hover:text-yellow-300 transition-colors">Liên kết bên thứ ba</a></li>
          <li><a href="#thay-doi-noi-dung" className="text-yellow-400 hover:text-yellow-300 transition-colors">Thay đổi nội dung</a></li>
        </ul>
      </nav>

      <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-6">
        <p className="text-yellow-200 font-medium text-center">
          Nội dung tử vi/chiêm tinh trên website này CHỈ dùng cho mục đích <strong>tham khảo và giải trí</strong>. 
          Không phải lời khuyên y tế, pháp lý, tài chính hay tâm lý.
        </p>
      </div>

      <section id="muc-dich-giai-tri" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Mục đích giải trí</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>Lá Số Tử Vi cung cấp nội dung tử vi/chiêm tinh với mục đích <strong>tham khảo và giải trí</strong>.</p>
          <p>Nội dung này dựa trên:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Các thuật toán và phương pháp truyền thống</li>
            <li>Kiến thức chiêm tinh học phương Tây và phương Đông</li>
            <li>Nghiên cứu và kinh nghiệm của chúng tôi</li>
          </ul>
          <p>Không có căn cứ khoa học chính thức nào chứng minh tính chính xác của các dự đoán tử vi.</p>
        </div>
      </section>

      <section id="khong-phai-loi-khuyen" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Không phải lời khuyên chuyên môn</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p className="text-lg font-medium text-red-400">NỘI DUNG TRÊN WEBSITE KHÔNG PHẢI:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Lời khuyên y tế:</strong> Không chẩn đoán bệnh, không kê đơn, không thay thế tư vấn bác sĩ</li>
            <li><strong>Lời khuyên pháp lý:</strong> Không thay thế tư vấn luật sư</li>
            <li><strong>Lời khuyên tài chính:</strong> Không phải lời khuyên đầu tư, không khuyến nghị mua/bán tài sản</li>
            <li><strong>Lời khuyên tâm lý:</strong> Không thay thế tư vấn tâm lý chuyên môn</li>
          </ul>
          <p>Nếu bạn có vấn đề về sức khỏe, pháp lý, tài chính, tâm lý, hãy tham khảo chuyên gia có thẩm quyền.</p>
        </div>
      </section>

      <section id="khong-bao-dam" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Không bảo đảm độ chính xác</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>CHÚNG TÔI KHÔNG BẢO ĐẢM:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Kết quả tử vi, chiêm tinh chính xác 100%</li>
            <li>Dự đoán về tương lai sẽ xảy ra</li>
            <li>Thông tin hoàn toàn không có sai sót</li>
            <li>Dịch vụ không bị gián đoạn</li>
          </ul>
          <p>Kết quả lá số phụ thuộc vào thông tin bạn cung cấp. Nếu thông tin không chính xác, kết quả sẽ không chính xác.</p>
        </div>
      </section>

      <section id="trach-nhiem-nguoi-dung" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Trách nhiệm người dùng</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p className="text-lg font-medium text-yellow-300">BẠN TỰ CHỊU TRÁCH NHIỆM:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Xem nội dung tử vi chỉ mang tính chất tham khảo</li>
            <li>Không đưa ra quyết định quan trọng (y tế, pháp lý, tài chính) chỉ dựa trên kết quả tử vi</li>
            <li>Tự đánh giá, cân nhắc trước khi tin tưởng vào bất kỳ dự đoán nào</li>
            <li>Sử dụng phán đoán cá nhân</li>
          </ul>
          <p>Chúng tôi không chịu trách nhiệm cho bất kỳ quyết định nào bạn đưa ra dựa trên nội dung website.</p>
        </div>
      </section>

      <section id="lien-ket-ben-thu-ba" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Liên kết bên thứ ba</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>Website có thể chứa liên kết đến website bên thứ ba.</p>
          <p>CHÚNG TÔI KHÔNG CHỊU TRÁCH NHIỆM CHO:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Nội dung của website bên thứ ba</li>
            <li>Chính sách bảo mật của họ</li>
            <li>Sản phẩm/dịch vụ họ cung cấp</li>
            <li>Thiệt hại phát sinh từ việc sử dụng</li>
          </ul>
          <p>Bạn tự chịu trách nhiệm khi truy cập các website đó.</p>
        </div>
      </section>

      <section id="thay-doi-noi-dung" className="space-y-6 scroll-mt-20">
        <h2 className="font-headline text-2xl text-primary italic border-b border-outline-variant/30 pb-2">Thay đổi nội dung</h2>
        <div className="text-on-surface-variant font-light space-y-4 leading-relaxed">
          <p>Chúng tôi có quyền:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Thay đổi, cập nhật nội dung bất kỳ lúc nào</li>
            <li>Cập nhật giá dịch vụ</li>
            <li>Tạm ngừng hoặc ngừng cung cấp dịch vụ</li>
          </ul>
          <p>Chúng tôi sẽ cố gắng thông báo trước khi thay đổi quan trọng.</p>
        </div>
      </section>

      <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-6">
        <p className="text-yellow-200 font-medium text-center">
          Bằng việc sử dụng website, bạn xác nhận đã đọc, hiểu và đồng ý với tất cả các điều khoản trong Disclaimer này.
        </p>
      </div>

      <footer className="pt-8 border-t border-outline-variant/30 text-center text-sm text-on-surface-variant">
        <p>&copy; 2026 Lá Số Tử Vi. Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  )
}