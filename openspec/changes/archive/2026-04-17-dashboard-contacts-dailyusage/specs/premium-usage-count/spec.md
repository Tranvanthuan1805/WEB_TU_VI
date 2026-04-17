## ADDED Requirements

### Requirement: PremiumUsageCount được lưu trữ
Hệ thống SHALL lưu trữ PremiumUsageCount trong DailyUsageStats model.

#### Scenario: Lưu PremiumUsageCount
- **WHEN** user sử dụng premium feature
- **THEN** PremiumUsageCount được tăng lên 1

### Requirement: PremiumUsageCount column tồn tại trong database
Database SHALL có column PremiumUsageCount trong table DailyUsageStats.

#### Scenario: Column tồn tại
- **WHEN** migration được apply
- **THEN** column PremiumUsageCount tồn tại trong database