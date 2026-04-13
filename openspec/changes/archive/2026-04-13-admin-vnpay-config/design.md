## Context

- **Current state**: VNPay config lưu trong `appsettings.json` (VnPay section)
- **Yêu cầu**: Cho phép admin chỉnh sửa config từ web, không cần deploy lại
- **Constraint**: App chạy trên server, cần quyền ghi file `config.json`

## Goals / Non-Goals

**Goals:**
- Tạo form quản lý VNPay config trong Admin > Config page
- Lưu config riêng vào `config.json`, không sửa `appsettings.json`
- Đọc config: ưu tiên config.json nếu có, không thì fallback appsettings.json
- Auto-append path `/api/payments/vnpay/return` và `/api/payments/vnpay/ipn` từ domain input

**Non-Goals:**
- Không tạo API public cho VNPay config
- Không tích hợp database cho config (giữ file-based)
- Không tự động deploy config.json (admin tự quản lý)

## Decisions

| Decision | Rationale |
|----------|----------|
| File `config.json` tách riêng | Tránh bị ghi đè khi deploy app, dễ quản lý riêng |
| Domain input thay vì 2 URL fields | Giảm input lỗi, đảm bảo consistency giữa return/ipn |
| Reset về appsettings default | Người dùng có thể khôi phục nhanh |
| Không đổi VnpayService | IConfiguration đọc từ config.json (override appsettings) - không cần code change |

## Risks / Trade-offs

- **Risk**: Server không có quyền ghi `config.json` → **Mitigation**: Thêm check và hiển thị lỗi rõ ràng, yêu cầu chmod
- **Risk**: Format JSON lỗi khi ghi → **Mitigation**: Dùng `System.Text.Json` serialize an toàn, backup trước khi ghi
- **Trade-off**: File-based config không sync được multi-instance → Đơn giản, phù hợp use case hiện tại