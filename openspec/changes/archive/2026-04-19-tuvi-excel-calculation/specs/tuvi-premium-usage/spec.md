## ADDED Requirements

### Requirement: Validate ticket và tính premium usage
Khi user nhập mã vé hợp lệ, hệ thống SHALL:
- Validate ticket trong database
- Tăng DailyUsageStats.PremiumUsageCount sau khi tính

#### Scenario: Ticket hợp lệ
- **WHEN** user nhập ticket code và ticket.IsAvailable = true
- **THEN** ticket.QuantityUsed += 1 và cho phép xem full

#### Scenario: Ticket không hợp lệ
- **WHEN** user nhập ticket không tồn tại hoặc đã dùng
- **THEN** coi như free usage

### Requirement: Premium hiển thị full data
User premium SHALL thấy đầy đủ kết quả từ Excel (không bị ẩn phần nào).

#### Scenario: Premium xem lá số
- **WHEN** ticket valid
- **THEN** hiển thị full HTML từ Excel + premium hint