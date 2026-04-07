## Why

Stats row hiện tại trong ProductManager và TicketManager chưa phản ánh đúng trạng thái thực tế của dữ liệu. Số liệu "Đã xuất bản" / "Đang hoạt động" đang hiển thị `IsAvailable` thay vì `Published`, dẫn đến không khớp với logic hiển thị trong bảng. Đồng thời thiếu trạng thái "Nháp" / "Không hoạt động".

## What Changes

- **ProductManager.razor**: Cập nhật stats row từ 3 cột (Đã xuất bản, Hết hàng, Tổng số) thành 4 cột (Đã xuất bản, Nháp, Hết hàng, Tổng số)
- **TicketManager.razor**: Cập nhật stats row từ 3 cột (Đang hoạt động, Hết lượt, Tổng số) thành 4 cột (Đang hoạt động, Không hoạt động, Hết lượt, Tổng số)
- Sửa logic đếm `_publishedCount` / `_activeCount` từ `IsAvailable` thành `Published`
- Thêm biến `_draftCount` / `_inactiveCount` để đếm các item không được publish nhưng còn available

## Capabilities

### New Capabilities
- `admin-stats-row-update`: Cập nhật hiển thị stats row cho trang quản lý sản phẩm và vé

### Modified Capabilities
- (không có - đây là thay đổi UI không ảnh hưởng đến spec hiện tại)

## Impact

- `Web/Web/Components/Pages/Admin/ProductManager.razor`: Cập nhật HTML stats-row, biến đếm, và logic UpdateCounts()
- `Web/Web/Components/Pages/Admin/TicketManager.razor`: Cập nhật HTML stats-row, biến đếm, và logic UpdateCounts()