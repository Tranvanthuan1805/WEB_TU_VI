## Why

Blazor Server page `VnpayReturn.razor` đang gọi HTTP API (`api/payment/orders/status`) thay vì gọi service trực tiếp (`OrderService.GetOrderStatusAsync`), gây overhead không cần thiết. Thêm vào đó, `VnpayIpn` không xử lý response code "11" (hết hạn) → gọi nhầm `MarkFailedAsync` thay vì `MarkExpiredAsync`.

## What Changes

- **PaymentController.cs**: Thêm xử lý response code "11" → gọi `MarkExpiredAsync` thay vì `MarkFailedAsync`
- **VnpayReturn.razor**: 
  - Thay HTTP client bằng direct service call (`OrderService.GetOrderStatusAsync`)
  - Thêm hiển thị elapsed time trong UI khi đang chờ thanh toán

## Capabilities

### Modified Capabilities
- `vnpay-payment`: Sửa logic xử lý expiration và polling trong VnpayIpn và VnpayReturn

## Impact

- `Web/Controllers/PaymentController.cs` - VnpayIpn method
- `Web/Components/Pages/User/VnpayReturn.razor` - polling logic