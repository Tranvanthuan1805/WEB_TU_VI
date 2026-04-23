## ADDED Requirements

### Requirement: Tách ngày sinh thành 3 ô
Form SHALL có 3 ô riêng cho Ngày, Tháng, Năm sinh thay vì 1 ô datepicker.

#### Scenario: 3 ô nhập liệu
- **WHEN** user nhập ngày sinh
- **THEN** có 3 input: Day (1-31), Month (1-12), Year (1900-2099)

### Requirement: Slider giờ sinh đồng bộ với select
Form SHALL có slider (0-23) và select dropdown cho giờ sinh, có flag Use24HourFormat.

#### Scenario: Slider và select đồng bộ
- **WHEN** user kéo slider đến 7
- **THEN** select dropdown chọn "Mão (05h - 07h)"
- **WHEN** user chọn "Ngọ (11h - 13h)"
- **THEN** slider chọn 12

### Requirement: Input năm xem
Form SHALL có ô nhập năm xem (mặc định = năm hiện tại).

#### Scenario: Năm xem mặc định
- **WHEN** form load
- **THEN** năm xem = năm hiện tại (2026)

### Requirement: Input năm xem có thể nhập
- **WHEN** user thay đổi năm xem
- **THEN** giá trị được lưu và gửi sang Excel (sheet Tử Vi G23)