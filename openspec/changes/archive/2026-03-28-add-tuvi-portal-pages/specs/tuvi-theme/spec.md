## ADDED Requirements

### Requirement: Application uses yellow autumn theme
Giao diện phải sử dụng màu vàng mùa thu nhất quán.

#### Scenario: Primary color is applied to buttons
- **WHEN** nút bấm được hiển thị
- **THEN** sử dụng màu #FFB347 làm primary color

#### Scenario: Header uses theme color
- **WHEN** tiêu đề trang được hiển thị
- **THEN** sử dụng màu vàng đậm #FFA500

#### Scenario: Accent highlights use gold
- **WHEN** cần highlight hoặc badge
- **THEN** sử dụng màu #FFD700

### Requirement: Theme colors are defined as CSS variables
Màu theme phải được định nghĩa là CSS variables để dễ dàng tái sử dụng.

#### Scenario: CSS variables are defined
- **WHEN** styles được load
- **THEN** các biến CSS được định nghĩa: --tuvi-primary, --tuvi-accent, --tuvi-highlight
