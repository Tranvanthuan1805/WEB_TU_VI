## Context

Project hiện tại là Blazor Server + WebAssembly hybrid app .NET 10 với PostgreSQL, chuyên về astrology/horoscope với sản phẩm là vé/xem lá số Tử Vi. Đã có sẵn:

- **Product Entity**: Có ProductId, Name, Price, Quantity, QuantitySold, NumberofTickets
- **Ticket Entity**: Có TicketId, Code, Quantity, QuantityUsed
- **VNPAY Config**: Đã có trong appsettings.json (TmnCode, HashSecret, PaymentUrl, ReturnUrl, IpnUrl)
- **EF Core + PostgreSQL**: Dùng DbContextFactory pattern
- **Blazor Server**: InteractiveServer render mode

Cần xây dựng hệ thống thanh toán VNPAY theo yêu cầu nghiệp vụ cụ thể từ hướng dẫn đã có.

## Goals / Non-Goals

**Goals:**
- Tích hợp thanh toán VNPAY đầy đủ: tạo payment, xử lý IPN, return URL với polling
- Quản lý Order với 4 trạng thái: PendingPayment, Paid, PaymentFailed, Expired
- Xử lý race condition khi sản phẩm số lượng thấp (còn 1 mà 2 người mua)
- Tự động dọn PendingPayment quá hạn (15 phút) để hoàn kho
- Đảm bảo idempotent: không xử lý IPN 2 lần, không tạo Ticket trùng

**Non-Goals:**
- Không dùng SignalR cho bài toán này (dùng polling)
- Không dùng workflow engine, message queue, event bus
- Không dùng CQRS, MediatR, Clean Architecture phức tạp
- Mỗi Order chỉ mua 1 đơn vị sản phẩm và sinh 1 Ticket (giữ đơn giản)

## Decisions

### 1. Kiến trúc Service Layer

**Quyết định**: Dùng 2 services riêng biệt VnpayService và OrderService thay vì gộp chung.

**Lý do**: Tách biệt rõ ràng - VnpayService xử lý logic VNPAY (tạo URL, validate signature), OrderService xử lý nghiệp vụ Order (tạo, cập nhật trạng thái, gán ticket). Dễ test và maintain hơn.

### 2. Race Condition - Pessimistic Locking

**Quyết định**: Dùng pessimistic locking (SELECT FOR UPDATE) khi tạo Order.

**Lý do**: Đảm bảo chỉ 1 người tạo được PendingPayment khi sản phẩm còn 1. Cách này an toàn hơn optimistic locking trong trường hợp số lượng thấp và nhiều request gần như đồng thời.

**Alternative considered**: Optimistic locking với concurrency token - phù hợp khi số lượng cao nhưng rủi ro cao khi số lượng thấp.

### 3. ReturnUrl với Polling

**Quyết định**: ReturnUrl chỉ hiển thị trạng thái và polling API mỗi 2 giây.

**Lý do**: Theo yêu cầu - không cập nhật DB ở ReturnUrl, không phát vé chỉ dựa trên browser redirect. Polling là cách đơn giản nhất để check trạng thái Order trong DB.

**Alternative considered**: SignalR - phức tạp hơn, cần thêm infrastructure, không cần thiết cho use case này.

### 4. BackgroundService cho Cleanup

**Quyết định**: Tạo PendingPaymentCleanupService chạy định kỳ mỗi 5 phút.

**Lý do**: Vì hệ thống trừ tồn kho ngay khi tạo PendingPayment, cần cơ chế dọn các order bị treo để tránh kẹt hàng. BackgroundService đơn giản, chạy trong chính app, không cần external dependency.

### 5. Idempotent IPN

**Quyết định**: IPN kiểm tra trạng thái hiện tại trước khi xử lý.

**Lý do**: Tránh xử lý 2 lần - nếu Order đã Paid hoặc PaymentFailed thì return ngay. Nếu đã Expired thì không chuyển sang Paid.

### 6. Transaction khi tạo Order

**Quyết định**: Tạo Order và trừ tồn kho trong cùng một database transaction.

**Lý do**: Đảm bảo toàn vẹn dữ liệu - nếu trừ tồn kho thành công mà tạo Order thất bại thì hoàn lại, không để tồn kho bị trừ mà không có Order.

## Risks / Trade-offs

- **[Risk]**: Polling có thể bị interrupt nếu user đóng tab trình duyệt sớm
  - **[Mitigation]**: Polling vẫn tiếp tục chạy, khi user quay lại với cùng TxnRef sẽ thấy kết quả cuối cùng

- **[Risk]**: IPN có thể đến trước ReturnUrl redirect về
  - **[Mitigation]**: Bình thường - ReturnUrl polling sẽ thấy Order đã Paid khi nó đến

- **[Risk]**: VNPAY sandbox có thể timeout khác với production
  - **[Mitigation]**: Dùng 15 phút là đủ an toàn cho test

- **[Risk]**: Cleanup service có thể chạy trong khi IPN đang xử lý cùng một Order
  - **[Mitigation]**: IPN xử lý trước, sau đó mới có thể bị cleanup. Nếu Order đã Paid thì không bị cleanup vì đã không còn PendingPayment

- **[Risk]**: Network failure khi redirect sang VNPAY
  - **[Mitigation]**: User sẽ không tạo được Order - cần redirect lại từ đầu

## Open Questions

1. Có cần authentication cho checkout không? Hiện tại chưa có requirement rõ ràng - để đơn giản, checkout không bắt buộc login.

2. ReturnUrl và IpnUrl trong appsettings.json hiện tại là HTTPS localhost - cần điều chỉnh khi deploy thực tế.

3. Cần seed data Product mẫu để test - sẽ bổ sung trong quá trình implementation.