## Why

Ticket model đã đặt `Quantity` mặc định là 1 với `[Range(1, int.MaxValue)]` nhưng UI (TicketManager.razor) vẫn xử lý giá trị -1 cho "vô hạn", gây mâu thuẫn giữa model và giao diện. Ngoài ra, Seeder chỉ mới seed dữ liệu cho Post, chưa có seed data cho Product và Ticket để phục vụ phát triển và kiểm thử.

## What Changes

- **Sửa TicketManager.razor**: Loại bỏ logic xử lý giá trị -1 cho Quantity, thay bằng hiển thị số lượng bình thường. Cập nhật placeholder, hint text và kiểm tra unsaved changes.
- **Thêm SeedProductsAsync() và DeleteSeedProductsAsync()**: Seed 30 sản phẩm mẫu với giá gốc, giảm giá, số lượng thực tế.
- **Thêm SeedTicketsAsync() và DeleteSeedTicketsAsync()**: Seed 50 tickets mẫu với mã tự động tạo, số lượng và số lượng đã sử dụng.

## Capabilities

### New Capabilities
- `ticket-quantity-model`: Ticket không hỗ trợ số lượng vô hạn (-1), mặc định là 1.
- `ticket-quantity-ui`: UI hiển thị và nhập số lượng ticket bình thường, không có khái niệm vô hạn.
- `product-seeder`: Seeder tạo/xóa dữ liệu mẫu cho Product.
- `ticket-seeder`: Seeder tạo/xóa dữ liệu mẫu cho Ticket.

### Modified Capabilities
<!-- No existing specs need modification at the requirement level -->

## Impact

- `Web/Web/Models/Ticket.cs` — Không cần sửa (đã đúng).
- `Web/Web/Components/Pages/Admin/TicketManager.razor` — Sửa logic hiển thị và hint text.
- `Web/Web/Data/Seeder.cs` — Thêm 4 method mới cho Product và Ticket seeding.
