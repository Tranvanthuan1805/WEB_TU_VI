## Context

Trang VnpayReturn.razor hiện tại:
- Dùng C# Task.Delay cho timer (chạy trên server)
- Polling mỗi 20s, không có giới hạn số lần
- Khi Paid: chỉ hiển thị mã vé, không có chi tiết hóa đơn

## Goals / Non-Goals

**Goals:**
- Giới hạn polling tối đa 3 lần, sau đó hiển thị message lỗi và ẩn nút "Kiểm tra lại"
- Khi thanh toán thành công: hiển thị mã vé (trên) + chi tiết hóa đơn (dưới)
- Các trạng thái khác: chỉ hiển thị chi tiết hóa đơn (không có vé)

**Non-Goals:**
- Không thay đổi logic backend/API
- Không di chuyển timer sang JS (giữ nguyên C#)

## Decisions

1. **Giới hạn polling**: Thêm biến `_pollingCount` và `_maxRetries = 3`
   - Mỗi lần gọi API không tìm thấy order → tăng `_pollingCount`
   - Khi `_pollingCount >= _maxRetries`: hiển thị "Không tìm thấy hóa đơn", ẩn nút "Kiểm tra lại"

2. **Hiển thị chi tiết hóa đơn**: Sử dụng thông tin từ Order bao gồm:
   - TxnRef (mã đơn)
   - DateCreated (ngày mua)
   - Product.Name (tên sản phẩm)
   - Quantity (số lượng)
   - UnitPrice (đơn giá)
   - TotalAmount (tổng tiền)
   - Status (trạng thái)

3. **UI Layout**: 
   - Paid: mã vé ở trên, chi tiết hóa đơn ở dưới
   - Các trạng thái khác: chỉ hiển thị chi tiết hóa đơn

## Risks / Trade-offs

- [Risk] Người dùng có thể refresh page sau khi timeout → Cần giữ logic xử lý query params
- [Risk] Order có thể không load được Product do lazy loading → Sử dụng Include trong API (đã có)

## Open Questions

- Không có
