## Context

- **Current state**: 
  - Order → Product: OnDelete.Restrict
  - Order → Ticket: OnDelete.SetNull (đang không nhất quán)
  - Seed delete xóa tất cả seed products/tickets không kiểm tra order tham chiếu

## Goals / Non-Goals

**Goals:**
- Nhất quán hóa OnDelete behavior cho cả Product và Ticket
- Chỉ xóa seed items khi không có order tham chiếu
- Thông báo số lượng bị skip trong toast

**Non-Goals:**
- Không tạo migration cho database (chỉ code change)
- Không xóa orders hay thay đổi logic order

## Decisions

| Decision | Rationale |
|----------|----------|
| OnDelete.Restrict cho Ticket | Nhất quán với Product, tránh xóa ticket đang có đơn |
| Kiểm tra trước khi xóa | An toàn, không gây lỗi constraint |
| Trả về số lượng skip | Giúp admin biết có bao nhiêu items còn sót |

## Risks / Trade-offs

- **Risk**: Logic phức tạp hơn, thêm query → **Mitigation**: Chỉ 2 query extra, performance acceptable
- **Trade-off**: Seed products/tickets có order sẽ không bị xóa → **Acceptable**: Admin có thể xóa thủ công nếu cần