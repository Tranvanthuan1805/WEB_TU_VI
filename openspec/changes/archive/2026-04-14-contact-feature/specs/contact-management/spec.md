## ADDED Requirements

### Requirement: Admin contact page accessible
Trang admin quản lý liên hệ tại `/admin/contacts` PHẢI:
- Yêu cầu quyền Administrator
- Hiển thị danh sách contacts với pagination

#### Scenario: Admin accesses contact page
- **WHEN** admin truy cập `/admin/contacts`
- **THEN** hiển thị danh sách contacts

### Requirement: Display contact statistics
Admin page PHẢI hiển thị thống kê 4 trạng thái:
- Mới
- Đã đọc
- Đã xử lý
- Bỏ qua

#### Scenario: Statistics display correctly
- **WHEN** trang tải
- **THEN** hiển thị số lượng contacts theo từng trạng thái

### Requirement: Filter contacts by status
Admin PHẢI có thể lọc contacts theo trạng thái

#### Scenario: Filter by status
- **WHEN** admin chọn filter "Mới"
- **THEN** chỉ hiển thị contacts có status "Mới"

### Requirement: Search contacts
Admin PHẢI có thể tìm kiếm contacts theo email hoặc nội dung

#### Scenario: Search by email
- **WHEN** admin nhập email vào ô tìm kiếm
- **THEN** hiển thị contacts matching email

### Requirement: View contact details
Admin PHẢI có thể xem chi tiết từng contact qua modal

#### Scenario: Open detail modal
- **WHEN** admin click nút xem chi tiết
- **THEN** hiển thị modal với đầy đủ thông tin contact

### Requirement: Change contact status
Admin PHẢI có thể thay đổi trạng thái của contact

#### Scenario: Change status to "Đã xử lý"
- **WHEN** admin chọn status mới từ dropdown
- **THEN** contact được cập nhật status mới và lưu vào DB