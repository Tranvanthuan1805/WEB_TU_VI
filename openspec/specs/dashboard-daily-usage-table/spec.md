# dashboard-daily-usage-table Specification

## Purpose
TBD - created by archiving change dashboard-contacts-dailyusage. Update Purpose after archive.
## Requirements
### Requirement: Dashboard hiển thị DailyUsageStats table
Dashboard SHALL hiển thị table chứa DailyUsageStats với pagination.

#### Scenario: Hiển thị table
- **WHEN** trang Dashboard được tải
- **THEN** hiển thị table với columns: Date, AnonymousId, FreeUsageCount, PremiumUsageCount, LastUsedAt

### Requirement: Table có pagination
Table SHALL có phân trang 10 records mỗi trang.

#### Scenario: Pagination hoạt động
- **WHEN** user click next page
- **THEN** hiển thị 10 records tiếp theo

### Requirement: PremiumUsageCount được hiển thị
Table SHALL hiển thị cột PremiumUsageCount cho mỗi row.

#### Scenario: Hiển thị PremiumUsageCount
- **WHEN** table được render
- **THEN** cột PremiumUsageCount hiển thị giá trị từ model

