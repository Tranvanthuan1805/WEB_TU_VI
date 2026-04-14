## ADDED Requirements

### Requirement: Privacy Policy page renders with proper structure
Trang Chính sách bảo mật phải hiển thị với cấu trúc gồm: PageTitle, meta description, last updated, table of contents, và các content sections.

#### Scenario: Page loads with SEO metadata
- **WHEN** người dùng truy cập /chinh-sach-privacy
- **THEN** page title là "Chính sách bảo mật | Lá Số Tử Vi" và meta description chứa thông tin về bảo vệ dữ liệu cá nhân

#### Scenario: Page displays last updated date
- **WHEN** người dùng xem trang
- **THEN** hiển thị dòng "Cập nhật lần cuối: [ngày]" (có thể hardcode hoặc dynamic)

#### Scenario: Table of contents navigates to sections
- **WHEN** người dùng click link trong mục lục
- **THEN** scroll đến section tương ứng

### Requirement: Privacy Policy content covers required topics
Nội dung Chính sách bảo mật phải bao gồm các mục bắt buộc theo Nghị định 13/2023/NĐ-CP.

#### Scenario: Data collection section exists
- **WHEN** người dùng đọc section "Dữ liệu được thu thập"
- **THEN** liệt kê: họ tên, email, ngày sinh, giờ sinh, nơi sinh, giới tính, device data, cookies, analytics

#### Scenario: Purpose section exists
- **WHEN** người dùng đọc section "Mục đích sử dụng"
- **THEN** nêu rõ mục đích xử lý dữ liệu

#### Scenario: Legal basis section exists
- **WHEN** người dùng đọc section "Cơ sở pháp lý"
- **THEN** nêu cơ sở xử lý dữ liệu (đồng ý của người dùng theo Nghị định 13)

#### Scenario: Data retention section exists
- **WHEN** người dùng đọc section "Thời gian lưu trữ"
- **THEN** nêu thời gian lưu trữ dữ liệu

#### Scenario: Third party sharing section exists
- **WHEN** người dùng đọc section "Chia sẻ cho bên thứ ba"
- **THEN** liệt kê các bên thứ ba (nếu có) và mục đích

#### Scenario: Cookie section exists
- **WHEN** người dùng đọc section "Cookie và Analytics"
- **THEN** mô tả cách sử dụng cookie và analytics

#### Scenario: User rights section exists
- **WHEN** người dùng đọc section "Quyền của người dùng"
- **THEN** liệt kê quyền: truy cập, sửa, xóa, phản đối, khiếu nại

#### Scenario: Contact section exists
- **WHEN** người dùng đọc section "Liên hệ"
- **THEN** cung cấp thông tin liên hệ để yêu cầu xóa/sửa dữ liệu

### Requirement: Privacy Policy follows design system
Trang phải tuân thủ design system của website.

#### Scenario: Uses headline font for titles
- **WHEN** người dùng nhìn thấy tiêu đề H1, H2
- **THEN** dùng font-headline, italic, text-primary

#### Scenario: Uses body font for content
- **WHEN** người dùng đọc nội dung body
- **THEN** dùng font-body / font-light, text-on-surface-variant

#### Scenario: Links use yellow accent color
- **WHEN** người dùng nhìn thấy internal links
- **THEN** dùng text-yellow-400 hover:text-yellow-300

#### Scenario: Responsive on mobile
- **WHEN** người dùng xem trên thiết bị nhỏ
- **THEN** layout không bị vỡ, text dễ đọc