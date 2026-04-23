## 1. Setup

- [x] 1.1 Thêm package ClosedXML vào Web.csproj (kiểm tra đã có chưa)

## 2. TuViExcelService

- [x] 2.1 Tạo Services/TuViExcelService.cs với constructor đọc file Excel
- [x] 2.2 Implement method CalculateTuVi(BirthInfo) - điền input vào Excel
- [x] 2.3 Implement helper MapHour - 12 canh ↔ 24h với flag Use24HourFormat
- [x] 2.4 Implement xử lý ô trống sheet Tử Vi (A11:L40) với prime/Fibonacci/Cửu Diệu/π×{3,6,8}
- [x] 2.5 Implement xuất HTML với Tailwind từ 2 sheets

## 3. Cập nhật Form Home.razor

- [x] 3.1 Tách ngày sinh thành 3 ô (Day/Month/Year inputs)
- [x] 3.2 Thêm slider giờ sinh (0-23) đồng bộ với select dropdown
- [x] 3.3 Thêm input năm xem (mặc định = năm hiện tại)
- [x] 3.4 Thêm hint free usage "Xem miễn phí: X/Y lượt/ngày" (-1 = ∞)

## 4. Xử lý Logic Usage

- [x] 4.1 Update HandleSubmit: Premium ticket valid → Delay 1s → Full Excel → PremiumUsageCount++
- [x] 4.2 Update HandleSubmit: Free còn lượt → Excel + Hint + Link /san-pham + FreeUsageCount++
- [x] 4.3 Update HandleSubmit: Free hết lượt → Hint "Đã hết lượt. Mua vé?" + Link /san-pham

## 5. Verify

- [x] 5.1 Build và kiểm tra không có lỗi
- [ ] 5.2 Test flow: free → hiển thị hint + link
- [ ] 5.3 Test flow: ticket valid → full data
- [ ] 5.4 Test flow: hết lượt → hint + link