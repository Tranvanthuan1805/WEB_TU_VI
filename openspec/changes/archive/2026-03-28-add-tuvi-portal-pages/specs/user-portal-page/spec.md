## ADDED Requirements

### Requirement: User can view birth date input form
Trang User phải hiển thị form nhập liệu với các trường: ngày sinh, giờ sinh, và checkbox giờ tính.

#### Scenario: Form displays correctly
- **WHEN** người dùng truy cập trang /user
- **THEN** hiển thị form với 3 trường: date picker, dropdown 12 giá trị giờ sinh, checkbox

#### Scenario: Birth hour dropdown contains 12 values
- **WHEN** người dùng mở dropdown giờ sinh
- **THEN** hiển thị 12 giá trị: 1-3h, 3-5h, 5-7h, 7-9h, 9-11h, 11-13h, 13-15h, 15-17h, 17-19h, 19-21h, 21-23h, 23-1h

### Requirement: User can view article cards in grid layout
Trang User phải hiển thị danh sách bài viết dạng card grid với responsive.

#### Scenario: Card grid shows 2 columns on mobile
- **WHEN** người dùng xem trên màn hình nhỏ hơn 768px
- **THEN** hiển thị 2 cột card

#### Scenario: Card grid shows 3 columns on desktop
- **WHEN** người dùng xem trên màn hình lớn hơn hoặc bằng 768px
- **THEN** hiển thị 3 cột card

#### Scenario: Each card displays article information
- **WHEN** card bài viết được hiển thị
- **THEN** hiển thị: ảnh bìa, tiêu đề, mô tả ngắn

### Requirement: User can navigate through paginated articles
Trang User phải có phân trang để di chuyển qua lại giữa các bài viết.

#### Scenario: Pagination controls are visible
- **WHEN** có nhiều hơn 1 trang bài viết
- **THEN** hiển thị các nút phân trang

#### Scenario: User can click next/previous page
- **WHEN** người dùng bấm nút next hoặc previous
- **THEN** hiển thị trang tiếp theo hoặc trước đó
