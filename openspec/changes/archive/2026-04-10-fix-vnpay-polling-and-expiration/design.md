## Context

**Current state:**
- `VnpayReturn.razor` sử dụng `IHttpClientFactory` để gọi API `api/payment/orders/status` trong polling loop
- `VnpayIpn` xử lý response code "11" (order expired) bằng cách gọi `MarkFailedAsync` thay vì `MarkExpiredAsync`
- Polling hiện tại không hiển thị elapsed time cho user biết đang chờ bao lâu

**Constraints:**
- Blazor Server - tránh dùng C# timer gây load cho server
- Polling timeout 60 giây đủ cho user expectation
- Expiration threshold 20 phút (xử lý bởi `PendingPaymentCleanupService`)

## Goals / Non-Goals

**Goals:**
- Sửa VnpayIpn gọi MarkExpiredAsync khi response code = "11"
- Thay HTTP client bằng direct service call trong VnpayReturn
- Thêm elapsed time display trong Pending state UI

**Non-Goals:**
- Không thay đổi polling timeout (giữ 60s)
- Không thêm endpoint mới cho expiration check

## Decisions

1. **Direct service call thay vì HTTP API**
   - Rationale: Blazor Server có thể inject service trực tiếp, tránh loopback HTTP overhead
   - Alternative considered: Giữ nguyên HTTP call nhưng có lý do valid nếu muốn tách biệt client/server concerns

2. **Hiển thị elapsed time = biến đếm lên**
   - Rationale: Dùng biến `elapsed` có sẵn trong loop, không cần thêm timer
   - Alternative considered: JS interop countdown - không cần thiết vì đã có elapsed tracking

3. **Giữ nguyên timeout 60s**
   - Rationale: Đủ để user quyết định, sau đó có thể restart polling

## Risks / Trade-offs

- [Low Risk] Service call có thể fail nếu DI setup không đúng → Blazor Server default có DI sẵn
- [Low Risk] Elapsed time update không smooth như JS timer → acceptable tradeoff