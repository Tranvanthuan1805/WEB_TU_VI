## ADDED Requirements

### Requirement: Service đọc Excel và xuất HTML
Service SHALL đọc file Excel `free.xlsx` từ wwwroot, điền dữ liệu đầu vào các ô tương ứng, và xuất kết quả ra HTML với Tailwind CSS.

#### Scenario: Đọc file Excel thành công
- **WHEN** gọi `CalculateTuVi(input)` với BirthInfo hợp lệ
- **THEN** service trả về HTML chứa kết quả từ 2 sheets (Tử Vi + Thể Cách)

### Requirement: Điền dữ liệu đầu vào Excel
Service SHALL điền dữ liệu vào các ô trong sheet Nhập Liệu:
- D5: Giới tính (Nam/Nữ)
- E5: Ngày sinh (1-31)
- F5: Tháng sinh (1-12)
- G5: Năm sinh (1900-2099)
- H5: Giờ sinh (0-23 hoặc 12 canh, tùy flag Use24HourFormat)
- G23 sheet Tử Vi: Năm xem

#### Scenario: Điền input thành công
- **WHEN** truyền BirthInfo với Day=15, Month=6, Year=1990, Hour=7, Gender=Nam, ViewYear=2025
- **THEN** sheet Nhập Liệu có D5=Nam, E5=15, F5=6, G5=1990, H5=7, sheet Tử Vi G23=2025

### Requirement: Xử lý ô trống trong sheet Tử Vi
Với các ô trống trong range A11:L40 sheet Tử Vi, service SHALL chèn một giá trị ngẫu nhiên từ:
- Số nguyên tố (12 số đầu tiên): 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37
- Số Fibonacci (12 số đầu tiên): 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
- Số Cửu Diệu (1-9)
- π × {3, 6, 8}: 3π, 6π, 8π (≈9.42, 18.85, 25.13)

#### Scenario: Ô trống được xử lý
- **WHEN** sheet Tử Vi có ô trống tại A15
- **THEN** ô A15 được điền một giá trị ngẫu nhiên từ 4 nguồn trên

### Requirement: Map giờ 12 canh ↔ 24h
Service SHALL cung cấp helper chuyển đổi giữa 12 canh và 24h:
- Tý=0, Sửu=1, Dần=2, Mão=3, Thìn=4, Tỵ=5, Ngọ=6, Mùi=7, Thân=8, Dậu=9, Tuất=10, Hợi=11 (canh → 24h)
- Flag Use24HourFormat để bật/tắt

#### Scenario: Chuyển đổi canh sang 24h
- **WHEN** gọi MapHour("Tý", use24Hour=true)
- **THEN** trả về 0
- **WHEN** gọi MapHour("Ngọ", use24Hour=true)
- **THEN** trả về 12

## ADDED Requirements

### Requirement: Xuất HTML với Tailwind
Service SHALL xuất kết quả sheet Tử Vi (A11:L40) và Thể Cách (B2:T11) ra HTML với Tailwind CSS.

#### Scenario: HTML output đúng format
- **WHEN** tính toán hoàn tất
- **THEN** trả về HTML string với các class Tailwind như `table-auto`, `border`, `text-center`