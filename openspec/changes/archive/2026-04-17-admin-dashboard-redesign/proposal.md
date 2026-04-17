## Why

Trang Dashboard admin hiện tại hiển thị dữ liệu mẫu hardcoded, không phản ánh thực tế hoạt động của hệ thống. Cần kết nối dữ liệu thật từ database để quản trị viên theo dõi metrics quan trọng.

## What Changes

- Thay thế data mẫu bằng dữ liệu thật từ database (Orders, DailyUsageStats)
- 4 stat cards hiển thị: Total Orders, Doanh thu, Unique Users, Active Sessions
- Thêm chart hiển thị daily orders và revenue trong 30 ngày
- Giữ nguyên layout và UI hiện tại

## Capabilities

### New Capabilities

- `dashboard-data-connection`: Kết nối dữ liệu thật vào dashboard admin - truy vấn Orders và DailyUsageStats để hiển thị metrics

### Modified Capabilities

- (none)

## Impact

- `Web/Web/Components/Pages/Admin/Dashboard.razor` - thay đổi data loading và hiển thị
- Models: `Order`, `DailyUsageStats` - truy vấn data
- Không thay đổi API, không thêm dependencies mới