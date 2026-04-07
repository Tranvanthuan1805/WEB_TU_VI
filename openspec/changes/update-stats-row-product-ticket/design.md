## Context

Hiện tại ProductManager.razor và TicketManager.razor có stats row hiển thị 3 trạng thái:
- **ProductManager**: Đã xuất bản, Hết hàng, Tổng số
- **TicketManager**: Đang hoạt động, Hết lượt, Tổng số

Tuy nhiên logic đếm đang sử dụng `IsAvailable` thay vì `Published`, dẫn đến số liệu không khớp với hiển thị trong bảng (cột Trạng thái). Đồng thời thiếu trạng thái trung gian "Nháp" / "Không hoạt động".

## Goals / Non-Goals

**Goals:**
- Cập nhật stats row thành 4 cột (thêm trạng thái trung gian)
- Sửa logic đếm để khớp với hiển thị trong bảng
- Không thay đổi cấu trúc dữ liệu hay API

**Non-Goals:**
- Không thay đổi logic lọc/filter trong bảng
- Không thay đổi chức năng CRUD

## Decisions

1. **Sử dụng 4 cột thay vì 3 cột**: Thêm trạng thái trung gian (Nháp/Không hoạt động) để phản ánh đầy đủ các trạng thái của dữ liệu.

2. **Logic đếm theo `Published` thay vì `IsAvailable`**: 
   - `Published` = item được xuất bản và còn hàng/lượt
   - `!Published && IsAvailable` = item chưa xuất bản nhưng còn hàng/lượt (trạng thái Nháp/Không hoạt động)
   - `Quantity > 0 && QuantitySold >= Quantity` = item đã hết hàng/lượt

3. **CSS Grid 4 cột**: Cập nhật `grid-template-columns: repeat(4, 1fr)` để hiển thị đều 4 cột.

## Risks / Trade-offs

- [Low Risk] Thay đổi nhỏ, chỉ ảnh hưởng đến hiển thị stats row
- [No Migration] Không cần migration vì chỉ thay đổi logic đếm và UI
- [Rollback] Có thể rollback dễ dàng bằng cách revert các thay đổi trong 2 file .razor

## Open Questions

- (không có - kế hoạch đã rõ ràng)