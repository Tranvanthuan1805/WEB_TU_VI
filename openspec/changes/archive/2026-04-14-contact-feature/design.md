## Context

Dự án là .NET 10 Blazor Server + WebAssembly hybrid app với PostgreSQL. User muốn thêm chức năng liên hệ:
- User pages: trang `/liên-hệ` với form
- Admin: quản lý liên hệ tại `/admin/contacts`

## Goals / Non-Goals

**Goals:**
- Tạo trang liên hệ cho user với form gồm: loại (góp ý/báo lỗi), nội dung, email
- Validation: required cho nội dung + email đúng format
- Redirect về trang chủ sau khi gửi thành công
- Admin quản lý liên hệ với 4 trạng thái: Mới, Đã đọc, Đã xử lý, Bỏ qua

**Non-Goals:**
- Không có API endpoint riêng - xử lý trực tiếp trong Blazor
- Không tạo mới contact từ admin - chỉ xem và đổi trạng thái

## Decisions

1. **Xử lý submit trực tiếp trong Blazor thay vì API riêng**
   - Đơn giản hơn, phù hợp với pattern hiện tại của project
   - Không cần tạo thêm controller

2. **Dùng lại template từ OrderManager cho Admin ContactManager**
   - Giữ pagination, search, filter, modal, stats
   - Thay đổi columns, status enums, stats hiển thị

3. **Redirect về trang chủ sau khi gửi thành công**
   - UX tốt hơn so với chỉ hiện toast

## Risks / Trade-offs

- [Risk] Validation phía client cơ bản → Mitigation: Dùng HTML5 validation + Blazor validation
- [Risk] Cần tạo migration cho DB → Mitigation: Dùng EF Core migrations