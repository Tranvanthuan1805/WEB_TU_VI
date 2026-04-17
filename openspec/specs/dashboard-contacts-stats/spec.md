# dashboard-contacts-stats Specification

## Purpose
TBD - created by archiving change dashboard-contacts-dailyusage. Update Purpose after archive.
## Requirements
### Requirement: Dashboard hiển thị Total Contacts trong 30 ngày
Dashboard SHALL hiển thị tổng số contacts được tạo trong 30 ngày gần nhất.

#### Scenario: Hiển thị total contacts
- **WHEN** trang Dashboard được tải
- **THEN** hiển thị số lượng contacts từ `Contacts.Where(c => c.DateCreated >= DateTime.Now.AddDays(-30))`

### Requirement: Dashboard hiển thị New Contacts trong 24 giờ
Dashboard SHALL hiển thị số contacts được tạo trong 24 giờ gần nhất.

#### Scenario: Hiển thị new contacts
- **WHEN** trang Dashboard được tải
- **THEN** hiển thị số lượng contacts từ `Contacts.Where(c => c.DateCreated >= DateTime.Now.AddHours(-24))`

