## Why

Hiện tại lá số tử vi chỉ hiển thị mock data cơ bản (Cung Mệnh, Cung Xung, Vận Hạn). Cần tích hợp engine tính toán tử vi từ Excel để cho ra kết quả đầy đủ và chính xác hơn, đồng thời tích hợp hệ thống giới hạn usage cho cả free và premium.

## What Changes

- Thêm service đọc và xử lý file Excel (`TuViExcelService`)
- Cập nhật form Home.razor: tách ngày sinh thành 3 ô, thêm slider giờ sinh, thêm input năm xem
- Xử lý logic usage: free limit vs premium ticket
- Hiển thị kết quả từ Excel ra HTML với Tailwind CSS
- Xử lý ô trống trong sheet Tử Vi với số prime/Fibonacci/Cửu Diệu/π×{3,6,8}

## Capabilities

### New Capabilities
- `tuvi-excel-engine`: Service đọc file Excel, điền input, lấy output về HTML
- `tuvi-free-usage`: Giới hạn usage miễn phí theo config (-1 = vô hạn)
- `tuvi-premium-usage`: Đếm usage premium qua ticket
- `tuvi-form-update`: Cập nhật form nhập liệu (3 ô ngày, slider giờ, năm xem)

### Modified Capabilities
- `free-usage-tracking`: Mở rộng để hiển thị hintfree thay vì chỉ tracking

## Impact

- Thêm package ClosedXML vào Web.csproj
- Tạo service Services/TuViExcelService.cs
- Cập nhật Components/Pages/User/Home.razor
- Sử dụng DailyUsageStats.FREEUSAGECOUNT và PREMIUMUSAGECOUNT