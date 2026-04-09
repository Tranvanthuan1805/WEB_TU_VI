## ADDED Requirements

### Requirement: Polling retry limit
Hệ thống SHALL giới hạn số lần kiểm tra thanh toán tối đa 3 lần, sau đó hiển thị thông báo lỗi.

#### Scenario: Polling within limit
- **WHEN** người dùng truy cập trang với transaction chưa thanh toán
- **THEN** hệ thống kiểm tra thanh toán mỗi 20 giây, tối đa 3 lần trong 60 giây

#### Scenario: Order found before timeout
- **WHEN** trong quá trình polling mà tìm thấy order với trạng thái Paid
- **THEN** hiển thị mã vé và chi tiết hóa đơn, dừng polling

#### Scenario: Max retries reached
- **WHEN** đã kiểm tra 3 lần mà không tìm thấy order hoặc order chưa được thanh toán
- **THEN** hiển thị thông báo "Không tìm thấy hóa đơn" và Ẩn nút "Kiểm tra lại"

#### Scenario: User clicks retry button
- **WHEN** người dùng nhấn nút "Kiểm tra lại" và số lần thử < 3
- **THEN** hệ thống tiếp tục polling với số lần đã tăng thêm 1

#### Scenario: User clicks retry after max retries
- **WHEN** người dùng nhấn nút "Kiểm tra lại" sau khi đã thử 3 lần
- **THEN** KHÔNG có hành động gì (nút đã bị ẩn)
