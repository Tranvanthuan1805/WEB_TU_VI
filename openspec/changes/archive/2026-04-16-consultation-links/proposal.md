## Why

Người dùng cần liên hệ tư vấn qua Facebook hoặc Zalo nhưng hiện tại chưa có mục nào trên trang chủ. Việc thêm liên kết vào sidebar sẽ giúp người dùng dễ dàng tiếp cận kênh tư vấn chuyên sâu.

## What Changes

- Thêm section "Liên hệ tư vấn" vào left sidebar của MainLayout
- Thêm form cấu hình trong Admin Config để quản lý link Facebook và Zalo
- Mỗi link có checkbox bật/tắt riêng để hiển thị hoặc ẩn
- Lưu cấu hình vào config.json (theo pattern existing của GoogleAdSense)

## Capabilities

### New Capabilities
- `consultation-links`: Thêm link Facebook/Zalo vào sidebar với cấu hình admin

### Modified Capabilities
- Không có

## Impact

- Sửa: `Web/Web/Components/Layout/MainLayout.razor` - thêm section hiển thị
- Sửa: `Web/Web/Components/Pages/Admin/Config.razor` - thêm form cấu hình
- Sửa: `Web/Web/appsettings.json` - thêm default config