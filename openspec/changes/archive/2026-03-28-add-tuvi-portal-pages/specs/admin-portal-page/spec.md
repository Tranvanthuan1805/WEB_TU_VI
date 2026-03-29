## ADDED Requirements

### Requirement: Admin page shows login form when not authenticated
Trang Admin phải hiển thị form đăng nhập khi người dùng chưa đăng nhập.

#### Scenario: Login form displays for unauthenticated user
- **WHEN** người dùng truy cập /admin và chưa đăng nhập
- **THEN** hiển thị form với username, password và nút "Đăng nhập"

### Requirement: Admin page shows dashboard after login
Trang Admin phải hiển thị dashboard với 2 tabs sau khi đăng nhập.

#### Scenario: Two tabs are visible after login
- **WHEN** người dùng đã đăng nhập
- **THEN** hiển thị 2 tabs: "Thống kê" và "Tạo bài viết"

### Requirement: Statistics tab displays revenue summary
Tab Thống kê phải hiển thị 3 thẻ doanh thu.

#### Scenario: Statistics tab shows 3 summary cards
- **WHEN** người dùng mở tab "Thống kê"
- **THEN** hiển thị 3 thẻ: Hôm nay, Tháng này, Năm nay

### Requirement: Create article tab displays form
Tab Tạo bài viết phải hiển thị form để tạo bài viết mới.

#### Scenario: Create article form displays correctly
- **WHEN** người dùng mở tab "Tạo bài viết"
- **THEN** hiển thị form với: tiêu đề (input), nội dung (textarea), ảnh bìa (file upload), nút "Xuất bản"

#### Scenario: Form has all required fields
- **WHEN** form tạo bài viết được hiển thị
- **THEN** có đủ 3 trường: Tiêu đề, Nội dung, Ảnh bìa
