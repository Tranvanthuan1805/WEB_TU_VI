## ADDED Requirements

### Requirement: Giới hạn usage miễn phí theo config
Hệ thống SHALL giới hạn số lần xem lá số miễn phí theo config `FreeUsageLimit.DailyLimit`. Giá trị -1意味着 vô hạn.

#### Scenario: Config cho phép free usage
- **WHEN** FreeUsageLimit.DailyLimit = 5
- **THEN** cho phép 5 lần xem miễn phí/ngày

#### Scenario: Config vô hạn
- **WHEN** FreeUsageLimit.DailyLimit = -1
- **THEN** không giới hạn số lần

### Requirement: Hiển thị hint free usage
UI SHALL hiển thị hint "Xem miễn phí: X/Y lượt/ngày" trong đó X là số đã dùng, Y là limit (-1 = ∞).

#### Scenario: Hiển thị hint
- **WHEN** user chưa xem, limit = 5
- **THEN** hiển thị "Xem miễn phí: 0/5 lượt/ngày"

### Requirement: Cập nhật usage khi xem free
Mỗi khi user (identified by anonId) xem lá số miễn phí, hệ thống SHALL tăng DailyUsageStats.FreeUsageCount.

#### Scenario: Tăng usage count
- **WHEN** user xem lá số free lần đầu trong ngày
- **THEN** FreeUsageCount = 1