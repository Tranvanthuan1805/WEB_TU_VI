## Why

Dashboard hiện tại hiển thị Active Sessions (từ DailyUsageStats) và Recent Activity (data mẫu). Cần cập nhật để hiển thị dữ liệu Contact thực tế và thêm DailyUsageStats table để theo dõi usage stats.

## What Changes

- Thêm PremiumUsageCount vào DailyUsageStats model + migration
- Stat card "Active Sessions" → "Total Contacts (30d)" và "New Contacts (24h)"
- Recent Activity → hiển thị danh sách 5 contacts mới nhất
- Thêm table DailyUsageStats với pagination vào dashboard
- Fix chart hiển thị trống (debug data)

## Capabilities

### New Capabilities

- `dashboard-contacts-stats`: Hiển thị thống kê contacts (30 ngày và 24 giờ)
- `dashboard-recent-contacts`: Hiển thị 5 contacts mới nhất
- `dashboard-daily-usage-table`: Table DailyUsageStats với pagination
- `premium-usage-count`: Thu thập và hiển thị premium usage count

### Modified Capabilities

- `dashboard-data-connection`: Mở rộng để include contacts data

## Impact

- `Web/Models/DailyUsageStats.cs` - thêm PremiumUsageCount property
- `Web/Components/Pages/Admin/Dashboard.razor` - cập nhật stats, activity, table
- EF Core migration mới
- Không thay đổi API