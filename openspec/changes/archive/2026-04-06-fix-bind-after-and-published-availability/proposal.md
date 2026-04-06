## Why

Sử dụng `@oninput` kết hợp với `@bind-Value` gây conflict vì `@oninput` fires trước khi bind hoàn tất, dẫn đến giá trị chưa được cập nhật. Cần chuyển sang `@bind:after` để đảm bảo handler nhận đúng giá trị đã bind. Ngoài ra, cần bổ sung logic kiểm tra available cho Product và Ticket để vô hiệu hóa checkbox Published khi hết hàng/hết lượt.

## What Changes

- **ProductManager.razor**: Chuyển `@oninput` → `@bind:after` cho OriginPrice, Price, Discount. Thêm helper `IsProductAvailable()`. Disable Published checkbox khi hết hàng, hiển thị hint tương ứng.
- **TicketManager.razor**: Thêm helper `IsTicketAvailable()`. Disable Published checkbox khi hết lượt, hiển thị hint tương ứng.
- **UpdateCounts()**: Cập nhật để dùng helper available thay vì trường Published trực tiếp.

## Capabilities

### New Capabilities
- `bind-after-migration`: Chuyển đổi từ @oninput sang @bind:after cho price/discount inputs.
- `product-availability-check`: Tính toán Product có sẵn (còn hàng) hay không, vô hiệu hóa Published khi hết hàng.
- `ticket-availability-check`: Tính toán Ticket có sẵn (còn lượt) hay không, vô hiệu hóa Published khi hết lượt.

### Modified Capabilities
- `ticket-quantity-ui`: Bổ sung disable logic cho Published checkbox khi hết lượt.

## Impact

- `Web/Web/Components/Pages/Admin/ProductManager.razor` — Sửa @oninput → @bind:after, thêm availability check.
- `Web/Web/Components/Pages/Admin/TicketManager.razor` — Thêm availability check, disable Published.