## ADDED Requirements

### Requirement: Terms of Service page renders with proper structure
Trang Điều khoản sử dụng phải hiển thị với cấu trúc gồm: PageTitle, meta description, last updated, table of contents, và các content sections.

#### Scenario: Page loads with SEO metadata
- **WHEN** người dùng truy cập /dieu-khoan-su-dung
- **THEN** page title là "Điều khoản sử dụng | Lá Số Tử Vi" và meta description chứa thông tin về điều khoản

#### Scenario: Page displays last updated date
- **WHEN** người dùng xem trang
- **THEN** hiển thị dòng "Cập nhật lần cuối: [ngày]"

#### Scenario: Table of contents navigates to sections
- **WHEN** người dùng click link trong mục lục
- **THEN** scroll đến section tương ứng

### Requirement: Terms of Service content covers required topics
Nội dung Điều khoản sử dụng phải bao gồm các mục cần thiết.

#### Scenario: Acceptance section exists
- **WHEN** người dùng đọc section "Chấp nhận điều khoản"
- **THEN** nêu rằng việc sử dụng website đồng nghĩa với việc chấp nhận điều khoản

#### Scenario: Usage conditions section exists
- **WHEN** người dùng đọc section "Điều kiện sử dụng"
- **THEN** nêu điều kiện để sử dụng dịch vụ

#### Scenario: Age requirement section exists
- **WHEN** người dùng đọc section "Độ tuổi"
- **THEN** nêu yêu cầu độ tuổi tối thiểu (thường là 18 hoặc có sự đồng ý của phụ huynh)

#### Scenario: User account section exists
- **WHEN** người dùng đọc section "Tài khoản người dùng"
- **THEN** nêu về tài khoản, mật khẩu, trách nhiệm bảo mật

#### Scenario: Prohibited behavior section exists
- **WHEN** người dùng đọc section "Hành vi bị cấm"
- **THEN** liệt kê các hành vi không được phép

#### Scenario: Intellectual property section exists
- **WHEN** người dùng đọc section "Quyền sở hữu trí tuệ"
- **THEN** nêu quyền sở hữu nội dung website

#### Scenario: User content section exists
- **WHEN** người dùng đọc section "Nội dung người dùng đăng tải"
- **THEN** nêu về nội dung do người dùng đăng tải và trách nhiệm

#### Scenario: Payment section exists
- **WHEN** người dùng đọc section "Thanh toán và Hoàn tiền"
- **THEN** nêu về thanh toán, chính sách hoàn tiền (nếu có dịch vụ trả phí)

#### Scenario: Disclaimer section exists
- **WHEN** người dùng đọc section "Miễn trừ bảo đảm"
- **THEN** nêu miễn trừ bảo đảm về dịch vụ

#### Scenario: Limitation of liability section exists
- **WHEN** người dùng đọc section "Giới hạn trách nhiệm"
- **THEN** nêu giới hạn trách nhiệm của bên cung cấp

#### Scenario: Termination section exists
- **WHEN** người dùng đọc section "Chấm dứt dịch vụ"
- **THEN** nêu quyền khóa tài khoản, chấm dứt dịch vụ

#### Scenario: Governing law section exists
- **WHEN** người dùng đọc section "Luật áp dụng"
- **THEN** nêu luật áp dụng (Việt Nam) và cách giải quyết tranh chấp

### Requirement: Terms of Service follows design system
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