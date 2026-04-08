## Why

Project hiện tại là site bán vé/xem lá số Tử Vi nhưng chưa có hệ thống thanh toán. Cần tích hợp VNPAY để khách hàng có thể thanh toán trực tuyến, tránh việc thanh toán thủ công qua chuyển khoản.

## What Changes

- Tạo mới Order Entity để lưu trữ đơn hàng và trạng thái thanh toán
- Tích hợp VNPAY qua VnpayService và API endpoints
- Tạo trang Checkout và trang ReturnUrl với polling
- Tạo BackgroundService dọn các Order PendingPayment bị treo quá 15 phút
- Xử lý race condition khi sản phẩm số lượng thấp

## Capabilities

### New Capabilities

- **vnpay-payment**: Tích hợp thanh toán VNPAY đầy đủ (checkout, IPN, return, cleanup)
- **order-management**: Quản lý đơn hàng với các trạng thái PendingPayment, Paid, PaymentFailed, Expired

### Modified Capabilities

- Product: Bổ sung logic trừ tồn kho khi tạo Order (trong transaction)
- Ticket: Gán ticket cho Order sau khi thanh toán thành công

## Impact

- Tạo file mới: Models/Order.cs, Services/VnpayService.cs, Services/OrderService.cs, Background/PendingPaymentCleanupService.cs, Controllers/PaymentController.cs
- Tạo page mới: Checkout.razor, VnpayReturn.razor
- Cập nhật: AppDBContext.cs (thêm DbSet<Order>), Program.cs (đăng ký services)