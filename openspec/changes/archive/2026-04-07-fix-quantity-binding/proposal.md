## Why

Trang quản lý sản phẩm và vé (`ProductManager.razor`, `TicketManager.razor`) có input Quantity nhưng **không tự động cập nhật** trạng thái `Published` khi người dùng thay đổi Quantity. Checkbox "Xuất bản" chỉ bị disable khi `IsAvailable = false`, nhưng khi tăng Quantity lên để sản phẩm có hàng trở lại, checkbox không được cập nhật theo.

## What Changes

- Thêm `@bind-Value:after` handler vào `InputNumber Quantity` trong cả `ProductManager.razor` và `TicketManager.razor`
- Tạo method `OnQuantityChanged()` để re-trigger UI update khi Quantity thay đổi

## Capabilities

### New Capabilities

- `quantity-binding-fix`: Cập nhật IsAvailable/Published UI khi thay đổi Quantity trong form edit

### Modified Capabilities

(Không có thay đổi về spec-level behavior - chỉ là fix UI binding)

## Impact

- `ProductManager.razor`: Dòng 259, thêm @bind-Value:after
- `TicketManager.razor`: Dòng 225, thêm @bind-Value:after