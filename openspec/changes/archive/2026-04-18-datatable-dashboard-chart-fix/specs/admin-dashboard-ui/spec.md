## ADDED Requirements

### Requirement: Dashboard table hiển thị với styling nhất quán
Dashboard SHALL sử dụng data table component với styling giống PostManager page.

#### Scenario: Table styling
- **WHEN** Dashboard page được tải với Daily Usage Stats data
- **THEN** table hiển thị với các style: rounded corners, hover effects, proper padding, consistent fonts

### Requirement: Dashboard chart renders sau khi data loaded
Chart.js chart SHALL được khởi tạo sau khi data đã được load từ database.

#### Scenario: Chart hiển thị sau khi render
- **WHEN** Dashboard page được tải và data đã có trong chartData
- **THEN** chart canvas hiển thị bar chart với orders và revenue data

#### Scenario: Chart không hiển thị khi không có data
- **WHEN** Dashboard được tải nhưng không có order data trong 30 ngày
- **THEN** hiển thị "Không có dữ liệu" message thay vì empty chart canvas

## MODIFIED Requirements

### Requirement: Dashboard hiển thị chart daily metrics
(The existing requirement is being clarified)

Dashboard SHALL hiển thị chart với daily orders và revenue trong 30 ngày VÀ chart phải được khởi tạo SAU KHI data được load.

#### Scenario: Hiển thị chart
- **WHEN** trang Dashboard được tải và OnInitializedAsync hoàn thành
- **THEN** chart hiển thị data points cho 30 ngày gần nhất với orders count và revenue mỗi ngày