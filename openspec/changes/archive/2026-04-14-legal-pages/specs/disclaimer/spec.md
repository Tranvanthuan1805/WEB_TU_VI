## ADDED Requirements

### Requirement: Disclaimer page renders with proper structure
Trang Từ chối trách nhiệm phải hiển thị với cấu trúc gồm: PageTitle, meta description, last updated, table of contents, và các content sections.

#### Scenario: Page loads with SEO metadata
- **WHEN** người dùng truy cập /tu-choi-trach-nhiem
- **THEN** page title là "Từ chối trách nhiệm | Lá Số Tử Vi" và meta description chứa thông tin về từ chối trách nhiệm

#### Scenario: Page displays last updated date
- **WHEN** người dùng xem trang
- **THEN** hiển thị dòng "Cập nhật lần cuối: [ngày]"

#### Scenario: Table of contents navigates to sections
- **WHEN** người dùng click link trong mục lục
- **THEN** scroll đến section tương ứng

### Requirement: Disclaimer content covers required topics
Nội dung Từ chối trách nhiệm phải bao gồm các mục cần thiết cho website tử vi/chiêm tinh.

#### Scenario: Entertainment purpose section exists
- **WHEN** người dùng đọc section "Mục đích giải trí"
- **THEN** nêu rõ nội dung tử vi/chiêm tinh chỉ dùng cho mục đích tham khảo và giải trí

#### Scenario: Not professional advice section exists
- **WHEN** người dùng đọc section "Không phải lời khuyên chuyên môn"
- **THEN** nêu rõ KHÔNG phải lời khuyên y tế, pháp lý, tài chính, tâm lý

#### Scenario: No accuracy guarantee section exists
- **WHEN** người dùng đọc section "Không bảo đảm độ chính xác"
- **THEN** nêu không bảo đảm độ chính xác hoặc kết quả cụ thể

#### Scenario: User responsibility section exists
- **WHEN** người dùng đọc section "Trách nhiệm người dùng"
- **THEN** nêu người dùng tự chịu trách nhiệm với quyết định của mình

#### Scenario: Third party links disclaimer exists
- **WHEN** người dùng đọc section "Liên kết bên thứ ba"
- **THEN** nêu không chịu trách nhiệm với nội dung website bên ngoài

#### Scenario: Future changes section exists
- **WHEN** người dùng đọc section "Thay đổi nội dung"
- **THEN** nêu quyền thay đổi nội dung mà không cần thông báo trước

### Requirement: Disclaimer follows design system
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