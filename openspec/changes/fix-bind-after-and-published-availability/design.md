## Context

Hiện tại ProductManager.razor dùng `@oninput` kết hợp `@bind-Value` cho các trường giá. Pattern này gây issue vì `@oninput` fires trước khi bind hoàn tất. Ngoài ra, chưa có logic kiểm tra available để disable Published khi hết hàng/hết lượt.

## Goals / Non-Goals

**Goals:**
- Chuyển `@oninput` → `@bind:after` để đảm bảo handler nhận đúng giá trị
- Thêm helper methods để kiểm tra availability cho Product và Ticket
- Disable Published checkbox khi hết hàng/hết lượt
- Hiển thị hint text tương ứng khi disabled

**Non-Goals:**
- Không thay đổi logic tính giá/giảm giá
- Không thay đổi database schema

## Decisions

### 1. @oninput vs @bind:after

**Decision**: Dùng `@bind:after` thay vì `@oninput`

**Rationale**: `@bind:after` fires sau khi bind hoàn tất, đảm bảo giá trị đã được gán vào model. Handler cần đổi signature — không cần `ChangeEventArgs` vì giá trị đã bind trực tiếp.

**Alternatives**:
- Giữ `@oninput` và parse giá trị từ event → Rủi ro giá trị chưa được bind
- Dùng `@onchange` → Tương tự `@oninput` trong Blazor

### 2. Availability Check Logic

**Decision**: Tách thành helper methods riêng biệt

```csharp
// Product
IsProductAvailable(Product p) => p.Quantity < 0 || p.QuantitySold < p.Quantity

// Ticket
IsTicketAvailable(Ticket t) => t.QuantityUsed < t.Quantity
```

**Rationale**: Tách logic giúp tái sử dụng ở nhiều nơi (UpdateCounts, form UI, filter).

### 3. Disabled Behavior

**Decision**: Disable checkbox + hiển thị hint, KHÔNG auto-reset giá trị

**Rationale**: Nếu hết hàng thì không cho phép bật Published lên, nhưng giữ nguyên giá trị để có thể restore khi cập nhật số lượng.

## Risks / Trade-offs

| Risk | Mitigation |
|------|-------------|
| Handler không có ChangeEventArgs | Đổi method signature từ `(ChangeEventArgs e)` → `()` |
| Available check cho product mới tạo | Product mới có QuantitySold = 0, luôn available |
| Ticket mới tạo | Ticket mới có QuantityUsed = 0, luôn available |