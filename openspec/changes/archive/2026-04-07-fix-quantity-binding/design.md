## Context

Trang admin ProductManager và TicketManager dùng Blazor `InputNumber` để nhập Quantity. Khi user thay đổi Quantity, UI không re-render để cập nhật trạng thái checkbox Published.

**Current state:**
- `Product.IsAvailable` = `Quantity < 0 || QuantitySold < Quantity`
- `Ticket.IsAvailable` = `QuantityUsed < Quantity`
- `Published` getter = `_published && IsAvailable`

## Goals / Non-Goals

**Goals:**
- Thêm handler để UI tự re-render khi Quantity thay đổi
- Không thay đổi logic nghiệp vụ

**Non-Goals:**
- Không tự động bật Published khi IsAvailable = true (vì getter đã handle đúng)

## Decisions

**D1: Dùng `@bind-Value:after` thay vì `@onchange`**

- Blazor cung cấp `@bind-Value:after` event callback chạy SAau khi bound value thay đổi
- Không cần manual event handling với ValueChanged

**D2: Method OnQuantityChanged() chỉ gọi StateHasChanged**

- Không cần reset Published = false vì getter đã tự động return false khi IsAvailable = false
- Chỉ cần trigger re-render để UI cập nhật disabled state của checkbox

## Risks / Trade-offs

- **Risk**: Nếu có logic phụ thuộc vào việc re-render → test sau khi deploy
- **Trade-off**: Đơn giản, ít code thay đổi