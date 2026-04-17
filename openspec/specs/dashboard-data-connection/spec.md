# dashboard-data-connection Specification

## Purpose
TBD - created by archiving change admin-dashboard-redesign. Update Purpose after archive.
## Requirements
### Requirement: Dashboard hiển thị tổng số Orders trong 30 ngày
Dashboard SHALL hiển thị tổng số orders được tạo trong 30 ngày gần nhất từ database.

#### Scenario: Hiển thị tổng orders
- **WHEN** trang Dashboard được tải
- **THEN** hiển thị số lượng orders từ `Orders.Where(o => o.DateCreated >= DateTime.Now.AddDays(-30))`

### Requirement: Dashboard hiển thị doanh thu từ Orders đã thanh toán
Dashboard SHALL hiển thị tổng doanh thu từ các orders có Status = Paid trong 30 ngày.

#### Scenario: Hiển thị doanh thu
- **WHEN** trang Dashboard được tải
- **THEN** hiển thị tổng tiền từ `Orders.Where(o => o.Status == OrderStatus.Paid && o.DateCreated >= DateTime.Now.AddDays(-30)).Sum(o => o.TotalAmount)`

### Requirement: Dashboard hiển thị số Unique Users
Dashboard SHALL hiển thị số lượng unique users từ DailyUsageStats trong 30 ngày.

#### Scenario: Hiển thị unique users
- **WHEN** trang Dashboard được tải
- **THEN** hiển thị số lượng distinct AnonymousId từ `DailyUsageStats.Where(d => d.Date >= DateOnly.FromDateTime(DateTime.Now.AddDays(-30)))`

### Requirement: Dashboard hiển thị Active Sessions
Dashboard SHALL hiển thị số lượng active sessions (unique users trong 24h qua).

#### Scenario: Hiển thị active sessions
- **WHEN** trang Dashboard được tải
- **THEN** hiển thị số lượng distinct AnonymousId từ `DailyUsageStats.Where(d => d.LastUsedAt >= DateTime.Now.AddHours(-24))`

### Requirement: Dashboard hiển thị chart daily metrics
Dashboard SHALL hiển thị chart với daily orders và revenue trong 30 ngày.

#### Scenario: Hiển thị chart
- **WHEN** trang Dashboard được tải
- **THEN** chart hiển thị data points cho 30 ngày gần nhất với orders count và revenue mỗi ngày

