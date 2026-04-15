## ADDED Requirements

### Requirement: Contact form displays correctly
Trang liên hệ tại `/liên-hệ` PHẢI hiển thị form với:
- Select dropdown cho loại liên hệ (Góp ý / Báo lỗi)
- Textarea cho nội dung
- Input cho email
- Nút "Gửi"

#### Scenario: Page loads successfully
- **WHEN** người dùng truy cập `/liên-hệ`
- **THEN** trang hiển thị đầy đủ các trường form

### Requirement: Form validates required fields
Form PHẢI validate:
- Nội dung là bắt buộc (required)
- Email phải đúng format

#### Scenario: Submit with empty content
- **WHEN** người dùng bỏ trống nội dung và nhấn gửi
- **THEN** hiển thị lỗi validation "Nội dung là bắt buộc"

#### Scenario: Submit with invalid email
- **WHEN** người dùng nhập email không đúng format và nhấn gửi
- **THEN** hiển thị lỗi validation "Email không hợp lệ"

### Requirement: Form submits successfully
Khi form hợp lệ và người dùng nhấn gửi, hệ thống PHẢI:
- Lưu contact vào database với status "Mới"
- Redirect về trang chủ "/"

#### Scenario: Successful form submission
- **WHEN** người dùng điền đầy đủ thông tin hợp lệ và nhấn gửi
- **THEN** contact được lưu vào DB và redirect về trang chủ