## Why

Trang VnpayReturn hiện tại thiếu giới hạn số lần polling và không hiển thị chi tiết hóa đơn đầy đủ. Khi thanh toán thành công, người dùng chỉ thấy mã vé mà không có thông tin đơn hàng. Cần cải thiện UX để người dùng dễ dàng xem lại thông tin mua hàng.

## What Changes

- Thêm giới hạn polling tối đa 3 lần (60s / 20s mỗi lần)
- Sau 3 lần không tìm thấy order: hiển thị message lỗi, ẩn nút "Kiểm tra lại"
- Khi thanh toán thành công: hiển thị mã vé (phần trên) + chi tiết hóa đơn (phần dưới)
- Các trạng thái khác (PaymentFailed, Expired, Cancelled, Timeout): chỉ hiển thị chi tiết hóa đơn

## Capabilities

### New Capabilities

- `polling-retry-limit`: Giới hạn số lần kiểm tra payment và xử lý khi vượt giới hạn
- `payment-invoice-details`: Hiển thị chi tiết hóa đơn bao gồm thông tin đơn hàng, sản phẩm, trạng thái

### Modified Capabilities

- (không có thay đổi spec hiện tại)

## Impact

- File: `Web/Web/Components/Pages/User/VnpayReturn.razor`
- API: `OrderService.GetOrderStatusAsync` (đã có, không cần thay đổi)
- UI: Thêm phần hiển thị chi tiết hóa đơn
