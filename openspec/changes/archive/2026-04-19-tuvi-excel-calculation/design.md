## Context

Hiện tại Home.razor chỉ mock kết quả tử vi cơ bản (Cung Mệnh, Cung Xung, Vận Hạn). File Excel `free.xlsx` chứa engine tính toán tử vi với 2 sheets:
- **Nhập Liệu**: D5 (giới tính), E5-H5 (ngày/tháng/năm/giờ sinh), G23 (năm xem)
- **Tử Vi**: A11:L40 chứa kết quả, có ô trống cần xử lý
- **Thể Cách**: B2:T11 chứa thông tin thể cách

DailyUsageStats đã có FreeUsageCount và PremiumUsageCount được track trong DB.

## Goals / Non-Goals

**Goals:**
- Tạo TuViExcelService đọc Excel và xuất HTML với Tailwind
- Cập nhật form Home.razor: 3 ô ngày sinh, slider giờ (0-23) + select, năm xem
- Logic usage: free limit (-1 = vô hạn) vs premium ticket
- Xử lý ô trống sheet Tử Vi với prime/Fibonacci/Cửu Diệu/π×{3,6,8}

**Non-Goals:**
- Không tạo service riêng cho usage (logic trong Home.razor)
- Không tạo API endpoint mới (Blazor server-side)
- Không xử lý cache Excel (mỗi lần đọc lại)

## Decisions

1. **Service location**: `Services/TuViExcelService.cs` - dùng singleton với scoped DbFactory

2. **12 canh ↔ 24h mapping**: Helper class có flag `Use24HourFormat` (true = Excel dùng 24h, false = dùng 12 canh)

3. **Ô trống excel**: Random chọn 1 trong 4: prime(12 số đầu), fibonacci(12 số đầu), cửu diệu, π×{3,6,8}

4. **HTML output**: Build string với inline Tailwind classes

5. **Delay premium**: 1000ms (giảm từ 10000ms để UX tốt hơn)

## Risks / Trade-offs

- [Risk] Excel file lock khi đọc → [Mitigation] Dùng using disposal đúng cách
- [Risk] Ô trống xử lý không đồng đều → [Mitigation] Random cân bằng
- [Risk] Config FreeUsageLimit thay đổi → [Mitigation] Đọc từ IConfiguration mỗi lần

## Open Questions

- Cần xác nhận cấu trúc Excel có đúng như mô tả không trước khi code